document.addEventListener("DOMContentLoaded", () => {
  initProductDetail()
})

function initProductDetail() {
  const urlParams = new URLSearchParams(window.location.search)
  const productId = Number.parseInt(urlParams.get("id"))

  console.log("Product ID from URL:", productId) // Debug log

  if (!productId) {
    console.log("No product ID found, redirecting to products page")
    window.location.href = "products.html"
    return
  }

  // Wait for products to be available or load them directly
  if (!window.products) {
    console.log("Products not loaded yet, waiting...")
    // If products aren't loaded, try to load them from the products.js file
    // or wait a bit more
    setTimeout(initProductDetail, 200)
    return
  }

  console.log("Available products:", window.products.length)
  const product = window.products.find((p) => p.id === productId)

  if (!product) {
    console.log("Product not found with ID:", productId)
    window.location.href = "products.html"
    return
  }

  console.log("Found product:", product.name)
  renderProductDetail(product)
  loadRelatedProducts(product)
  initProductInteractions()
}

function renderProductDetail(product) {
  const breadcrumb = document.getElementById("breadcrumb-product")
  const productDetailContent = document.getElementById("product-detail-content")

  if (breadcrumb) {
    breadcrumb.textContent = product.name
  }

  if (productDetailContent) {
    productDetailContent.innerHTML = `
            <div class="product-gallery">
                <div class="main-image">
                    <img src="${product.images[0]}" alt="${product.name}" id="main-product-image">
                </div>
                <div class="thumbnail-images">
                    ${product.images
                      .map(
                        (image, index) => `
                        <div class="thumbnail ${index === 0 ? "active" : ""}" data-image="${image}">
                            <img src="${image}" alt="${product.name}">
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            </div>
            <div class="product-info-detail">
                <h1 class="product-title">${product.name}</h1>
                <p class="product-price-detail">${formatPrice(product.price)}</p>
                <p class="product-description">${product.description}</p>
                
                <div class="product-options">
                    ${
                      product.colors && product.colors.length > 1
                        ? `
                        <div class="option-group">
                            <label class="option-label">Color:</label>
                            <div class="color-options">
                                ${product.colors
                                  .map(
                                    (color, index) => `
                                    <div class="color-option ${index === 0 ? "active" : ""}" 
                                         data-color="${color}" 
                                         style="background-color: ${getColorCode(color)}"
                                         title="${color}">
                                    </div>
                                `,
                                  )
                                  .join("")}
                            </div>
                        </div>
                    `
                        : ""
                    }
                    
                    ${
                      product.sizes && product.sizes.length > 1
                        ? `
                        <div class="option-group">
                            <label class="option-label">Size:</label>
                            <div class="size-options">
                                ${product.sizes
                                  .map(
                                    (size, index) => `
                                    <div class="size-option ${index === 0 ? "active" : ""}" data-size="${size}">
                                        ${size}
                                    </div>
                                `,
                                  )
                                  .join("")}
                            </div>
                        </div>
                    `
                        : ""
                    }
                </div>
                
                <div class="quantity-selector">
                    <label class="option-label">Quantity:</label>
                    <div class="quantity-controls">
                        <button class="quantity-btn" id="decrease-qty">-</button>
                        <input type="number" class="quantity-input" id="quantity-input" value="1" min="1" max="10">
                        <button class="quantity-btn" id="increase-qty">+</button>
                    </div>
                </div>
                
                <button class="btn btn-primary add-to-cart" id="add-to-cart-btn">
                    Add to Cart
                </button>
                
                <div class="product-features">
                    <h3>Features:</h3>
                    <ul class="feature-list">
                        ${product.features.map((feature) => `<li>${feature}</li>`).join("")}
                    </ul>
                </div>
            </div>
        `
  }
}

function initProductInteractions() {
  // Image gallery
  const thumbnails = document.querySelectorAll(".thumbnail")
  const mainImage = document.getElementById("main-product-image")

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      thumbnails.forEach((t) => t.classList.remove("active"))
      thumbnail.classList.add("active")
      mainImage.src = thumbnail.dataset.image
    })
  })

  // Color selection
  const colorOptions = document.querySelectorAll(".color-option")
  colorOptions.forEach((option) => {
    option.addEventListener("click", () => {
      colorOptions.forEach((o) => o.classList.remove("active"))
      option.classList.add("active")
    })
  })

  // Size selection
  const sizeOptions = document.querySelectorAll(".size-option")
  sizeOptions.forEach((option) => {
    option.addEventListener("click", () => {
      sizeOptions.forEach((o) => o.classList.remove("active"))
      option.classList.add("active")
    })
  })

  // Quantity controls
  const decreaseBtn = document.getElementById("decrease-qty")
  const increaseBtn = document.getElementById("increase-qty")
  const quantityInput = document.getElementById("quantity-input")

  if (decreaseBtn && increaseBtn && quantityInput) {
    decreaseBtn.addEventListener("click", () => {
      const currentValue = Number.parseInt(quantityInput.value)
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1
      }
    })

    increaseBtn.addEventListener("click", () => {
      const currentValue = Number.parseInt(quantityInput.value)
      if (currentValue < 10) {
        quantityInput.value = currentValue + 1
      }
    })
  }

  // Add to cart
  const addToCartBtn = document.getElementById("add-to-cart-btn")
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      const urlParams = new URLSearchParams(window.location.search)
      const productId = Number.parseInt(urlParams.get("id"))
      const product = window.products.find((p) => p.id === productId)

      const quantity = Number.parseInt(quantityInput.value)
      const selectedColor = document.querySelector(".color-option.active")?.dataset.color || null
      const selectedSize = document.querySelector(".size-option.active")?.dataset.size || null

      if (window.cart) {
        window.cart.addItem(product, quantity, selectedSize, selectedColor)
      }

      // Visual feedback
      addToCartBtn.textContent = "Added!"
      addToCartBtn.style.backgroundColor = "#28a745"

      setTimeout(() => {
        addToCartBtn.textContent = "Add to Cart"
        addToCartBtn.style.backgroundColor = ""
      }, 2000)
    })
  }
}

function loadRelatedProducts(currentProduct) {
  const relatedGrid = document.getElementById("related-grid")
  if (!relatedGrid || !window.products) return

  // Get products from the same category, excluding current product
  const relatedProducts = window.products
    .filter((p) => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 4)

  relatedGrid.innerHTML = relatedProducts
    .map(
      (product) => `
        <div class="product-card" onclick="window.location.href='product-detail.html?id=${product.id}'">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-overlay">
                    <a href="product-detail.html?id=${product.id}" class="btn btn-white">View Details</a>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${formatPrice(product.price)}</p>
            </div>
        </div>
    `,
    )
    .join("")
}

function getColorCode(colorName) {
  const colorMap = {
    Black: "#000000",
    White: "#FFFFFF",
    Brown: "#8B4513",
    Navy: "#000080",
    Silver: "#C0C0C0",
    Gold: "#FFD700",
    Tortoise: "#8B4513",
    Emerald: "#50C878",
    Burgundy: "#800020",
    "Rose Gold": "#E8B4B8",
    "White Gold": "#F8F8FF",
    "Yellow Gold": "#FFD700",
    Charcoal: "#36454F",
    Camel: "#C19A6B",
  }

  return colorMap[colorName] || "#CCCCCC"
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}
