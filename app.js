// Fictitious Demonstration Dataset (Complies with Competition Rule 9)
const DISCOVERY_DATA = [
  {
    type: "programme",
    title: "B.Sc. Computer Science & AI",
    category: "Physical Sciences",
    lead: "Dr. Ibrahim Musa (Demo)",
    summary: "4-year undergraduate degree covering algorithms, software engineering, and low-resource AI systems."
  },
  {
    type: "programme",
    title: "M.Sc. Sustainable Agronomy",
    category: "Agriculture",
    lead: "Prof. Zainab Danjuma (Demo)",
    summary: "2-year postgraduate programme focused on drought-resistant crop genetics and soil health."
  },
  {
    type: "research",
    title: "Solar Microgrids for Rural Clinics",
    category: "Renewable Energy",
    lead: "Engr. Chinedu Okafor (Demo)",
    summary: "Active grant project deploying modular solar storage across Northern Nigerian primary healthcare centres."
  },
  {
    type: "research",
    title: "Hausa-English Medical NLP Corpus",
    category: "Digital Humanities & AI",
    lead: "Dr. Ibrahim Musa (Demo)",
    summary: "Open-access dataset enabling low-bandwidth healthcare translation tools for community health workers."
  },
  {
    type: "scholar",
    title: "Prof. Zainab Danjuma (Demo)",
    category: "Plant Science & Biotechnology",
    lead: "42 Publications • 3 Active Grants",
    summary: "Lead researcher in climate-smart sorghum breeding. Open to international grant collaborations."
  },
  {
    type: "scholar",
    title: "Engr. Chinedu Okafor (Demo)",
    category: "Electrical & Power Engineering",
    lead: "29 Publications • IEEE Senior Member",
    summary: "Specializes in off-grid rural electrification and smart metering infrastructure."
  }
];

const FEE_DATA = {
  ug: [
    { faculty: "Sciences & Computing (UG)", tuition: "₦45,000", levy: "₦15,000", total: "₦60,000" },
    { faculty: "Engineering & Environmental Design (UG)", tuition: "₦50,000", levy: "₦18,000", total: "₦68,000" },
    { faculty: "Arts, Law & Social Sciences (UG)", tuition: "₦40,000", levy: "₦10,000", total: "₦50,000" }
  ],
  pg: [
    { faculty: "M.Sc. / M.Eng. Programmes (PG)", tuition: "₦120,000", levy: "₦25,000", total: "₦145,000" },
    { faculty: "Ph.D. Research Programmes (PG)", tuition: "₦150,000", levy: "₦30,000", total: "₦180,000" },
    { faculty: "Postgraduate Diploma - PGD", tuition: "₦95,000", levy: "₦20,000", total: "₦115,000" }
  ]
};

// 1. Global Search & Filtering
const searchInput = document.getElementById("globalSearch");
const resultsGrid = document.getElementById("searchResults");
const filterPills = document.querySelectorAll(".pill");
let activeFilter = "all";

function renderResults() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = DISCOVERY_DATA.filter(item => {
    const matchesType = activeFilter === "all" || item.type === activeFilter;
    const matchesText =
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.lead.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query);
    return matchesType && matchesText;
  });

  if (filtered.length === 0) {
    resultsGrid.innerHTML = `<p>No matching programmes, research, or scholars found for "<strong>${query}</strong>".</p>`;
    return;
  }

  resultsGrid.innerHTML = filtered.map(item => `
    <article class="card">
      <div>
        <span class="card-type ${item.type === 'scholar' ? 'gold' : ''}">${item.type}</span>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
      </div>
      <div class="card-meta"><strong>${item.category}</strong> &bull; ${item.lead}</div>
    </article>
  `).join("");
}

searchInput.addEventListener("input", renderResults);
filterPills.forEach(pill => {
  pill.addEventListener("click", () => {
    filterPills.forEach(p => p.classList.remove("active"));
    pill.classList.add("active");
    activeFilter = pill.dataset.filter;
    renderResults();
  });
});

// 2. Render Featured Scholars Section
const scholarsGrid = document.getElementById("scholarsGrid");
scholarsGrid.innerHTML = DISCOVERY_DATA.filter(d => d.type === "scholar").map(s => `
  <article class="card">
    <div>
      <span class="card-type gold">Featured Researcher</span>
      <h3>${s.title}</h3>
      <p>${s.summary}</p>
    </div>
    <div class="card-meta">${s.category} &bull; <a href="#support">Request Collaboration &rarr;</a></div>
  </article>
`).join("");

// 3. Tuition & Fees Tabs
const feeTableBody = document.getElementById("feeTableBody");
const tabBtns = document.querySelectorAll(".tab-btn");

function renderFees(tier) {
  feeTableBody.innerHTML = FEE_DATA[tier].map(row => `
    <tr>
      <td><strong>${row.faculty}</strong></td>
      <td>${row.tuition}</td>
      <td>${row.levy}</td>
      <td><strong>${row.total}</strong></td>
    </tr>
  `).join("");
}

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    tabBtns.forEach(b => { b.classList.remove("active"); b.setAttribute("aria-selected", "false"); });
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");
    renderFees(btn.dataset.tier);
  });
});

// 4. Support Form Handler
document.getElementById("supportForm").addEventListener("submit", e => {
  e.preventDefault();
  const ticketId = "ABU-" + Math.floor(100000 + Math.random() * 900000);
  document.getElementById("supportFeedback").textContent =
    `Thank you! Your demo support ticket (${ticketId}) has been logged.`;
  e.target.reset();
});

// 5. AI Assistant Chatbot
const chatWidget = document.getElementById("chatWidget");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");

document.getElementById("chatToggle").addEventListener("click", () => {
  chatWidget.classList.toggle("hidden");
});
document.getElementById("chatClose").addEventListener("click", () => {
  chatWidget.classList.add("hidden");
});

function handleChat(question) {
  chatMessages.innerHTML += `<div class="msg user">${question}</div>`;
  const q = question.toLowerCase();
  let reply = "You can use the Global Search bar above to find specific programmes, researchers, or departments.";

  if (q.includes("fee") || q.includes("tuition")) {
    reply = "Demo UG fees range from ₦50,000 to ₦68,000 per session, while PG fees start at ₦115,000. Check the Tuition & Fees section for details.";
  } else if (q.includes("research") || q.includes("solar") || q.includes("energy")) {
    reply = "Active research includes Solar Microgrids (Engr. Chinedu Okafor) and Climate-Smart Agronomy (Prof. Zainab Danjuma).";
  } else if (q.includes("date") || q.includes("semester") || q.includes("calendar")) {
    reply = "First Semester begins on 12 Oct 2026, and exams start on 08 Feb 2027.";
  }

  setTimeout(() => {
    chatMessages.innerHTML += `<div class="msg bot">${reply}</div>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 250);
}

document.getElementById("chatForm").addEventListener("submit", e => {
  e.preventDefault();
  if (!chatInput.value.trim()) return;
  handleChat(chatInput.value.trim());
  chatInput.value = "";
});

document.querySelectorAll(".quick-q").forEach(btn => {
  btn.addEventListener("click", () => handleChat(btn.textContent));
});

// Mobile Nav Toggle
document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("mainNav").classList.toggle("open");
});

// Initial Render
renderResults();
renderFees("ug");
