# Bài Tập 4: Tích Hợp Toàn Bộ – Form Đăng Ký Sản Phẩm Mới

## 📋 Mô Tả
Trang web cho phép người dùng thêm sản phẩm mới thông qua form "Thêm sản phẩm" và cập nhật danh sách sản phẩm trên trang mà không cần tải lại.

---

## ✅ Các Chức Năng Đã Cài Đặt

### 1. **Form Thêm Sản Phẩm** 
- Biểu mẫu có các trường:
  - **Tên sản phẩm** (input text)
  - **Mô tả** (textarea)
  - **Giá** (input number)
  - **Link ảnh** (input url)
- Nút "Thêm sản phẩm" để mở form (ẩn/hiện với class `form-hidden`)
- Nút "Hủy" để đóng form

### 2. **Validation (Kiểm Tra Dữ Liệu)**
Form sẽ kiểm tra các điều kiện sau trước khi thêm:

| Trường | Yêu Cầu | Thông báo lỗi |
|--------|---------|--------------|
| **Tên sản phẩm** | Không được để trống, ≥ 3 ký tự | "❌ Tên sản phẩm không được để trống" hoặc "❌ Tên sản phẩm phải ít nhất 3 ký tự" |
| **Mô tả** | Không được để trống, ≥ 10 ký tự | "❌ Mô tả sản phẩm không được để trống" hoặc "❌ Mô tả sản phẩm phải ít nhất 10 ký tự" |
| **Giá** | Không được để trống, phải là số > 0 | "❌ Giá sản phẩm không được để trống" hoặc "❌ Giá sản phẩm phải là số lớn hơn 0" |
| **Link ảnh** | Không được để trống, phải là URL hợp lệ | "❌ Link ảnh sản phẩm không được để trống" hoặc "❌ Link ảnh không hợp lệ (phải bắt đầu với http:// hoặc https://)" |

### 3. **Tạo và Chèn Sản Phẩm Mới**
Nếu dữ liệu hợp lệ:
- ✅ Tạo phần tử `<article class="product-item">` mới với:
  - Hình ảnh (từ URL người dùng nhập)
  - Tên sản phẩm
  - Mô tả
  - Giá (định dạng tiền tệ Việt Nam: 123.456₫)
- ✅ **Thêm vào ĐẦU danh sách** (sử dụng `prepend()`)
- ✅ Sản phẩm mới có `data-name` (tên chuyển thành chữ thường)

### 4. **Tìm Kiếm / Lọc**
- Sản phẩm mới **có thể tìm kiếm được** ngay lập tức
- Hàm `filterProducts()` sử dụng `querySelectorAll()` **động** để luôn bao gồm sản phẩm mới
- Tìm kiếm không phân biệt hoa/thường (case-insensitive)

### 5. **Xử Lý Sau Khi Thêm**
- 🔄 Hiển thị thông báo "⏳ Đang thêm sản phẩm..." (mô phỏng async)
- ✅ Sau khi thành công: "✅ Thêm sản phẩm thành công!"
- 🔄 **Reset form** (xóa tất cả nội dung)
- 🔄 **Ẩn form** tự động sau 2 giây
- 🔄 Xóa thông báo lỗi

---

## 🔍 Hướng Dẫn Kiểm Tra / Testing

### **Test 1: Validation – Bỏ Trống Tên**
1. Nhấn "➕ Thêm sản phẩm"
2. Để trống trường "Tên sản phẩm"
3. Nhấp "Thêm sản phẩm"
4. **✅ Kết quả kỳ vọng:** Hiện thông báo lỗi: "❌ Tên sản phẩm không được để trống"
5. Sản phẩm **KHÔNG** được thêm

### **Test 2: Validation – Tên Quá Ngắn**
1. Nhấn "➕ Thêm sản phẩm"
2. Nhập tên: "AB"
3. Nhập mô tả: "Mô tả hợp lệ đủ dài"
4. Nhập giá: "100000"
5. Nhập link ảnh: "https://example.com/image.jpg"
6. Nhấp "Thêm sản phẩm"
7. **✅ Kết quả kỳ vọng:** Hiện lỗi: "❌ Tên sản phẩm phải ít nhất 3 ký tự"

### **Test 3: Validation – Mô Tả Quá Ngắn**
1. Nhấn "➕ Thêm sản phẩm"
2. Nhập tên: "Tên hợp lệ"
3. Nhập mô tả: "Ngắn"
4. Nhập giá: "100000"
5. Nhập link ảnh: "https://example.com/image.jpg"
6. Nhấp "Thêm sản phẩm"
7. **✅ Kết quả kỳ vọng:** Hiện lỗi: "❌ Mô tả sản phẩm phải ít nhất 10 ký tự"

### **Test 4: Validation – Giá Không Hợp Lệ**
1. Nhấn "➕ Thêm sản phẩm"
2. Nhập tên: "Tên hợp lệ"
3. Nhập mô tả: "Mô tả đủ dài và hợp lệ"
4. Nhập giá: "0" hoặc "-100"
5. Nhập link ảnh: "https://example.com/image.jpg"
6. Nhấp "Thêm sản phẩm"
7. **✅ Kết quả kỳ vọng:** Hiện lỗi: "❌ Giá sản phẩm phải là số lớn hơn 0"

### **Test 5: Validation – Link Ảnh Không Hợp Lệ**
1. Nhấn "➕ Thêm sản phẩm"
2. Nhập tên: "Tên hợp lệ"
3. Nhập mô tả: "Mô tả đủ dài và hợp lệ"
4. Nhập giá: "100000"
5. Nhập link ảnh: "invalid-url" hoặc "www.example.com"
6. Nhấp "Thêm sản phẩm"
7. **✅ Kết quả kỳ vọng:** Hiện lỗi: "❌ Link ảnh không hợp lệ (phải bắt đầu với http:// hoặc https://)"

### **Test 6: Thêm Sản Phẩm Hợp Lệ**
1. Nhấn "➕ Thêm sản phẩm"
2. Nhập tên: "Mỹ phẩm mới"
3. Nhập mô tả: "Sản phẩm chăm sóc da mới với thành phần tự nhiên"
4. Nhập giá: "250000"
5. Nhập link ảnh: "https://picsum.photos/seed/newproduct/400/300"
6. Nhấp "Thêm sản phẩm"
7. **✅ Kết quả kỳ vọng:**
   - Hiển thị "⏳ Đang thêm sản phẩm..." (~ 0.8 giây)
   - Sau đó hiển thị "✅ Thêm sản phẩm thành công!"
   - Sản phẩm **XUẤT HIỆN ĐẦU DANH SÁCH** với:
     - Hình ảnh từ URL
     - Tên: "Mỹ phẩm mới"
     - Mô tả: "Sản phẩm chăm sóc da mới với thành phần tự nhiên"
     - Giá: "250.000₫"
   - Form reset (xóa tất cả nội dung)
   - Sau 2 giây, form ẩn đi
   - Thông báo lỗi xóa

### **Test 7: Tìm Kiếm Sản Phẩm Mới**
1. Thêm sản phẩm mới (Test 6)
2. Trong ô tìm kiếm, nhập: "mỹ phẩm"
3. Nhấp "🔍 Tìm" hoặc đợi tìm kiếm real-time
4. **✅ Kết quả kỳ vọng:**
   - Sản phẩm vừa thêm được hiển thị (vì tên chứa "mỹ phẩm")
   - Các sản phẩm không khớp bị ẩn

### **Test 8: Nút Hủy**
1. Nhấn "➕ Thêm sản phẩm"
2. Form hiển thị
3. Nhấp nút "Hủy"
4. **✅ Kết quả kỳ vọng:**
   - Form ẩn đi ngay lập tức
   - Dữ liệu vẫn giữ (nếu không muốn reset trên hủy)

---

## 📁 Cấu Trúc File

```
Bai4/
├── bai4.html           # HTML semantic + form
├── style.css           # CSS styling (pink theme, responsive)
├── script.js           # JavaScript logic (validate, add, search)
└── README_BAI4.md      # File hướng dẫn này
```

---

## 🛠️ Công Nghệ Sử Dụng

- **HTML5:** Semantic tags (`<article>`, `<section>`, `<form>`, `<label>`)
- **CSS3:** Grid layout, gradient, flexbox, responsive, transitions
- **JavaScript (ES6+):**
  - DOM API: `getElementById()`, `querySelector()`, `querySelectorAll()`, `createElement()`, `appendChild()`, `prepend()`, `setAttribute()`
  - Events: `addEventListener()` (click, keyup, submit)
  - Async/Await: Mô phỏng yêu cầu server với `Promise` và `setTimeout()`
  - String methods: `trim()`, `toLowerCase()`, `includes()`

---

## 💡 Ý Tưởng Nâng Cao (Optional)

1. **Delete Product:** Thêm nút xóa sản phẩm trên mỗi card
2. **Edit Product:** Cho phép chỉnh sửa sản phẩm đã thêm
3. **LocalStorage:** Lưu sản phẩm vào trình duyệt
4. **Sort by Price:** Sắp xếp sản phẩm theo giá
5. **Favorite/Star Rating:** Đánh dấu sản phẩm yêu thích

---

## 📝 Lưu Ý Quan Trọng

- ✅ Form **không** reload trang (dùng `event.preventDefault()`)
- ✅ Validation **toàn diện** (tên, mô tả, giá, URL ảnh)
- ✅ Sản phẩm mới **tương tác được** với chức năng tìm kiếm
- ✅ **No hardcoding** – sản phẩm lấy từ input của người dùng
- ✅ **Responsive design** – hoạt động tốt trên mobile, tablet, desktop

---

**Hoàn thiện lúc:** 22/10/2025  
**Trạng thái:** ✅ Ready for Testing & Submission
