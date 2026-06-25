document.addEventListener("DOMContentLoaded", () => {
  // --- CANVAS ANIMATION LOGIC ---
  const canvas = document.getElementById("hero-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];

    // Configuration
    const particleCount = 80;
    const connectionDistance = 150;
    const moveSpeed = 0.8;

    function resize() {
      const parent = canvas.parentElement;
      if (parent) {
        width = canvas.width = parent.offsetWidth;
        height = canvas.height = parent.offsetHeight;
      }
    }

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * moveSpeed;
        this.vy = (Math.random() - 0.5) * moveSpeed;
        this.size = Math.random() * 2 + 1.5;
        this.alpha = Math.random() * 0.5 + 0.4;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 210, 255, ${this.alpha})`;
        ctx.fill();
      }
    }

    function init() {
      resize();
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, index) => {
        p.update();
        p.draw();

        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            const opacity = 1 - distance / connectionDistance;
            ctx.strokeStyle = `rgba(0, 150, 255, ${opacity * 0.25})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    }

    window.addEventListener("resize", () => {
      resize();
      init();
    });

    init();
    animate();
  }

  // --- THEME TOGGLE LOGIC ---
  const themeToggleBtn = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;

  // Check for saved user preference, if any, on load of the website
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  if (savedTheme) {
    htmlElement.setAttribute("data-theme", savedTheme);
    updateIcon(savedTheme);
  } else if (systemPrefersDark) {
    htmlElement.setAttribute("data-theme", "dark");
    updateIcon("dark");
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      htmlElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateIcon(newTheme);
    });
  }

  function updateIcon(theme) {
    if (themeToggleBtn) {
      if (theme === "dark") {
        themeToggleBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.936.566-3.745 1.535-5.25A9.75 9.75 0 1 0 21.752 15.002z"/></svg>`;
      } else {
        themeToggleBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
      }
    }
  }

  // --- LANGUAGE TOGGLE LOGIC ---
  const langToggleBtn = document.getElementById("lang-toggle");

  const translations = {
    pt: {
      "nav.home": "Início",
      "nav.about": "Sobre",
      "nav.courses": "Minicursos",
      "nav.team": "Equipe",
      "hero.tagline": "Economia • Dados • Inteligência Artificial • Pesquisa",
      "hero.title": "Ciência de Dados e IA aplicada à<br><span class='highlight-cyan'>Economia e Finanças</span>",
      "hero.subtitle":
        "Projeto de extensão da UFJF. Tornamos a programação e IA acessíveis para todos.",
      "hero.cta": "Inscrever-se Agora",
      "about.title": "Sobre o Projeto",
      "about.p1":
        "O QuantEcon UFJF estabelece-se como um projeto de extensão universitária de excelência, dedicado a redefinir e modernizar o ensino e a pesquisa em Economia e Finanças. Parte-se da premissa de que o domínio de linguagens de programação e de metodologias computacionais constitui um novo pilar da análise econômica quantitativa — um requisito essencial para o profissional e o pesquisador contemporâneos.",
      "about.p2":
        "Diante de um cenário global cada vez mais orientado por Big Data, algoritmos avançados e processos de decisão automatizados, o projeto busca fortalecer a capacidade analítica da comunidade acadêmica. Para isso, promove o uso de ferramentas open-source de alto desempenho, aplicáveis a desafios que vão desde a modelagem macroeconômica estocástica e a análise financeira de alta frequência até o desenvolvimento e uso de sistemas de Inteligência Artificial voltados para fenômenos econômicos.",
      "about.p3":
        "A atuação do QuantEcon UFJF preenche uma lacuna crucial ao integrar a fronteira da tecnologia computacional diretamente ao ambiente de sala de aula e aos centros de pesquisa da Universidade Federal de Juiz de Fora. O projeto não apenas apresenta a teoria: ele capacita seus participantes a transformar conceitos abstratos em soluções computacionais robustas, reproduzíveis e orientadas para resultados. Dessa forma, prepara estudantes e pesquisadores para atender às demandas mais sofisticadas do mercado de trabalho e da produção científica internacional.",
      "courses.title": "Minicursos Oferecidos",
      "courses.subtitle":
        "Clique nos cards abaixo para acessar o formulário de inscrição.",
      "course.python.title": "Introdução ao Python",
      "course.python.desc":
        "Domine Data Science do zero. Aprenda Pandas, NumPy e Matplotlib com aplicação direta em economia e finanças.",
      "course.r.title": "Introdução ao R",
      "course.r.desc":
        "Potência para estatística. A ferramenta ideal para econometria, modelagem e visualização de dados em pesquisa acadêmica.",
      "course.git.title": "Essencial de Git & GitHub",
      "course.git.desc":
        "Controle total. Aprenda a gerenciar versões, colaborar em equipes e profissionalizar o seu fluxo de trabalho.",
      "course.ai.title": "IA Generativa",
      "course.ai.desc":
        "Produtividade acadêmica. Acelere sua pesquisa e escrita utilizando engenharia de prompts com ChatGPT e Claude.",
      "course.learn_more": "VER DETALHES &rarr;",
      "course.cta": "Inscrever-se →",
      "course.soon": "Em breve",
      "footer.text":
        "© 2025 Projeto QuantEcon | Universidade Federal de Juiz de Fora",
      "team.title": "Nossa Equipe",
      "team.subtitle":
        "Conheça os profissionais e voluntários que fazem o QuantEcon acontecer.",
      "team.role.advisor": "Orientador",
      "team.bio.paulo":
        "Doutor e mestre em economia pela Escola Brasileira de Economia e Finanças da Fundação Getulio Vargas (EPGE/FGV-RJ), Paulo C. Coimbra é professor associado na Faculdade de Economia da Universidade Federal de Juiz de Fora (FE/UFJF). Coimbra também possui especializações em métodos estatísticos computacionais e em desenvolvimento de sistemas com tecnologia Java (ambas pelo Instituto de Ciências Exatas da Universidade Federal de Juiz de Fora - ICE/UFJF). O economista é formado pela Universidade Santa Úrsula (USU-RJ) e já lecionou em cursos de economia e finanças na Fundação Getulio Vargas (FGV-RJ), Pontifícia Universidade Católica (PUC-RJ) e Ibmec Business School (Ibmec-RJ). Escreveu sobre derivativos no portal de notícias InfoMoney.",
      "team.volunteers": "Membros",
      // Form Translations
      "form.python.title": "Inscrição Python",
      "form.r.title": "Inscrição em R",
      "form.subtitle": "Preencha os dados abaixo para garantir sua vaga.",
      "form.name.label": "Nome Completo",
      "form.name.placeholder": "Digite seu nome completo",
      "form.email.label": "E-mail",
      "form.email.placeholder": "seu@email.com",
      "form.phone.label": "Telefone",
      "form.phone.placeholder": "(99) 99999-9999",
      "form.level.python.label": "Nível de Conhecimento em Python",
      "form.level.r.label": "Nível de Conhecimento em R",
      "form.select.default": "Selecione uma opção",
      "form.level.beginner": "Iniciante",
      "form.level.intermediate": "Intermediário",
      "form.level.advanced": "Avançado",
      "form.submit": "Confirmar Inscrição",
      "form.back": "← Voltar para a página inicial",
    },
    en: {
      "nav.home": "Home",
      "nav.about": "About",
      "nav.courses": "Crash Courses",
      "nav.team": "Team",
      "hero.tagline": "Economics • Data • Artificial Intelligence • Research",
      "hero.title": "Data Science and AI applied to<br><span class='highlight-cyan'>Economics and Finance</span>",
      "hero.subtitle":
        "UFJF extension project. We make programming and AI accessible to everyone.",
      "hero.cta": "Register Now",
      "about.title": "About the Project",
      "about.p1":
        "QuantEcon UFJF establishes itself as an extension project of excellence, dedicated to redefining and modernizing teaching and research in Economics and Finance. It starts from the premise that the mastery of programming languages and computational methodologies constitutes a new pillar of quantitative economic analysis — an essential requirement for contemporary professionals and researchers.",
      "about.p2":
        "In a global scenario increasingly driven by Big Data, advanced algorithms, and automated decision processes, the project seeks to strengthen the analytical capacity of the academic community. To this end, it promotes the use of high-performance open-source tools, applicable to challenges ranging from stochastic macroeconomic modeling and high-frequency financial analysis to the development and use of Artificial Intelligence systems for economic phenomena.",
      "about.p3":
        "The work of QuantEcon UFJF fills a crucial gap by integrating the frontier of computational technology directly into the classroom and research centers of the Federal University of Juiz de Fora. The project does not just present theory: it empowers its participants to transform abstract concepts into robust, reproducible, and result-oriented computational solutions. Thus, it prepares students and researchers to meet the most sophisticated demands of the job market and international scientific production.",
      "courses.title": "Crash Courses Offered",
      "courses.subtitle":
        "Click on the cards below to access the registration form.",
      "course.python.title": "Introduction to Python",
      "course.python.desc":
        "Master Data Science from scratch. Learn Pandas, NumPy, and Matplotlib with direct application in economics and finance.",
      "course.r.title": "Introduction to R",
      "course.r.desc":
        "Power used by statisticians. The ideal tool for econometrics, modeling, and data visualization in academic research.",
      "course.git.title": "Git & GitHub Essentials",
      "course.git.desc":
        "Total control. Learn version management, team collaboration, and professionalize your development workflow.",
      "course.ai.title": "Generative AI",
      "course.ai.desc":
        "Academic productivity. Accelerate your research and writing using prompt engineering with ChatGPT and Claude.",
      "course.learn_more": "VIEW DETAILS &rarr;",
      "course.cta": "Register →",
      "course.soon": "Coming Soon",
      "footer.text":
        "© 2025 QuantEcon Project | Federal University of Juiz de Fora",
      "team.title": "Our Team",
      "team.subtitle":
        "Meet the professionals and volunteers who make QuantEcon happen.",
      "team.role.advisor": "Supervisor",
      "team.bio.paulo":
        "PhD and Master in Economics from the Brazilian School of Economics and Finance at Getulio Vargas Foundation (EPGE/FGV-RJ), Paulo C. Coimbra is an adjunct professor at the Faculty of Economics of the Federal University of Juiz de Fora (FE/UFJF). Coimbra also holds specializations in computational statistical methods and system development with Java technology (both from the Institute of Exact Sciences at the Federal University of Juiz de Fora - ICE/UFJF). The economist graduated from Santa Úrsula University (USU-RJ) and has taught economics and finance courses at Getulio Vargas Foundation (FGV-RJ), Pontifical Catholic University (PUC-RJ), and Ibmec Business School (Ibmec-RJ). He wrote about derivatives on the InfoMoney news portal.",
      "team.volunteers": "Members",
      // Form Translations
      "form.python.title": "Python Registration",
      "form.r.title": "R Registration",
      "form.subtitle": "Fill out the details below to secure your spot.",
      "form.name.label": "Full Name",
      "form.name.placeholder": "Enter your full name",
      "form.email.label": "E-mail",
      "form.email.placeholder": "your@email.com",
      "form.phone.label": "Phone",
      "form.phone.placeholder": "(99) 99999-9999",
      "form.level.python.label": "Python Knowledge Level",
      "form.level.r.label": "R Knowledge Level",
      "form.select.default": "Select an option",
      "form.level.beginner": "Beginner",
      "form.level.intermediate": "Intermediate",
      "form.level.advanced": "Advanced",
      "form.submit": "Confirm Registration",
      "form.back": "← Back to Home",
    },
  };

  function setLanguage(lang) {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    if (langToggleBtn) {
      langToggleBtn.textContent = lang === "pt" ? "PT" : "EN";
    }

    localStorage.setItem("language", lang);
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }

  // Initialize language
  const savedLang = localStorage.getItem("language") || "pt";
  setLanguage(savedLang);

  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
      const currentLang = localStorage.getItem("language") || "pt";
      const newLang = currentLang === "pt" ? "en" : "pt";
      setLanguage(newLang);
    });
  }
  // --- MODAL LOGIC ---
  const modal = document.getElementById("course-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalInstructor = document.getElementById("modal-instructor");
  const modalDates = document.getElementById("modal-dates");
  const modalLocation = document.getElementById("modal-location");
  const closeBtn = document.querySelector(".close-modal");

  const courseData = {
    python: {
      title: "Introdução à Programação em Python",
      instructor: "Davi Braz de Morais (Projeto QuantEcon)",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSfHCzPp_gyzokWubHWcD9TOfvd-WQf1wjIi8eaaJyy_3FRLAA/viewform?usp=publish-editor",
      dates: [
        { label: "Quarta, 21/01/2026 – 19h às 22h" },
        { label: "Quarta, 28/01/2026 – 19h às 22h" },
      ],
      location: "Prédio da Faculdade de Economia – UFJF, Campus Juiz de Fora",
    },
    r: {
      title: "Introdução ao R para Manipulação e Análise de Dados",
      instructor: "Eric Loures (Projeto QuantEcon)",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSfGYsMNWuJ-ctFUJRsIEY_PXy0kaeatKL9lk9BHoGZMf3RBNw/viewform?usp=publish-editor",
      dates: [
        { label: "Quarta, 21/01/2026 – 19h às 22h" },
        { label: "Quarta, 28/01/2026 – 19h às 22h" },
      ],
      location: "Prédio da Faculdade de Economia – UFJF, Campus Juiz de Fora",
    },
    git: {
      title: "Curso Essencial de Git & GitHub",
      instructor: "Lucas Braga Ciotola (Projeto QuantEcon)",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSdOb66xfReWiviXocbuSyuDTx6xkv-fzv2NZsMp-QAvdCidkg/viewform?usp=publish-editor",
      dates: [
        { label: "Quinta, 22/01/2026 – 19h às 21h" },
        { label: "Sexta, 23/01/2026 – 19h às 21h" },
      ],
      location: "Prédio da Faculdade de Economia – UFJF, Campus Juiz de Fora",
    },
  };

  document.querySelectorAll(".btn-learn-more").forEach((btn) => {
    btn.addEventListener("click", () => {
      const courseKey = btn.getAttribute("data-course");
      const data = courseData[courseKey];

      if (data) {
        modalTitle.textContent = data.title;
        modalInstructor.textContent = data.instructor;
        modalLocation.textContent = data.location;

        // Populate dates
        modalDates.innerHTML = "";
        data.dates.forEach((item) => {
          const li = document.createElement("li");
          li.className = "date-item"; // For styling

          if (data.link) {
            // New Behavior: Single course link, no button per date
            li.innerHTML = `<span class="date-text">${item.label}</span>`;
          } else {
            // Legal Behavior: Link per date
            li.innerHTML = `
              <span class="date-text">${item.label}</span>
              <a href="${item.link}" target="_blank" class="date-subscribe-btn">Inscrever-se</a>
            `;
          }

          modalDates.appendChild(li);
        });

        // Handle single main button
        // Remove existing main button if any
        const existingBtn = document.querySelector(".modal-main-subscribe-btn");
        if (existingBtn) existingBtn.remove();

        if (data.link) {
          const mainBtn = document.createElement("a");
          mainBtn.href = data.link;
          mainBtn.target = "_blank";
          mainBtn.className = "date-subscribe-btn modal-main-subscribe-btn"; // Reuse class for style or add new
          mainBtn.textContent = "Inscrever-se no Curso";
          mainBtn.style.display = "block";
          mainBtn.style.width = "100%";
          mainBtn.style.textAlign = "center";
          mainBtn.style.marginTop = "20px";

          // Insert after the dates list
          modalDates.after(mainBtn);
        }

        modal.classList.add("show");
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("show");
    });
  }

  // Close on outside click
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });

  // Note: Header is absolute so no scroll logic is needed here.

  // --- HAMBURGER MENU LOGIC ---
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-menu a").forEach((n) =>
      n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }),
    );
  }

  // --- LOAD MORE VOLUNTEERS LOGIC ---
  const loadMoreBtn = document.getElementById("load-more-btn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      const hiddenVolunteers = document.querySelectorAll(".hidden-volunteer");
      hiddenVolunteers.forEach((card) => {
        card.classList.remove("hidden-volunteer");
      });
      // Hide the button after loading all members
      loadMoreBtn.parentElement.style.display = "none";
    });
  }
});
