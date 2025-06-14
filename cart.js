// Cart functionality
class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("cart")) || []
    this.updateCartCount()
  }

  addItem(product, quantity = 1, size = null, color = null) {
    const existingItemIndex = this.items.findIndex(
      (item) => item.id === product.id && item.size === size && item.color === color,
    )

    if (existingItemIndex > -1) {
      this.items[existingItemIndex].quantity += quantity
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        size: size,
        color: color,
      })
    }

    this.saveCart()
    this.updateCartCount()
    this.showAddedMessage(product.name)
  }

  removeItem(productId, size = null, color = null) {
    this.items = this.items.filter((item) => !(item.id === productId && item.size === size && item.color === color))
    this.saveCart()
    this.updateCartCount()
  }

  updateQuantity(productId, quantity, size = null, color = null) {
    const item = this.items.find((item) => item.id === productId && item.size === size && item.color === color)

    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId, size, color)
      } else {
        item.quantity = quantity
        this.saveCart()
        this.updateCartCount()
      }
    }
  }

  getTotal() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0)
  }

  clear() {
    this.items = []
    this.saveCart()
    this.updateCartCount()
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.items))
  }

  updateCartCount() {
    const cartCountElements = document.querySelectorAll(".cart-count")
    const count = this.getItemCount()

    cartCountElements.forEach((element) => {
      element.textContent = count
      element.style.display = count > 0 ? "flex" : "none"
    })
  }

  showAddedMessage(productName) {
    const message = document.createElement("div")
    message.className = "success-message"
    message.textContent = `${productName} added to cart!`
    message.style.position = "fixed"
    message.style.top = "100px"
    message.style.right = "20px"
    message.style.zIndex = "9999"
    message.style.padding = "15px 20px"
    message.style.borderRadius = "4px"
    message.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)"

    document.body.appendChild(message)

    // Animate in with GSAP if available, otherwise use CSS
    if (window.gsap) {
      window.gsap.fromTo(message, { opacity: 0, x: 100 }, { opacity: 1, x: 0, duration: 0.3 })
    } else {
      message.style.opacity = "0"
      message.style.transform = "translateX(100px)"
      message.style.transition = "all 0.3s ease"
      setTimeout(() => {
        message.style.opacity = "1"
        message.style.transform = "translateX(0)"
      }, 10)
    }

    // Remove after 3 seconds
    setTimeout(() => {
      if (window.gsap) {
        window.gsap.to(message, {
          opacity: 0,
          x: 100,
          duration: 0.3,
          onComplete: () => message.remove(),
        })
      } else {
        message.style.opacity = "0"
        message.style.transform = "translateX(100px)"
        setTimeout(() => message.remove(), 300)
      }
    }, 3000)
  }
}

// Initialize cart
const cart = new Cart()

// Export for use in other files
window.cart = cart
