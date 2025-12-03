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
/*
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
*/
// Articles toggle thingy
function toggleArticle(element) {
    const content = element.nextElementSibling;
    const modal = document.getElementById('articleModal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = content.innerHTML;
    modal.classList.add('active');
}

function closeArticle() {
    document.getElementById('articleModal').classList.remove('active');
}

// Image fancy animation
window.addEventListener("load", () => {
  console.log("Animation script starting...");
  
  // Check if image exists
  const imageEl = document.querySelector(".image");
  console.log("Image element found:", imageEl);
  
  if (!imageEl) {
    console.error("No .image element found!");
    return;
  }

  // Use Waypoint to trigger animation
  $(".image").waypoint(
    function(direction) {
      console.log("Waypoint triggered! Direction:", direction);
      playAnimation();
      this.destroy();
    },
    {
      offset: "bottom-in-view" // Trigger when bottom of element enters viewport
    }
  );
  
  console.log("Waypoint setup complete");
});

// Fetch and display article previews on homepage
function loadArticlePreviews() {
  fetch('articles.html')
    .then(response => response.text())
    .then(html => {
      // Create a temporary element to parse the HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Find all article cards
      const articleCards = doc.querySelectorAll('.article-card');
      
      // Get the preview container
      const previewContainer = document.getElementById('articles-preview');
      
      // Clear loading message
      previewContainer.innerHTML = '';
      
      // Take first 3 cards (or all if less than 3)
      const cardsToShow = Array.from(articleCards).slice(0, 3);
      
      // Insert each card
      cardsToShow.forEach(card => {
        previewContainer.appendChild(card.cloneNode(true));
      });
      
      // If no cards found
      if (cardsToShow.length === 0) {
        previewContainer.innerHTML = '<p>No articles available yet.</p>';
      }
    })
    .catch(error => {
      console.error('Error loading articles:', error);
      document.getElementById('articles-preview').innerHTML = 
        '<p>Failed to load articles.</p>';
    });
}

// Fetch and display event previews on homepage
function loadEventPreviews() {
  fetch('events.html')
    .then(response => response.text())
    .then(html => {
      // Create a temporary element to parse the HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Find all event items
      const eventItems = doc.querySelectorAll('.event-item');
      
      // Get the preview container
      const previewContainer = document.getElementById('events-preview');
      
      // Clear loading message
      previewContainer.innerHTML = '';
      
      // Take first 3 events (or all if less than 3)
      const eventsToShow = Array.from(eventItems).slice(0, 3);
      
      // Insert each event
      eventsToShow.forEach(event => {
        previewContainer.appendChild(event.cloneNode(true));
      });
      
      // If no events found
      if (eventsToShow.length === 0) {
        previewContainer.innerHTML = '<p>No upcoming events yet.</p>';
      }
    })
    .catch(error => {
      console.error('Error loading events:', error);
      document.getElementById('events-preview').innerHTML = 
        '<p>Failed to load events.</p>';
    });
}

// Load all previews when page loads
window.addEventListener('load', () => {
  loadArticlePreviews();
  loadEventPreviews();
});
