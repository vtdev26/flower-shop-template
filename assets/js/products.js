/**
 * Products Menu Loader
 * Load product data from JSON and dynamically render menus + dropdown
 */

let productsData = {};

// Load products data when document is ready
document.addEventListener('DOMContentLoaded', function () {
    loadProductsData();
    // setupProductDropdown() và populateOrchidTypeDropdown() sẽ được gọi tự động trong loadProductsData()
});

/**
 * Setup product dropdown with category filter
 * Dropdown 1: Select category
 * Dropdown 2: Select product from chosen category
 */
function setupProductDropdown() {
    const productSelect = document.getElementById('product-select');
    const orchidTypeSelect = document.getElementById('orchid-type');

    if (!productSelect) {
        console.warn('Product select element not found');
        return;
    }

    if (!orchidTypeSelect) {
        console.warn('Orchid type select element not found');
        return;
    }

    // Add change event listener to category dropdown
    orchidTypeSelect.addEventListener('change', function () {
        updateProductDropdown(this.value);
    });

    // Initialize with first category if available
    if (productsData.categories && productsData.categories.length > 0) {
        updateProductDropdown(productsData.categories[0].id);
    }
}

/**
 * Update product dropdown based on selected category
 */
function updateProductDropdown(categoryId) {
    const productSelect = document.getElementById('product-select');

    if (!productSelect || !productsData.categories) {
        return;
    }

    // Clear existing options
    productSelect.innerHTML = '<option value="">-- Chọn sản phẩm --</option>';

    // Find selected category
    const selectedCategory = productsData.categories.find(cat => cat.id === categoryId);

    if (!selectedCategory || !selectedCategory.products) {
        return;
    }

    // Populate dropdown with products from selected category
    selectedCategory.products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.dataset.categoryId = selectedCategory.id;
        option.dataset.productName = product.name;
        option.dataset.price = extractPrice(product.price);
        option.dataset.image = product.image;
        option.textContent = `${product.name} - ${product.price}`;
        productSelect.appendChild(option);
    });
}

async function loadProductsData() {
    await fetch('assets/data/products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load products data');
            }
            return response.json();
        })
        .then(data => {
            productsData = data;
            renderProductMenu();
            setupProductDropdown();
            populateOrchidTypeDropdown(); // Populate dropdown
            initGlightbox(); // Reinitialize glightbox for new images
        })
        .catch(error => {
            console.error('Error loading products:', error);
            // Fallback: keep static content if JSON fails
        });
}

/**
 * Extract numeric price from string (e.g., "399.000đ" -> 399000)
 */
function extractPrice(priceString) {
    const cleanPrice = priceString.replace(/[^\d]/g, '');
    return parseInt(cleanPrice, 10) || 0;
}

/**
 * Populate orchid type dropdown from products data
 */
function populateOrchidTypeDropdown() {
    if (!productsData.categories || productsData.categories.length === 0) {
        console.warn('No categories found in products data');
        return;
    }

    const orchidTypeSelect = document.getElementById('orchid-type');

    if (!orchidTypeSelect) {
        return; // Element doesn't exist on this page
    }

    // Remove old options except the first one (placeholder)
    while (orchidTypeSelect.options.length > 1) {
        orchidTypeSelect.remove(1);
    }

    // Add new options from JSON data
    productsData.categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        orchidTypeSelect.appendChild(option);
    });
}

/**
 * Render menu tabs and content from JSON data
 */
function renderProductMenu() {
    if (!productsData.categories || productsData.categories.length === 0) {
        return;
    }

    const menuTabs = document.querySelector('.menu-tabs');
    const tabContent = document.querySelector('.tab-content');

    if (!menuTabs || !tabContent) {
        return;
    }

    // Clear existing content
    menuTabs.innerHTML = '';
    tabContent.innerHTML = '';

    // Render tabs and content
    productsData.categories.forEach((category, index) => {
        // Create tab button
        const tabButton = createTabButton(category, index === 0);
        menuTabs.appendChild(tabButton);

        // Create tab content
        const tabPane = createTabPane(category, index === 0);
        tabContent.appendChild(tabPane);
    });
}

/**
 * Create a tab button element
 */
function createTabButton(category, isActive) {
    const li = document.createElement('li');
    li.className = 'nav-item';

    const a = document.createElement('a');
    a.className = `nav-link ${isActive ? 'active show' : ''}`;
    a.setAttribute('data-bs-toggle', 'tab');
    a.setAttribute('data-bs-target', `#${category.tab}`);
    a.href = '#';

    const h4 = document.createElement('h4');
    h4.textContent = category.name;

    a.appendChild(h4);
    li.appendChild(a);

    return li;
}

/**
 * Create a tab pane with products
 */
function createTabPane(category, isActive) {
    const tabPane = document.createElement('div');
    tabPane.className = `tab-pane fade ${isActive ? 'active show' : ''}`;
    tabPane.id = category.tab;

    // Create header
    const tabHeader = document.createElement('div');
    tabHeader.className = 'tab-header text-center';

    const p = document.createElement('p');
    p.textContent = 'Danh Mục';

    const h3 = document.createElement('h3');
    h3.textContent = category.name;

    tabHeader.appendChild(p);
    tabHeader.appendChild(h3);

    // Create products row
    const row = document.createElement('div');
    row.className = 'row gy-5';

    // Add products
    category.products.forEach(product => {
        const productItem = createProductItem(product);
        row.appendChild(productItem);
    });

    tabPane.appendChild(tabHeader);
    tabPane.appendChild(row);

    return tabPane;
}

/**
 * Create a product item element
 */
function createProductItem(product) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 menu-item';

    const imagePath = `assets/img/menu/${product.image}`;

    // Create image link
    const imgLink = document.createElement('a');
    imgLink.href = imagePath;
    imgLink.className = 'glightbox';
    imgLink.setAttribute('data-gallery', 'menu-gallery');

    const img = document.createElement('img');
    img.src = imagePath;
    img.className = 'menu-img img-fluid';
    img.alt = product.name;

    imgLink.appendChild(img);

    // Create title
    const h4 = document.createElement('h4');
    h4.textContent = product.name;

    // Create description
    const ingredients = document.createElement('p');
    ingredients.className = 'ingredients';
    ingredients.textContent = product.description;

    // Create price
    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = product.price;

    // Assemble product item
    col.appendChild(imgLink);
    col.appendChild(h4);
    col.appendChild(ingredients);
    col.appendChild(price);

    return col;
}

/**
 * Reinitialize Glightbox for newly added images
 */
function initGlightbox() {
    if (typeof GLightbox !== 'undefined') {
        const glb = GLightbox({
            selector: '.glightbox'
        });
    }
}

/**
 * Alternative: Load products from CSV/Text format
 * Example: loadProductsFromText(csvContent)
 */
function loadProductsFromText(textData) {
    // Parse text data and convert to JSON format
    // This is an example implementation
    try {
        const lines = textData.trim().split('\n');
        const data = { categories: [] };

        // Parse CSV or text format here
        // Convert to products.json format

        productsData = data;
        renderProductMenu();
        populateOrchidTypeDropdown();
    } catch (error) {
        console.error('Error parsing text data:', error);
    }
}

/**
 * Alternative: Load products from Excel-like data
 * Would need to parse Excel file (requires library like xlsx)
 */
function loadProductsFromExcel(file) {
    // This would require adding xlsx library
    // Implementation would go here
    console.log('Excel import not yet configured. Add XLSX library to enable.');
}

/**
 * Get product details by category and product ID
 * Useful for form handling
 */
function getProductsByCategory(categoryId) {
    if (!productsData.categories) {
        return [];
    }

    const category = productsData.categories.find(cat => cat.id === categoryId);
    return category ? category.products : [];
}

/**
 * Get category details by ID
 */
function getCategoryById(categoryId) {
    if (!productsData.categories) {
        return null;
    }

    return productsData.categories.find(cat => cat.id === categoryId);
}
