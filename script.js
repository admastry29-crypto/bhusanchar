const STORAGE_KEYS = {
  products: 'bhuSancharProducts',
  contactForms: 'bhuSancharContactForms',
  partnerApplications: 'bhuSancharPartnerApplications',
  farmerCards: 'bhuSancharFarmerCards',
  adminNotes: 'bhuSancharAdminNotes'
};

const defaultProducts = [
  {
    id: 'nkp-001',
    name: 'Balanced NPK Fertilizer',
    category: 'Fertilizers',
    description: 'Balanced crop nutrition for wheat, rice and maize across high-demand seasons.',
    suitableCrops: 'Wheat, rice, maize',
    packaging: '25 kg, 50 kg',
    price: 880,
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'bio-002',
    name: 'Soil Booster Bio Mix',
    category: 'Bio-Fertilizers',
    description: 'Improves soil microbial activity and supports sustainable field productivity.',
    suitableCrops: 'Vegetables, fruits',
    packaging: '5 kg, 10 kg',
    price: 620,
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'org-003',
    name: 'Organic Compost Granules',
    category: 'Organic Fertilizers',
    description: 'Organic matter support designed to improve soil texture and moisture retention.',
    suitableCrops: 'All crop types',
    packaging: '20 kg',
    price: 540,
    image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'mic-004',
    name: 'Micronutrient Plus',
    category: 'Micronutrients',
    description: 'Corrects zinc, boron and iron deficiencies common in regional crop systems.',
    suitableCrops: 'Paddy, pulses',
    packaging: '1 kg',
    price: 290,
    image: 'https://images.unsplash.com/photo-1464226184884-fa52ac9fcf6b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'soil-005',
    name: 'Soil Conditioning Mix',
    category: 'Soil Conditioners',
    description: 'Support for drainage, root growth and better retention of nutrients in the soil.',
    suitableCrops: 'Cotton, maize',
    packaging: '15 kg',
    price: 440,
    image: 'https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'bio-stim-006',
    name: 'Crop Vitality Booster',
    category: 'Bio-Stimulants',
    description: 'Applied to improve stress tolerance and crop vitality across critical growth stages.',
    suitableCrops: 'Fruits, vegetables',
    packaging: '1 litre',
    price: 360,
    image: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'nut-007',
    name: 'Plant Nutrition Sachet',
    category: 'Plant Nutrition Products',
    description: 'Fast-acting nutrition for targeted crop feeding and balanced field nutrition.',
    suitableCrops: 'Vegetables, flowers',
    packaging: '500 g',
    price: 210,
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'other-008',
    name: 'Field Protection Kit',
    category: 'Other Agricultural Inputs',
    description: 'Essential support items for field monitoring, crop health and farm planning.',
    suitableCrops: 'All crop types',
    packaging: 'Set',
    price: 980,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80'
  }
];

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
});

function seedStorage() {
  Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
    if (storageKey === STORAGE_KEYS.products && !localStorage.getItem(storageKey)) {
      localStorage.setItem(storageKey, JSON.stringify(defaultProducts));
    }

    if (storageKey !== STORAGE_KEYS.products && !localStorage.getItem(storageKey)) {
      localStorage.setItem(storageKey, JSON.stringify([]));
    }
  });
}

function getStoredProducts() {
  const raw = localStorage.getItem(STORAGE_KEYS.products);
  return raw ? JSON.parse(raw) : defaultProducts;
}

function showToast(message, type = 'success') {
  let toast = document.getElementById('toastBox');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastBox';
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.right = '24px';
    toast.style.zIndex = '9999';
    toast.style.minWidth = '240px';
    document.body.appendChild(toast);
  }

  const alertBox = document.createElement('div');
  alertBox.className = `alert ${type === 'success' ? 'alert-success' : 'alert-danger'} mb-2`;
  alertBox.innerHTML = `<strong>${type === 'success' ? 'Success' : 'Notice'}:</strong> ${message}`;
  toast.appendChild(alertBox);

  setTimeout(() => {
    alertBox.remove();
  }, 2800);
}

function setYear() {
  const yearNodes = document.querySelectorAll('#year');
  yearNodes.forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
}

function bindNavigationState() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((link) => {
    const target = link.getAttribute('href');
    if (target === currentPage) {
      link.classList.add('active');
    }
  });
}

function renderProductsGrid() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  const products = getStoredProducts();
  const search = document.getElementById('productSearch');
  const filter = document.getElementById('categoryFilter');
  const query = (search?.value || '').toLowerCase();
  const selectedCategory = filter?.value || 'All';

  const filtered = products.filter((product) => {
    const matchesSearch = !query || [product.name, product.category, product.description, product.suitableCrops].join(' ').toLowerCase().includes(query);
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!filtered.length) {
    grid.innerHTML = '<div class="col-12"><div class="alert alert-light border">No products match your search.</div></div>';
    return;
  }

  const categories = ['All', ...new Set(products.map((product) => product.category))];
  if (filter && filter.options.length === 1) {
    categories.forEach((category) => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      filter.appendChild(option);
    });
  }

  grid.innerHTML = filtered.map((product) => `
    <div class="col-md-6 col-lg-4">
      <div class="card-modern">
        <img src="${product.image}" class="img-fluid rounded-3 mb-3" alt="${product.name}" style="height: 220px; object-fit: cover; width: 100%;" />
        <span class="badge-level">${product.category}</span>
        <h4 class="mt-3">${product.name}</h4>
        <p class="text-muted">${product.description}</p>
        <ul class="list-unstyled small text-muted">
          <li><strong>Suitable crops:</strong> ${product.suitableCrops}</li>
          <li><strong>Packaging:</strong> ${product.packaging}</li>
          <li><strong>Price:</strong> ${currencyFormatter.format(product.price)}</li>
        </ul>
        <div class="d-flex gap-2 mt-3">
          <button class="btn btn-primary-custom btn-sm" data-product="${product.name}">Enquire</button>
          <a href="contact.html?product=${encodeURIComponent(product.name)}" class="btn btn-outline-custom btn-sm">Find Nearby</a>
        </div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('[data-product]').forEach((button) => {
    button.addEventListener('click', () => {
      const productName = button.getAttribute('data-product');
      const form = document.querySelector('form[data-form-type="contact"]');
      if (form) {
        const productField = form.querySelector('input[name="productName"]');
        if (productField) productField.value = productName;
      }
      window.location.href = `contact.html?product=${encodeURIComponent(productName)}`;
    });
  });
}

function renderHomeProducts() {
  const container = document.getElementById('featuredProducts');
  if (!container) return;

  const products = getStoredProducts().slice(0, 4);
  container.innerHTML = products.map((product) => `
    <div class="col-md-6 col-lg-3">
      <div class="card-modern h-100">
        <img src="${product.image}" alt="${product.name}" class="img-fluid rounded-3 mb-3" style="height: 180px; object-fit: cover; width: 100%;" />
        <span class="badge-level">${product.category}</span>
        <h5 class="mt-3">${product.name}</h5>
        <p class="text-muted small mb-0">${currencyFormatter.format(product.price)}</p>
      </div>
    </div>
  `).join('');
}

function attachFormHandlers() {
  document.querySelectorAll('form[data-form-type]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const type = form.getAttribute('data-form-type');
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      payload.id = `${type}-${Date.now()}`;
      payload.createdAt = new Date().toISOString();
      payload.status = 'new';

      const storageKey = {
        contact: STORAGE_KEYS.contactForms,
        partner: STORAGE_KEYS.partnerApplications,
        'farmer-card': STORAGE_KEYS.farmerCards
      }[type];

      if (!storageKey) return;

      const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
      existing.unshift(payload);
      localStorage.setItem(storageKey, JSON.stringify(existing));
      form.reset();
      showToast(`${type === 'contact' ? 'Contact message' : type === 'partner' ? 'Partner application' : 'Farmer Help Card request'} submitted successfully.`);

      if (window.location.pathname.endsWith('admin.html')) {
        renderAdminDashboard();
      }
    });
  });
}

function renderAdminDashboard() {
  const adminRoot = document.getElementById('adminDashboard');
  if (!adminRoot) return;

  const contactForms = JSON.parse(localStorage.getItem(STORAGE_KEYS.contactForms) || '[]');
  const partnerApplications = JSON.parse(localStorage.getItem(STORAGE_KEYS.partnerApplications) || '[]');
  const farmerCards = JSON.parse(localStorage.getItem(STORAGE_KEYS.farmerCards) || '[]');
  const products = getStoredProducts();

  const total = contactForms.length + partnerApplications.length + farmerCards.length;
  adminRoot.innerHTML = `
    <div class="row g-4">
      <div class="col-md-3"><div class="metric-box"><span class="metric">${products.length}</span><p class="mb-0">Products</p></div></div>
      <div class="col-md-3"><div class="metric-box"><span class="metric">${contactForms.length}</span><p class="mb-0">Contacts</p></div></div>
      <div class="col-md-3"><div class="metric-box"><span class="metric">${partnerApplications.length}</span><p class="mb-0">Partners</p></div></div>
      <div class="col-md-3"><div class="metric-box"><span class="metric">${farmerCards.length}</span><p class="mb-0">Farmer cards</p></div></div>
    </div>
    <div class="mt-5">
      <h4 class="mb-3">Recent submissions</h4>
      <div class="table-responsive">
        <table class="table table-striped align-middle">
          <thead>
            <tr>
              <th>Type</th>
              <th>Submitted By</th>
              <th>Primary Detail</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${[
              ...contactForms.map((entry) => ({
                type: 'Contact',
                person: entry.name || 'Unnamed',
                detail: entry.inquiryType || entry.email || 'General enquiry',
                status: entry.status || 'new'
              })),
              ...partnerApplications.map((entry) => ({
                type: 'Partner',
                person: entry.applicantName || entry.businessName || 'Unnamed',
                detail: entry.businessName || entry.email || 'Partner request',
                status: entry.status || 'new'
              })),
              ...farmerCards.map((entry) => ({
                type: 'Farmer Card',
                person: entry.fullName || 'Unnamed',
                detail: entry.mobile || entry.state || 'No mobile available',
                status: entry.status || 'new'
              }))
            ].slice(0, 8).map((row) => `
              <tr>
                <td>${row.type}</td>
                <td>${row.person}</td>
                <td>${row.detail}</td>
                <td><span class="badge-level">${row.status}</span></td>
              </tr>
            `).join('') || '<tr><td colspan="4">No submissions yet.</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function initializeProductSearch() {
  const searchInput = document.getElementById('productSearch');
  const filterSelect = document.getElementById('categoryFilter');
  if (searchInput) searchInput.addEventListener('input', renderProductsGrid);
  if (filterSelect) filterSelect.addEventListener('change', renderProductsGrid);
}

function initializeContactPrefill() {
  const params = new URLSearchParams(window.location.search);
  const productName = params.get('product');
  if (!productName) return;

  const productField = document.querySelector('input[name="productName"]');
  if (productField) productField.value = productName;
}

document.addEventListener('DOMContentLoaded', function () {
  seedStorage();
  setYear();
  bindNavigationState();
  renderHomeProducts();
  renderProductsGrid();
  initializeProductSearch();
  initializeContactPrefill();
  attachFormHandlers();
  renderAdminDashboard();
});
