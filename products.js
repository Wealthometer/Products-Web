// Product data
const products = [
  {
    id: 1,
    name: "Premium Leather Handbag",
    price: 2499,
    category: "bags",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2043&q=80",
    ],
    description:
      "Crafted from the finest Italian leather, this premium handbag combines timeless elegance with modern functionality. Features multiple compartments and a detachable shoulder strap.",
    features: [
      "Genuine Italian leather",
      "Multiple compartments",
      "Detachable strap",
      "Gold-plated hardware",
      "Dust bag included",
    ],
    colors: ["Black", "Brown", "Navy"],
    sizes: ["Small", "Medium", "Large"],
  },
  {
    id: 2,
    name: "Swiss Chronograph Watch",
    price: 8999,
    category: "watches",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1999&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1999&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Precision Swiss movement meets luxury design in this exceptional chronograph watch. Water-resistant and built to last a lifetime.",
    features: [
      "Swiss automatic movement",
      "Sapphire crystal",
      "Water resistant 100m",
      "Leather strap",
      "2-year warranty",
    ],
    colors: ["Silver", "Gold", "Black"],
    sizes: ["42mm", "44mm"],
  },
  {
    id: 3,
    name: "Italian Leather Shoes",
    price: 1299,
    category: "shoes",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      "https://images.unsplash.com/photo-1582897085656-c636d006a246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    description:
      "Handcrafted Italian leather shoes that epitomize sophistication and comfort. Perfect for both business and formal occasions.",
    features: ["Handcrafted in Italy", "Premium leather", "Leather sole", "Comfortable fit", "Shoe care kit included"],
    colors: ["Black", "Brown", "Burgundy"],
    sizes: ["7", "8", "9", "10", "11", "12"],
  },
  {
    id: 4,
    name: "Designer Sunglasses",
    price: 899,
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=3558&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1980&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1980&q=80",
      "https://images.unsplash.com/photo-1618677366787-9727aacca7ea?q=80&w=3255&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description:
      "Premium designer sunglasses with UV protection and timeless style. Crafted with attention to every detail.",
    features: [
      "UV400 protection",
      "Polarized lenses",
      "Titanium frame",
      "Anti-reflective coating",
      "Designer case included",
    ],
    colors: ["Black", "Tortoise", "Silver"],
    sizes: ["One Size"],
  },
  {
    id: 5,
    name: "Silk Evening Dress",
    price: 3299,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1983&q=80",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1983&q=80",
      "https://images.unsplash.com/photo-1739773375291-40f604de9468?q=80&w=2732&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1988&q=80",
    ],
    description:
      "Exquisite silk evening dress designed for special occasions. Features elegant draping and luxurious fabric.",
    features: ["100% silk", "Hand-finished seams", "Elegant draping", "Hidden zipper", "Dry clean only"],
    colors: ["Black", "Navy", "Emerald"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 6,
    name: "Diamond Tennis Bracelet",
    price: 12999,
    category: "jewelry",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Stunning diamond tennis bracelet featuring brilliant-cut diamonds set in 18k white gold. A timeless piece of luxury jewelry.",
    features: [
      "18k white gold",
      "Brilliant-cut diamonds",
      "Secure clasp",
      "Certificate of authenticity",
      "Luxury gift box",
    ],
    colors: ["White Gold", "Yellow Gold", "Rose Gold"],
    sizes: ['6.5"', '7"', '7.5"'],
  },
  {
    id: 7,
    name: "Cashmere Overcoat",
    price: 2899,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1739620620741-f7b23ede3149?q=80&w=3987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1739620620741-f7b23ede3149?q=80&w=3987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1936&q=80",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Luxurious cashmere overcoat perfect for sophisticated style in colder weather. Tailored fit with premium construction.",
    features: [
      "100% cashmere",
      "Tailored fit",
      "Premium buttons",
      "Interior pockets",
      "Professional cleaning recommended",
    ],
    colors: ["Charcoal", "Navy", "Camel"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 8,
    name: "Luxury Fountain Pen",
    price: 1599,
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    images: [
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Exquisite fountain pen crafted with precious metals and attention to detail. Perfect for the discerning writer.",
    features: [
      "18k gold nib",
      "Precious metal body",
      "Smooth ink flow",
      "Refillable cartridge",
      "Luxury presentation box",
    ],
    colors: ["Gold", "Silver", "Black"],
    sizes: ["One Size"],
  },
]

// Products page functionality
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("products-grid")) {
    initProductsPage()
  }
})

function initProductsPage() {
  let currentProducts = [...products]
  let displayedCount = 0
  const productsPerPage = 6

  // Initialize filters
  initFilters()

  // Load initial products
  loadProducts()

  // Load more button
  const loadMoreBtn = document.getElementById("load-more-btn")
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", loadProducts)
  }

  function initFilters() {
    const categoryFilter = document.getElementById("category-filter")
    const priceFilter = document.getElementById("price-filter")
    const sortFilter = document.getElementById("sort-filter")

    if (categoryFilter) {
      categoryFilter.addEventListener("change", applyFilters)
    }
    if (priceFilter) {
      priceFilter.addEventListener("change", applyFilters)
    }
    if (sortFilter) {
      sortFilter.addEventListener("change", applyFilters)
    }
  }

  function applyFilters() {
    const category = document.getElementById("category-filter")?.value || "all"
    const priceRange = document.getElementById("price-filter")?.value || "all"
    const sortBy = document.getElementById("sort-filter")?.value || "featured"

    // Filter by category
    let filtered = products.filter((product) => {
      if (category === "all") return true
      return product.category === category
    })

    // Filter by price
    filtered = filtered.filter((product) => {
      if (priceRange === "all") return true

      const [min, max] = priceRange.split("-").map((p) => p.replace("+", ""))
      const price = product.price

      if (max) {
        return price >= Number.parseInt(min) && price <= Number.parseInt(max)
      } else {
        return price >= Number.parseInt(min)
      }
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        // Keep original order for featured
        break
    }

    currentProducts = filtered
    displayedCount = 0
    document.getElementById("products-grid").innerHTML = ""
    loadProducts()
  }

  function loadProducts() {
    const productsGrid = document.getElementById("products-grid")
    const loadMoreBtn = document.getElementById("load-more-btn")

    const productsToShow = currentProducts.slice(displayedCount, displayedCount + productsPerPage)

    productsToShow.forEach((product) => {
      const productCard = createProductCard(product)
      productsGrid.appendChild(productCard)
    })

    displayedCount += productsToShow.length

    // Hide load more button if all products are displayed
    if (displayedCount >= currentProducts.length) {
      loadMoreBtn.style.display = "none"
    } else {
      loadMoreBtn.style.display = "block"
    }

    // Animate new products if GSAP is available
    const gsap = window.gsap // Declare gsap variable
    if (gsap) {
      const newCards = Array.from(productsGrid.children).slice(-productsToShow.length)
      gsap.fromTo(
        newCards,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
      )
    }
  }

  function createProductCard(product) {
    const card = document.createElement("div")
    card.className = "product-card"
    card.innerHTML = `
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
      `

    // Add click handler for the entire card, but exclude the button
    card.addEventListener("click", (e) => {
      // Check if the click was on the button or its parent elements
      if (!e.target.closest(".btn") && !e.target.closest(".product-overlay")) {
        window.location.href = `product-detail.html?id=${product.id}`
      }
    })

    // Ensure the View Details button works properly
    const viewDetailsBtn = card.querySelector(".btn")
    if (viewDetailsBtn) {
      viewDetailsBtn.addEventListener("click", (e) => {
        e.stopPropagation() // Prevent the card click handler from firing
        window.location.href = `product-detail.html?id=${product.id}`
      })
    }

    return card
  }

  function formatPrice(price) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }
}

// Export products for use in other files
window.products = products
