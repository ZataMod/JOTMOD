const productContainer = document.getElementById('product-container');
const newsContainer = document.getElementById('news-container');
const productsURL = 'https://raw.githubusercontent.com/ZataMod/Skin.xml/main/A.xml?v=' + Date.now();
const newsURL = 'https://raw.githubusercontent.com/ZataMod/Skin.xml/main/N.xml?v=' + Date.now();

function loadProducts() {
  fetch(productsURL)
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
        linkElement.appendChild(imageElement);
        document.body.appendChild(linkElement);


        const nameElement = document.createElement('div');
        nameElement.classList.add('name');
        nameElement.textContent = name;

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

function loadNews() {
  fetch(newsURL)
    .then(response => response.text())
    .then(xmlString => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      const newsItems = xmlDoc.querySelectorAll('new');

      newsItems.forEach(item => {
        const name = item.getAttribute('name');
        const newsItemDiv = document.createElement('div');
        newsItemDiv.classList.add('news-item');

        // Tiêu đề (nếu có)
        if (name) {
          const titleElement = document.createElement('h3');
          titleElement.textContent = name;
          newsItemDiv.appendChild(titleElement);
        }

        // Check if there are any valid images
        const images = item.querySelectorAll('images image');
        const validImages = Array.from(images).filter(image => image.textContent.trim() !== '');

        if (validImages.length > 0) {
          // Tạo div chứa ảnh
          const imagesContainer = document.createElement('div');
          imagesContainer.classList.add('images-container');

          // Xử lý nhiều ảnh
          let activeIndex = 0;
          const imageElements = [];

          validImages.forEach((image, index) => {
            const imageUrl = image.textContent;
            const imageElement = document.createElement('img');
            imageElement.src = imageUrl;
            imageElement.alt = name || 'News Image';
            imageElement.classList.add('product-img');
            if (index === 0) {
              imageElement.classList.add('active');
            }
            imagesContainer.appendChild(imageElement);
            imageElements.push(imageElement);
          });

          // Thêm mũi tên nếu có nhiều hơn 1 ảnh
          if (imageElements.length > 1) {
            const leftArrow = document.createElement('div');
            leftArrow.classList.add('arrow', 'arrow-left');
            leftArrow.innerHTML = '❮';
            leftArrow.addEventListener('click', () => {
              imageElements[activeIndex].classList.remove('active');
              activeIndex = (activeIndex - 1 + imageElements.length) % imageElements.length;
              imageElements[activeIndex].classList.add('active');
            });

            const rightArrow = document.createElement('div');
            rightArrow.classList.add('arrow', 'arrow-right');
            rightArrow.innerHTML = '❯';
            rightArrow.addEventListener('click', () => {
              imageElements[activeIndex].classList.remove('active');
              activeIndex = (activeIndex + 1) % imageElements.length;
              imageElements[activeIndex].classList.add('active');
            });

            imagesContainer.appendChild(leftArrow);
            imagesContainer.appendChild(rightArrow);
          }

          newsItemDiv.appendChild(imagesContainer);
        }

        // Xử lý văn bản
        const textElement = item.querySelector('text');
        if (textElement) {
          const description = textElement.textContent.trim();
          const contentElement = document.createElement('p');
          contentElement.textContent = description;
          newsItemDiv.appendChild(contentElement);
        }

        // Thêm bản tin vào container
        newsContainer.appendChild(newsItemDiv);
      });
    })
    .catch(error => {
      console.error('Lỗi khi tải tin tức:', error);
      newsContainer.innerHTML = '<p>Lỗi khi tải tin tức.</p>';
    });
}

loadProducts();
loadNews();

// Phần code xử lý chuyển tab
const modTab = document.querySelector('.nav-links a[href="#mod"]');
const newsTab = document.querySelector('.nav-links a[href="#news"]');
const modSection = document.getElementById('mod');
const newsSection = document.getElementById('news');

modTab.addEventListener('click', (event) => {
  event.preventDefault();
  modSection.classList.add('active-section');
  newsSection.classList.remove('active-section');
  modSection.classList.remove('hidden-section');
  newsSection.classList.add('hidden-section');
  modTab.classList.add('active');
  newsTab.classList.remove('active');
});

newsTab.addEventListener('click', (event) => {
  event.preventDefault();
  newsSection.classList.add('active-section');
  modSection.classList.remove('active-section');
  newsSection.classList.remove('hidden-section');
  modSection.classList.add('hidden-section');
  newsTab.classList.add('active');
  modTab.classList.remove('active');
});