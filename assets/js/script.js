$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

// <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {
        event.preventDefault();
        
        emailjs.init("22putUZ4PdAeLyu2H");

        emailjs.sendForm('service_pfbgoqo', 'template_2ktcivf', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
    });
    // <!-- emailjs to mail contact form data -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Deepak Patidar - Python Developer & AI Engineer";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["AI & Machine Learning", "Python Backend Development", "AWS Cloud Solutions", "Data Engineering", "MLOps & DevOps", "API Development"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    try {
        let response
        type === "skills" ?
            response = await fetch("skills.json")
            :
            response = await fetch("./projects/projects.json")
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    if (!skillsContainer) {
        console.warn('Skills container not found');
        return;
    }
    
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src="${skill.icon}" alt="${skill.name}" loading="lazy" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
    
    // Add staggered animation class to container
    skillsContainer.classList.add('animate-stagger');
    
    // Trigger animation after a short delay
    setTimeout(() => {
        skillsContainer.classList.add('animate');
        
        // Also animate individual bars with a slight delay
        const bars = skillsContainer.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            setTimeout(() => {
                bar.classList.add('animate');
            }, index * 100);
        });
    }, 300);
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    if (!projectsContainer) {
        console.warn('Projects container not found');
        return;
    }
    
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="./assets/images/projects/${project.image}.png" alt="${project.name}" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

}

// Enhanced skills animation with proper timing
fetchData().then(data => {
    showSkills(data);
    
    // Animate skills after they're loaded with multiple attempts
    const animateSkills = () => {
        const skillBars = document.querySelectorAll('.skills .container .bar');
        console.log('Found skill bars:', skillBars.length);
        
        if (skillBars.length > 0) {
            // Force animate class on all skill bars
            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.classList.add('animate');
                    console.log('Animated skill bar:', index);
                }, index * 100);
            });
            
            // Also use ScrollReveal for better effect
            sr.reveal('.skills .container .bar', { 
                origin: 'bottom',
                distance: '40px',
                duration: 500,
                interval: 50,
                delay: 100 
            });
        } else {
            // Retry if skills not loaded yet
            setTimeout(animateSkills, 500);
        }
    };
    
    setTimeout(animateSkills, 500);
    setTimeout(animateSkills, 1000); // Backup attempt
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// Remove the developer mode disabling code as it hurts accessibility and UX
// Developers should be able to inspect the code to learn from it

// Start of Tawk.to Live Chat
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/65fd2532a0c6737bd1238caf/1hpidijtn';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();
// End of Tawk.to Live Chat


/* ===== SCROLL REVEAL ANIMATION ===== */
// Initialize ScrollReveal with optimized settings
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '60px',
    duration: 800,
    delay: 100,
    easing: 'ease-in-out',
    reset: false, // Changed to false for better performance
    viewFactor: 0.2,
    interval: 200,
    scale: 1,
    mobile: true
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    
    /* ===== HOME SECTION ANIMATIONS ===== */
    sr.reveal('.home .content h2', { 
        origin: 'left',
        distance: '100px',
        duration: 1000,
        delay: 200 
    });
    
    sr.reveal('.home .content p', { 
        origin: 'left',
        distance: '80px',
        duration: 800,
        delay: 400 
    });
    
    sr.reveal('.home .content .btn', { 
        origin: 'bottom',
        distance: '50px',
        duration: 600,
        delay: 600 
    });
    
    sr.reveal('.home .image', { 
        origin: 'right',
        distance: '100px',
        duration: 1000,
        delay: 300 
    });
    
    sr.reveal('.home .socials .social-icons li', { 
        origin: 'bottom',
        distance: '30px',
        duration: 600,
        interval: 100,
        delay: 800 
    });

    /* ===== ABOUT SECTION ANIMATIONS ===== */
    sr.reveal('.about .heading', { 
        origin: 'top',
        distance: '50px',
        duration: 800 
    });
    
    sr.reveal('.about .row .image', { 
        origin: 'left',
        distance: '80px',
        duration: 800,
        delay: 200 
    });
    
    sr.reveal('.about .row .content h3', { 
        origin: 'right',
        distance: '60px',
        duration: 600,
        delay: 300 
    });
    
    sr.reveal('.about .row .content .tag', { 
        origin: 'right',
        distance: '40px',
        duration: 600,
        delay: 400 
    });
    
    sr.reveal('.about .row .content p', { 
        origin: 'right',
        distance: '60px',
        duration: 800,
        delay: 500 
    });
    
    // Enhanced about section animations
    sr.reveal('.expertise-highlights .highlight-item', { 
        origin: 'bottom',
        distance: '50px',
        duration: 600,
        interval: 150,
        delay: 600 
    });
    
    // AWS Certifications Section - Full Width with Slide Animation
    sr.reveal('.aws-certifications-section', {
        origin: 'bottom',
        distance: '80px',
        duration: 1000,
        delay: 300
    });
    
    sr.reveal('.certifications-container h3', {
        origin: 'top',
        distance: '40px',
        duration: 600,
        delay: 500
    });
    
    sr.reveal('.certifications-container .cert-description', {
        origin: 'bottom',
        distance: '30px',
        duration: 600,
        delay: 600
    });
    
    // AWS Certifications animation with better timing
    const initCertificationsAnimation = () => {
        const tiles = document.querySelectorAll('.cert-tile');
        console.log('Found cert tiles:', tiles.length);
        
        if (tiles.length === 0) {
            // Retry if elements not found
            console.log('Retrying cert tiles detection...');
            setTimeout(initCertificationsAnimation, 1000);
            return;
        }
        
        // Force show tiles immediately for debugging
        tiles.forEach(tile => {
            tile.style.background = '#ffffff';
            tile.style.border = '2px solid #ff9800';
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    console.log('Animating tile:', index);
                    // Add staggered delay for each tile
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 150);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });
        
        tiles.forEach(tile => {
            observer.observe(tile);
        });
    };
    
    // Start animation immediately and also with delays
    initCertificationsAnimation();
    setTimeout(initCertificationsAnimation, 1000);
    setTimeout(initCertificationsAnimation, 3000);
    
    // Contact Information Section - Full Width
    sr.reveal('.contact-info-section', {
        origin: 'bottom',
        distance: '60px',
        duration: 800,
        delay: 400
    });
    
    sr.reveal('.contact-info-section .info-item', { 
        origin: 'bottom',
        distance: '40px',
        duration: 600,
        interval: 150,
        delay: 600 
    });
    
    sr.reveal('.about .resumebtn', { 
        origin: 'bottom',
        distance: '40px',
        duration: 600,
        delay: 800 
    });

    /* ===== SKILLS SECTION ANIMATIONS ===== */
    sr.reveal('.skills .heading', { 
        origin: 'top',
        distance: '50px',
        duration: 800 
    });
    
    sr.reveal('.skills .container', { 
        origin: 'bottom',
        distance: '60px',
        duration: 800,
        delay: 200 
    });
    
    // Individual skill bars are animated after data loads (see fetchData callback)

    /* ===== ARTICLES SECTION ANIMATIONS ===== */
    sr.reveal('.articles .heading', {
        origin: 'top',
        distance: '50px',
        duration: 800
    });
    
    sr.reveal('.articles-description', {
        origin: 'bottom',
        distance: '40px',
        duration: 600,
        delay: 200
    });
    
    sr.reveal('.medium-cta', {
        origin: 'bottom',
        distance: '60px',
        duration: 800,
        delay: 400
    });

    /* ===== EXPERIENCE SECTION ANIMATIONS ===== */
    sr.reveal('.experience .heading', { 
        origin: 'top',
        distance: '50px',
        duration: 800 
    });
    
    sr.reveal('.experience .timeline .container.right', { 
        origin: 'right',
        distance: '80px',
        duration: 800,
        interval: 200,
        delay: 200 
    });
    
    sr.reveal('.experience .timeline .container.left', { 
        origin: 'left',
        distance: '80px',
        duration: 800,
        interval: 200,
        delay: 200 
    });
    
    sr.reveal('.experience .morebtn', { 
        origin: 'bottom',
        distance: '40px',
        duration: 600,
        delay: 600 
    });

    /* ===== CONTACT SECTION ANIMATIONS ===== */
    sr.reveal('.contact .heading', { 
        origin: 'top',
        distance: '50px',
        duration: 800 
    });
    
    sr.reveal('.contact .container .image-box', { 
        origin: 'left',
        distance: '80px',
        duration: 800,
        delay: 200 
    });
    
    sr.reveal('.contact .container form .field', { 
        origin: 'right',
        distance: '60px',
        duration: 600,
        interval: 100,
        delay: 300 
    });
    
    sr.reveal('.contact .container form .message', { 
        origin: 'right',
        distance: '60px',
        duration: 600,
        delay: 500 
    });
    
    sr.reveal('.contact .container form .button-area', { 
        origin: 'bottom',
        distance: '40px',
        duration: 600,
        delay: 700 
    });

    /* ===== FOOTER SECTION ANIMATIONS ===== */
    sr.reveal('.footer .box-container .box', { 
        origin: 'bottom',
        distance: '50px',
        duration: 600,
        interval: 200,
        delay: 200 
    });
    
    sr.reveal('.footer .credit', { 
        origin: 'bottom',
        distance: '30px',
        duration: 600,
        delay: 600 
    });

});

/* ===== ADDITIONAL SMOOTH SCROLL ENHANCEMENTS ===== */
// Add smooth scrolling behavior for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for enhanced scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Special handling for skills section
            if (entry.target.classList.contains('skills')) {
                const skillsContainer = entry.target.querySelector('.container .row');
                if (skillsContainer) {
                    setTimeout(() => {
                        skillsContainer.classList.add('animate');
                    }, 500);
                }
            }
        }
    });
}, observerOptions);

// Observe all sections for additional animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Enhanced scroll progress indicator
let scrollProgress = 0;
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const maxHeight = document.body.scrollHeight - window.innerHeight;
    scrollProgress = (scrolled / maxHeight) * 100;
    
    // Add class to body for scroll-based animations
    if (scrollProgress > 10) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});