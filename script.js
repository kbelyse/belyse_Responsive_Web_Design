document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const backgroundCanvas = document.getElementById("backgroundCanvas");
  const ctx = backgroundCanvas.getContext("2d");
  backgroundCanvas.width = window.innerWidth;
  backgroundCanvas.height = window.innerHeight;

  let dots = [];
  for (let i = 0; i < 50; i++) {
    dots.push({
      x: Math.random() * backgroundCanvas.width,
      y: Math.random() * backgroundCanvas.height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      color: `rgba(255, 255, 255, 0.3)`
    });
  }

  function animateBackground() {
    ctx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
    for (let dot of dots) {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
      ctx.fillStyle = dot.color;
      ctx.fill();
      dot.x += dot.speedX;
      dot.y += dot.speedY;
      if (dot.x < 0 || dot.x > backgroundCanvas.width) dot.speedX *= -1;
      if (dot.y < 0 || dot.y > backgroundCanvas.height) dot.speedY *= -1;
    }
    requestAnimationFrame(animateBackground);
  }
  animateBackground();

  window.addEventListener("resize", () => {
    backgroundCanvas.width = window.innerWidth;
    backgroundCanvas.height = window.innerHeight;
    dots = [];
    for (let i = 0; i < 50; i++) {
      dots.push({
        x: Math.random() * backgroundCanvas.width,
        y: Math.random() * backgroundCanvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: `rgba(255, 255, 255, 0.3)`
      });
    }
  });

  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    document.getElementById("progressBar").style.transform = `scaleX(${progress / 100})`;
  });

  const menuIcon = document.getElementById("menuIcon");
  const navLinks = document.getElementById("navLinks");
  menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    gsap.fromTo(navLinks, { height: 0 }, { height: "auto", duration: 0.5, ease: "power2.out" });
  });

  const themeToggle = document.getElementById("themeToggle");
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    dots.forEach(dot => {
      dot.color = isLight ? `rgba(0, 0, 0, 0.3)` : `rgba(255, 255, 255, 0.3)`;
    });
  });

  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    dots.forEach(dot => {
      dot.color = `rgba(0, 0, 0, 0.3)`;
    });
  }

  const scrollDown = document.querySelector(".scroll-down");
  if (scrollDown) {
    scrollDown.addEventListener("click", () => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" }); // Fallback to native scroll
        console.log("Scroll triggered to #about");
      } else {
        console.error("About section not found");
      }
    });
  } else {
    console.error("Scroll-down element not found");
  }

  const contactForm = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");
  const successSnackbar = document.getElementById("successSnackbar");

  if (contactForm && successSnackbar) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      // Reset error messages
      nameError.style.display = "none";
      emailError.style.display = "none";
      messageError.style.display = "none";
      successSnackbar.style.display = "none";
      successSnackbar.classList.remove("show");

      // Validate name
      if (!nameInput.value.trim()) {
        nameError.textContent = "Please enter your name.";
        nameError.style.display = "block";
        isValid = false;
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim()) {
        emailError.textContent = "Please enter your email address.";
        emailError.style.display = "block";
        isValid = false;
      } else if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = "Please enter a valid email address (e.g., example@domain.com).";
        emailError.style.display = "block";
        isValid = false;
      }

      // Validate message
      if (!messageInput.value.trim()) {
        messageError.textContent = "Please enter a message.";
        messageError.style.display = "block";
        isValid = false;
      }

      if (isValid) {
        successSnackbar.textContent = `Message sent!\nName: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\nMessage: ${messageInput.value.trim()}`;
        successSnackbar.style.display = "block";
        successSnackbar.classList.add("show");
        contactForm.reset();

        // Auto-hide after 3 seconds
        setTimeout(() => {
          successSnackbar.classList.remove("show");
          setTimeout(() => (successSnackbar.style.display = "none"), 300); // Match CSS transition
        }, 3000);
      }
    });
  } else {
    console.error("Contact form or successSnackbar element not found");
  }
});