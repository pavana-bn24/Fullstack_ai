<?php

// Allowed domains strictly restricted to fullai.in (with and without www)
$allowedHosts = [
    'fullai.in',
    'www.fullai.in'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$host   = $_SERVER['HTTP_HOST'] ?? '';

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
    error_log("Payment Verify Error: config.php not found in checked locations: " . implode(', ', $possiblePaths));
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Server configuration error: config.php not found."
    ]);
    exit();
}
require_once($configPath);

$RAZORPAY_KEY_SECRET = defined('RAZORPAY_KEY_SECRET') ? trim(RAZORPAY_KEY_SECRET) : '';
$RAZORPAY_WEBHOOK_SECRET = defined('RAZORPAY_WEBHOOK_SECRET') && !empty(RAZORPAY_WEBHOOK_SECRET)
    ? trim(RAZORPAY_WEBHOOK_SECRET)
    : $RAZORPAY_KEY_SECRET;
$GOOGLE_SHEET_WEBHOOK_URL = defined('GOOGLE_SHEET_WEBHOOK_URL') ? GOOGLE_SHEET_WEBHOOK_URL : '';

// Read raw body ONCE (needed for both webhook signature check and JSON parsing)
$rawInput = file_get_contents('php://input');

if (empty($rawInput)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Empty request body"]);
    exit();
}

// DETECT: Is this a Razorpay Webhook or a Frontend Pre-Checkout / Redirect call?
$razorpaySignatureHeader = $_SERVER['HTTP_X_RAZORPAY_SIGNATURE'] ?? '';
$isWebhook = !empty($razorpaySignatureHeader);

if ($isWebhook) {
    // Official Razorpay Webhook Signature Verification (HMAC SHA-256)
    $sig1 = hash_hmac('sha256', $rawInput, $RAZORPAY_WEBHOOK_SECRET);
    $sig2 = hash_hmac('sha256', $rawInput, $RAZORPAY_KEY_SECRET);

    if (!hash_equals($sig1, $razorpaySignatureHeader) && !hash_equals($sig2, $razorpaySignatureHeader)) {
        http_response_code(403);
        echo json_encode(["status" => "error", "message" => "Webhook signature verification failed"]);
        exit();
    }

    $webhook = json_decode($rawInput, true);
    $event = $webhook['event'] ?? '';

    // Official Razorpay Payment Link Webhook Events
    $statusMap = [
        'payment_link.paid'      => 'PAID',
        'payment.failed'         => 'FAILED',
        'payment_link.cancelled' => 'CANCELLED',
        'payment_link.expired'   => 'EXPIRED'
    ];

    if (!isset($statusMap[$event])) {
        http_response_code(200);
        echo json_encode(["status" => "ignored", "message" => "Event '$event' not handled"]);
        exit();
    }

    $paymentStatus = $statusMap[$event];

    $paymentEntity = $webhook['payload']['payment']['entity'] ?? [];
    $linkEntity    = $webhook['payload']['payment_link']['entity'] ?? [];

    $paymentId     = $paymentEntity['id'] ?? '';
    $amountPaise   = $paymentEntity['amount'] ?? ($linkEntity['amount'] ?? 0);
    $amountRs      = $amountPaise / 100; // Convert paise to rupees
    $email         = $paymentEntity['email'] ?? ($linkEntity['customer']['email'] ?? '');
    $phone         = $paymentEntity['contact'] ?? ($linkEntity['customer']['contact'] ?? '');
    $method        = $paymentEntity['method'] ?? '';
    $paymentLinkId = $linkEntity['id'] ?? '';

    $notes = $paymentEntity['notes'] ?? ($linkEntity['notes'] ?? []);
    $name  = $notes['buyer_name'] ?? (!empty($email) ? explode('@', $email)[0] : 'Customer');

    // Recover the original page_source/page_url stored in notes during link creation
    $originalSource = $notes['page_source'] ?? 'fullstack-landing';
    $originalUrl    = $notes['page_url'] ?? '';

    $sheetPayload = json_encode([
        "timestamp"   => date("Y-m-d H:i:s"),
        "name"        => $name,
        "email"       => $email,
        "phone"       => $phone,
        "amount"      => $amountRs,
        "payment_id"  => $paymentId,
        "order_id"    => $paymentLinkId,
        "page_source" => $originalSource,
        "page_url"    => $originalUrl,
        "status"      => $paymentStatus,
        "method"      => $method
    ]);

    sendToGoogleSheet($GOOGLE_SHEET_WEBHOOK_URL, $sheetPayload);

    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Webhook processed, status updated to $paymentStatus"]);
    exit();

} else {
    $data = json_decode($rawInput, true);

    if (!$data) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid JSON payload"]);
        exit();
    }

    $name       = $data['name'] ?? '';
    $email      = $data['email'] ?? '';
    $phone      = $data['phone'] ?? '';
    $pageSource = $data['page_source'] ?? 'fullstack-landing';
    $pageUrl    = $data['page_url'] ?? '';
    $amount     = $data['amount'] ?? 999;
    $status     = $data['status'] ?? 'INITIATED';
    $paymentId  = $data['payment_id'] ?? '';
    $orderId    = $data['order_id'] ?? '';
    $method     = $data['method'] ?? '';

    $signature    = $data['signature'] ?? '';
    $referenceId  = $data['reference_id'] ?? '';
    $linkStatus   = $data['link_status'] ?? 'paid';

    // STRICT VERIFICATION: If status is PAID, reject unverified client requests unless signature matches OR Razorpay API confirms
    if ($status === 'PAID') {
        $verified = false;

        // Path A: Signature Verification (Client redirect contains signature)
        if (!empty($signature) && !empty($orderId) && !empty($paymentId)) {
            $sigA = hash_hmac('sha256', $orderId . '|' . $paymentId, $RAZORPAY_KEY_SECRET);
            $sigB = hash_hmac('sha256', $orderId . '|' . $referenceId . '|' . $linkStatus . '|' . $paymentId, $RAZORPAY_KEY_SECRET);
            $verified = hash_equals($sigA, $signature) || hash_equals($sigB, $signature);
        }

        // Path B: Direct Razorpay API Query Verification (Fallback if signature is omitted)
        if (!$verified && !empty($paymentId) && defined('RAZORPAY_KEY_ID') && !empty(RAZORPAY_KEY_ID)) {
            $ch = curl_init("https://api.razorpay.com/v1/payments/" . urlencode($paymentId));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_USERPWD, trim(RAZORPAY_KEY_ID) . ':' . $RAZORPAY_KEY_SECRET);
            curl_setopt($ch, CURLOPT_TIMEOUT, 10);
            $rzpRes = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if ($httpCode === 200) {
                $rzpData = json_decode($rzpRes, true);
                if (isset($rzpData['status']) && ($rzpData['status'] === 'captured' || $rzpData['status'] === 'authorized')) {
                    $verified = true;
                    $method = $rzpData['method'] ?? $method;
                    $amount = isset($rzpData['amount']) ? ($rzpData['amount'] / 100) : $amount;
                }
            }
        }

        if (!$verified) {
            http_response_code(403);
            echo json_encode([
                "status"  => "error",
                "message" => "Unverified payment status submission rejected."
            ]);
            exit();
        }
    }

    $sheetPayload = json_encode([
        "timestamp"   => date("Y-m-d H:i:s"),
        "name"        => $name,
        "email"       => $email,
        "phone"       => $phone,
        "amount"      => $amount,
        "payment_id"  => $paymentId,
        "order_id"    => $orderId,
        "page_source" => $pageSource,
        "page_url"    => $pageUrl,
        "status"      => $status,
        "method"      => $method
    ]);

    sendToGoogleSheet($GOOGLE_SHEET_WEBHOOK_URL, $sheetPayload);

    http_response_code(200);
    echo json_encode([
        "status"  => "success",
        "message" => "Record updated to $status"
    ]);
    exit();
}

function sendToGoogleSheet($url, $payload) {
    if (empty($url)) return;

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_POSTREDIR, CURL_REDIR_POST_ALL);
    curl_setopt($ch, CURLOPT_TIMEOUT, 20); // 20-second timeout to handle high-concurrency 100+ user bursts
    curl_exec($ch);
    curl_close($ch);
}
