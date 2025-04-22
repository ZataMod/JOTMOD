fetch('https://raw.githubusercontent.com/ZataMod/Skin.xml/refs/heads/main/skin.json')
  .then(res => res.json())
  .then(data => {
    const container = document.querySelector('#skin-list');
    for (const key in data) {
      const skin = data[key];
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${skin.img}" alt="${skin.Name}" style="border: 5px solid #b22222; border-radius: 10px; max-width: 100%; margin-bottom: 15px;">
        <h2>${skin.Name}</h2>
        <a href="mod.html?name=${encodeURIComponent(skin.Name)}&img=${encodeURIComponent(skin.img)}&url=${encodeURIComponent(skin.url)}&yt=${encodeURIComponent(skin.yt || '')}&video=${encodeURIComponent(skin.video || '')}" target="_blank">Xem chi tiết</a>
      `;
      container.appendChild(card);
    }
  })
  .catch(err => {
    console.error("Lỗi khi tải JSON:", err);
    const container = document.querySelector('#skin-list');
    container.innerHTML = '<p>Không thể tải dữ liệu. Vui lòng thử lại sau.</p>';
  });