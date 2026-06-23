# สมาพันธ์ MSME ไทย จังหวัดนครสวรรค์

เว็บไซต์สมาพันธ์ MSME ไทย จังหวัดนครสวรรค์ — Static site สร้างด้วย HTML, CSS, JavaScript (ไม่มี framework/build tool)

## Tech Stack

- **HTML5** — โครงสร้างหน้าเว็บ
- **CSS3** — จัดแบ่งเป็น module ตาม component, ใช้ CSS Variables สำหรับ theme
- **JavaScript (Vanilla)** — แยก data / components / pages
- **Tabler Icons** — icon library (webfont via CDN)
- **Google Fonts** — Kanit

## โครงสร้างโปรเจกต์

```
MSME/
├── index.html              ← หน้าแรก
├── detail.html             ← หน้ารายละเอียดข่าว/โครงการ
├── gallery.html            ← หน้าอัลบั้มรูปภาพ
├── coming-soon.html        ← หน้า placeholder สำหรับเมนูที่ยังไม่เปิดใช้
│
├── css/
│   ├── main.css            ← entry point — @import ทุกไฟล์
│   ├── theme.css           ← design tokens (สี, font, spacing, shadow)
│   ├── base.css            ← reset, layout grid, shared utilities
│   └── components/
│       ├── top-bar.css
│       ├── header.css
│       ├── hero.css
│       ├── news.css        ← รวม promo cards
│       ├── cards.css       ← SME cards
│       ├── events.css      ← event section + folder view
│       ├── carousel.css    ← shared carousel controls
│       ├── guidelines.css
│       ├── sidebar.css
│       ├── pre-footer.css
│       ├── footer.css
│       ├── detail.css
│       ├── gallery.css
│       ├── lightbox.css
│       └── coming-soon.css
│
├── js/
│   ├── data/
│   │   ├── detail-data.js  ← ข้อมูลข่าวสาร/โครงการ (DETAIL_CONTENT)
│   │   └── gallery-data.js ← ข้อมูลอัลบั้มรูปภาพ (GALLERY_ALBUMS)
│   ├── components/
│   │   ├── carousel.js     ← image carousel (index page)
│   │   ├── lightbox.js     ← fullscreen image viewer
│   │   ├── news-toggle.js  ← toggle ดูทั้งหมด/แสดงน้อยลง (ข่าว)
│   │   └── events-toggle.js← toggle ดูทั้งหมด/แสดงน้อยลง (กิจกรรม)
│   └── pages/
│       ├── detail.js       ← render หน้า detail จาก query param ?id=xxx
│       └── gallery.js      ← render หน้า gallery จาก query param ?id=xxx
│
├── img/                    ← รูปภาพทั้งหมด (แยก subfolder ตามกิจกรรม)
└── assets/                 ← PDF เอกสาร, รูป hero background
```

## แต่ละหน้าใช้ไฟล์อะไรบ้าง

| หน้า | CSS | JS |
|------|-----|----|
| `index.html` | main.css (ทุก component) | `news-toggle.js`, `events-toggle.js`, `lightbox.js`, `carousel.js` |
| `detail.html` | main.css | `detail-data.js` → `lightbox.js` → `detail.js` |
| `gallery.html` | main.css | `gallery-data.js` → `lightbox.js` → `gallery.js` |
| `coming-soon.html` | main.css | — |

> **สำคัญ:** ลำดับ `<script>` มีความหมาย — data ต้องโหลดก่อน pages เสมอ

## CSS Component Map

แผนผังว่า CSS component ไหนควบคุมส่วนไหนของหน้าเว็บ:

```
┌─────────────────────────────────────────────┐
│  top-bar.css                                │
├─────────────────────────────────────────────┤
│  header.css (logo, nav, mobile toggle)      │
├─────────────────────────────────────────────┤
│  hero.css (เฉพาะ index)                     │
├──────────────────────┬──────────────────────┤
│  Main Column         │  sidebar.css         │
│  ┌────────────────┐  │  (vision, mission,   │
│  │ news.css       │  │   ENSURE, services,  │
│  │ (+ promo cards)│  │   contact form)      │
│  ├────────────────┤  │                      │
│  │ cards.css      │  │                      │
│  ├────────────────┤  │                      │
│  │ events.css     │  │                      │
│  │ carousel.css   │  │                      │
│  ├────────────────┤  │                      │
│  │ guidelines.css │  │                      │
│  └────────────────┘  │                      │
├──────────────────────┴──────────────────────┤
│  pre-footer.css (Micro/Small/Medium/MSME)   │
├─────────────────────────────────────────────┤
│  footer.css                                 │
└─────────────────────────────────────────────┘

detail.css   → หน้า detail.html (article layout, highlights, PDF list)
gallery.css  → หน้า gallery.html (image grid)
lightbox.css → fullscreen image popup (ใช้ทุกหน้าที่มีรูป)
```

## การปรับแต่ง Theme

แก้ไขที่ `css/theme.css` ไฟล์เดียว:

```css
:root {
  --purple: #4B2C7F;       /* สีหลัก */
  --yellow: #F9C80E;       /* สี accent */
  --green: #2d9d4e;        /* สีปุ่ม/status */
  --font: 'Kanit', sans-serif;
  --radius: 10px;          /* ความโค้งมุม */
  --container-max: 1440px; /* ความกว้างสูงสุด */
  --sidebar-width: 320px;  /* ความกว้าง sidebar */
}
```

## การเพิ่มข่าวสาร/โครงการ

1. เพิ่มข้อมูลใน `js/data/detail-data.js` — เพิ่ม key ใหม่ใน `DETAIL_CONTENT`
2. เพิ่มลิงก์ใน `index.html` section ข่าวสาร — ใช้ `href="detail.html?id=your-key"`

## การเพิ่มอัลบั้มรูปภาพ

1. สร้างโฟลเดอร์ใหม่ใน `img/`
2. เพิ่มข้อมูลใน `js/data/gallery-data.js` — เพิ่ม key ใหม่ใน `GALLERY_ALBUMS`
3. เพิ่ม card ใน `index.html` section กิจกรรม — ใช้ `href="gallery.html?id=your-key"`

## การเพิ่มหน้าใหม่ (เมื่อพร้อม)

เมนูที่ยังไม่เปิดใช้ (เกี่ยวกับเรา, โครงการ, สมาชิก, ข่าวสาร, ติดต่อเรา) ลิงก์ไปที่ `coming-soon.html`  
เมื่อสร้างหน้าใหม่แล้ว ให้เปลี่ยน `href="coming-soon.html"` เป็น path ของหน้าใหม่ใน **ทุกไฟล์ HTML** (nav + footer)

## Responsive Breakpoints

| Breakpoint | เปลี่ยนแปลง |
|------------|-------------|
| `1024px` | layout เปลี่ยนเป็น 1 column, sidebar ย้ายลงล่าง |
| `768px` | nav ซ่อน → hamburger, cards เป็น 1 column, footer stack |
| `480px` | pre-footer 1 column, ENSURE grid 2 columns |

> Responsive rules อยู่ในแต่ละ component file (ไม่ได้แยกเป็นไฟล์ต่างหาก)
