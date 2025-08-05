// Function to load HTML components
async function loadComponent(componentName) {
    // Detect base path (different for root vs product pages)
    const isProductPage = window.location.pathname.includes('products');
    const basePath = isProductPage ? '../../' : '';
    
    // Debugging: Show the paths being used
    console.log('Component paths:', {
        navbar: `${basePath}components/navbar.html`,
        footer: `${basePath}components/footer.html`
    });

    try {
        const response = await fetch(`${basePath}components/${componentName}.html`);
        if (!response.ok) throw new Error(`Failed to load ${componentName}`);
        const html = await response.text();
        document.getElementById(`${componentName}-container`).innerHTML = html;
    } catch (error) {
        console.error(`Error loading ${componentName}:`, error);
    }
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Load components first
    loadComponent('navbar');
    loadComponent('footer').then(() => {
        // Then run other scripts that might depend on components
        
        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        
        // Initial scroll state
        navbar.classList.toggle('navbar-scrolled', window.scrollY > 50);
        
        // Scroll event listener
        window.addEventListener('scroll', function() {
            navbar.classList.toggle('navbar-scrolled', window.scrollY > 50);
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Highlight current page in nav
        const currentPage = location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });
    });
});