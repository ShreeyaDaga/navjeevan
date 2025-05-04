document.addEventListener('DOMContentLoaded', () => {
    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get the section to show
        const sectionToShow = link.getAttribute('data-section');
        
        // Remove active class from all links and sections
        navLinks.forEach(item => item.classList.remove('active'));
        sections.forEach(item => item.classList.remove('active'));
        
        // Add active class to clicked link and corresponding section
        link.classList.add('active');
        document.getElementById(sectionToShow).classList.add('active');
        
        // Scroll to top of the section
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // In a real application, you would send this data to a server
        // For now, we'll just show an alert
        alert(`Thank you, ${name}! Your message has been received. We'll contact you at ${email} soon.`);
        
        // Reset the form
        contactForm.reset();
      });
    }
    
    // Optional: Add image loading animation
    const galleryImages = document.querySelectorAll('.art-item img');
    
    galleryImages.forEach(img => {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
    });
  });