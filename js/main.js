;(function () {
	
	'use strict';

	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};



	// Carousel Feature Slide
	var testimonialCarousel = function(){
		
		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			animateOut: 'fadeOut',
			items: 1,
			loop: true,
			margin: 0,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: false
		});
	};

	var sliderMain = function() {
		
	  	$('#qbootstrap-slider-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			directionNav: true,
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

	  	});

	};



	// animate-box
	var contentWayPoint = function() {

		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this).hasClass('animated') ) {
			
				$(this.element).addClass('fadeInUp animated');
			
			}

		} , { offset: '75%' } );

	};


	// Burger Menu (100% Instant Single-Tap Toggle)
	var burgerMenu = function() {
		$(document).on('click', '#mobileMenuBtn, .js-qbootstrap-nav-toggle', function(event){
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}

			var $btn = $('#mobileMenuBtn');
			var $menu = $('#mobileDropdownMenu');

			if ($menu.hasClass('active')) {
				$menu.removeClass('active');
				$btn.removeClass('active');
			} else {
				$menu.addClass('active');
				$btn.addClass('active');
			}
			return false;
		});
	};


	// Parallax
	var parallax = function() {
		if ( !isiPad() || !isiPhone() ) {
			$(window).stellar();
		}
	};



	// Page Nav
	var clickMenu = function() {

		$('a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section'),
				navbar = $('#navbar');
			
			var targetEl = $('[data-section="' + section + '"]');
			if (targetEl.length) {
				var targetOffset = targetEl.offset().top - 60;
				if (section === 'home') targetOffset = 0;

				$('html, body').animate({
					scrollTop: targetOffset
				}, 500);
			}

		    if (navbar.length) {
		    	navbar.removeClass('in');
		    	navbar.css('display', '');
		    	navbar.attr('aria-expanded', 'false');
		    	$('.js-qbootstrap-nav-toggle').removeClass('active');
		    }

		    event.preventDefault();
		    return false;
		});

	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};
	var navigationSection = function() {

		var $section = $('div[data-section]');
		
		$section.waypoint(function(direction) {
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		    
		  	}
		}, {
		  	offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};


	// Window Scroll (Sticky Header Always Active)
	var windowScroll = function() {
		$(window).scroll(function(event){
		   	var header = $('#qbootstrap-header'),
				scrlTop = $(this).scrollTop();

			if ( scrlTop > 80 ) {
				header.addClass('scrolled navbar-fixed-top');
			} else {
				header.removeClass('scrolled navbar-fixed-top');
			}
		});
	};



	// Animations
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
	};


	var inlineSVG = function() {
		if (window.location.protocol === 'file:') return;
		$('img.svg').each(function(){
	    var $img = $(this);
	    var imgID = $img.attr('id');
	    var imgClass = $img.attr('class');
	    var imgURL = $img.attr('src');

	    $.get(imgURL, function(data) {
	        var $svg = jQuery(data).find('svg');
	        if(typeof imgID !== 'undefined') {
	            $svg = $svg.attr('id', imgID);
	        }
	        if(typeof imgClass !== 'undefined') {
	            $svg = $svg.attr('class', imgClass+' replaced-svg');
	        }
	        $svg = $svg.removeAttr('xmlns:a');
	        $img.replaceWith($svg);
	    }, 'xml').fail(function() {
			// Ignore CORS restrictions gracefully on local file system
		});

		});
	};
	

	// Set the date we're counting down to (July 27, 2026 00:00:00)
	var countDownDate = new Date("July 27, 2026 00:00:00").getTime();
	// Set the date we started dating (July 27, 2025 00:00:00)
	var jadianDate = new Date("July 27, 2025 00:00:00").getTime();

	// Update the count down/up every 1 second
	var x = setInterval(function() {

		// Get todays date and time
		var now = new Date().getTime();

		// Find the distance between now and the count down date
		var distance = countDownDate - now;

		var isAnniversaryPassed = distance < 0;
		
		var finalDistance = distance;
		if (isAnniversaryPassed) {
			// Count up from the original jadian date
			finalDistance = now - jadianDate;
			
			// Change title to reflect togetherness if element exists
			var titleEl = document.getElementById("countdown-title");
			if (titleEl) {
				titleEl.innerHTML = "Kita Telah Bersama";
			}
			var subtitleEl = document.getElementById("countdown-subtitle");
			if (subtitleEl) {
				subtitleEl.innerHTML = "Sejak 27 Juli 2025 ❤️";
			}
		}

		// Time calculations for days, hours, minutes and seconds
		var days = Math.floor(finalDistance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((finalDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((finalDistance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((finalDistance % (1000 * 60)) / 1000);

		// Display the result in elements
		var daysEl = document.getElementById("days");
		var hoursEl = document.getElementById("hours");
		var minutesEl = document.getElementById("minutes");
		var secondsEl = document.getElementById("seconds");

		if (daysEl) daysEl.innerHTML = days + " <small>Hari</small>";
		if (hoursEl) hoursEl.innerHTML = hours + " <small>Jam</small>";
		if (minutesEl) minutesEl.innerHTML = minutes + " <small>Menit</small>";
		if (secondsEl) secondsEl.innerHTML = seconds + " <small>Detik</small>";

	}, 1000);	
	
		
	var bgVideo = function() {
		$('.player').mb_YTPlayer();
	};

	// Music Player Control
	var musicPlayer = function() {
		var audio = document.getElementById('myAudio');
		var playBtn = document.getElementById('musicPlayBtn');
		if (!audio || !playBtn) return;

		// Play/Pause toggle
		playBtn.addEventListener('click', function(e) {
			e.preventDefault();
			if (audio.paused) {
				audio.play();
				playBtn.classList.add('playing');
				playBtn.innerHTML = '<i class="icon-heart"></i>'; // filled heart when playing
			} else {
				audio.pause();
				playBtn.classList.remove('playing');
				playBtn.innerHTML = '<i class="icon-heart-o"></i>'; // empty heart when paused
			}
		});

		// Autoplay on first click/scroll of page (browser restriction bypass)
		var autoplay = function() {
			audio.play().then(function() {
				playBtn.classList.add('playing');
				playBtn.innerHTML = '<i class="icon-heart"></i>';
				// Remove events so it doesn't trigger again
				document.removeEventListener('click', autoplay);
				document.removeEventListener('touchstart', autoplay);
			}).catch(function(error) {
				// Autoplay blocked
				console.log("Autoplay blocked, waiting for user interaction.");
			});
		};

		document.addEventListener('click', autoplay);
		document.addEventListener('touchstart', autoplay);
	};
        

	// Document on load.
	$(function(){

		burgerMenu();
		testimonialCarousel();
		sliderMain();
		clickMenu();
		parallax();
		windowScroll();
		navigationSection();
		contentWayPoint();
		inlineSVG();
		bgVideo();
		musicPlayer();
	});


}());