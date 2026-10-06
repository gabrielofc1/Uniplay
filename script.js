const products = [
  { name: "Racao Premium", icon: "RP", category: "Racoes", stock: 18, avg: 5, days: 3.6, status: "Atencao", revenue: "R$ 3.675,00", units: "245 un." },
  { name: "Areia Sanitaria", icon: "AS", category: "Higiene", stock: 42, avg: 12, days: 3.5, status: "Atencao", revenue: "R$ 2.970,00", units: "198 un." },
  { name: "Petisco Natural", icon: "PN", category: "Petiscos", stock: 0, avg: 8, days: 0, status: "Sem estoque", revenue: "R$ 2.340,00", units: "156 un." },
  { name: "Shampoo Pet", icon: "SP", category: "Higiene", stock: 56, avg: 10, days: 5.6, status: "OK", revenue: "R$ 1.840,00", units: "124 un." },
  { name: "Brinquedo Mordedor", icon: "BM", category: "Brinquedos", stock: 23, avg: 7, days: 3.3, status: "Atencao", revenue: "R$ 1.470,00", units: "98 un." }
];

const imports = [
  { file: "vendas_janeiro.xlsx", date: "05/03/2025 14:32", records: "17.438", products: "842", period: "01/01 - 31/01", status: "Processado", errors: 0, user: "Joao Silva" },
  { file: "estoque_fevereiro.csv", date: "28/02/2025 08:15", records: "8.921", products: "521", period: "01/02 - 28/02", status: "Processado", errors: 0, user: "Joao Silva" },
  { file: "vendas_dezembro.xlsx", date: "15/01/2025 16:40", records: "12.347", products: "634", period: "01/12 - 31/12", status: "Processado", errors: 3, user: "Joao Silva" },
  { file: "estoque_novembro.csv", date: "02/01/2025 10:22", records: "6.543", products: "488", period: "01/11 - 30/11", status: "Parcial", errors: 12, user: "Joao Silva" }
];

const sales = [
  { date: "31/03/2025", product: "Racao Premium", category: "Racoes", quantity: "2", total: "R$ 189,80", payment: "Pix" },
  { date: "31/03/2025", product: "Areia Sanitaria", category: "Higiene", quantity: "3", total: "R$ 134,70", payment: "Cartao" },
  { date: "30/03/2025", product: "Petisco Natural", category: "Petiscos", quantity: "5", total: "R$ 99,50", payment: "Dinheiro" },
  { date: "30/03/2025", product: "Shampoo Pet", category: "Higiene", quantity: "1", total: "R$ 48,90", payment: "Pix" },
  { date: "29/03/2025", product: "Brinquedo Mordedor", category: "Brinquedos", quantity: "2", total: "R$ 71,80", payment: "Cartao" }
];

const alerts = [
  { title: "Estoque baixo - Racao Premium", message: "Apenas 18 unidades em estoque. Considere uma nova compra.", type: "Atencao", tone: "warn" },
  { title: "Produto sem estoque - Petisco Natural", message: "Produto esgotado. Verifique a reposicao.", type: "Critico", tone: "danger" },
  { title: "Produto parado - Coleira Ajustavel", message: "Sem vendas ha 67 dias. Considere uma promocao.", type: "Atencao", tone: "warn" },
  { title: "Oportunidade - Areia Sanitaria", message: "Demanda 28% maior que o mes anterior.", type: "Oportunidade", tone: "ok" }
];

const categories = [
  { name: "Racoes", value: "42%", color: "#1d72ff" },
  { name: "Higiene", value: "22%", color: "#ffb020" },
  { name: "Petiscos", value: "15%", color: "#ef4444" },
  { name: "Brinquedos", value: "12%", color: "#22c55e" },
  { name: "Outros", value: "9%", color: "#88a3c1" }
];

function qs(selector, root = document) {
  return root.querySelector(selector);
}

function qsa(selector, root = document) {
  return [...root.querySelectorAll(selector)];
}

function activatePage(page) {
  qsa("[data-page]").forEach((section) => section.classList.toggle("is-active", section.dataset.page === page));
  qsa("[data-page-link]").forEach((button) => button.classList.toggle("is-active", button.dataset.pageLink === page));
  document.body.classList.remove("menu-open");
  history.replaceState(null, "", `#${page}`);
}

function badgeClass(status) {
  if (status === "OK" || status === "Processado" || status === "Oportunidade") return "ok";
  if (status === "Sem estoque" || status === "Critico") return "danger";
  return "warn";
}

function renderTopProducts() {
  qs("#topProducts").innerHTML = products
    .map((product, index) => `
      <li>
        <b>${index + 1}</b>
        <div><strong>${product.name}</strong><span>${product.units}</span></div>
        <strong>${product.revenue}</strong>
      </li>
    `)
    .join("");
}

function renderFilters() {
  const categoryFilter = qs("#categoryFilter");
  const categoriesSet = [...new Set(products.map((product) => product.category))];
  categoryFilter.innerHTML += categoriesSet.map((category) => `<option>${category}</option>`).join("");
}

function renderProducts() {
  const search = qs("#productSearch").value.trim().toLowerCase();
  const category = qs("#categoryFilter").value;
  const status = qs("#statusFilter").value;

  const filtered = products.filter((product) => {
    const matchesSearch = !search || product.name.toLowerCase().includes(search);
    const matchesCategory = !category || product.category === category;
    const matchesStatus = !status || product.status === status;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  qs("#productsTable").innerHTML = filtered
    .map((product) => `
      <tr>
        <td><div class="product-cell"><span class="product-emoji">${product.icon}</span><strong>${product.name}</strong></div></td>
        <td>${product.category}</td>
        <td>${product.stock}</td>
        <td>${product.avg}/dia</td>
        <td>${product.days}</td>
        <td><span class="badge ${badgeClass(product.status)}">${product.status}</span></td>
      </tr>
    `)
    .join("");
}

function renderStock() {
  qs("#stockList").innerHTML = products
    .map((product) => `
      <div class="stock-row">
        <div><strong>${product.name}</strong><p>Estoque ${product.stock} - Venda media ${product.avg}/dia - aproximadamente ${product.days} dias</p></div>
        <span class="badge ${badgeClass(product.status)}">${product.status}</span>
      </div>
    `)
    .join("");
}

function renderAlerts() {
  qs("#alertList").innerHTML = alerts
    .map((alert) => `
      <div class="alert-row">
        <div><strong>${alert.title}</strong><p>${alert.message}</p></div>
        <span class="badge ${alert.tone}">${alert.type}</span>
      </div>
    `)
    .join("");
}

function renderImports() {
  qs("#importsTable").innerHTML = imports
    .map((item) => `
      <tr>
        <td>${item.file}</td>
        <td>${item.date}</td>
        <td>${item.records}</td>
        <td>${item.products}</td>
        <td>${item.period}</td>
        <td><span class="badge ${badgeClass(item.status)}">${item.status}</span></td>
      </tr>
    `)
    .join("");

  qs("#dataTable").innerHTML = imports
    .map((item) => `
      <tr>
        <td>${item.file}</td>
        <td>${item.user}</td>
        <td>${item.records}</td>
        <td>${item.errors}</td>
        <td>${item.period}</td>
        <td><span class="badge ${badgeClass(item.status)}">${item.status}</span></td>
        <td><button class="text-button" type="button">Detalhes</button></td>
      </tr>
    `)
    .join("");
}

function renderSales() {
  qs("#salesTable").innerHTML = sales
    .map((sale) => `
      <tr>
        <td>${sale.date}</td>
        <td>${sale.product}</td>
        <td>${sale.category}</td>
        <td>${sale.quantity}</td>
        <td>${sale.total}</td>
        <td>${sale.payment}</td>
      </tr>
    `)
    .join("");
}

function renderCharts() {
  const values = [42, 62, 55, 78, 48, 92, 34, 66, 58, 98, 76, 88, 82, 67];
  qs("#barChart").innerHTML = values.map((value) => `<span style="height: ${value}%"></span>`).join("");
  qs("#categoryLegend").innerHTML = categories
    .map((category) => `<li><i style="background:${category.color}"></i><strong>${category.name}</strong><span>${category.value}</span></li>`)
    .join("");
}

function handleFile(file) {
  const status = qs("#importStatus");
  const accepted = [".csv", ".xlsx", ".xls"];
  const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  const maxSize = 20 * 1024 * 1024;

  if (!accepted.includes(extension)) {
    status.innerHTML = `<strong>Formato invalido.</strong><span>Envie apenas arquivos .csv, .xlsx ou .xls.</span>`;
    return;
  }

  if (file.size > maxSize) {
    status.innerHTML = `<strong>Arquivo muito grande.</strong><span>O limite do MVP e 20MB por arquivo.</span>`;
    return;
  }

  status.innerHTML = `<strong>${file.name}</strong><span>Status: enviado para validacao local. Proxima etapa real: salvar no Supabase Storage e processar por lotes.</span>`;
}

function appendMessage(content, type) {
  const message = document.createElement("div");
  message.className = `message ${type === "user" ? "user-message" : "bot-message"}`;
  message.innerHTML = content;
  qs("#chatMessages").appendChild(message);
  qs("#chatMessages").scrollTop = qs("#chatMessages").scrollHeight;
}

function assistantReply(question) {
  const text = question.toLowerCase();
  if (text.includes("2 dias") && !text.includes("marco") && !text.includes("março") && !text.includes("agora")) {
    return `<p>Para calcular 2 dias e meio, preciso da ancora do periodo. Voce quer considerar os ultimos 2,5 dias ate agora ou a partir de uma data especifica?</p><div class="calc-box"><strong>Como calculei</strong><span>Nenhuma funcao foi executada porque o periodo esta ambiguo.</span></div>`;
  }
  if (text.includes("estoque") || text.includes("parado")) {
    return `<p>O valor estimado em estoque e de R$ 28.430,00. Existem 45 produtos parados e 12 produtos em risco.</p><div class="calc-box"><strong>Como calculei</strong><span>Funcao prevista: get_inventory_value + get_stagnant_products. Registros considerados: 892 produtos.</span></div>`;
  }
  if (text.includes("produto") || text.includes("vendido")) {
    return `<p>O produto mais vendido no periodo foi Racao Premium, com 245 unidades e R$ 3.675,00 em receita.</p><div class="calc-box"><strong>Como calculei</strong><span>Funcao prevista: get_top_products. Periodo: 01/03/2025 a 31/03/2025.</span></div>`;
  }
  return `<p>Seu faturamento no periodo exibido foi de R$ 42.580,00, considerando 1.248 vendas.</p><div class="calc-box"><strong>Como calculei</strong><span>Funcao prevista: get_dashboard_summary. Periodo: 01/03/2025 a 31/03/2025.</span></div>`;
}

function bindEvents() {
  qsa("[data-page-link]").forEach((button) => {
    button.addEventListener("click", () => activatePage(button.dataset.pageLink));
  });

  qs(".menu-toggle").addEventListener("click", () => document.body.classList.toggle("menu-open"));

  ["productSearch", "categoryFilter", "statusFilter"].forEach((id) => qs(`#${id}`).addEventListener("input", renderProducts));

  qs("#selectFileButton").addEventListener("click", () => qs("#fileInput").click());
  qs("#fileInput").addEventListener("change", (event) => {
    const [file] = event.target.files;
    if (file) handleFile(file);
  });

  qs("#dropZone").addEventListener("dragover", (event) => {
    event.preventDefault();
    event.currentTarget.classList.add("is-dragging");
  });
  qs("#dropZone").addEventListener("dragleave", (event) => event.currentTarget.classList.remove("is-dragging"));
  qs("#dropZone").addEventListener("drop", (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove("is-dragging");
    const [file] = event.dataTransfer.files;
    if (file) handleFile(file);
  });

  qs("#chatForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = qs("#chatInput");
    const question = input.value.trim();
    if (!question) return;
    appendMessage(question, "user");
    input.value = "";
    window.setTimeout(() => appendMessage(assistantReply(question), "bot"), 320);
  });

  qsa(".quick-prompts button").forEach((button) => {
    button.addEventListener("click", () => {
      qs("#chatInput").value = button.textContent;
      qs("#chatForm").requestSubmit();
    });
  });

  qs("#newChatButton").addEventListener("click", () => {
    qs("#chatMessages").innerHTML = `<div class="message bot-message"><p>Nova conversa iniciada. Pergunte sobre faturamento, estoque, produtos ou alertas.</p></div>`;
  });
}

function init() {
  renderTopProducts();
  renderFilters();
  renderProducts();
  renderStock();
  renderAlerts();
  renderImports();
  renderSales();
  renderCharts();
  bindEvents();
  const initialPage = location.hash.replace("#", "") || "dashboard";
  if (qs(`[data-page="${initialPage}"]`)) activatePage(initialPage);
}

init();
