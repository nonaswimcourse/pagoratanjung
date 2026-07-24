// Ambil id dari URL, contoh: kegiatan.html?id=2
function getIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

async function renderArticle() {
  const box = document.getElementById('articleBox');
  const related = document.getElementById('relatedGrid');
  const id = getIdFromUrl();

  const [item, allItems] = await Promise.all([
    loadGaleriItemById(id),
    loadGaleriData()
  ]);

  if (!item) {
    box.innerHTML = `
      <span class="m-eyebrow">Tidak ditemukan</span>
      <h1>Kegiatan tidak ditemukan</h1>
      <p class="muted">Link kegiatan tidak valid atau sudah tidak tersedia.</p>
      <a class="btn btn-solid" href="index.html#galeri">Kembali ke Galeri</a>
    `;
    related.innerHTML = '';
    return;
  }

  document.title = item.title + ' — PAGORA TANJUNG';
  document.getElementById('pageTitle').textContent = item.title + ' — PAGORA TANJUNG';

  const bodyHtml = item.body.map(p => `<p>${p}</p>`).join('');

  box.innerHTML = `
    <span class="m-eyebrow">${item.tag}</span>
    <h1>${item.title}</h1>
    <div class="article-meta">${item.date}</div>
    <div class="article-hero"><img src="${item.image}" alt="${item.title}"></div>
    <div class="article-body">${bodyHtml}</div>
    <a class="modal-cta article-cta" href="https://wa.me/6283838450617" target="_blank" rel="noopener">Tanya Info Kegiatan Ini</a>
  `;

  const others = allItems.filter(g => String(g.id) !== String(item.id)).slice(0, 3);
  related.innerHTML = others.map(g => `
    <a class="related-card" href="kegiatan.html?id=${g.id}">
      <div class="related-img" style="background-image:url('${g.image}')"></div>
      <div class="related-content">
        <span class="tag">${g.tag}</span>
        <span class="title">${g.title}</span>
      </div>
    </a>
  `).join('');
}

renderArticle();
