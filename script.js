const productContainer = document.getElementById('product-container');
const xmlURL = 'https://raw.githubusercontent.com/ZataMod/Skin.xml/refs/heads/main/A.xml?v=' + Date.now(); // Thêm timestamp vào cuối URL

function loadProducts() {
  fetch(xmlURL)
    .then(response => response.text())
    .then(xmlString => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      const products = xmlDoc.querySelectorAll('String');

      products.forEach(product => {
        const name = product.getAttribute('name');
        const image = product.getAttribute('image');
        const url = product.getAttribute('url');

        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const linkElement = document.createElement('a');
        linkElement.href = url;
        linkElement.target = "_blank";

        const imageElement = document.createElement('img');
        imageElement.src = image;
        imageElement.alt = name;

        const nameElement = document.createElement('div');
        nameElement.classList.add('name');
        nameElement.textContent = name;

        linkElement.appendChild(imageElement);
        productDiv.appendChild(linkElement);
        productDiv.appendChild(nameElement);
        productContainer.appendChild(productDiv);
      });
    })
    .catch(error => {
      console.error('Lỗi khi tải dữ liệu mod:', error);
      productContainer.innerHTML = '<p>Lỗi khi tải dữ liệu mod.</p>';
    });
}

loadProducts();