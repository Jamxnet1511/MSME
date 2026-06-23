function renderGallery() {
  const container = document.getElementById('gallery-content');
  const id = new URLSearchParams(window.location.search).get('id');
  const album = GALLERY_ALBUMS[id];

  if (!album) {
    document.title = 'ไม่พบอัลบั้ม — สมาพันธ์ MSME ไทย';
    container.innerHTML = `
      <div class="detail-not-found">
        <h1>ไม่พบอัลบั้มรูปภาพ</h1>
        <p>ลิงก์อาจไม่ถูกต้องหรือถูกลบแล้ว</p>
        <a href="index.html" class="btn-detail">กลับหน้าแรก</a>
      </div>
    `;
    return;
  }

  document.title = `${album.title} — สมาพันธ์ MSME ไทย`;

  const imagesHtml = album.files
    .map((file, i) => {
      const src = `${album.folder}/${file}`;
      const alt = `${album.title} — ภาพที่ ${i + 1}`;
      return `
        <button type="button" class="gallery-item">
          <img src="${src}" alt="${alt}" loading="lazy">
        </button>`;
    })
    .join('');

  container.innerHTML = `
    <header class="detail-header">
      <span class="tag">อัลบั้มรูปภาพ</span>
      <h1>${album.title}</h1>
      <p class="gallery-count">ทั้งหมด ${album.files.length} ภาพ — คลิกเพื่อดูภาพเต็ม</p>
    </header>
    <div class="gallery-grid">${imagesHtml}</div>
    <div class="detail-actions">
      <a href="index.html#events-section" class="btn-detail btn-detail-outline"><i class="ti ti-arrow-left"></i> กลับหน้าแรก</a>
    </div>
  `;
}

renderGallery();
