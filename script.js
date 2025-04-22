fetch('https://raw.githubusercontent.com/ZataMod/Skin.xml/refs/heads/main/skin.json')
  .then(res => res.json())
  .then(data => {
    const container = document.querySelector('.product-card');
    for (const key in data) {
      const skin = data[key];
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${skin.img}" alt="${skin.Name}">
        <h2>${skin.Name}</h2>
        <a href="${skin.url}" target="_blank">Tải xuống</a>
      `;
      container.appendChild(card);
    }
  })
  .catch(err => console.error("Lỗi khi tải JSON:", err));