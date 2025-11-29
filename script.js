// Navegação Mobile
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// Header ao fazer scroll
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Animação de números (contador)
const animateNumbers = () => {
  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((stat) => {
    const target = parseInt(stat.getAttribute("data-target"));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateNumber = () => {
      current += increment;
      if (current < target) {
        stat.textContent = Math.floor(current);
        requestAnimationFrame(updateNumber);
      } else {
        stat.textContent = target;
      }
    };

    updateNumber();
  });
};

// Intersection Observer para animações
const observerOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Animar números quando a seção sobre for visível
      if (entry.target.classList.contains("sobre")) {
        animateNumbers();
        observer.unobserve(entry.target);
      }
    }
  });
}, observerOptions);

// Observar seções para animação
const sections = document.querySelectorAll(".section");
sections.forEach((section) => {
  section.classList.add("fade-in");
  observer.observe(section);
});

// Slider de depoimentos
class TestimonialSlider {
  constructor() {
    this.slides = document.querySelectorAll(".depoimento-card");
    this.prevBtn = document.querySelector(".slider-btn.prev");
    this.nextBtn = document.querySelector(".slider-btn.next");
    this.currentSlide = 0;

    this.init();
  }

  init() {
    this.prevBtn.addEventListener("click", () => this.prev());
    this.nextBtn.addEventListener("click", () => this.next());

    // Auto play
    this.autoPlay = setInterval(() => this.next(), 5000);

    // Pausar auto play ao passar o mouse
    const sliderContainer = document.querySelector(".depoimentos-slider");
    sliderContainer.addEventListener("mouseenter", () => {
      clearInterval(this.autoPlay);
    });

    sliderContainer.addEventListener("mouseleave", () => {
      this.autoPlay = setInterval(() => this.next(), 5000);
    });
  }

  showSlide(n) {
    this.slides.forEach((slide) => slide.classList.remove("active"));

    if (n >= this.slides.length) {
      this.currentSlide = 0;
    } else if (n < 0) {
      this.currentSlide = this.slides.length - 1;
    } else {
      this.currentSlide = n;
    }

    this.slides[this.currentSlide].classList.add("active");
  }

  next() {
    this.showSlide(this.currentSlide + 1);
  }

  prev() {
    this.showSlide(this.currentSlide - 1);
  }
}

// Inicializar slider
new TestimonialSlider();

// Formulário de contato
const contatoForm = document.getElementById("contatoForm");

contatoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Coletar dados do formulário
  const formData = new FormData(contatoForm);
  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  // Simular envio (aqui você integraria com backend)
  console.log("Dados do formulário:", data);

  // Feedback visual
  const submitBtn = contatoForm.querySelector(".btn-primary");
  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Enviando...";
  submitBtn.disabled = true;

  // Simular delay de envio
  setTimeout(() => {
    submitBtn.textContent = "Mensagem Enviada!";
    submitBtn.style.background = "#28a745";

    // Resetar formulário
    contatoForm.reset();

    // Restaurar botão após 3 segundos
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.background = "";
      submitBtn.disabled = false;
    }, 3000);
  }, 1500);
});

// Botão voltar ao topo
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add("active");
  } else {
    scrollTopBtn.classList.remove("active");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Animação de entrada nos cards
const animateCards = () => {
  const cards = document.querySelectorAll(".area-card, .depoimento-card");

  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";

      setTimeout(() => {
        card.style.transition = "all 0.5s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 100);
    }, index * 100);
  });
};

// Executar quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  // Adicionar classe para animação inicial do hero
  setTimeout(() => {
    document.querySelector(".hero-content").style.opacity = "1";
  }, 100);

  // Animação parallax no hero
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });
});

// Validação em tempo real do formulário
const formInputs = document.querySelectorAll(
  ".form-group input, .form-group textarea, .form-group select"
);

formInputs.forEach((input) => {
  input.addEventListener("blur", () => {
    if (input.hasAttribute("required") && !input.value.trim()) {
      input.style.borderColor = "#dc3545";
    } else {
      input.style.borderColor = "#e0e0e0";
    }
  });

  input.addEventListener("focus", () => {
    input.style.borderColor = "var(--primary-color)";
  });
});

// Máscara de telefone
const telefoneInput = document.querySelector('input[name="telefone"]');

if (telefoneInput) {
  telefoneInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length <= 11) {
      if (value.length <= 10) {
        value = value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
      } else {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      }
    }

    e.target.value = value;
  });
}

// Efeito de typing no título hero (opcional)
const typeWriter = (element, text, speed = 50) => {
  let i = 0;
  element.textContent = "";

  const type = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };

  type();
};

// Adicionar efeito hover nos cards de área
document.querySelectorAll(".area-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
  });
});

// Performance: Lazy loading de imagens (se houver)
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

console.log("Site carregado com sucesso! 🎉");
