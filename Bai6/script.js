// ========== BÀI 6: HIỆU ỨNG NÂNG CAO VỚI JAVASCRIPT ==========
// (Kế thừa từ Bài 5 + Thêm hiệu ứng form mượt mà)

// ===== QUẢN LÝ LOCALSTORAGE (từ Bài 5) =====

// Danh sách sản phẩm mặc định ban đầu
const DEFAULT_PRODUCTS = [
  {
    name: 'Son lì Bloom Velvet',
    desc: 'Son lì lâu trôi, dưỡng môi mềm mượt, màu sắc tươi tắn phù hợp nhiều tone da.',
    price: 220000,
    image: 'https://picsum.photos/seed/cos1/400/300'
  },
  {
    name: 'Tinh chất dưỡng Bloom Radiance Serum',
    desc: 'Serum cô đặc vitamin C giúp da sáng mịn, giảm thâm nám và tăng đàn hồi.',
    price: 360000,
    image: 'https://picsum.photos/seed/cos2/400/300'
  },
  {
    name: 'Kem dưỡng ẩm Bloom Daily Moisturizer',
    desc: 'Kem dưỡng nhẹ, không nhờn rít, cấp ẩm sâu và bảo vệ da khỏi mất nước.',
    price: 280000,
    image: 'https://picsum.photos/seed/cos3/400/300'
  }
];

// Hàm lấy danh sách sản phẩm từ localStorage
function getProducts() {
  const stored = localStorage.getItem('products');
  return stored ? JSON.parse(stored) : [];
}

// Hàm lưu danh sách sản phẩm vào localStorage
function saveProducts(products) {
  localStorage.setItem('products', JSON.stringify(products));
  console.log('✅ Đã lưu sản phẩm vào localStorage:', products);
}

// Hàm khởi tạo sản phẩm lần đầu (nếu localStorage rỗng)
function initProducts() {
  const stored = localStorage.getItem('products');
  if (!stored) {
    // Nếu chưa có dữ liệu, lưu sản phẩm mặc định
    saveProducts(DEFAULT_PRODUCTS);
    console.log('✅ Khởi tạo sản phẩm mặc định');
  }
}

// ===== RENDER SẢN PHẨM TỪ LOCALSTORAGE =====

const productsContainer = document.querySelector('.products');

// Hàm render danh sách sản phẩm từ mảy
function renderProducts(products = null) {
  // Nếu không truyền products, lấy từ localStorage
  if (!products) {
    products = getProducts();
  }

  // Xóa các sản phẩm cũ (giữ lại form nếu có)
  const existingProducts = productsContainer.querySelectorAll('.product-item');
  existingProducts.forEach(item => item.remove());

  // Tạo phần tử cho mỗi sản phẩm
  products.forEach(product => {
    const article = document.createElement('article');
    article.classList.add('product-item');
    article.setAttribute('data-name', product.name.toLowerCase());

    // Định dạng giá
    const formattedPrice = product.price.toLocaleString('vi-VN');

    article.innerHTML = `
      <img 
        src="${product.image}" 
        alt="${product.name}"
        onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'"
      />
      <h3 class="product-name">${product.name}</h3>
      <p>${product.desc}</p>
      <p class="price">${formattedPrice}₫</p>
      <div class="product-actions">
        <button class="btn-delete" title="Xóa sản phẩm">🗑️ Xóa</button>
        <button class="btn-edit" title="Chỉnh sửa">✏️ Sửa</button>
      </div>
    `;

    productsContainer.appendChild(article);
    
    // Gắn sự kiện Delete
    const deleteBtn = article.querySelector('.btn-delete');
    deleteBtn.addEventListener('click', () => {
      deleteProduct(product.name, article);
    });
    
    // Gắn sự kiện Edit
    const editBtn = article.querySelector('.btn-edit');
    editBtn.addEventListener('click', () => {
      editProduct(product);
    });
  });

  // Cập nhật counter
  updateProductCounter();
  
  console.log(`✅ Đã render ${products.length} sản phẩm`);
}

// ===== UPDATE PRODUCT COUNTER =====

function updateProductCounter() {
  const products = getProducts();
  const productCountEl = document.getElementById('productCount');
  productCountEl.textContent = products.length;
}

// ===== DELETE PRODUCT =====

function deleteProduct(productName, articleElement) {
  // Confirm xóa
  if (!confirm(`Bạn chắc chắn muốn xóa "${productName}"?`)) {
    return;
  }
  
  // Slide out animation
  articleElement.style.animation = 'slideOut 0.4s ease-out forwards';
  
  setTimeout(() => {
    // Lấy danh sách từ localStorage
    const products = getProducts();
    
    // Xóa sản phẩm khỏi mảng
    const updated = products.filter(p => p.name !== productName);
    
    // Lưu lại
    saveProducts(updated);
    
    // Xóa phần tử khỏi DOM
    articleElement.remove();
    
    // Cập nhật counter
    updateProductCounter();
    
    console.log(`🗑️ Đã xóa: ${productName}`);
  }, 400);
}

// ===== EDIT PRODUCT =====

function editProduct(product) {
  // Lưu tên sản phẩm đang chỉnh sửa
  editingProductName = product.name;
  
  // Populate form với dữ liệu sản phẩm
  newProductName.value = product.name;
  newProductDesc.value = product.desc;
  newProductPrice.value = product.price;
  newProductImage.value = product.image;
  
  // Scroll tới form
  addProductForm.scrollIntoView({ behavior: 'smooth' });
  
  // Mở form
  if (addProductForm.classList.contains('form-hidden')) {
    toggleAddProductForm();
  }
  
  // Focus vào tên
  newProductName.focus();
  
  console.log(`✏️ Chỉnh sửa: ${product.name}`);
}

// ===== SEARCH & FILTER PRODUCTS =====

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Biến để lưu trạng thái sort
let currentSort = 'default'; // default, price-asc, price-desc, name-asc

// Hàm lọc sản phẩm theo từ khóa
function filterProducts() {
  const keyword = searchInput.value.toLowerCase().trim();
  const allProductItems = document.querySelectorAll('.product-item');

  allProductItems.forEach((item) => {
    const productName = item.getAttribute('data-name') || '';
    
    // Kiểm tra xem tên sản phẩm có chứa từ khóa không
    if (productName.includes(keyword)) {
      item.style.display = ''; // Hiển thị
      // HIỆU ỨNG FADE IN (BÀI 6)
      item.style.animation = 'none';
      setTimeout(() => {
        item.style.animation = 'fadeInUp 0.4s ease-out';
      }, 10);
    } else {
      item.style.display = 'none'; // Ẩn
    }
  });
}

// Hàm sort sản phẩm
function sortProducts(sortType) {
  let products = getProducts();
  
  if (sortType === 'price-asc') {
    products.sort((a, b) => a.price - b.price);
  } else if (sortType === 'price-desc') {
    products.sort((a, b) => b.price - a.price);
  } else if (sortType === 'name-asc') {
    products.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
  }
  // else: keep default (order from localStorage)
  
  currentSort = sortType;
  renderProducts(products);
  console.log(`📊 Sắp xếp: ${sortType}`);
}

// Gắn sự kiện cho nút tìm kiếm
searchBtn.addEventListener('click', filterProducts);

// Gắn sự kiện cho ô nhập tìm kiếm (keyup để tìm kiếm real-time)
searchInput.addEventListener('keyup', filterProducts);

// Gắn sự kiện cho dropdown sort
const sortDropdown = document.getElementById('sortDropdown');
sortDropdown.addEventListener('change', (e) => {
  sortProducts(e.target.value);
});

// ===== TOGGLE "ADD PRODUCT" FORM - HIỆU ỨNG MƯỢT MÀ (BÀI 6) =====

const addProductBtn = document.getElementById('addProductBtn');
const addProductForm = document.getElementById('addProductForm');
const cancelAddBtn = document.getElementById('cancelAddBtn');
const contactForm = document.getElementById('contactForm');

// Hàm ẩn/hiện form thêm sản phẩm với hiệu ứng mượt mà
function toggleAddProductForm() {
  addProductForm.classList.toggle('form-hidden');
  
  // Log để kiểm tra
  if (addProductForm.classList.contains('form-hidden')) {
    console.log('📉 Form đang ẩn');
  } else {
    console.log('📈 Form đang hiển thị');
  }
}

// Gắn sự kiện click cho nút "Thêm sản phẩm"
addProductBtn.addEventListener('click', toggleAddProductForm);

// Gắn sự kiện click cho nút "Hủy"
cancelAddBtn.addEventListener('click', toggleAddProductForm);

// ===== XỬ LÝ FORM THÊM SẢN PHẨM =====

const newProductName = document.getElementById('newProductName');
const newProductDesc = document.getElementById('newProductDesc');
const newProductPrice = document.getElementById('newProductPrice');
const newProductImage = document.getElementById('newProductImage');
const formMessage = document.getElementById('formMessage');

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

// ===== VARIABLE LƯU TRỮ TÊN SẢN PHẨM ĐANG CHỈNH SỬA =====

let editingProductName = null;

// ===== ADD/EDIT PRODUCT FORM SUBMIT =====

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
  formMessage.textContent = editingProductName ? '⏳ Đang cập nhật sản phẩm...' : '⏳ Đang thêm sản phẩm...';
  formMessage.style.color = '#6c7a89';

  try {
    // Mô phỏng request async/await
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Tạo đối tượng sản phẩm mới
    const newProduct = {
      name: name,
      desc: desc,
      price: parseInt(price),
      image: imageUrl
    };

    // Lấy danh sách sản phẩm hiện tại từ localStorage
    let products = getProducts();

    // Nếu đang chỉnh sửa => xóa sản phẩm cũ, rồi thêm cái mới
    if (editingProductName) {
      products = products.filter(p => p.name !== editingProductName);
      products.unshift(newProduct); // Thêm vào đầu
      console.log(`✏️ Cập nhật: ${editingProductName} → ${name}`);
    } else {
      // Thêm sản phẩm mới vào đầu danh sách
      products.unshift(newProduct);
      console.log(`➕ Thêm mới: ${name}`);
    }
    
    // Reset trạng thái edit
    editingProductName = null;

    // Lưu danh sách cập nhật vào localStorage
    saveProducts(products);

    // Render lại danh sách sản phẩm trên giao diện
    renderProducts(products);

    // Hiển thị thông báo thành công
    formMessage.textContent = editingProductName ? '✅ Cập nhật sản phẩm thành công!' : '✅ Thêm sản phẩm thành công!';
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
    formMessage.textContent = '❌ Lỗi khi xử lý sản phẩm. Vui lòng thử lại.';
    formMessage.style.color = '#ff5e91';
    console.error('Error processing product:', error);
  }
});

// ===== XỬ LÝ FORM LIÊN HỆ =====

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

// ===== KHỞI TẠO TRANG =====

// Khi trang load
document.addEventListener('DOMContentLoaded', () => {
  console.log('📄 Trang đã load - Bài 6');
  
  // Khởi tạo sản phẩm (nếu localStorage rỗng)
  initProducts();
  
  // Render sản phẩm từ localStorage
  renderProducts();
  
  // Cập nhật counter ban đầu
  updateProductCounter();
  
  console.log('✅ Script.js loaded - Hiệu ứng nâng cao ready!');
});

// ===== HIỆU ỨNG ANIMATION (BÀI 6) =====
// Thêm CSS animation vào document

const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

console.log('✨ Hiệu ứng CSS animation đã được thêm vào!');

