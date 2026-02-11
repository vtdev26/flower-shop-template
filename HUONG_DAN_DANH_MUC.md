# Hướng Dẫn Quản Lý Danh Mục Sản Phẩm Linh Hoạt

## 📋 Giới Thiệu

Danh mục sản phẩm giờ đây được lấy từ file JSON, giúp bạn dễ dàng cập nhật sản phẩm mà không cần sửa HTML.

---

## 📁 Cấu Trúc File

```
assets/
├── data/
│   └── products.json      ← File dữ liệu sản phẩm (JSON)
├── js/
│   ├── main.js           ← Script chính của template
│   └── products.js       ← Script load danh mục sản phẩm
└── img/
    └── menu/             ← Thư mục chứa ảnh sản phẩm
```

---

## 🔧 Cách Chỉnh Sửa Dữ Liệu

### 1. **Chỉnh sửa từ file JSON** (Cách dễ nhất)

File: `assets/data/products.json`

**Cấu trúc JSON:**

```json
{
  "categories": [
    {
      "id": "phalaenopsis",
      "name": "Lan Phalaenopsis",
      "tab": "menu-starters",
      "products": [
        {
          "id": 1,
          "name": "Tên sản phẩm",
          "description": "Mô tả sản phẩm",
          "price": "399.000đ",
          "image": "menu-item-1.png"
        }
      ]
    }
  ]
}
```

**Các trường dữ liệu:**

- `id`: ID danh mục (duy nhất)
- `name`: Tên danh mục hiển thị
- `tab`: ID tab (duy nhất)
- `products`: Mảng sản phẩm
  - `id`: ID sản phẩm (duy nhất trong danh mục)
  - `name`: Tên sản phẩm
  - `description`: Mô tả/thành phần sản phẩm
  - `price`: Giá (ví dụ: "399.000đ" hoặc "$5.95")
  - `image`: Tên file ảnh trong thư mục `assets/img/menu/`

---

## ✏️ Ví Dụ Thực Tế

### Thêm sản phẩm mới

Thêm object mới vào mảng `products`:

```json
{
  "id": 7,
  "name": "Phalaenopsis Đỏ Nhung",
  "description": "Đỏ sẫm, hoa lớn, quý hiếm",
  "price": "520.000đ",
  "image": "menu-item-7.png"
}
```

### Thêm danh mục mới

Thêm object mới vào mảng `categories`:

```json
{
  "id": "vanda",
  "name": "Lan Vanda",
  "tab": "menu-vanda",
  "products": [
    {
      "id": 1,
      "name": "Vanda Blue Magic",
      "description": "Xanh biển, hoa nước ngoài",
      "price": "899.000đ",
      "image": "menu-item-1.png"
    }
  ]
}
```

---

## 🗂️ Cách Cập Nhật Từ Excel/CSV

### B1: Chuẩn bị dữ liệu Excel

Tạo sheet Excel với cột:

- Category (tên danh mục)
- ProductName (tên sản phẩm)
- Description (mô tả)
- Price (giá)
- Image (tên file ảnh)

### B2: Chuyển sang JSON

Sử dụng công cụ online như:

- https://www.convertcsv.com/csv-to-json.htm
- Hoặc dùng Python/Node.js để convert

### B3: Cập nhật file `products.json`

Copy dữ liệu đã convert vào `assets/data/products.json`

---

## 🔄 Cách Cập Nhật Từ CSV/Text

File CSV cần có format:

```
phalaenopsis|Lan Phalaenopsis|Phalaenopsis Đỏ Tươi|Đỏ tươi, hoa lớn|399.000đ|menu-item-1.png
```

Sau đó convert sang JSON format.

---

## 📸 Thêm Ảnh Sản Phẩm

1. **Thêm file ảnh vào:** `assets/img/menu/`
2. **Cập nhật field `image`** trong JSON với tên file
3. Ảnh nên có kích thước: **400x400px** hoặc **600x600px**

---

## ✅ Kiểm Tra Dữ Liệu

Sau khi thay đổi JSON:

1. Lưu file
2. Reload trang web (F5)
3. Kiểm tra danh mục mục sản phẩm có cập nhật

**Nếu không cập nhật:**

- Mở **Developer Tools** (F12)
- Check **Console** tab để xem lỗi
- Kiểm tra file `assets/data/products.json` có hợp lệ (dùng JSONLint)

---

## 🎯 Các Tính Năng Khác

### Hỗ trợ nhiều định dạng

File `assets/js/products.js` có các function:

- `loadProductsData()` - Load từ JSON
- `loadProductsFromText()` - Parse từ text/CSV (cần cài đặt)
- `loadProductsFromExcel()` - Import từ Excel (cần thêm thư viện XLSX)

---

## ❓ Câu Hỏi Thường Gặp

**Q: Tôi thay đổi JSON nhưng website không cập nhật?**
A: Xoá cache trình duyệt (Ctrl+Shift+Delete) hoặc reload hard (Ctrl+Shift+R)

**Q: Làm sao để ẩn một sản phẩm?**
A: Xoá object sản phẩm khỏi mảng `products` hoặc đổi tên ảnh để không load được

**Q: Có thể change giá động?**
A: Có, chỉnh field `price` để cập nhật toàn bộ website

**Q: Format ảnh?**
A: PNG hoặc JPG, tên file không có ký tự đặc biệt, dùng dấu gạch ngang

---

## 📞 Support

Để thêm tính năng khác (import Excel, export CSV), hãy liên hệ hoặc sửa file `assets/js/products.js`

---

**Cập nhật lần cuối:** 2025-02-10
