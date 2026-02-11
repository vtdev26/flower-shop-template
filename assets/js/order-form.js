/**
 * Advanced Order Form Handler
 * Manages product selection, cart, and order submission
 */

let selectedProducts = []; // Array to store selected products with quantities


// Initialize order form when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    initializeOrderForm();
    setupAddProductButton();
    setupOrderFormSubmit();
    setDefaultDeliveryDate();
});

/**
 * Initialize order form
 */
function initializeOrderForm() {
    // Clear any previous selections
    selectedProducts = [];
    updateSelectedProductsDisplay();
}

/**
 * Set default delivery date to today
 */
function setDefaultDeliveryDate() {
    const deliveryDateInput = document.getElementById('delivery-date');
    if (deliveryDateInput) {
        const today = new Date();
        const dateString = today.toISOString().split('T')[0];
        deliveryDateInput.value = dateString;
        deliveryDateInput.min = dateString; // Prevent selecting past dates
    }
}

/**
 * Extract numeric price from string (e.g., "399.000đ" -> 399000)
 */
function extractPrice(priceString) {
    const cleanPrice = priceString.replace(/[^\d]/g, '');
    return parseInt(cleanPrice, 10) || 0;
}

/**
 * Setup "Add Product" button click handler
 */
function setupAddProductButton() {
    const addBtn = document.getElementById('add-product-btn');
    const productSelect = document.getElementById('product-select');
    const quantityInput = document.getElementById('product-quantity');

    if (!addBtn) return;

    addBtn.addEventListener('click', function (e) {
        e.preventDefault();

        if (!productSelect.value) {
            alert('Vui lòng chọn một sản phẩm');
            return;
        }

        const quantity = parseInt(quantityInput.value) || 1;

        if (quantity < 1) {
            alert('Số lượng phải lớn hơn 0');
            return;
        }

        addProductToCart(productSelect, quantity);

        // Reset form
        productSelect.value = '';
        quantityInput.value = '1';
        productSelect.focus();
    });
}

/**
 * Add product to cart
 */
function addProductToCart(selectElement, quantity) {
    const selectedOption = selectElement.options[selectElement.selectedIndex];

    const productData = {
        id: selectedOption.value,
        name: selectedOption.dataset.productName,
        price: parseInt(selectedOption.dataset.price),
        quantity: quantity,
        categoryId: selectedOption.dataset.categoryId,
        image: selectedOption.dataset.image
    };

    // Check if product already exists
    const existingProduct = selectedProducts.find(p => p.id === productData.id);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        selectedProducts.push(productData);
    }

    updateSelectedProductsDisplay();
}

/**
 * Remove product from cart
 */
function removeProductFromCart(productId) {
    selectedProducts = selectedProducts.filter(p => p.id !== productId);
    updateSelectedProductsDisplay();
}

/**
 * Update quantity for a product
 */
function updateProductQuantity(productId, newQuantity) {
    const product = selectedProducts.find(p => p.id === productId);
    if (product) {
        newQuantity = parseInt(newQuantity) || 0;
        if (newQuantity <= 0) {
            removeProductFromCart(productId);
        } else {
            product.quantity = newQuantity;
            updateSelectedProductsDisplay();
        }
    }
}

/**
 * Display selected products in cart
 */
function updateSelectedProductsDisplay() {
    const container = document.getElementById('selected-products');
    const totalPriceElement = document.getElementById('total-price');

    if (selectedProducts.length === 0) {
        container.innerHTML = '<p class="text-muted text-center">Chưa chọn sản phẩm nào</p>';
        totalPriceElement.textContent = '0đ';
        return;
    }

    let totalPrice = 0;
    let html = '<div class="table-responsive"><table class="table table-sm mb-0">';
    html += '<thead><tr><th>Sản Phẩm</th><th>Giá</th><th>Số Lượng</th><th>Thành Tiền</th><th></th></tr></thead><tbody>';

    selectedProducts.forEach(product => {
        const subtotal = product.price * product.quantity;
        totalPrice += subtotal;

        html += `
            <tr>
                <td>${product.name}</td>
                <td>${formatPrice(product.price)}</td>
                <td>
                    <input type="number" class="form-control form-control-sm" style="width: 70px;" 
                           value="${product.quantity}" min="1"
                           onchange="updateProductQuantity('${product.id}', this.value)">
                </td>
                <td>${formatPrice(subtotal)}</td>
                <td>
                    <button type="button" class="btn btn-sm btn-danger"
                            onclick="removeProductFromCart('${product.id}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    html += '</tbody></table></div>';
    container.innerHTML = html;
    totalPriceElement.textContent = formatPrice(totalPrice);
}

/**
 * Format price with Vietnamese Dong
 */
function formatPrice(price) {
    return price.toLocaleString('vi-VN') + 'đ';
}

/**
 * Setup order form submission
 */
function setupOrderFormSubmit() {
    const form = document.getElementById('order-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validation
        if (selectedProducts.length === 0) {
            alert('Vui lòng chọn ít nhất một sản phẩm');
            return;
        }

        const formData = collectFormData();
        submitOrder(formData);
    });
}

/**
 * Collect form data
 */
function collectFormData() {
    const form = document.getElementById('order-form');

    return {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        deliveryDate: document.getElementById('delivery-date').value,
        deliveryTime: document.getElementById('delivery-time').value || 'Không chỉ định',
        products: selectedProducts,
        message: document.getElementById('message').value,
        totalPrice: selectedProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0),
        timestamp: new Date().toISOString()
    };
}

/**
 * Submit order - Email only (no paid notification methods)
 */
function submitOrder(formData) {
    const form = document.getElementById('order-form');
    const submitBtn = document.getElementById('submit-order-btn');
    const loadingDiv = form.querySelector('.loading');
    const errorDiv = form.querySelector('.error-message');
    const successDiv = form.querySelector('.sent-message');

    // Show loading
    loadingDiv.style.display = 'block';
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';
    submitBtn.disabled = true;

    // Send order data via email and webhook
    const promises = [
        sendEmailNotification(formData),
        sendWebhookNotification(formData)
    ];

    // Wait for all notifications to be sent
    Promise.all(promises)
        .then(results => {
            // Log all results
            console.log('Order submission results:', results);

            // Show success message
            loadingDiv.style.display = 'none';
            successDiv.style.display = 'block';

            // Reset form
            setTimeout(() => {
                form.reset();
                selectedProducts = [];
                updateSelectedProductsDisplay();
                setDefaultDeliveryDate();
                submitBtn.disabled = false;
            }, 3000);
        })
        .catch(error => {
            console.error('Order submission error:', error);
            loadingDiv.style.display = 'none';
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = `<p>Lỗi: ${error.message}</p>`;
            submitBtn.disabled = false;
        });
}

/**
 * Send email notification
 */
async function sendEmailNotification(formData) {
    try {
        const response = await fetch('forms/send-order-email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`Email notification failed: ${response.statusText}`);
        }

        return {
            method: 'email',
            status: 'success',
            message: 'Email xác nhận đã gửi'
        };
    } catch (error) {
        console.warn('Email notification failed:', error);
        return {
            method: 'email',
            status: 'failed',
            message: error.message
        };
    }
}

/**
 * Send webhook notification to backend/external service
 */
async function sendWebhookNotification(formData) {
    try {
        // Gửi đến backend PHP để xử lý
        const response = await fetch('forms/process-order.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...formData,
                action: 'save_order'
            })
        });

        if (!response.ok) {
            throw new Error(`Webhook failed: ${response.statusText}`);
        }

        const data = await response.json();
        return {
            method: 'webhook',
            status: 'success',
            orderId: data.orderId,
            message: 'Đơn hàng đã được lưu'
        };
    } catch (error) {
        console.warn('Webhook notification failed:', error);
        return {
            method: 'webhook',
            status: 'failed',
            message: error.message
        };
    }
}


/**
 * Helper: Format price display
 */
function formatPriceDisplay(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}
