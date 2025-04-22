
fetch('https://github.com/ZataMod/Skin.xml/raw/refs/heads/main/skin.json')
  .then(response => response.json())
  .then(data => {
    const skinList = document.getElementById('skin-list');
    Object.values(data).forEach(skin => {
      const card = document.createElement('div');
      card.className = 'product-card';

      const img = document.createElement('img');
      img.src = skin.img;
      img.alt = skin.Name;

      const title = document.createElement('h2');
      title.textContent = skin.Name;

      const downloadLink = document.createElement('a');
      downloadLink.href = skin.url;
      downloadLink.textContent = 'Tải về';
      downloadLink.target = '_blank';

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(downloadLink);

      skinList.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Lỗi khi tải dữ liệu:', error);
  });