# 🧪 Hướng Dẫn Test Form Đặt Hàng v2.0

## ✅ Test Checklist & Verification Steps

---

## 📋 Phase 1: Frontend Testing (Desktop)

### Test 1.1: Form Load & Display

```
[  ] Mở index.html trong Firefox/Chrome
[  ] Scroll tới phần "Đặt Hàng"
[  ] Kiểm tra form hiển thị đủ các field:
     [  ] Tên
     [  ] Email
     [  ] Số điện thoại
     [  ] Ngày giao hàng
     [  ] Giờ giao hàng (NEW)
     [  ] Dropdown chọn sản phẩm (NEW)
     [  ] Input số lượng (NEW)
     [  ] Button "Thêm Sản Phẩm" (NEW)
     [  ] Giỏ hàng (NEW)
     [  ] Total price (NEW)
     [  ] Checkboxes thông báo (NEW)
     [  ] Button "Đặt Hàng Ngay"
[  ] Verify: Form không bị lỗi CSS/layout

Status: ___________
```

### Test 1.2: Date Input Default

```
[  ] Mở browser DevTools (F12)
[  ] Kiểm tra input#delivery-date value
[  ] Verify: Value = hôm nay (YYYY-MM-DD format)
[  ] Thử click input date → Calendar xuất hiện
[  ] Verify: Ngày hiện tại được highlight
[  ] Thử chọn ngày quá khứ
[  ] Verify: Không cho phép (disabled)

Test Data:
Today: 2026-02-10
Try to select: 2026-02-09 → Should be disabled
Try to select: 2026-02-11 → Should be allowed

Status: ___________
```

### Test 1.3: Time Input

```
[  ] Kiểm tra input#delivery-time exists
[  ] Click input time → Time picker xuất hiện
[  ] Chọn 10:00
[  ] Verify: Value = "10:00"
[  ] Thử nhập "08:00"
[  ] Verify: Value = "08:00"
[  ] Để trống (tùy chọn)
[  ] Verify: Form vẫn submit được

Status: ___________
```

### Test 1.4: Product Dropdown

```
[  ] Kiểm tra dropdown #product-select hiển thị
[  ] Click dropdown
[  ] Verify: Hiển thị các loại hoa lan:
     [  ] Lan Phalaenopsis
     [  ] Lan Cattleya
     [  ] Lan Dendrobium
     [  ] Lan Oncidium
[  ] Mỗi loại có 6 sản phẩm con
[  ] Verify: Format: "Tên Sản Phẩm - Giá"
     VD: "Phalaenopsis Đỏ Tươi - 399.000đ"
[  ] Inspect element: Verify data attributes (categoryId, price)

Status: ___________
```

### Test 1.5: Add Product to Cart

```
[  ] Chọn 1 sản phẩm từ dropdown: "Phalaenopsis Đỏ Tươi - 399.000đ"
[  ] Input quantity: 2
[  ] Click button "Thêm Sản Phẩm"
[  ] Verify: Dropdown reset = "-- Chọn hoa lan --"
[  ] Verify: Quantity reset = 1
[  ] Verify: Sản phẩm xuất hiện trong "Sản Phẩm Đã Chọn" section

Expected Output:
┌─────────────────────────────────────┐
│ Phalaenopsis Đỏ... | 399k | 2 | 798k │
└─────────────────────────────────────┘

Status: ___________
```

### Test 1.6: Add Multiple Products

```
[  ] Add product 1: Phalaenopsis Đỏ x 2 (399k)
[  ] Add product 2: Cattleya Vàng x 1 (599k)
[  ] Add product 3: Dendrobium Hồng x 3 (299k)

Verify Table:
┌──────────────────────────────────┐
│ Phalaenopsis Đỏ | 399k | 2 | 798k │
│ Cattleya Vàng | 599k | 1 | 599k  │
│ Dendrobium Hồng | 299k | 3 | 897k │
└──────────────────────────────────┘

Status: ___________
```

### Test 1.7: Update Quantity

```
[  ] Nhập số lượng mới: 3 (cho sản phẩm 1)
[  ] Verify: Thành tiền cập nhật: 399k × 3 = 1.197k
[  ] Nhập 5
[  ] Verify: Thành tiền = 1.995k
[  ] Nhập 1
[  ] Verify: Thành tiền = 399k

Status: ___________
```

### Test 1.8: Delete Product

```
[  ] Click nút xóa (icon ✖️) cho sản phẩm 1
[  ] Verify: Sản phẩm bị xóa khỏi bảng
[  ] Verify: Tổng tiền được tính lại
[  ] Delete tất cả sản phẩm
[  ] Verify: Hiển thị "Chưa chọn sản phẩm nào"

Status: ___________
```

### Test 1.9: Total Price Calculation

```
[  ] Add: Phalaenopsis 399k × 2 = 798k
[  ] Add: Cattleya 599k × 1 = 599k
[  ] Expected Total: 1.397.000đ (or 1.397k format)
[  ] Verify: Tổng tiền = 1.397.000đ
[  ] Modify: Change qty to 3 × 399k = 1.197k
[  ] Expected Total: 1.796.000đ
[  ] Verify: Tổng tiền cập nhật = 1.796.000đ

Status: ___________
```

### Test 1.10: Notification Checkboxes

```
[  ] Default state: SMS & Email checked
[  ] Uncheck SMS
[  ] Verify: SMS unchecked
[  ] Check Phone Call
[  ] Verify: Phone Call checked
[  ] State saved until form reset

Status: ___________
```

### Test 1.11: Form Validation

```
[  ] Try submit without products
[  ] Verify: Alert "Vui lòng chọn ít nhất một sản phẩm"
[  ] Add products
[  ] Leave Name empty
[  ] Try submit
[  ] Verify: Browser validation message (required field)
[  ] Leave Email empty
[  ] Try submit
[  ] Verify: Browser validation message
[  ] Leave Phone empty
[  ] Try submit
[  ] Verify: Browser validation message

Status: ___________
```

---

## 📱 Phase 2: Frontend Testing (Mobile)

### Test 2.1: Responsive Design

```
[  ] Mở DevTools → Toggle Device Toolbar (Ctrl+Shift+M)
[  ] Test widths: 320px, 480px, 768px, 1024px
[  ] Verify: Form display đúng ở mọi width
[  ] Check: Buttons không bị tắt
[  ] Check: Table scroll ngang nếu cần
[  ] Check: No horizontal scroll page

Device Sizes to Test:
- iPhone SE (375px)
- iPhone 12 (390px)
- Pixel 5 (393px)
- iPad (768px)

Status: ___________
```

### Test 2.2: Touch Interaction

```
[  ] Test on actual mobile device (nếu có)
[  ] Tap form fields
[  ] Tap dropdown
[  ] Tap buttons
[  ] Verify: All interactive elements accessible
[  ] Test: Virtual keyboard display
[  ] Verify: Form scroll without keyboard covering submit button

Status: ___________
```

---

## 🔍 Phase 3: JavaScript Console Testing

### Test 3.1: Browser Console Check

```
[  ] Open DevTools Console (F12 → Console)
[  ] Kiểm tra messages:
     [  ] Không có error messages (màu đỏ)
     [  ] Không có 404 errors cho files
     [  ] Có thể có info messages (xanh) - OK
[  ] Verify: No uncaught exceptions

Expected: Console clean hoặc chỉ có info messages

Status: ___________
```

### Test 3.2: Network Tab Check

```
[  ] DevTools → Network tab
[  ] Reload page
[  ] Check requests:
     [  ] assets/data/products.json → Status 200
     [  ] assets/js/products.js → Status 200
     [  ] assets/js/order-form.js → Status 200
[  ] No 404 errors
[  ] No failed requests

Status: ___________
```

### Test 3.3: productsData Variable

```
[  ] Console → type: productsData
[  ] Verify: Object appears with structure:
     {
       categories: [
         { id, name, products: [...] },
         ...
       ]
     }
[  ] Check: 4 categories (phalaenopsis, cattleya, dendrobium, oncidium)
[  ] Check: Each category has products array

Status: ___________
```

---

## 🌐 Phase 4: Form Submission Testing

### Test 4.1: Submit Form (Without Backend)

```
[  ] Add: Phalaenopsis × 2
[  ] Fill all required fields:
     - Name: "Test User"
     - Email: "test@example.com"
     - Phone: "0999999999"
     - Date: auto (hôm nay)
     - Time: "10:00"
     - Products: Added
     - Message: "Test message"
     - Notifications: SMS + Email
[  ] Click "ĐẶT HÀNG NGAY"
[  ] Verify: Loading message appears
[  ] Check Console: Verify POST request sent
     - URL: /forms/process-order.php
     - Method: POST
     - Content-Type: application/json
     - Body: Valid JSON with form data

Status: ___________
```

### Test 4.2: Network Request Check

```
[  ] DevTools → Network → XHR/Fetch
[  ] Submit form
[  ] Verify: Request to /forms/process-order.php
[  ] Check: Request payload (JSON)
[  ] Verify: Response status (should be 200 or 5xx if not configured)
[  ] Check: Response body

Status: ___________
```

---

## 📧 Phase 5: Backend Testing (Requires PHP Server)

### Test 5.1: Setup Test Environment

```
[  ] Ensure: PHP server running
[  ] Ensure: forms/process-order.php accessible
[  ] Check: PHP mail() function enabled
[  ] Verify: orders.log file location writable

Commands:
php -S localhost:8000        # Start PHP server
php -i | grep mail           # Check mail() status
ls -l forms/                 # Check permissions

Status: ___________
```

### Test 5.2: Submit Form & Check Response

```
[  ] Open website: localhost:8000/index.html
[  ] Add: Phalaenopsis × 1 (399k)
[  ] Fill form:
     - Name: "Nguyễn Văn Test"
     - Email: "test@example.com"
     - Phone: "0377765415"
     - Time: "10:00"
[  ] Click Submit
[  ] Verify: Response received
[  ] Check: Success message appears
[  ] Expected Response:
     {
       "success": true,
       "orderId": "ORD-20260210XXXXXX-XXXXXX",
       "message": "Đơn hàng đã được tạo thành công"
     }

Status: ___________
```

### Test 5.3: Check orders.log File

```
[  ] Check file exists: forms/../orders.log
[  ] View last entry: tail -1 orders.log
[  ] Verify: JSON structure:
     {
       "orderId": "ORD-...",
       "name": "Nguyễn Văn Test",
       "email": "test@example.com",
       "phone": "0377765415",
       "products": [...],
       "totalPrice": 399000,
       ...
     }
[  ] Submit 3 orders
[  ] Verify: 3 entries in orders.log

Status: ___________
```

### Test 5.4: Email Sending (Local Mail)

```
[  ] Configure: PHP mail() to catch all emails
[  ] Edit php.ini: sendmail_path = "cat > /tmp/mails/%t.txt"
[  ] Submit form
[  ] Check: /tmp/mails/ folder
[  ] Verify: Email file created
[  ] Check: Email headers & body
[  ] Verify: Contains:
     - To: test@example.com
     - Subject: "Xác nhận đơn hàng"
     - Order details
     - Product list

Status: ___________
```

### Test 5.5: Form Reset After Submit

```
[  ] Submit form
[  ] Verify: Form reset:
     [  ] Name field cleared
     [  ] Email field cleared
     [  ] Phone field cleared
     [  ] Date = hôm nay (reset)
     [  ] Time field cleared
     [  ] Product dropdown reset
     [  ] Giỏ hàng trống
     [  ] Total price = 0đ
     [  ] Notification checkboxes reset to default

Status: ___________
```

---

## 🎯 Phase 6: Edge Cases & Error Handling

### Test 6.1: Invalid Data

```
[  ] Test with invalid email: "notanemail"
     Verify: Browser validation or submit handling
[  ] Test with invalid phone: "abc123"
     Verify: Accepted (frontend doesn't validate format)
[  ] Test with very large quantity: 99999
     Verify: Price calculated correctly
[  ] Test with 0 quantity
     Verify: Can't add

Status: ___________
```

### Test 6.2: Large Cart

```
[  ] Add 100 products (loop add same product)
[  ] Verify: Table still scrollable
[  ] Verify: Price calculated correctly
[  ] Verify: No JavaScript errors
[  ] Check: Performance OK (not frozen)

Status: ___________
```

### Test 6.3: Unicode & Special Characters

```
[  ] Name: "Nguyễn Văn Á" (Vietnamese accents)
[  ] Message: "Giao lúc 9h-10h, đóng gói đẹp!"
[  ] Verify: Data submitted correctly
[  ] Check: orders.log has correct encoding

Status: ___________
```

---

## 📊 Phase 7: Final Verification

### Test 7.1: Complete User Flow

```
[  ] User Flow Test:
     [  ] 1. Open website
     [  ] 2. Scroll to "Đặt Hàng"
     [  ] 3. See form with correct fields
     [  ] 4. Date is auto-filled (today)
     [  ] 5. Add 3 different products
     [  ] 6. Modify quantities
     [  ] 7. See total price update correctly
     [  ] 8. Select SMS + Email notifications
     [  ] 9. Add note "Test order"
     [  ] 10. Click submit
     [  ] 11. See success message
     [  ] 12. Check orders.log has entry
     [  ] 13. Check email received
     [  ] 14. All fields empty/reset

Status: ___________
```

### Test 7.2: Cross-Browser Testing

```
[  ] Test Browsers:
     [  ] Firefox (Windows)
     [  ] Chrome (Windows)
     [  ] Edge (Windows)
     [  ] Safari (Mac, if available)
[  ] Verify: All tests pass on each browser
[  ] Check: Form styling consistent

Status: ___________
```

### Test 7.3: Performance

```
[  ] Page load time: < 3 seconds
[  ] Form submit: < 2 seconds
[  ] Add product: Instant (< 100ms)
[  ] Delete product: Instant
[  ] No lag or freezing

Status: ___________
```

---

## 📋 Test Report Summary

### Overview

```
Date Tested: ____________
Tester Name: ____________
Browser: ____________
Device: ____________ (Desktop/Tablet/Mobile)
PHP Version: ____________
```

### Results

```
Total Tests: 63
Passed: ____
Failed: ____
Blocked: ____

Critical Issues: ____
Major Issues: ____
Minor Issues: ____
```

### Issues Found

```
Issue 1:
  Title: _____________________________
  Severity: [ ] Critical [ ] Major [ ] Minor
  Description: _____________________________
  Steps to Reproduce: _____________________________
  Expected: _____________________________
  Actual: _____________________________
  Status: [ ] Open [ ] Fixed [ ] Won't Fix

Issue 2:
  ...
```

### Sign Off

```
Tested By: _______________________
Date: _______________________
Status: [ ] PASSED [ ] FAILED [ ] BLOCKED

Approved for Production: [ ] YES [ ] NO

Comments:
_______________________________________
_______________________________________
```

---

## 🎯 Next Steps After Testing

If all tests pass:

1. ✅ Cấu hình email admin email
2. ✅ Deploy lên production
3. ✅ Monitor for errors (7 days)
4. ✅ Setup SMS (nếu quyết định dùng)
5. ✅ Optimize & scale

If tests fail:

1. ❌ Dokumentation issues found
2. ❌ Create bug reports
3. ❌ Fix issues
4. ❌ Re-test
5. ❌ Repeat until all pass

---

**Good luck with testing! 🚀**
