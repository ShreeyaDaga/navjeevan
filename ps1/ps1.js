const products = [
  {
    image: "images/headphones.jpg",
    name: "Wireless Headphones",
    price: "₹7,999",
    description: "Noise-cancelling over-ear headphones."
  },
  {
    image: "images/smartwatch.jpg",
    name: "Smartwatch",
    price: "₹12,999",
    description: "Fitness tracking smartwatch."
  },
  {
    image: "images/mouse.jpg",
    name: "Gaming Mouse",
    price: "₹2,499",
    description: "Ergonomic gaming mouse."
  },
  {
    image: "images/laptopstand.jpg",
    name: "Laptop Stand",
    price: "₹1,999",
    description: "Adjustable aluminium stand."
  },
  {
    image: "images/beanbag.jpg",
    name: "Bean Bag",
    price: "₹1099",
    description: "Comfortable Bean bag"
  },
  {
    image: "images/sunglass.jpg",
    name: "Sunglasses",
    price: "2,099",
    description: "How You Doin'?"
  }
];
  
  const itemsPerPage = 5;
  let currentPage = 1;
  
  function displayProducts(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const visible = products.slice(start, end);

    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

  visible.forEach(p => {
    tbody.innerHTML += `
      <tr>
        <td><img src="${p.image}" alt="${p.name}"/></td>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td>${p.description}</td>
      </tr>
    `;
  });
  }
  
  function setupPagination() {
    const totalPages = Math.ceil(products.length / itemsPerPage);  // if 1.2 → round up → 2
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      // btn → A DOM element, like a button (<button>)
      const btn = document.createElement("button");
      btn.textContent = i;
      // classList → A property that returns the list of all classes on that element.
      // .add("active") → Adds the class "active" to the element's class list.
      if (i === currentPage) btn.classList.add("active");
      btn.onclick = () => {
        currentPage = i;
        displayProducts(currentPage);
        setupPagination();
    };
    // Take this button and attach it to the pagination div on the page."
    pagination.appendChild(btn);
    }
  }
  
  displayProducts(currentPage);
  setupPagination();
  