(function($){

	var app = {

		scrollDistance: 0,

		init: function() {

			app.interactive();

			app.detectFeatures();

			$('html').addClass('has-js');
		},

		interactive: function() {

			//-------------------------------------------------
			// TOGGLE MENUS
			//
			// menu showing and hiding

			$('.js-toggle-menu').click(function(e){
				e.preventDefault();

				var
				id = $(this).attr('href'),
				menu = $(id),
				focus = $(this).attr('data-focus'),
				otherToggles = $('[href="' + id + '"]'); // any other toggles for this particular menu

				menu.toggleClass('is-active');
				otherToggles.toggleClass('is-active');

				if(focus && $(focus).length) {

					if(menu.hasClass('is-active')) {
						setTimeout(function(){
							$(focus).focus();
						}, 500);
					}

					else {
						$(focus).blur();
					}
				}
			});


			//-------------------------------------------------
			// FORM
			//
			// makes the animation work for filled inputs

			$('.f_fieldset__input').on('change', function(){

				if($(this).val().length) {
					$(this).parents('fieldset').addClass('is-full');
				}

				else {
					$(this).parents('fieldset').removeClass('is-full');
				}
			});
		},

		//-------------------------------------------------
		// Detect Features
		//
		// fake hover detect, ie detect

		detectFeatures: function() {
			var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
			if(!iOS) {
				$('html').addClass('mz-hover');
			}

			var ua = window.navigator.userAgent;
			var msie = ua.indexOf('MSIE ');
			var trident = ua.indexOf('Trident/');

			if (msie > 0 || trident > 0) {
				$('html').addClass('ie');
			}

		}
	};

	$(document).ready(function(){
		app.init();
	});

})(jQuery);
