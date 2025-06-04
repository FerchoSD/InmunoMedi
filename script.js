document.addEventListener('DOMContentLoaded', function() {

    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.transition = 'opacity 0.5s ease';
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // --- Animate on Scroll ---
    const scrollElements = document.querySelectorAll(".animate-on-scroll");

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add("is-visible");
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener("scroll", handleScrollAnimation);
    handleScrollAnimation(); // Initial check

    // --- Back to Top Button ---
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                if (backToTopButton.style.display !== 'flex') {
                    backToTopButton.style.display = 'flex';
                }
            } else {
                if (backToTopButton.style.display !== 'none') {
                    backToTopButton.style.display = 'none';
                }
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('html, body').scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- FAQ Accordion (for Contact Page) ---
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if(question){
                question.addEventListener('click', () => {
                    const currentlyActive = document.querySelector('.faq-item.active');
                    if (currentlyActive && currentlyActive !== item) {
                        currentlyActive.classList.remove('active');
                        currentlyActive.querySelector('.faq-answer').style.maxHeight = 0;
                    }
                    
                    item.classList.toggle('active');
                    const answer = item.querySelector('.faq-answer');
                    if (item.classList.contains('active')) {
                        answer.style.maxHeight = answer.scrollHeight + "px";
                    } else {
                        answer.style.maxHeight = 0;
                    }
                });
            }
        });
    }

    // --- Notification Closing ---
    document.body.addEventListener('click', function(e) {
        if (e.target.closest('.notification-close')) {
            const notification = e.target.closest('.notification');
            if (notification) {
                notification.style.animation = 'fadeOut 0.3s forwards';
                setTimeout(() => notification.remove(), 300);
            }
        }
    });

});