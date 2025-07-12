let order = [];

function addToOrder(cakeName, price) {
  const existingItem = order.find(item => item.name === cakeName);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    order.push({ name: cakeName, price, quantity: 1 });
  }

  updateOrderList();
   updateCartCount();
}

function removeItem(cakeName) {
  order = order.filter(item => item.name !== cakeName);
  updateOrderList();
}

function changeQuantity(cakeName, change) {
  const item = order.find(item => item.name === cakeName);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) {
    removeItem(cakeName);
  } else {
    updateOrderList();
     updateCartCount();
  }
}

function updateOrderList() {
  const orderList = document.getElementById("orderList");
  orderList.innerHTML = "";

  let total = 0;

  order.forEach(item => {
    const li = document.createElement("li");
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    li.innerHTML = `
      <span><strong>${item.name}</strong> (RM${item.price} x ${item.quantity})</span>
      <div class="quantity-controls">
        <button onclick="changeQuantity('${item.name}', -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="changeQuantity('${item.name}', 1)">+</button>
        <button class="remove-btn" onclick="removeItem('${item.name}')">Remove</button>
      </div>
    `;
    orderList.appendChild(li);
  });

  const deliverySubtotal = document.getElementById("deliverySubtotal");
if (deliverySubtotal) {
  deliverySubtotal.textContent = `Subtotal RM${total.toFixed(2)} MYR`;
}

  const paymentBtnContainer = document.getElementById("paymentBtnContainer");
  if (order.length > 0) {
    paymentBtnContainer.style.display = "block";
  } else {
    paymentBtnContainer.style.display = "none";
  }
}

function proceedToPayment() {
  Swal.fire({
    title: 'Proceed to Payment?',
    text: "Are you sure you want to continue?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#28a745',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, proceed!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      // Save the order to localStorage
      localStorage.setItem("orderData", JSON.stringify(order));

      // Redirect to your payment page
      window.location.href = "payment.html";
    }
  });
}
// ✅ SEARCH FUNCTIONALITY
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById('searchInput');

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const searchTerm = this.value.toLowerCase();

      document.querySelectorAll('.cake-item').forEach(item => {
        const name = item.textContent.toLowerCase();
        item.style.display = name.includes(searchTerm) ? 'block' : 'none';
      });
    });
  }
});
// 🔍 Search & Filter
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearch');

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const searchTerm = this.value.toLowerCase();

      document.querySelectorAll('.cake-item').forEach(item => {
        const name = item.textContent.toLowerCase();
        if (name.includes(searchTerm)) {
          item.style.display = 'block';
          item.classList.add('fade-in');
        } else {
          item.style.display = 'none';
        }
      });

      // Show clear button if text exists
      clearBtn.style.display = this.value ? 'block' : 'none';
    });

    // ❌ Clear search button
    clearBtn.addEventListener('click', function () {
      searchInput.value = '';
      clearBtn.style.display = 'none';

      document.querySelectorAll('.cake-item').forEach(item => {
        item.style.display = 'block';
      });
    });
  }
});
// 🍰 Handle filter tab clicks
document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const menuSections = document.querySelectorAll(".menu-section");
  const allTitles = document.querySelectorAll(".menu-title");
  const allLists = document.querySelectorAll(".cake-list");

  tabButtons.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      // Step 1: Remove active class from all buttons
      tabButtons.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");

      const selectedCategory = this.dataset.category;

      // Step 2: Hide all sections
      allTitles.forEach(title => title.style.display = "none");
      allLists.forEach(list => list.style.display = "none");

      // Step 3: Show only matching category section
      const matchingSections = document.querySelectorAll(
        `.menu-section[data-category="${selectedCategory}"]`
      );

      matchingSections.forEach((section, i) => {
        section.style.display = "block";
        // Show the <h2> and <ul> after the section
        const title = allTitles[index];
        const list = allLists[index];
        if (title && list) {
          title.style.display = "block";
          list.style.display = "grid";
        }
      });
    });
  });
});
function updateCartCount() {
  const totalItems = order.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    cartCount.textContent = totalItems;
  }
}


