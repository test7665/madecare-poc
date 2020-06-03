$(function () {
    /* 
     Custom js file for assan
     */
//preloader
    $(window).preloader({
        delay: 500
    });
//back to top
    if ($('#back-to-top').length) {
        var scrollTrigger = 100, // px
                backToTop = function () {
                    var scrollTop = $(window).scrollTop();
                    if (scrollTop > scrollTrigger) {
                        $('#back-to-top').addClass('show');
                    } else {
                        $('#back-to-top').removeClass('show');
                    }
                };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }
//knob circle progress bar
    $(".progress-circle").knob();
    wow = new WOW(
            {
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 0,
                mobile: true,
                live: true
            }
    );
    wow.init();

    //tooltip
    $('[data-toggle="tooltip"]').tooltip();
    //popover
    $('[data-toggle="popover"]').popover();
    //smooth scroll
    smoothScroll.init({
        selector: '[data-scroll]', // Selector for links (must be a class, ID, data attribute, or element tag)
        speed: 1000, // Integer. How fast to complete the scroll in milliseconds
        easing: 'easeInOutCubic', // Easing pattern to use
        offset: 56, // Integer. How far to offset the scrolling anchor location in pixels
        callback: function (anchor, toggle) {} // Function to run after scrolling
    });
    /**youtube video popup**/
    $('.modal-video').magnificPopup({
        type: 'iframe'
    });

    /**form popup popup**/
    $('.popup-content').magnificPopup({
        type: 'inline',
        mainClass: 'mfp-with-zoom',
        preloader: true
    });
    /**on load modal**/
    setTimeout(function () {
        if ($('#onloadModal').length) {
            $.magnificPopup.open({
                items: {
                    src: '#onloadModal'
                },
                type: 'inline'
            });
        }
    }, 1000);
    /*****maginific popup **/
    $('.gallery-row').each(function () {
        $(this).magnificPopup({
            delegate: 'a',
            type: 'image',
            mainClass: 'mfp-with-zoom',
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300,
                easing: 'ease-in-out',
                opener: function (openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });
    });
    $('.owl-testimonials,.carousel-image').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
});
    //blog masonry
    var $container = $('#blog-masonry');
    $container.imagesLoaded(function () {
        $container.masonry({
            itemSelector: '.post-masonry'
        });
    });
     //auto close navbar-collapse on click a
            $('.navbar-onepage a.nav-link').on('click', function () {
                $('.navbar-toggler:visible').click();
            });
});





/*!
 * jQuery Cookiebar Plugin
 * https://github.com/carlwoodhouse/jquery.cookieBar
 *
 * Copyright 2012-17, Carl Woodhouse. the cookie function is inspired by https://github.com/carhartl/jquery-cookie
 * Disclaimer: if you still get fined for not complying with the eu cookielaw, it's not our fault.
 * Licence: MIT
 */

(function ($) {
    $.cookie = function (key, value, options) {
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }
        options = value || {};
        var decode = options.raw ? function (s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            // IE
            if (decode(pair[0]) === key) return decode(pair[1] || '');
        }
        return null;
    };

    $.fn.cookieBar = function (options) {
        var settings = $.extend({
            'closeButton': 'none',
            'hideOnClose': true,
            'secure': false,
            'path': '/',
            'domain': '',
            'name': 'cookiebar',
            'expiresDays': 365
        }, options);

        return this.each(function () {
            var cookiebar = $(this);

            // just in case they didnt hide it by default.
            cookiebar.hide();

            // if close button not defined. define it!
            if (settings.closeButton == 'none') {
                cookiebar.append('<p><a class="cookiebar-close btn btn-primary">Continue</a></p>');
                $.extend(settings, { 'closeButton': '.cookiebar-close' });
            }

            if ($.cookie(settings.name) != 'hide') {
                cookiebar.show();
            }

            cookiebar.find(settings.closeButton).click(function () {
                if (settings.hideOnClose) {
                    cookiebar.hide();
                }
                $.cookie(settings.name, 'hide', { path: settings.path, secure: settings.secure, domain: settings.domain, expires: settings.expiresDays });
                cookiebar.trigger('cookieBar-close');
                return false;
            });
        });
    };

    // self injection init
    $.cookieBar = function (options) {
        $('body').prepend('<div class="ui-widget"><div style="display: none;" class="cookie-message ui-widget-header blue"><p>This site uses cookies. By continuing to browse this site you are agreeing to our use of cookies.  You can adjust your cookie settings at any time in your browser preferences. <a href="cookies.html">Read our cookies policy</a></p></div></div>');
        $('.cookie-message').cookieBar(options);
    };
})(jQuery);

$.cookieBar();



