// Gallery JavaScript for Skønheds-Laboratoriet

document.addEventListener('DOMContentLoaded', function() {
  // Initialize gallery functionality
  initGallery();
  
  // Initialize category filtering
  initCategoryFilter();
  
  // Initialize lightbox
  initLightbox();
});

function initGallery() {
  // Add click event to play icons for GIFs
  const playIcons = document.querySelectorAll('.play-icon');
  playIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      const container = this.closest('.gif-container');
      const gifUrl = container.dataset.gif;
      const img = container.querySelector('img');
      
      // Replace image with GIF
      img.src = gifUrl;
      
      // Hide play icon
      this.style.display = 'none';
    });
  });
}

function initCategoryFilter() {
  const categories = document.querySelectorAll('.gallery-category');
  const items = document.querySelectorAll('.gallery-item');
  
  categories.forEach(category => {
    category.addEventListener('click', function() {
      // Remove active class from all categories
      categories.forEach(cat => cat.classList.remove('active'));
      
      // Add active class to clicked category
      this.classList.add('active');
      
      const filter = this.dataset.filter;
      
      // Show all items if filter is 'all'
      if (filter === 'all') {
        items.forEach(item => item.style.display = 'block');
        return;
      }
      
      // Filter items based on category
      items.forEach(item => {
        if (item.dataset.category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox');
  const lightboxContent = document.querySelector('.lightbox-content');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  
  let currentIndex = 0;
  
  // Open lightbox when gallery item is clicked
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', function(e) {
      // Don't open lightbox if play icon was clicked
      if (e.target.closest('.play-icon')) {
        return;
      }
      
      currentIndex = index;
      openLightbox(this);
    });
  });
  
  // Close lightbox when close button is clicked
  if (lightboxClose) {
    lightboxClose.addEventListener('click', function() {
      lightbox.classList.remove('active');
    });
  }
  
  // Close lightbox when clicking outside content
  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === this) {
        lightbox.classList.remove('active');
      }
    });
  }
  
  // Navigate to previous item
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', function() {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      openLightbox(galleryItems[currentIndex]);
    });
  }
  
  // Navigate to next item
  if (lightboxNext) {
    lightboxNext.addEventListener('click', function() {
      currentIndex = (currentIndex + 1) % galleryItems.length;
      openLightbox(galleryItems[currentIndex]);
    });
  }
  
  // Handle keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      lightbox.classList.remove('active');
    } else if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      openLightbox(galleryItems[currentIndex]);
    } else if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % galleryItems.length;
      openLightbox(galleryItems[currentIndex]);
    }
  });
  
  function openLightbox(item) {
    // Get media type and source
    const mediaType = item.dataset.type;
    const mediaSrc = mediaType === 'image' ? item.querySelector('img').src : 
                    (mediaType === 'video' ? item.querySelector('video').src : 
                    item.querySelector('.gif-container').dataset.gif);
    
    // Get caption
    const title = item.querySelector('.gallery-title')?.textContent || '';
    const description = item.querySelector('.gallery-description')?.textContent || '';
    
    // Clear previous content
    lightboxContent.innerHTML = '';
    
    // Create media element based on type
    if (mediaType === 'image' || mediaType === 'gif') {
      const img = document.createElement('img');
      img.src = mediaSrc;
      lightboxContent.appendChild(img);
    } else if (mediaType === 'video') {
      const video = document.createElement('video');
      video.src = mediaSrc;
      video.controls = true;
      video.autoplay = true;
      lightboxContent.appendChild(video);
    }
    
    // Set caption
    if (lightboxCaption) {
      lightboxCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
    }
    
    // Show lightbox
    lightbox.classList.add('active');
  }
}
