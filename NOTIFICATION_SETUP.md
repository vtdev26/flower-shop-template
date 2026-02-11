# Hướng Dẫn Cấu Hình Phương Thức Thông Báo Đơn Hàng

## 📋 Tổng Quan

Form đặt hàng mới của Rose's Garden hỗ trợ các phương thức thông báo sau:

1. **📧 Email** - Gửi email xác nhận đơn hàng (tích hợp sẵn)
2. **📱 SMS** - Gửi tin nhắn text xác nhận (cần cấu hình)
3. **☎️ Gọi Điện** - Gọi điện thoại xác nhận (cần cấu hình)
4. **🔔 Webhook** - Gửi dữ liệu đến backend/hệ thống bên ngoài (tích hợp sẵn)

---

## 1️⃣ EMAIL NOTIFICATION (Tích Hợp Sẵn ✅)

### Cấu Hình Cơ Bản

File: `forms/send-order-email.php`

Email mặc định được gửi từ:

- **Từ:** `noreply@rosesgarden.vn`
- **Đến:** Email khách hàng (từ form)
- **Admin CC:** `contact@rosesgarden.vn` (cấu hình trong `process-order.php`)

### Cấu Hình SMTP (Tùy chọn)

Nếu server không hỗ trợ mail() function, sử dụng PHPMailer:

```php
// composer require phpmailer/phpmailer
require 'vendor/autoload.php';

$mail = new PHPMailer\PHPMailer\PHPMailer();
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com'; // Hoặc SMTP server khác
$mail->Port = 587;
$mail->SMTPAuth = true;
$mail->Username = 'your-email@gmail.com';
$mail->Password = 'your-app-password';
$mail->setFrom('noreply@rosesgarden.vn', "Rose's Garden");
$mail->addAddress($customerEmail);
$mail->Subject = 'Xác nhận đơn hàng';
$mail->Body = $message;
$mail->send();
```

---

## 2️⃣ SMS NOTIFICATION (SMS Gateway)

### Option A: Twilio SMS

#### Bước 1: Đăng Ký Twilio

1. Truy cập: https://www.twilio.com
2. Đăng ký tài khoản (có thể dùng trial)
3. Lấy thông tin:
   - Account SID
   - Auth Token
   - Twilio Phone Number

#### Bước 2: Cấu Hình trong `send-sms.php`

```php
$USE_TWILIO = true;  // Bật Twilio

$twilio_sid = 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';      // Account SID
$twilio_auth = 'your_auth_token_here';                  // Auth Token
$twilio_number = '+1234567890';                         // Twilio Phone Number
```

#### Bước 3: Cài Đặt Twilio PHP Library

```bash
composer require twilio/sdk
```

### Option B: SMS Gateway Việt Nam (Khuyến Khích)

**Nhà cung cấp phổ biến:**

- **ESMS.VN** - https://esms.vn (giá rẻ, đã xác minh)
- **Topdata.vn** - https://topdata.vn
- **VinaPhone SMS** - https://vinaphone.com.vn
- **Viettel SMS** - https://viettel.com.vn

#### Cấu Hình ESMS.vn (Ví Dụ)

```php
$USE_CUSTOM_SMS = true;

$sms_api_url = 'https://rest-api.esms.vn/Post';
$sms_api_key = 'YOUR_ESMS_API_KEY';
$sms_sender_id = 'RosesGarden'; // Tên đơn vị (được phê duyệt trước)

// Cấu hình request
$postData = json_encode([
    'ApiKey' => $sms_api_key,
    'SecretKey' => 'YOUR_SECRET_KEY',
    'Phone' => '0377765415',
    'Content' => 'Rose Garden: Don hang cua ban da duoc xac nhan. Cam on!',
    'IsUnicode' => false
]);
```

**Chi Phí SMS:** 200-500đ/tin tùy nhà cung cấp

---

## 3️⃣ PHONE CALL NOTIFICATION (VoIP)

### Option A: Twilio Voice API

#### Bước 1: Cấu Hình Twilio Voice

```php
$USE_TWILIO_VOICE = true;

$twilio_sid = 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
$twilio_auth = 'your_auth_token_here';
$twilio_number = '+1234567890';
```

#### Bước 2: Tạo TwiML Script

TwiML là XML script điều khiển hành động gọi:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice" language="vi-VN">
        Xin chào Nguyễn Văn A, đây là cuộc gọi từ Rose Garden.
        Đơn hàng của bạn đã được tiếp nhận.
        Chúng tôi sẽ giao hàng vào ngày hôm sau.
        Cảm ơn bạn đã đặt hàng!
    </Say>
    <Gather numDigits="1" action="https://rosesgarden.vn/forms/handle-call.php">
        <Say>Nhấn 1 để xác nhận. Nhấn 2 để yêu cầu gọi lại sau.</Say>
    </Gather>
</Response>
```

### Option B: VoIP Service Việt Nam

**Nhà cung cấp:**

- **Viettel Contact Center** - https://viettel.com.vn
- **FPT Telecom IVR** - https://fpt.vn
- **Mobifone BroadVoice** - https://mobifone.vn

---

## 4️⃣ WEBHOOK NOTIFICATION (Backend Integration)

### Cách Hoạt Động

```
Form Submission
    ↓
Client-side JavaScript (order-form.js)
    ↓
POST to process-order.php
    ↓
Save to Database/File
    ↓
Send to External Services
    ↓
Response to Client
```

### Webhook Endpoints

File: `forms/process-order.php`

```php
// Nhận dữ liệu từ form
$data = json_decode(file_get_contents('php://input'), true);

// Các thông tin sẵn có:
$orderId = $data['orderId'];           // Mã đơn hàng
$customerName = $data['name'];         // Tên khách hàng
$customerPhone = $data['phone'];       // Số điện thoại
$products = $data['products'];         // Danh sách sản phẩm
$totalPrice = $data['totalPrice'];     // Tổng tiền
$deliveryDate = $data['deliveryDate']; // Ngày giao
```

### Gửi Webhook đến Bên Thứ Ba

**Ví dụ: Gửi đến Slack**

```php
$webhookUrl = 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL';

$message = [
    'text' => "Đơn hàng mới: #{$orderId}",
    'blocks' => [
        [
            'type' => 'section',
            'text' => [
                'type' => 'mrkdwn',
                'text' => "*Đơn hàng mới*\n*Khách:* {$customerName}\n*SĐT:* {$customerPhone}\n*Tổng:* " . number_format($totalPrice) . "đ"
            ]
        ]
    ]
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $webhookUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($message));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_exec($ch);
```

---

## 📊 So Sánh Các Phương Thức

| Phương Thức  | Chi Phí        | Tốc Độ         | Hiệu Quả     | Khó Độ     |
| ------------ | -------------- | -------------- | ------------ | ---------- |
| **Email**    | Miễn phí       | Trung bình     | 70%          | Dễ         |
| **SMS**      | 200-500đ/tin   | Nhanh (1 phút) | 90%          | Trung bình |
| **Gọi Điện** | 500-2000đ/call | Nhanh (1 phút) | 95%          | Khó        |
| **Webhook**  | Miễn phí       | Tức thì        | Tùy cấu hình | Trung bình |

---

## 🔧 Cấu Hình Khuyến Khích

### Cho Doanh Số Thấp (0-10 đơn/ngày)

1. ✅ Email + Webhook
2. ⏭️ SMS (nếu có ngân sách)

### Cho Doanh Số Trung Bình (10-100 đơn/ngày)

1. ✅ Email + SMS + Webhook
2. ⏭️ Gọi điện cho các đơn hàng lớn

### Cho Doanh Số Cao (100+ đơn/ngày)

1. ✅ Email + SMS + Webhook
2. ✅ Gọi điện + IVR
3. ✅ Database integration
4. ✅ CRM system

---

## 🧪 Kiểm Tra & Debug

### Kiểm Tra Email

```bash
# Xem file log
tail logs/email.log

# Kiểm tra SPF/DKIM record
nslookup -type=TXT rosesgarden.vn
```

### Kiểm Tra SMS

```php
// Thêm log trong send-sms.php
file_put_contents('sms_debug.log',
    date('Y-m-d H:i:s') . " - " . json_encode($data) . "\n",
    FILE_APPEND
);
```

### Kiểm Tra Webhook

```php
// Xem file log
tail logs/webhooks.log

// Kiểm tra response từ external service
if ($httpCode !== 200) {
    error_log("Webhook failed: " . $response);
}
```

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề:

1. Kiểm tra file log trong `logs/` folder
2. Kiểm tra credentials (API key, phone number, etc.)
3. Xác nhận số điện thoại được cấu hình đúng định dạng
4. Kiểm tra balance/quota với nhà cung cấp SMS

---

## 📝 Chú Ý Quan Trọng

- ⚠️ Lưu **API keys** và **credentials** trong `.env` file hoặc environment variables
- ⚠️ Không commit sensitive data lên Git
- ⚠️ Thử nghiệm với test data trước khi đưa vào production
- ⚠️ Giám sát log file hàng ngày để phát hiện lỗi
