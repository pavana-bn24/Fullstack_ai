# InstaSkills AI Full-Stack Developer Program

## Project Status & Next Steps
* **Current Status**: The overall flow, responsive design, dual-language localization (English/Kannada), and pre-booking system are fully updated.
* **Next Steps**: Any further updates, curriculum changes, or feature additions should be reviewed by **Shreedhar Sir** and implemented based on his guidance.

---

## Important Notes for the Incoming Developer

### 1. Payment Flow & Security Review
* The foundational payment processing (₹999 pre-booking deposit, Razorpay payment link generation, Google Sheets lead logging, and anti-spoofing session verification) has been implemented using best practices.
* The incoming developer should perform a comprehensive review of the entire user flow, gateway integrations, and edge-case security to harden the system further.

### 2. Hostinger Deployment & Domain Setup
* **Recommended Git deployment**: Connect GitHub in Hostinger, select `QuantumWeaveDev26/FullStack-AI` on branch `main`, build with `npm install && npm run build`, and publish the `dist/` directory to the domain's `public_html`.
* **Important**: Do not publish the repository root. Its `index.html` points to `/src/main.jsx`; production hosting must publish the Vite output in `dist/`.
* **Backend secrets**: Create `/home/uXXXXXXX/config.php` outside the web root using `example_config.php`. Never commit the real config file.
  1. Run `npm run build` to generate the production bundle in `dist/`.
  2. Run `npm run zip` to generate the POSIX Linux-compatible `hostinger_public_html.zip`.
  3. Upload and extract into Hostinger's `public_html/`.
  4. Ensure backend API secrets are configured in `/home/uXXXXXXX/config.php` outside the web root (see `example_config.php`).
* **Domain requirement**: The PHP APIs accept only `fullai.in` and `www.fullai.in`. Update `$allowedHosts` in both API files before using another domain.

---

## 📖 Full Technical Documentation
For complete architecture diagrams, component decomposition, API contracts, sequence flows, and developer commands, please review:
👉 [**`developer.md`**](developer.md)
