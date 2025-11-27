   console.log("JavaScript loaded!");
// Wait for everything to load
window.addEventListener("load", () => {
  const intro = document.getElementById("intro");

  // Fade out intro after a tiny delay
  setTimeout(() => {
    intro.style.opacity = "0";

    // Remove from display fully after fade
    setTimeout(() => {
      intro.style.display = "none";

      // Reveal real content smoothly
      document.body.classList.add("loaded");
    }, 1000); // match CSS fade duration

  }, 500); // adjust delay before fade
});

(function () {
  const langBtn = document.querySelector('.lang-btn');
  const langSwitcher = document.querySelector('.lang-switcher');
  const langMenu = document.querySelector('.lang-menu');

  // Toggle menu
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const expanded = langBtn.getAttribute('aria-expanded') === 'true';
    langBtn.setAttribute('aria-expanded', String(!expanded));
    langSwitcher.classList.toggle('active', !expanded);
    langMenu.setAttribute('aria-hidden', String(expanded));
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!langSwitcher.contains(e.target)) {
      langSwitcher.classList.remove('active');
      langBtn.setAttribute('aria-expanded', 'false');
      langMenu.setAttribute('aria-hidden', 'true');
    }
  });

  // Close menu on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      langSwitcher.classList.remove('active');
      langBtn.setAttribute('aria-expanded', 'false');
      langMenu.setAttribute('aria-hidden', 'true');
    }
  });
})();

// 🔍 SEARCH FUNCTIONALITY
const searchInput = document.getElementById("projectSearch");
const items = document.querySelectorAll(".project-item");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  
  items.forEach(item => {
    const title = item.dataset.title.toLowerCase();
    if (title.includes(query)) item.style.display = "block";
    else item.style.display = "none";
  });
});

// 📌 MODAL FUNCTIONALITY
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const closeModal = document.querySelector(".close-modal");

items.forEach(item => {
  item.addEventListener("click", () => {
    modalTitle.textContent = item.dataset.title;
    modalDescription.textContent = item.dataset.description;
    modal.style.display = "flex";
  });
});

closeModal.addEventListener("click", () => modal.style.display = "none");

window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});

// Articles toggle thingy
function toggleArticle(element) {
    console.log("Toggle clicked!", element);
    const content = element.nextElementSibling;
    console.log("Content element:", content);
    content.classList.toggle('open');
}

// Image fancy animation
window.addEventListener("load", () => {
  const results = Splitting({
    target: ".image",
    by: "cells",
    image: true,
    rows: 8
  });

  function myCallback(el) {
    var a = new TimelineMax();
    return a.staggerFromTo(
      ".cell",
      0.5,
      {
        x: 400,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        ease: Power2.ease
      },
      0.05
    );
  }

  $(".image").waypoint(
    function(direction) {
      myCallback();
      this.destroy(); // Play animation once and stop watching
    },
    {
      offset: "80%" // Trigger when image is 80% down the screen
    }
  );
});
