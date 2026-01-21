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

const WA_NUMBER = "94726000557"; // +94 72 6000 557 (no leading 0)
const WA_CATALOG = "https://wa.me/c/94726000557";

function waMessageLink(text){
  const msg = encodeURIComponent(text);
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

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
  grid.innerHTML = "";
  list.forEach(p => grid.appendChild(createProductCard(p)));

  if(list.length === 0){
    const empty = document.createElement("div");
    empty.className = "card";
    empty.style.gridColumn = "1 / -1";
    empty.innerHTML = `<strong>No results.</strong><div class="muted" style="margin-top:6px;">Catalog එකෙන් බලන්න: <a href="${WA_CATALOG}" target="_blank" rel="noopener" style="text-decoration:underline;">Open WhatsApp Catalog</a></div>`;
    grid.appendChild(empty);
  }
}

function setupSearch(){
  const input = document.getElementById("search");
  const clearBtn = document.getElementById("clearSearch");

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

  input?.addEventListener("input", doFilter);
  clearBtn?.addEventListener("click", () => {
    input.value = "";
    input.focus();
    renderProducts(PRODUCTS);
  });
}

function setupMobileMenu(){
  const btn = document.getElementById("hamburger");
  const menu = document.getElementById("mobileMenu");
  if(!btn || !menu) return;

  btn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));
    menu.setAttribute("aria-hidden", String(!isOpen));
  });

  // close menu when clicking a link
  menu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-hidden", "true");
    });
  });
}

(function init(){
  document.getElementById("year").textContent = new Date().getFullYear();
  renderProducts(PRODUCTS);
  setupSearch();
  setupMobileMenu();
})();
