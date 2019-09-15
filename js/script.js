$(function(){
	'use strict';
	
	var portfolio = $('.portfolio-items'),
	blog = $('.posts-grid');
	
	$('html').removeClass('no-js').addClass('js');
	
	/*=========================================================================
		Skill Bars Initialization
		=========================================================================*/
		$('.skill').each(function(){
			var $this = $(this),
			percent = $this.data('percent') + '%';
			$this.append("<div class='skill-bar' ><div class='percent' style='width:"+percent+"' ></div></div>");
		});


	/*=========================================================================
		Magnific Popup (Project Popup initialization)
		=========================================================================*/
		$('.has-popup').magnificPopup({
			type: 'inline',
			fixedContentPos: false,
			fixedBgPos: true,
			overflowY: 'auto',
			closeBtnInside: true,
			preloader: false,
			midClick: true,
			removalDelay: 300,
			mainClass: 'my-mfp-zoom-in'
		});

		$(window).on('load', function(){

			$('body').addClass('loaded');


			var sect = window.location.hash;
			if ( $(sect).length == 1 ){
				$('.section.active').removeClass('active');
				$(sect).addClass('active');
			}
			$(sect).focus();


		/*=========================================================================
			Portfolio Grid
			=========================================================================*/
			setTimeout(function(){
				portfolio.shuffle();
				blog.shuffle();
			}, 1000);

			$('.portfolio-filters > li > a').on('click', function (e) {
				e.preventDefault();
				var groupName = $(this).attr('data-group');
				$('.portfolio-filters > li > a').removeClass('active');
				$(this).addClass('active');
				portfolio.shuffle('shuffle', groupName );
			});

		});



		$(window).on('resize', function(){


		/*=========================================================================
			Update the portfolio grid when window is resized
			=========================================================================*/
			setTimeout(function(){
				portfolio.shuffle('update');
				blog.shuffle('update');
			},1000);

		});


	/*=========================================================================
		Menu Functions
		=========================================================================*/
		$('.menu-btn').on('click', function(e){
			e.preventDefault();
			$('body').toggleClass('show-menu');
		});

		$('.menu-items > ul > li > a, .section-toggle, .intro-btn-secondary').on('click', function(e){

			var $this = $(this),
			section = $( '#' + $this.data('section') );
			if( section.length != 0 ){
				$('body').removeClass('show-menu');
				$('.section.active').removeClass('active');
				setTimeout(function(){
					section.addClass('active');
				}, 300);
			}

			setTimeout(function(){
				portfolio.shuffle();
				blog.shuffle();
			}, 1000);

		});

		var hasWebP = (function() {
			
			var images = {
				basic: "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==",
				lossless: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA="
			};

			return function(feature) {
				var deferred = $.Deferred();

				$("<img>").on("load", function() {

					if(this.width === 2 && this.height === 1) {
						deferred.resolve();
					} else {
						deferred.reject();
					}
				}).on("error", function() {
					deferred.reject();
				}).attr("src", images[feature || "basic"]);

				return deferred.promise();
			}
		})();

		var addProfilePic = function(src) {
			$("#profile-pic").attr("src", src);
		};

		hasWebP().then(function() {
			console.log("support webp");
			addProfilePic("./img/person.webp");
		}, function() {
			console.log("nt support webp");
			addProfilePic("./img/person.png");
		});


	});