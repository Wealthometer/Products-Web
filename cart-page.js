document.addEventListener("DOMContentLoaded", () => {
  loadCartPage()
})

function loadCartPage() {
  const cartItems = document.getElementById("cart-items")
  const cartSubtotal = document.getElementById("cart-subtotal")
  const cartShipping = document.getElementById("cart-shipping")
  const cartTax = document.getElementById("cart-tax")
  const cartTotal = document.getElementById("cart-total")

  if (!cartItems) return

  const cart = JSON.parse(localStorage.getItem("cart")) || []
  console.log("Cart items loaded:", cart) // Debug log

  if (cart.length === 0) {
    cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Add some products to get started!</p>
                <a href="products.html" class="btn btn-primary">Shop Now</a>
            </div>
        `
    return
  }

  // Render cart items
  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item" data-id="${item.id}" data-size="${item.size || ""}" data-color="${item.color || ""}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>${item.size ? `Size: ${item.size}` : ""} ${item.color ? `Color: ${item.color}` : ""}</p>
            </div>
            <div class="cart-item-price">${formatPrice(item.price)}</div>
            <div class="cart-item-quantity">
                <div class="quantity-controls">
                    <button class="quantity-btn decrease-qty" data-id="${item.id}" data-size="${item.size || ""}" data-color="${item.color || ""}">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="10" 
                           data-id="${item.id}" data-size="${item.size || ""}" data-color="${item.color || ""}">
                    <button class="quantity-btn increase-qty" data-id="${item.id}" data-size="${item.size || ""}" data-color="${item.color || ""}">+</button>
                </div>
            </div>
            <button class="cart-item-remove" data-id="${item.id}" data-size="${item.size || ""}" data-color="${item.color || ""}">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `,
    )
    .join("")

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 5000 ? 0 : 50 // Free shipping over $5000
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  // Update totals
  if (cartSubtotal) cartSubtotal.textContent = formatPrice(subtotal)
  if (cartShipping) cartShipping.textContent = shipping === 0 ? "Free" : formatPrice(shipping)
  if (cartTax) cartTax.textContent = formatPrice(tax)
  if (cartTotal) cartTotal.textContent = formatPrice(total)

  // Add event listeners
  addCartEventListeners()
}

function addCartEventListeners() {
  // Quantity controls
  document.querySelectorAll(".decrease-qty").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = Number.parseInt(e.target.dataset.id)
      const size = e.target.dataset.size || null
      const color = e.target.dataset.color || null
      const input = e.target.nextElementSibling
      const currentValue = Number.parseInt(input.value)

      if (currentValue > 1) {
        input.value = currentValue - 1
        updateCartQuantity(id, currentValue - 1, size, color)
      }
    })
  })

  document.querySelectorAll(".increase-qty").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = Number.parseInt(e.target.dataset.id)
      const size = e.target.dataset.size || null
      const color = e.target.dataset.color || null
      const input = e.target.previousElementSibling
      const currentValue = Number.parseInt(input.value)

      if (currentValue < 10) {
        input.value = currentValue + 1
        updateCartQuantity(id, currentValue + 1, size, color)
      }
    })
  })

  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", (e) => {
      const id = Number.parseInt(e.target.dataset.id)
      const size = e.target.dataset.size || null
      const color = e.target.dataset.color || null
      const quantity = Number.parseInt(e.target.value)

      if (quantity >= 1 && quantity <= 10) {
        updateCartQuantity(id, quantity, size, color)
      } else {
        e.target.value = 1
        updateCartQuantity(id, 1, size, color)
      }
    })
  })

  // Remove items
  document.querySelectorAll(".cart-item-remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = Number.parseInt(e.target.closest("button").dataset.id)
      const size = e.target.closest("button").dataset.size || null
      const color = e.target.closest("button").dataset.color || null

      removeCartItem(id, size, color)
    })
  })
}

function updateCartQuantity(productId, quantity, size, color) {
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  const itemIndex = cart.findIndex((item) => item.id === productId && item.size === size && item.color === color)

  if (itemIndex > -1) {
    cart[itemIndex].quantity = quantity
    localStorage.setItem("cart", JSON.stringify(cart))
    loadCartPage() // Reload the page
    updateCartCount()
  }
}

function removeCartItem(productId, size, color) {
  let cart = JSON.parse(localStorage.getItem("cart")) || []

  cart = cart.filter((item) => !(item.id === productId && item.size === size && item.color === color))

  localStorage.setItem("cart", JSON.stringify(cart))
  loadCartPage() // Reload the page
  updateCartCount()
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const cartCount = document.getElementById("cart-count")
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    cartCount.textContent = totalItems
    cartCount.style.display = totalItems > 0 ? "flex" : "none"
  }
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}
