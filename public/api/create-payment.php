<?php

// Allowed domains strictly restricted to fullai.in (with and without www)
$allowedHosts = [
    'fullai.in',
    'www.fullai.in'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$host   = $_SERVER['HTTP_HOST'] ?? '';
$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';

// Allow strictly the configured domain and www subdomain
if (!empty($origin)) {
    $parsedOrigin = parse_url($origin, PHP_URL_HOST);
    if ($parsedOrigin && in_array(strtolower($parsedOrigin), $allowedHosts, true)) {
        header("Access-Control-Allow-Origin: $origin");
    } else {
        http_response_code(403);
        echo json_encode(["status" => "error", "message" => "Origin not allowed"]);
        exit();
    }
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Locate config.php across standard Hostinger and cPanel directory structures
$possiblePaths = array_unique([
    dirname($_SERVER['DOCUMENT_ROOT'] ?? '') . '/config.php',
    ($_SERVER['DOCUMENT_ROOT'] ?? '') . '/../config.php',
    ($_SERVER['DOCUMENT_ROOT'] ?? '') . '/../../config.php',
    __DIR__ . '/../../config.php',
    __DIR__ . '/../../../config.php',
    ($_SERVER['DOCUMENT_ROOT'] ?? '') . '/config.php',
    __DIR__ . '/config.php'
]);

$configPath = null;
foreach ($possiblePaths as $path) {
    if (!empty($path) && file_exists($path)) {
        $configPath = $path;
        break;
    }
}

if (!$configPath) {
    error_log("Payment Config Error: config.php not found in checked locations: " . implode(', ', $possiblePaths));
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Server configuration error: config.php not found. Please create config.php outside or inside the web root."
    ]);
    exit();
}

require_once($configPath);

if (!defined('RAZORPAY_KEY_ID') || !defined('RAZORPAY_KEY_SECRET') || empty(RAZORPAY_KEY_ID) || empty(RAZORPAY_KEY_SECRET)) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET not defined in config.php. Make sure both are set."
    ]);
    exit();
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data || empty($data['name']) || empty($data['email']) || empty($data['phone'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Name, email, and phone are required"]);
    exit();
}

$name       = trim($data['name']);
$email      = trim($data['email']);
$phone      = trim($data['phone']);
$pageSource = $data['page_source'] ?? 'unknown';
$pageUrl    = $data['page_url'] ?? '';

$callbackHost = in_array(strtolower(explode(':', $host)[0]), $allowedHosts, true) ? $host : $allowedHosts[0];
$callbackUrl = $scheme . '://' . $callbackHost . '/?payment=success';

$razorpayPayload = json_encode([
    "amount"      => 99900,  // ₹999 in paise
    "currency"    => "INR",
    "description" => "InstaSkills FullStack Developer Program — Pre-Seat Booking",
    "customer"    => [
        "name"    => $name,
        "email"   => $email,
        "contact" => $phone
    ],
    "notify" => [
        "sms"   => true,
        "email" => true
    ],
    "callback_url"    => $callbackUrl,
    "callback_method" => "get",
    "notes" => [
        "buyer_name"  => $name,
        "buyer_email" => $email,
        "buyer_phone" => $phone,
        "page_source" => $pageSource,
        "page_url"    => $pageUrl
    ],
    "reminder_enable" => true,
    "expire_by"       => time() + (30 * 60) // Link expires in 30 minutes
]);

$ch = curl_init('https://api.razorpay.com/v1/payment_links');
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $razorpayPayload);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_USERPWD, trim(RAZORPAY_KEY_ID) . ':' . trim(RAZORPAY_KEY_SECRET));
curl_setopt($ch, CURLOPT_TIMEOUT, 15);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$result = json_decode($response, true);

if ($httpCode !== 200 || empty($result['short_url'])) {
    error_log("Razorpay Link Creation Error: " . json_encode($result));
    http_response_code(500);
    echo json_encode([
        "status"  => "error",
        "message" => "Unable to create payment link. Please try again or contact support."
    ]);
    exit();
}

$sheetPayload = json_encode([
    "timestamp"   => date("Y-m-d H:i:s"),
    "name"        => $name,
    "email"       => $email,
    "phone"       => $phone,
    "amount"      => 999,
    "payment_id"  => "",
    "order_id"    => $result['id'] ?? '',       // Razorpay Payment Link ID (plink_xxxxx)
    "page_source" => $pageSource,
    "page_url"    => $pageUrl,
    "status"      => "INITIATED",
    "method"      => ""
]);

$sheetUrl = defined('GOOGLE_SHEET_WEBHOOK_URL') ? GOOGLE_SHEET_WEBHOOK_URL : '';
if (!empty($sheetUrl)) {
    $sh = curl_init($sheetUrl);
    curl_setopt($sh, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($sh, CURLOPT_POSTFIELDS, $sheetPayload);
    curl_setopt($sh, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($sh, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($sh, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($sh, CURLOPT_POSTREDIR, CURL_REDIR_POST_ALL); // CRITICAL: Preserve POST body across Google Apps Script 302 redirect
    curl_setopt($sh, CURLOPT_TIMEOUT, 20); // 20-second timeout to handle high-concurrency 100+ user bursts
    curl_exec($sh);
    curl_close($sh);
}

http_response_code(200);
echo json_encode([
    "status"      => "success",
    "payment_url" => $result['short_url'],      // e.g. https://rzp.io/i/abc123 (unique per user)
    "link_id"     => $result['id'] ?? ''         // plink_xxxxx
]);
