// Category tabs
document.querySelectorAll('.order-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.order-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.menu-category').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('cat-' + tab.dataset.category).classList.add('active');
  });
});

// Order state
const order = {};

function updateSummary() {
  const box = document.getElementById('order-items-box');
  const keys = Object.keys(order).filter(k => order[k].qty > 0);

  if (keys.length === 0) {
    box.innerHTML = '<p class="summary-empty">No items selected yet</p>';
    document.getElementById('order-total').textContent = '0.00';
    return;
  }

  let total = 0;
  box.innerHTML = keys.map(name => {
    const { qty, price } = order[name];
    total += qty * price;
    return `
      <div class="summary-row">
        <span class="summary-item-name">${name}</span>
        <div class="summary-qty-controls">
          <button class="qty-btn" onclick="changeQty('${name}', -1)">−</button>
          <span class="qty-count">x${qty}</span>
          <button class="qty-btn" onclick="changeQty('${name}', 1)">+</button>
        </div>
        <span class="summary-item-price">$${(qty * price).toFixed(2)}</span>
      </div>`;
  }).join('');

  document.getElementById('order-total').textContent = total.toFixed(2);
}

function changeQty(name, delta) {
  if (!order[name]) return;
  order[name].qty = Math.max(0, order[name].qty + delta);
  updateSummary();
}

// Add items on click
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', () => {
    const name = item.dataset.name;
    const price = parseFloat(item.dataset.price);
    if (!order[name]) order[name] = { qty: 0, price };
    order[name].qty++;
    updateSummary();
    item.classList.add('added');
    setTimeout(() => item.classList.remove('added'), 300);
  });
});