function renderPdfSection(data) {
  if (!data.pdfs || data.pdfs.length === 0) return '';

  const itemsHtml = data.pdfs
    .map((file) => {
      const src = encodeURI(file);
      const name = file.split('/').pop();
      return `
        <li>
          <a href="${src}" class="detail-pdf-link" target="_blank" rel="noopener">
            <i class="ti ti-file-type-pdf"></i> ${name}
          </a>
        </li>`;
    })
    .join('');

  return `
    <section class="detail-pdfs">
      <h2><i class="ti ti-file-text"></i> เอกสารประกอบ</h2>
      <ul class="detail-pdf-list">${itemsHtml}</ul>
    </section>
  `;
}

function renderHeroImage(data) {
  const images = data.images || (data.image ? [data.image] : []);
  if (images.length === 0) return '';

  if (images.length === 1) {
    return `
      <div class="detail-hero-img">
        <img src="${images[0]}" alt="${data.title}">
      </div>
    `;
  }

  const slidesHtml = images
    .map(
      (src, i) => `
        <div class="detail-carousel-slide">
          <img src="${src}" alt="${data.title} — ภาพที่ ${i + 1}">
        </div>`
    )
    .join('');

  const dotsHtml = images
    .map(
      (_, i) =>
        `<button type="button" class="detail-carousel-dot${i === 0 ? ' active' : ''}" aria-label="ภาพที่ ${i + 1}" data-index="${i}"></button>`
    )
    .join('');

  return `
    <div class="detail-hero-img detail-hero-carousel" data-interval="4000">
      <div class="detail-carousel-track">${slidesHtml}</div>
      <button type="button" class="carousel-btn carousel-prev" aria-label="ภาพก่อนหน้า">
        <i class="ti ti-chevron-left"></i>
      </button>
      <button type="button" class="carousel-btn carousel-next" aria-label="ภาพถัดไป">
        <i class="ti ti-chevron-right"></i>
      </button>
      <div class="carousel-dots detail-carousel-dots">${dotsHtml}</div>
    </div>
  `;
}

function initDetailGallery() {
  const carousel = document.querySelector('.detail-hero-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.detail-carousel-track');
  const slides = carousel.querySelectorAll('.detail-carousel-slide');
  const dots = carousel.querySelectorAll('.detail-carousel-dot');
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');

  if (!track || slides.length < 2) return;

  let current = 0;
  let timerId = null;

  function updatePosition() {
    const offset = current * carousel.clientWidth;
    track.style.transform = `translate3d(-${offset}px, 0, 0)`;
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    updatePosition();
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  function startAutoplay() {
    clearInterval(timerId);
    const interval = parseInt(carousel.dataset.interval, 10) || 4000;
    timerId = setInterval(() => goTo(current + 1), interval);
  }

  function stopAutoplay() {
    clearInterval(timerId);
  }

  prevBtn?.addEventListener('click', () => {
    goTo(current - 1);
    startAutoplay();
  });

  nextBtn?.addEventListener('click', () => {
    goTo(current + 1);
    startAutoplay();
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.index, 10));
      startAutoplay();
    });
  });

  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  let touchStartX = 0;
  carousel.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  carousel.addEventListener(
    'touchend',
    (e) => {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) < 40) return;
      if (diff < 0) goTo(current + 1);
      else goTo(current - 1);
      startAutoplay();
    },
    { passive: true }
  );

  window.addEventListener('resize', updatePosition);
  updatePosition();
  startAutoplay();
}

function renderDetail() {
  const container = document.getElementById('detail-content');
  const id = new URLSearchParams(window.location.search).get('id');
  const data = DETAIL_CONTENT[id];

  if (!data) {
    document.title = 'ไม่พบข้อมูล — สมาพันธ์ MSME ไทย';
    container.innerHTML = `
      <div class="detail-not-found">
        <h1>ไม่พบรายละเอียดที่ต้องการ</h1>
        <p>ลิงก์อาจไม่ถูกต้องหรือถูกลบแล้ว</p>
        <a href="index.html" class="btn-detail">กลับหน้าแรก</a>
      </div>
    `;
    return;
  }

  document.title = `${data.title} — สมาพันธ์ MSME ไทย`;

  const highlightsHtml = data.highlights
    .map((item) => `<li>${item}</li>`)
    .join('');

  const paragraphsHtml = data.paragraphs
    .map((p) => `<p>${p}</p>`)
    .join('');

  container.innerHTML = `
    <header class="detail-header">
      <span class="tag">${data.tag}</span>
      <h1>${data.title}</h1>
      <time>${data.date}</time>
    </header>
    ${renderHeroImage(data)}
    <div class="detail-body">
      ${paragraphsHtml}
      <div class="detail-highlights">
        <h2><i class="ti ti-circle-check"></i> สรุปสำคัญ</h2>
        <ul>${highlightsHtml}</ul>
      </div>
      ${renderPdfSection(data)}
    </div>
    <div class="detail-actions">
      <a href="index.html" class="btn-detail btn-detail-outline"><i class="ti ti-arrow-left"></i> กลับหน้าแรก</a>
      <a href="#" class="btn-detail"><i class="ti ti-mail"></i> สอบถามเพิ่มเติม</a>
    </div>
  `;

  initDetailGallery();
}

renderDetail();
