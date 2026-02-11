# Rose's Garden - Simplified Order System (Email Only)

## Overview

The advanced order form has been simplified to use **email notifications only** - removing all paid notification methods (SMS, Phone calls) to reduce costs while maintaining core functionality.

## Current Features ✅

### 1. Form Fields

- **Name** - Tên khách hàng
- **Email** - Email xác nhận đơn hàng
- **Phone** - Số điện thoại liên hệ
- **Delivery Date** - Ngày giao hàng (mặc định hôm nay)
- **Delivery Time** - Giờ giao hàng (tùy chọn)

### 2. Product Selection

- Dropdown menu with all products from products.json
- Add multiple products to cart with quantities
- Edit quantities directly in cart table
- Remove individual products from cart
- Automatic total price calculation

### 3. Order Processing

```
Customer Submits Order
    ↓
JavaScript Validation
    ↓
Send Email to Customer (confirmation)
Send Email to Admin (notification)
    ↓
Save Order to orders.log
    ↓
Show Success Message
```

### 4. Email Notifications

Two emails are automatically sent when an order is placed:

#### Email 1: To Customer

- Order ID, Date, Time
- Product list with quantities and prices
- Total amount
- Contact information
- Delivery details

#### Email 2: To Admin

- New order alert
- Customer contact details
- Product list
- Delivery information
- Notes/comments

## Cost Analysis

### Simplified Approach (Email Only)

| Service        | Method     | Cost        |
| -------------- | ---------- | ----------- |
| Email          | PHP mail() | **FREE** ✅ |
| **Total Cost** | -          | **0đ**      |

### Previous Approach (All Notifications)

| Service        | Method               | Cost                  | Removed ❌ |
| -------------- | -------------------- | --------------------- | ---------- |
| SMS            | Twilio/Local Gateway | 200-500đ/message      | ❌         |
| Phone Call     | Twilio Voice API     | 1000-3000đ/call       | ❌         |
| Email          | PHP mail()           | FREE                  | ✅         |
| **Total Cost** | -                    | ~2000-4000đ per order | -          |

## Files Modified

### 1. index.html (Lines 505-523)

**Changes:**

- Removed SMS checkbox (notification method)
- Removed Phone Call checkbox (notification method)
- Kept Email checkbox only
- Added "(Miễn phí)" label to email option

### 2. assets/js/order-form.js

**Removed Functions:**

- `sendSMSNotification(formData)` - ~30 lines
- `schedulePhoneCall(formData)` - ~30 lines
- SMS/Phone checks in submitOrder()

**Modified Functions:**

- `collectFormData()` - Removed notificationMethods object
- `submitOrder()` - Simplified to email + webhook only

**Kept Functions:**

- `initializeOrderForm()`
- `setDefaultDeliveryDate()`
- `setupProductDropdown()`
- `addProductToCart()`
- `removeProductFromCart()`
- `updateProductQuantity()`
- `updateSelectedProductsDisplay()`
- `sendEmailNotification()`
- `sendWebhookNotification()` - Sends to process-order.php

### 3. forms/process-order.php

**Removed:**

- notificationMethods data handling
- SMS notification logic
- Phone call scheduling logic
- SMS/Phone method display in admin email

**Simplified:**

- Direct email sending to customer and admin
- Order logging to orders.log file
- Clean JSON response

**Kept:**

- Order validation
- Order ID generation
- Email to customer function
- Email to admin function
- Order data storage

### 4. forms/send-order-email.php

**Status:** No changes - working as-is ✅

## Configuration

### Email Setup (PHP)

The system uses PHP's built-in `mail()` function. Make sure your server has proper mail configuration in `php.ini`:

```ini
[mail function]
SMTP = smtp.gmail.com  ; or your mail server
smtp_port = 587
; or use sendmail
sendmail_path = "/usr/sbin/sendmail -t -i"
```

### Admin Email Address

**Location:** forms/process-order.php, line ~85

```php
$adminEmail = 'contact@rosesgarden.vn';
```

Change this to your actual admin email address.

### Customer Email Address

Automatically taken from form field: `name="email"`

## Order Data

### Order Log File

Orders are logged to: `orders.log` (in root directory)

**Format:** JSON - one order per line

```json
{"orderId":"ORD-20240120120530-abc123","name":"Nguyễn Văn A","email":"user@example.com"...}
```

### Order ID Format

`ORD-{YYYYMMDDHHMMSS}-{RANDOM6CHARS}`

Example: `ORD-20240120120530-a1b2c3`

## Testing Checklist

- [ ] Open index.html and view the order form
- [ ] Verify SMS and Phone checkboxes are **removed**
- [ ] Verify Email checkbox is **present** and labeled "(Miễn phí)"
- [ ] Select a product and add to cart
- [ ] Edit product quantity in cart
- [ ] Remove product from cart
- [ ] Verify total price calculation
- [ ] Submit order form with valid data
- [ ] Check that success message appears
- [ ] Verify customer email is received
- [ ] Verify admin email is received
- [ ] Check orders.log file for order record
- [ ] Verify form resets after submission

## Troubleshooting

### Email Not Sending

1. Check if PHP mail() is configured on your server
2. Verify the admin email address in process-order.php
3. Check server logs for mail errors
4. Ensure recipient email is valid

### Orders Not Being Logged

1. Verify write permissions on root directory
2. Check if orders.log file exists and is writable
3. Review browser console for JavaScript errors

### Form Not Submitting

1. Open browser DevTools (F12)
2. Check Console tab for JavaScript errors
3. Check Network tab to see if POST request is sent
4. Verify process-order.php is accessible

## Future Enhancements

If you later want to add SMS or Phone notifications:

1. **SMS:** Integrate with Twilio, Vonage, or local SMS provider
   - Create send-sms.php
   - Add `sendSMSNotification()` back to order-form.js
   - Add SMS checkbox to index.html

2. **Phone:** Use Twilio Voice API
   - Create schedule-call.php
   - Add `schedulePhoneCall()` back to order-form.js
   - Add Phone checkbox to index.html

3. **Database:** Replace orders.log with database storage
   - Create database schema
   - Update process-order.php to insert records
   - Add order history page

## Technical Stack

- **Frontend:** HTML5, Bootstrap 5, JavaScript ES6+
- **Backend:** PHP 7.0+
- **Data Storage:** JSON (products), Plain text (orders.log)
- **Email:** PHP mail() function
- **API:** RESTful JSON endpoints

## Support Contact

**Rose's Garden**

- Phone: 0377765415
- Email: contact@rosesgarden.vn
- Address: 185 Giảng Võ, Đống Đa, Hà Nội

---

**Last Updated:** 2024-01-20
**Version:** 2.0 (Email Only - No Paid Services)
