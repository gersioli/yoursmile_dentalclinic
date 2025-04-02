(function ($) {
    "use strict";
    
    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
            $('.navbar').addClass('sticky-top');
        } else {
            $('.navbar').removeClass('sticky-top');
        }
    });
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });


    // Image comparison
    $(".twentytwenty-container").twentytwenty({});


    // Price carousel
    $(".price-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 45,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
    });


	
	// Language Switcher Functionality
    $(document).ready(function () {

        const langElements = document.querySelectorAll('[data-lang]');
        const currentLang = localStorage.getItem('language') || 'en';

        function loadLanguage(lang) {
            if (!translations[lang]) {
                console.error(`Language "${lang}" not found.`);
                return;
            }

            document.querySelectorAll('[data-translate]').forEach(element => {
                const key = element.getAttribute('data-translate');
                if (translations[lang][key]) {
                    element.innerText = translations[lang][key];
                } else {
                    console.warn(`Missing translation for key: ${key}`);
                }
            });

            langElements.forEach(btn => {
                btn.classList.remove('btn-outline-primary');
                btn.classList.add('btn-outline-secondary');
            });

            const selectedButton = document.querySelector(`[data-lang="${lang}"]`);
            selectedButton.classList.remove('btn-outline-secondary');
            selectedButton.classList.add('btn-outline-primary');
        }

        langElements.forEach(element => {
            element.addEventListener('click', function () {
                const selectedLang = this.getAttribute('data-lang');
                if (translations[selectedLang]) {
                    localStorage.setItem('language', selectedLang);
                    loadLanguage(selectedLang);
                }
            });
        });

        loadLanguage(currentLang);

        langElements.forEach(btn => {
            if (btn.getAttribute('data-lang') === currentLang) {
                btn.classList.remove('btn-outline-secondary');
                btn.classList.add('btn-outline-primary');
            } else {
                btn.classList.remove('btn-outline-primary');
                btn.classList.add('btn-outline-secondary');
            }
        });
    });

})(jQuery);

