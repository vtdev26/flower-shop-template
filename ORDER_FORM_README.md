# 🌸 Form Đặt Hàng Nâng Cao - Rose's Garden

## 🎯 Tóm Tắt Cập Nhật

Đã nâng cấp form đặt hàng với các tính năng mới:

### ✨ Tính Năng Mới

1. ✅ **Ngày giao mặc định** - Tự động chọn ngày hiện tại
2. ✅ **Giờ giao hàng** - Input time cho phép chọn khung giờ
3. ✅ **Giỏ hàng động** - Thêm/xóa/sửa nhiều sản phẩm
4. ✅ **Tính tổng tiền** - Tự động cập nhật giá tiền
5. ✅ **Phương thức thông báo** - SMS, Email, Gọi điện
6. ✅ **Xử lý đa kênh** - Email + SMS + Phone + Webhook

---

## 📁 Files Thêm/Sửa Đổi

### Frontend Changes

```
index.html
  └─ Form section (lines 435-528) - Hoàn toàn được thiết kế lại
     ├─ Thêm input time (giờ giao hàng)
     ├─ Thêm product dropdown (giỏ hàng)
     ├─ Thêm product management UI
     └─ Thêm notification method checkboxes

assets/js/order-form.js [NEW]
  ├─ initializeOrderForm() - Khởi tạo form
  ├─ setDefaultDeliveryDate() - Set ngày mặc định
  ├─ setupProductDropdown() - Populate dropdown từ JSON
  ├─ addProductToCart() - Thêm sản phẩm
  ├─ removeProductFromCart() - Xóa sản phẩm
  ├─ updateProductQuantity() - Chỉnh sửa số lượng
  ├─ updateSelectedProductsDisplay() - Hiển thị giỏ hàng
  └─ submitOrder() - Gửi thông báo đa kênh
```

### Backend Files

```
forms/process-order.php [NEW]
  ├─ Webhook endpoint để xử lý đơn hàng
  ├─ Lưu đơn hàng vào log file
  ├─ Gửi email xác nhận khách hàng
  └─ Gửi email thông báo admin

forms/send-order-email.php [NEW]
  └─ Gửi email HTML đẹp cho khách hàng

forms/send-sms.php [NEW]
  ├─ Hỗ trợ Twilio SMS
  └─ Hỗ trợ Custom SMS Gateway (ESMS, Topdata, etc.)

forms/schedule-call.php [NEW]
  ├─ Hỗ trợ Twilio Voice API
  └─ Hỗ trợ Custom VoIP Service
```

### Documentation

```
ADVANCED_ORDER_FORM.md [NEW]
  └─ Hướng dẫn chi tiết về form đặt hàng

NOTIFICATION_SETUP.md [NEW]
  └─ Hướng dẫn cấu hình các phương thức thông báo

NOTIFICATION_COMPARISON.md [NEW]
  └─ So sánh chi phí, ưu nhược điểm từng phương thức
```

---

## 🚀 Hướng Dẫn Nhanh

### Bước 1: Test Form (Ngay)

1. Mở `index.html` trong browser
2. Scroll tới phần "Đặt Hàng"
3. Kiểm tra:
   - ✓ Ngày giao hàng đã set = hôm nay
   - ✓ Dropdown sản phẩm hiển thị từ JSON
   - ✓ Thêm sản phẩm → hiển thị trong giỏ hàng
   - ✓ Chỉnh số lượng & tổng tiền cập nhật
   - ✓ Nút xóa sản phẩm hoạt động
   - ✓ Checkbox phương thức thông báo

### Bước 2: Cấu Hình Email (1-2 giờ)

- File: `forms/process-order.php` (line ~90)
- Thay đổi: `$adminEmail = 'contact@rosesgarden.vn'`
- Test: Submit form → Kiểm tra email (khách + admin)

### Bước 3: Cấu Hình SMS (Tùy chọn, 1-2 ngày)

- File: `forms/send-sms.php`
- Chọn provider: Twilio hoặc ESMS.vn
- Hướng dẫn chi tiết: Xem `NOTIFICATION_SETUP.md`

### Bước 4: Cấu Hình Gọi Điện (Tùy chọn, 2-3 ngày)

- File: `forms/schedule-call.php`
- Chọn provider: Twilio Voice hoặc VoIP service
- Hướng dẫn chi tiết: Xem `NOTIFICATION_SETUP.md`

---

## 📱 Giao Diện Form

### Form Layout

```
[Tên] [Email] [Số điện thoại]
[Ngày giao] [Giờ giao]

[Chọn sản phẩm ▼] [Số lượng] [➕ Thêm]

┌─────────────────────────────────────┐
│ Sản Phẩm Đã Chọn                   │
│ Lan Phalaenopsis | 399k | 2 | 798k │
│ Lan Cattleya | 599k | 1 | 599k     │
│─────────────────────────────────────│
│ Tổng tiền: 1.397.000đ             │
└─────────────────────────────────────┘

[Ghi chú...]

☑ SMS Notification
☑ Email Confirmation
☐ Phone Call

[🚀 ĐẶT HÀNG NGAY]
```

---

## 🔄 Quy Trình Dữ Liệu

```
Khách submit form
    ↓ (order-form.js)
Validate dữ liệu
    ↓
POST JSON → /forms/process-order.php
    ↓
Backend xử lý:
  ├─ Lưu orders.log
  ├─ Gửi email khách (send-order-email.php)
  ├─ Gửi email admin (process-order.php)
  ├─ Gửi SMS nếu cấu hình (send-sms.php)
  ├─ Gọi điện nếu cấu hình (schedule-call.php)
  └─ Webhook to external services
    ↓
Response → Success/Error message
    ↓
Khách thấy xác nhận
```

---

## 📊 Dữ Liệu Gửi (JSON)

```json
{
  "name": "Nguyễn Văn A",
  "email": "nguyenvana@gmail.com",
  "phone": "0377765415",
  "deliveryDate": "2026-02-12",
  "deliveryTime": "10:00",
  "products": [
    {
      "id": "1",
      "name": "Phalaenopsis Đỏ Tươi",
      "price": 399000,
      "quantity": 2,
      "categoryId": "phalaenopsis"
    }
  ],
  "message": "Giao vào buổi sáng",
  "notificationMethods": {
    "sms": true,
    "email": true,
    "phone": false
  },
  "totalPrice": 798000,
  "timestamp": "2026-02-10T15:30:45.123Z"
}
```

---

## 💰 Chi Phí Ước Tính

### Mô Hình Cơ Bản (Email Only)

- **Chi phí:** Miễn phí
- **Phù hợp:** Startup, thử nghiệm

### Mô Hình Tiêu Chuẩn (Email + SMS)

- **Chi phí:** ~400.000 - 600.000đ/tháng (100-150 đơn)
- **Phù hợp:** SME, tăng độ tin tưởng
- **Provider:** ESMS.vn, Topdata

### Mô Hình Đầy Đủ (Email + SMS + Call)

- **Chi phí:** ~3 - 5 triệu/tháng (500+ đơn)
- **Phù hợp:** Enterprise, bán hàng cao cấp
- **Provider:** Twilio, Viettel Contact Center

---

## ✅ Checklist Triển Khai

### Ngày 1

- [ ] Test form cơ bản trên desktop
- [ ] Test form trên mobile
- [ ] Kiểm tra dropdown sản phẩm load đúng
- [ ] Test add/remove sản phẩm

### Ngày 2-3

- [ ] Cấu hình email admin
- [ ] Test submit form → Kiểm tra email
- [ ] Kiểm tra orders.log file
- [ ] Xác nhận tổng tiền tính đúng

### Tuần 2

- [ ] Cấu hình SMS (nếu quyết định dùng)
- [ ] Nạp tiền ESMS hoặc Twilio
- [ ] Test gửi SMS
- [ ] Kiểm tra SMS.log

### Tuần 3+

- [ ] Cấu hình gọi điện (nếu cần)
- [ ] Tích hợp database
- [ ] Tích hợp CRM
- [ ] Tối ưu hóa & monitoring

---

## 🧪 Test Data

Dùng data này để test:

```
Tên: Nguyễn Văn Test
Email: test@example.com
SĐT: 0999999999
Ngày: [auto - hôm nay]
Giờ: 10:00
Sản phẩm: Lan Phalaenopsis x 2, Lan Cattleya x 1
Ghi chú: Test đơn hàng form
Thông báo: SMS + Email
```

**Expected Result:**

1. ✅ Form submit thành công
2. ✅ Email nhận được sau 1-5 phút
3. ✅ orders.log được tạo
4. ✅ Admin email nhận được
5. ⏳ SMS gửi (nếu cấu hình)

---

## 🐛 Troubleshooting

### Form không load

```
Kiểm tra:
1. Browser console (F12) → xem error messages
2. File products.js được load? (Xem Network tab)
3. products.json tồn tại? (Check URL: assets/data/products.json)
```

### Dropdown trống

```
Kiểm tra:
1. products.json có dữ liệu?
2. JSON format đúng?
3. File order-form.js được load?
4. Mở browser console → xem productsData
```

### Email không gửi

```
Kiểm tra:
1. PHP mail() function được bật?
2. Email address hợp lệ?
3. Spam folder có email không?
4. Check logs: tail forms/email.log (nếu có)
5. SPF/DKIM record cấu hình?
```

### SMS không gửi

```
Kiểm tra:
1. SMS provider được cấu hình? ($USE_TWILIO / $USE_CUSTOM_SMS)
2. API key/credentials đúng?
3. Account có tiền?
4. Số điện thoại format đúng?
5. Check logs: tail forms/sms.log
```

---

## 📚 Tài Liệu Chi Tiết

Tìm hướng dẫn chi tiết tại:

1. **ADVANCED_ORDER_FORM.md** - Hướng dẫn form đặt hàng
2. **NOTIFICATION_SETUP.md** - Cách cấu hình thông báo
3. **NOTIFICATION_COMPARISON.md** - So sánh các phương thức

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề:

1. Kiểm tra browser console (F12)
2. Kiểm tra server logs
3. Đọc tài liệu liên quan
4. Thử lại với test data

---

## 🎉 Kết Thúc

Form đặt hàng mới của bạn đã sẵn sàng!

**Các bước tiếp theo:**

1. Test toàn bộ quy trình
2. Cấu hình email admin
3. Quyết định dùng SMS hay không
4. Đưa lên production
5. Giám sát 7 ngày đầu

**Good luck! 🚀**
