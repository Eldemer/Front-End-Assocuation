// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Particles.js Configuration
particlesJS("particles-js", {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#ffffff"
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        }
    },
    retina_detect: true
});

// Navbar Scroll Effect
$(window).scroll(function() {
    if ($(window).scrollTop() > 50) {
        $('.navbar').addClass('scrolled');
    } else {
        $('.navbar').removeClass('scrolled');
    }
    
    // Back to Top Button
    if ($(this).scrollTop() > 200) {
        $('.back-to-top').addClass('active');
    } else {
        $('.back-to-top').removeClass('active');
    }
});

// Smooth Scroll
$('a[href*="#"]').not('[href="#"]').click(function(event) {
    if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
        && 
        location.hostname == this.hostname
    ) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    }
});

// Counter Animation
function startCounter() {
    $('.number').each(function() {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).data('count')
        }, {
            duration: 2000,
            easing: 'swing',
            step: function(now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
}

// Start counter when stats section is in viewport
const statsSection = document.querySelector('.stats-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounter();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    observer.observe(statsSection);
}

// Preloader
$(window).on('load', function() {
    $('.preloader').fadeOut(500);
});

// Back to Top Button Click
$('.back-to-top').click(function() {
    $('html, body').animate({
        scrollTop: 0
    }, 800);
    return false;
});

// Mobile Menu
$('.navbar-toggler').click(function() {
    $(this).toggleClass('active');
});

// Add active class to nav items on scroll
$(window).scroll(function() {
    var scrollDistance = $(window).scrollTop();
    
    $('section').each(function(i) {
        if ($(this).position().top <= scrollDistance + 100) {
            $('.navbar-nav .nav-link.active').removeClass('active');
            $('.navbar-nav .nav-link').eq(i).addClass('active');
        }
    });
}).scroll();

// Form Validation
if (document.getElementById('membershipForm')) {
    const form = document.getElementById('membershipForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value) {
                isValid = false;
                field.classList.add('is-invalid');
            } else {
                field.classList.remove('is-invalid');
            }
        });
        
        if (isValid) {
            // Show success message
            Swal.fire({
                title: 'تم إرسال الطلب بنجاح!',
                text: 'سنقوم بمراجعة طلبك والرد عليك قريباً',
                icon: 'success',
                confirmButtonText: 'حسناً'
            });
            
            // Reset form
            form.reset();
        }
    });
}

// Image lazy loading
document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});

// Add hover effect to cards
document.querySelectorAll('.goal-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function(e) {
        this.style.transform = 'translateY(0)';
    });
});

// Add this to your main.js file
document.addEventListener('DOMContentLoaded', function() {
    // Update all "Join Us" buttons to navigate to membership form
    const joinButtons = document.querySelectorAll('.btn-theme').forEach(button => {
        if (button.textContent.trim() === 'انضم إلينا' || 
            button.textContent.trim() === 'Join Us') {
            button.href = 'membership-form.html';
        }
    });
}); 