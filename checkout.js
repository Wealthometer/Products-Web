document.addEventListener("DOMContentLoaded", () => {
  loadCheckoutPage()
  initCheckoutForm()
})

function loadCheckoutPage() {
  const checkoutItems = document.getElementById("checkout-items")
  const checkoutSubtotal = document.getElementById("checkout-subtotal")
  const checkoutShipping = document.getElementById("checkout-shipping")
  const checkoutTax = document.getElementById("checkout-tax")
  const checkoutTotal = document.getElementById("checkout-total")

  if (!checkoutItems) return

  const cart = JSON.parse(localStorage.getItem("cart")) || []
  console.log("Checkout cart items:", cart) // Debug log

  if (cart.length === 0) {
    window.location.href = "cart.html"
    return
  }

  // Render checkout items
  checkoutItems.innerHTML = cart
    .map(
      (item) => `
        <div class="checkout-item">
            <div class="checkout-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="checkout-item-info">
                <h4>${item.name}</h4>
                <p>Qty: ${item.quantity} ${item.size ? `• Size: ${item.size}` : ""} ${item.color ? `• Color: ${item.color}` : ""}</p>
            </div>
            <div class="checkout-item-price">${formatPrice(item.price * item.quantity)}</div>
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
  if (checkoutSubtotal) checkoutSubtotal.textContent = formatPrice(subtotal)
  if (checkoutShipping) checkoutShipping.textContent = shipping === 0 ? "Free" : formatPrice(shipping)
  if (checkoutTax) checkoutTax.textContent = formatPrice(tax)
  if (checkoutTotal) checkoutTotal.textContent = formatPrice(total)
}

function initCheckoutForm() {
  const checkoutForm = document.getElementById("checkout-form")
  const paymentMethods = document.querySelectorAll('input[name="payment"]')
  const cardDetails = document.getElementById("card-details")

  // Payment method toggle
  paymentMethods.forEach((method) => {
    method.addEventListener("change", (e) => {
      if (e.target.value === "card") {
        cardDetails.style.display = "block"
        // Make card fields required
        cardDetails.querySelectorAll("input").forEach((input) => {
          input.required = true
        })
      } else {
        cardDetails.style.display = "none"
        // Remove required from card fields
        cardDetails.querySelectorAll("input").forEach((input) => {
          input.required = false
        })
      }
    })
  })

  // Form validation and submission
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault()

      if (validateCheckoutForm()) {
        processOrder()
      }
    })
  }

  // Format card number input
  const cardNumberInput = document.getElementById("card-number")
  if (cardNumberInput) {
    cardNumberInput.addEventListener("input", (e) => {
      const value = e.target.value.replace(/\s/g, "").replace(/[^0-9]/gi, "")
      const formattedValue = value.match(/.{1,4}/g)?.join(" ") || value
      e.target.value = formattedValue
    })
  }

  // Format expiry date input
  const expiryInput = document.getElementById("expiry")
  if (expiryInput) {
    expiryInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "")
      if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4)
      }
      e.target.value = value
    })
  }

  // Format CVV input
  const cvvInput = document.getElementById("cvv")
  if (cvvInput) {
    cvvInput.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/\D/g, "").substring(0, 3)
    })
  }
}

function validateCheckoutForm() {
  const form = document.getElementById("checkout-form")
  const requiredFields = form.querySelectorAll("input[required]")
  let isValid = true

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      field.style.borderColor = "#e53e3e"
      isValid = false
    } else {
      field.style.borderColor = "#ddd"
    }
  })

  // Validate email
  const email = document.getElementById("email")
  if (email && email.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.value)) {
      email.style.borderColor = "#e53e3e"
      isValid = false
    }
  }

  // Validate card number if card payment is selected
  const cardPayment = document.querySelector('input[name="payment"]:checked')
  if (cardPayment && cardPayment.value === "card") {
    const cardNumber = document.getElementById("card-number")
    if (cardNumber && cardNumber.value.replace(/\s/g, "").length < 16) {
      cardNumber.style.borderColor = "#e53e3e"
      isValid = false
    }

    const expiry = document.getElementById("expiry")
    if (expiry && expiry.value.length < 5) {
      expiry.style.borderColor = "#e53e3e"
      isValid = false
    }

    const cvv = document.getElementById("cvv")
    if (cvv && cvv.value.length < 3) {
      cvv.style.borderColor = "#e53e3e"
      isValid = false
    }
  }

  if (!isValid) {
    showMessage("Please fill in all required fields correctly.", "error")
  }

  return isValid
}

function processOrder() {
  const submitButton = document.querySelector('button[type="submit"]')
  const originalText = submitButton.textContent

  // Show loading state
  submitButton.innerHTML = '<span class="loading"></span> Processing...'
  submitButton.disabled = true

  // Simulate order processing
  setTimeout(() => {
    // Clear cart
    localStorage.removeItem("cart")

    // Show success message
    showOrderSuccess()

    // Reset button
    submitButton.textContent = originalText
    submitButton.disabled = false

    // Redirect to home page after delay
    setTimeout(() => {
      window.location.href = "index.html"
    }, 3000)
  }, 2000)
}

function showOrderSuccess() {
  const successMessage = document.createElement("div")
  successMessage.className = "success-message"
  successMessage.innerHTML = `
        <h3>Order Placed Successfully!</h3>
        <p>Thank you for your purchase. You will receive a confirmation email shortly.</p>
        <p>Redirecting to homepage...</p>
    `
  successMessage.style.position = "fixed"
  successMessage.style.top = "50%"
  successMessage.style.left = "50%"
  successMessage.style.transform = "translate(-50%, -50%)"
  successMessage.style.zIndex = "9999"
  successMessage.style.padding = "30px"
  successMessage.style.borderRadius = "8px"
  successMessage.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)"
  successMessage.style.textAlign = "center"
  successMessage.style.maxWidth = "400px"

  document.body.appendChild(successMessage)

  // Update cart count
  const cartCount = document.getElementById("cart-count")
  if (cartCount) {
    cartCount.textContent = "0"
    cartCount.style.display = "none"
  }
}

function showMessage(message, type = "success") {
  const messageDiv = document.createElement("div")
  messageDiv.className = `${type}-message`
  messageDiv.textContent = message
  messageDiv.style.position = "fixed"
  messageDiv.style.top = "100px"
  messageDiv.style.right = "20px"
  messageDiv.style.zIndex = "9999"
  messageDiv.style.padding = "15px 20px"
  messageDiv.style.borderRadius = "4px"
  messageDiv.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)"

  document.body.appendChild(messageDiv)

  setTimeout(() => {
    messageDiv.remove()
  }, 3000)
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}
