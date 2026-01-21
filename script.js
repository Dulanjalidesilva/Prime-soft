const PRODUCTS = [
  {
    name: "CapCut Pro",
    desc: "Video editing pro features / premium effects. Order via WhatsApp.",
    keyword: "capcut pro video"
  },
  {
    name: "Canva Pro",
    desc: "Premium templates, brand kit, background remover. Order via WhatsApp.",
    keyword: "canva pro design"
  },
  {
    name: "Adobe (Photoshop / Premiere / etc)",
    desc: "Adobe apps subscriptions/options. Details WhatsApp chat එකෙන්.",
    keyword: "adobe photoshop premiere"
  },
  {
    name: "Windows Activation",
    desc: "Windows key / activation support (availability depends).",
    keyword: "windows key"
  },
  {
    name: "Microsoft Office",
    desc: "Office packages / activation options. WhatsApp catalog බලන්න.",
    keyword: "office 365"
  },
  {
    name: "Other Software",
    desc: "අනෙක් tools/services — catalog එකේ full list තියෙනවා.",
    keyword: "software tools"
  }
];

const OFFERS = [
  { title: "Offer 01", sub: "Tap to preview", src: "promo-1.jpeg" },
  { title: "Offer 02", sub: "Tap to preview", src: "promo-2.jpeg" },
  { title: "Offer 03", sub: "Tap to preview", src: "promo-3.jpeg" },
  { title: "Offer 04", sub: "Tap to preview", src: "promo-4.jpeg" },
  { title: "Offer 05", sub: "Tap to preview", src: "promo-5.jpeg" },
  { title: "Offer 06", sub: "Tap to preview", src: "promo-6.jpeg" },
];

const WA_NUMBER = "94726000557"; // +94 72 6000 557 (no leading 0)
const WA_CATALOG = "https://wa.me/c/94726000557";

function waMessageLink(text){
  const msg = encodeURIComponent(text);
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

/* Products */
function createProductCard(p){
  const el = document.createElement("div");
  el.className = "product";
  const msg = `Hi Prime Soft! මට ${p.name} ගැන details + price දැනගන්න ඕන.`;
  el.innerHTML = `
    <h3 class="product-title">${p.name}</h3>
    <p class="product-desc">${p.desc}</p>
    <div class="product-actions">
      <a class="primary" href="${waMessageLink(msg)}" target="_blank" rel="noopener">WhatsApp Order</a>
      <a href="${WA_CATALOG}" target="_blank" rel="noopener">Catalog</a>
    </div>
  `;
  return el;
}

function renderProducts(list){
  const grid = document.getElementById("productGrid");
  if(!grid) return;
  grid.innerHTML = "";
  list.forEach(p => grid.appendChild(createProductCard(p)));

  if(list.length === 0){
    const empty = document.createElement("div");
    empty.className = "card";
    empty.style.gridColumn = "1 / -1";
    empty.innerHTML = `
      <strong>No results.</strong>
      <div class="muted" style="margin-top:6px;">
        Catalog එකෙන් බලන්න:
        <a href="${WA_CATALOG}" target="_blank" rel="noopener" style="text-decoration:underline;">Open WhatsApp Catalog</a>
      </div>`;
    grid.appendChild(empty);
  }
}

function setupSearch(){
  const input = document.getElementById("search");
  const clearBtn = document.getElementById("clearSearch");
  if(!input) return;

  function doFilter(){
    const q = (input.value || "").toLowerCase().trim();
    if(!q) return renderProducts(PRODUCTS);

    const filtered = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      (p.keyword || "").toLowerCase().includes(q)
    );
    renderProducts(filtered);
  }

  input.addEventListener("input", doFilter);
  clearBtn?.addEventListener("click", () => {
    input.value = "";
    input.focus();
    renderProducts(PRODUCTS);
  });
}

/* Mobile Menu */
function setupMobileMenu(){
  const btn = document.getElementById("hamburger");
  const menu = document.getElementById("mobileMenu");
  if(!btn || !menu) return;

  btn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));
    menu.setAttribute("aria-hidden", String(!isOpen));
  });

  menu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-hidden", "true");
    });
  });
}

/* Offers Gallery + Lightbox */
function renderOffers(){
  const gallery = document.getElementById("gallery");
  if(!gallery) return;

  gallery.innerHTML = "";
  OFFERS.forEach((o, idx) => {
    const card = document.createElement("div");
    card.className = "offer";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Open ${o.title}`);

    card.innerHTML = `
      <img src="${o.src}" alt="${o.title}" loading="lazy" />
      <div class="offer-cap">
        <div>
          <div class="offer-title">${o.title}</div>
          <div class="offer-sub">${o.sub}</div>
        </div>
        <div class="offer-sub">#${String(idx+1).padStart(2,"0")}</div>
      </div>
    `;

    card.addEventListener("click", () => openLightbox(o.src));
    card.addEventListener("keydown", (e) => {
      if(e.key === "Enter" || e.key === " ") openLightbox(o.src);
    });

    gallery.appendChild(card);
  });
}

function openLightbox(src){
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImg");
  if(!lb || !img) return;

  img.src = src;
  lb.classList.add("open");
  lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox(){
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImg");
  if(!lb || !img) return;

  lb.classList.remove("open");
  lb.setAttribute("aria-hidden", "true");
  img.src = "";
  document.body.style.overflow = "";
}

function setupLightbox(){
  const lb = document.getElementById("lightbox");
  const closeBtn = document.getElementById("lightboxClose");
  closeBtn?.addEventListener("click", closeLightbox);

  lb?.addEventListener("click", (e) => {
    // click outside image closes
    if(e.target === lb) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") closeLightbox();
  });
}

(function init(){
  const y = document.getElementById("year");
  if(y) y.textContent = new Date().getFullYear();

  renderProducts(PRODUCTS);
  setupSearch();
  setupMobileMenu();

  renderOffers();
  setupLightbox();
})();

