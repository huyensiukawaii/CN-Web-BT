// ========== BÀI 3: JAVASCRIPT - DOM & EVENTS ==========

// 1. SEARCH & FILTER PRODUCTS
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Hàm lọc sản phẩm theo từ khóa
function filterProducts() {
  const keyword = searchInput.value.toLowerCase().trim();
  const allProductItems = document.querySelectorAll('.product-item');

  allProductItems.forEach((item) => {
    const productName = item.getAttribute('data-name') || '';
    
    // Kiểm tra xem tên sản phẩm có chứa từ khóa không
    if (productName.includes(keyword)) {
      item.style.display = ''; // Hiển thị
    } else {
      item.style.display = 'none'; // Ẩn
    }
  });
}

// Gắn sự kiện cho nút tìm kiếm
searchBtn.addEventListener('click', filterProducts);

// Gắn sự kiện cho ô nhập tìm kiếm (keyup để tìm kiếm real-time)
searchInput.addEventListener('keyup', filterProducts);

// 2. TOGGLE "ADD PRODUCT" FORM
const addProductBtn = document.getElementById('addProductBtn');
const addProductForm = document.getElementById('addProductForm');
const cancelAddBtn = document.getElementById('cancelAddBtn');
const contactForm = document.getElementById('contactForm');

// Hàm ẩn/hiện form thêm sản phẩm
function toggleAddProductForm() {
  addProductForm.classList.toggle('form-hidden');
}

// Gắn sự kiện click cho nút "Thêm sản phẩm"
addProductBtn.addEventListener('click', toggleAddProductForm);

// Gắn sự kiện click cho nút "Hủy"
cancelAddBtn.addEventListener('click', toggleAddProductForm);

// 3. XỬ LÝ FORM THÊM SẢN PHẨM
const newProductName = document.getElementById('newProductName');
const newProductDesc = document.getElementById('newProductDesc');
const newProductPrice = document.getElementById('newProductPrice');
const newProductImage = document.getElementById('newProductImage');
const formMessage = document.getElementById('formMessage');
const productsContainer = document.querySelector('.products');

// Hàm validate dữ liệu sản phẩm
function validateProductData(name, desc, price, imageUrl) {
  // Kiểm tra tên sản phẩm
  if (!name) {
    return '❌ Tên sản phẩm không được để trống';
  }
  if (name.length < 3) {
    return '❌ Tên sản phẩm phải ít nhất 3 ký tự';
  }

  // Kiểm tra mô tả
  if (!desc) {
    return '❌ Mô tả sản phẩm không được để trống';
  }
  if (desc.length < 10) {
    return '❌ Mô tả sản phẩm phải ít nhất 10 ký tự';
  }

  // Kiểm tra giá
  if (!price) {
    return '❌ Giá sản phẩm không được để trống';
  }
  
  const priceNum = Number(price);
  if (isNaN(priceNum) || priceNum <= 0) {
    return '❌ Giá sản phẩm phải là số lớn hơn 0';
  }

  // Kiểm tra hình ảnh
  if (!imageUrl) {
    return '❌ Link ảnh sản phẩm không được để trống';
  }
  if (!isValidUrl(imageUrl)) {
    return '❌ Link ảnh không hợp lệ (phải bắt đầu với http:// hoặc https://)';
  }

  // Tất cả hợp lệ
  return null;
}

// Hàm kiểm tra URL hợp lệ
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

addProductForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = newProductName.value.trim();
  const desc = newProductDesc.value.trim();
  const price = newProductPrice.value.trim();
  const imageUrl = newProductImage.value.trim();

  // Validate dữ liệu
  const validationError = validateProductData(name, desc, price, imageUrl);
  if (validationError) {
    formMessage.textContent = validationError;
    formMessage.style.color = '#ff5e91';
    return;
  }

  // Xóa thông báo lỗi cũ
  formMessage.textContent = '';

  // Hiển thị trạng thái "đang xử lý"
  formMessage.textContent = '⏳ Đang thêm sản phẩm...';
  formMessage.style.color = '#6c7a89';

  try {
    // Mô phỏng request async/await (giống như gửi lên server)
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Thêm sản phẩm mới vào đầu danh sách
    const newArticle = document.createElement('article');
    newArticle.classList.add('product-item');
    newArticle.setAttribute('data-name', name.toLowerCase());
    
    // Tạo giá tiền định dạng (thêm .000 nếu cần)
    const priceNum = parseInt(price);
    const formattedPrice = priceNum.toLocaleString('vi-VN');
    
    newArticle.innerHTML = `
      <img src="${imageUrl}" alt="${name}" onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'"/>
      <h3 class="product-name">${name}</h3>
      <p>${desc}</p>
      <p class="price">${formattedPrice}₫</p>
    `;

    // Thêm vào đầu danh sách (prepend)
    productsContainer.prepend(newArticle);

    // Hiển thị thông báo thành công
    formMessage.textContent = '✅ Thêm sản phẩm thành công!';
    formMessage.style.color = '#4caf50';

    // Reset form
    addProductForm.reset();

    // Ẩn form sau 2 giây
    setTimeout(() => {
      toggleAddProductForm();
      formMessage.textContent = '';
      formMessage.style.color = '';
    }, 2000);

  } catch (error) {
    formMessage.textContent = '❌ Lỗi khi thêm sản phẩm. Vui lòng thử lại.';
    formMessage.style.color = '#ff5e91';
    console.error('Error adding product:', error);
  }
});

// 4. XỬ LÝ FORM LIÊN HỆ (async/await)
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const formStatus = document.getElementById('formStatus');

    formStatus.textContent = '⏳ Đang gửi...';

    try {
      // Mô phỏng gửi dữ liệu đến server
      await new Promise((resolve) => setTimeout(resolve, 1200));

      formStatus.textContent = '✅ Gửi thành công! Cảm ơn bạn đã liên hệ.';
      formStatus.style.color = '#4caf50';
      contactForm.reset();

      // Xóa thông báo sau 3 giây
      setTimeout(() => {
        formStatus.textContent = '';
        formStatus.style.color = '#6c7a89';
      }, 3000);

    } catch (error) {
      formStatus.textContent = '❌ Lỗi khi gửi. Vui lòng thử lại.';
      formStatus.style.color = '#ff5e91';
    }
  });
}

console.log('✅ Script.js loaded successfully - Search, Filter, Add Product, Contact Form ready!');
