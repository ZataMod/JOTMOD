const productContainer = document.getElementById('product-container');
const xmlURL = 'https://run.mocky.io/v3/424cbd5b-cd52-4d22-ae9f-1d98adfe9088';

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

        const linkElement = document.createElement('a'); // Create an <a> element
        linkElement.href = url;
        linkElement.target = "_blank"; // Open in a new tab

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
      console.error('Lỗi khi tải dữ liệu sản phẩm:', error);
      productContainer.innerHTML = '<p>Lỗi khi tải dữ liệu sản phẩm.</p>';
    });
}

loadProducts();