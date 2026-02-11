# 🎯 Form Đặt Hàng Nâng Cao - Tính Năng & Hướng Dẫn

## ✨ Các Tính Năng Mới

### 1. 📅 Ngày Giao Hàng Tự Động

- Input date tự động chọn ngày hiện tại
- Không cho phép chọn ngày trong quá khứ
- Khách có thể chọn ngày giao hàng muốn

### 2. ⏰ Giờ Giao Hàng

- Input time cho phép chọn khung giờ mong muốn
- Hỗ trợ từ 08:00 - 20:00 (khuyến khích)
- Tùy chọn (không bắt buộc)

### 3. 🛒 Giỏ Hàng Động

- **Thêm sản phẩm:** Chọn hoa lan + số lượng → Click "Thêm Sản Phẩm"
- **Xem danh sách:** Hiển thị bảng với sản phẩm đã chọn
- **Chỉnh sửa số lượng:** Nhập số lượng mới trực tiếp
- **Xóa sản phẩm:** Click nút xóa bên cạnh sản phẩm
- **Tính tổng tiền:** Tự động cập nhật khi thêm/xóa/sửa

### 4. 📱 Phương Thức Thông Báo

Khách hàng có thể chọn cách được thông báo:

- ✅ **SMS** (mặc định bật) - Tin nhắn text nhanh
- ✅ **Email** (mặc định bật) - Email chi tiết đơn hàng
- ☐ **Gọi Điện** (tùy chọn) - Xác nhận qua cuộc gọi

### 5. 🚀 Gửi Thông Báo Đa Kênh

- Email xác nhận cho khách hàng
- Email thông báo cho admin
- SMS xác nhận (nếu cấu hình)
- Gọi điện xác nhận (nếu cấu hình)
- Webhook đến hệ thống backend/CRM

---

## 📱 Giao Diện Form

```
┌─────────────────────────────────────────────┐
│         📦 ĐẶT HÀNG HOA LAN                 │
├─────────────────────────────────────────────┤
│ Thông Tin Khách Hàng:                       │
│ [Tên của bạn] [Email] [Số điện thoại]      │
│                                             │
│ Ngày & Giờ Giao Hàng:                       │
│ [Ngày giao (auto: hôm nay)] [Giờ giao]    │
│                                             │
│ Chọn Sản Phẩm:                              │
│ [-- Chọn hoa lan --] [Số lượng] [Thêm ➕] │
│                                             │
│ Sản Phẩm Đã Chọn:                           │
│ ┌─────────────────────────────────────────┐ │
│ │ Sản Phẩm | Giá  | Số Lượng | Thành T... │ │
│ │ Lan Phalaenopsis | 399k | 2 | 798k  [✖] │ │
│ │ Lan Cattleya | 599k | 1 | 599k  [✖]    │ │
│ │─────────────────────────────────────────│ │
│ │ Tổng tiền: 1.397.000đ                  │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ Ghi chú thêm (tùy chọn):                    │
│ [Nhập ghi chú...]                           │
│                                             │
│ Phương thức thông báo:                      │
│ ✅ SMS (Nhanh nhất)                         │
│ ✅ Email xác nhận                           │
│ ☐ Gọi điện xác nhận                        │
│                                             │
│ [🚀 ĐẶT HÀNG NGAY]                         │
└─────────────────────────────────────────────┘
```

---

## 🎬 Quy Trình Sử Dụng

### Bước 1: Nhập Thông Tin Khách Hàng

1. Nhập tên, email, số điện thoại
2. Ngày giao hàng đã được set mặc định (ngày hôm nay)
3. Chọn giờ giao hàng (tùy chọn)

### Bước 2: Chọn Sản Phẩm

1. Click dropdown "Chọn hoa lan"
2. Chọn một sản phẩm (ví dụ: "Lan Phalaenopsis - 399.000đ")
3. Nhập số lượng (hoặc mặc định 1)
4. Click "Thêm Sản Phẩm" ➕

### Bước 3: Quản Lý Giỏ Hàng

1. **Xem danh sách:** Sản phẩm xuất hiện trong bảng dưới
2. **Chỉnh sửa:** Thay đổi số lượng trực tiếp trong cột "Số Lượng"
3. **Xóa:** Click nút ✖️ để xóa sản phẩm
4. **Tính toán:** Tổng tiền cập nhật tự động

### Bước 4: Thêm Ghi Chú (Tùy Chọn)

- Viết yêu cầu đặc biệt (ví dụ: "Giao vào buổi sáng", "Gói quà")

### Bước 5: Chọn Phương Thức Thông Báo

- Mặc định: SMS + Email (nên bật cả hai)
- Tùy chọn: Gọi điện xác nhận

### Bước 6: Đặt Hàng

1. Kiểm tra lại thông tin
2. Click "ĐẶT HÀNG NGAY" 🚀
3. Chờ xác nhận

---

## 🔄 Quy Trình Backend

```
┌─ Khách hàng submit form
│
├─ Validate dữ liệu
│  ├─ Kiểm tra khách hàng
│  ├─ Kiểm tra sản phẩm (ít nhất 1 cái)
│  ├─ Kiểm tra ngày/giờ
│
├─ Gửi thông báo đa kênh
│  ├─ 📧 Email cho khách hàng (process-order.php)
│  ├─ 📧 Email cho admin (process-order.php)
│  ├─ 📱 SMS (send-sms.php) - nếu cấu hình
│  ├─ ☎️  Gọi điện (schedule-call.php) - nếu cấu hình
│  └─ 🔗 Webhook (process-order.php)
│
├─ Lưu dữ liệu
│  ├─ Log file (orders.log)
│  └─ Database (nếu có)
│
└─ Trả về kết quả cho client
   ├─ Hiển thị tin nhắn thành công
   ├─ Gợi ý các bước tiếp theo
   └─ Reset form
```

---

## 📊 Cấu Trúc Dữ Liệu Gửi

### JSON Data Format

```json
{
  "name": "Nguyễn Văn A",
  "email": "nguyenvana@gmail.com",
  "phone": "0377765415",
  "deliveryDate": "2026-02-12",
  "deliveryTime": "09:00",
  "products": [
    {
      "id": "1",
      "name": "Phalaenopsis Đỏ Tươi",
      "price": 399000,
      "quantity": 2,
      "categoryId": "phalaenopsis",
      "image": "menu-item-1.png"
    },
    {
      "id": "4",
      "name": "Cattleya Vàng Ấm",
      "price": 599000,
      "quantity": 1,
      "categoryId": "cattleya",
      "image": "menu-item-4.png"
    }
  ],
  "message": "Giao vào buổi sáng, gói quà đẹp",
  "notificationMethods": {
    "sms": true,
    "email": true,
    "phone": false
  },
  "totalPrice": 1397000,
  "timestamp": "2026-02-10T15:30:45.123Z"
}
```

---

## 🛠️ Files Liên Quan

### Frontend

- **index.html** - Form HTML (lines 435-528)
- **assets/js/order-form.js** - Xử lý form + giỏ hàng + validation
- **assets/js/products.js** - Load sản phẩm từ JSON

### Backend

- **forms/process-order.php** - Xử lý đơn hàng, gửi webhook
- **forms/send-order-email.php** - Gửi email xác nhận
- **forms/send-sms.php** - Gửi SMS (cần cấu hình)
- **forms/schedule-call.php** - Lên lịch gọi điện (cần cấu hình)

### Data

- **assets/data/products.json** - Danh sách sản phẩm
- **orders.log** - Log tất cả đơn hàng
- **sms.log** - Log SMS gửi
- **calls.log** - Log gọi điện

---

## ⚙️ Cấu Hình Thêm

### 1. Email Configuration

- File: `forms/process-order.php` (line ~60-100)
- Thay đổi `$adminEmail` để nhận email admin

### 2. SMS Configuration

- File: `forms/send-sms.php`
- Bật flag: `$USE_TWILIO = true` hoặc `$USE_CUSTOM_SMS = true`
- Nhập credentials (API key, phone number, etc.)

### 3. Phone Call Configuration

- File: `forms/schedule-call.php`
- Bật flag: `$USE_TWILIO_VOICE = true`
- Nhập credentials

---

## 🧪 Test Form

### Test Data

```
Tên: Nguyễn Văn Test
Email: test@example.com
Số điện thoại: 0999999999
Ngày giao: 2026-02-12 (default: hôm nay)
Giờ giao: 10:00
Sản phẩm:
  - Lan Phalaenopsis x 2
  - Lan Cattleya x 1
Ghi chú: Test đơn hàng
Thông báo: SMS + Email
```

### Expected Response

```json
{
  "success": true,
  "orderId": "ORD-20260210153045-abc123",
  "message": "Đơn hàng đã được tạo thành công",
  "data": {
    "orderId": "ORD-20260210153045-abc123",
    "createdAt": "2026-02-10 15:30:45"
  }
}
```

---

## 🎯 Tiếp Theo

### Ngắn Hạn

- [ ] Test form trên desktop/mobile
- [ ] Kiểm tra email gửi đi
- [ ] Xác nhận backend logs
- [ ] Kiểm tra hiển thị lỗi

### Trung Hạn

- [ ] Cấu hình SMS (nếu cần)
- [ ] Cấu hình gọi điện (nếu cần)
- [ ] Tích hợp database
- [ ] Thêm dashboard quản lý đơn hàng

### Dài Hạn

- [ ] Tích hợp payment gateway (Stripe, VNPay)
- [ ] Tạo trang theo dõi đơn hàng
- [ ] Tích hợp CRM/ERP
- [ ] Analytics & reporting
