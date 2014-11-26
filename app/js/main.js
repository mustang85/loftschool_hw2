$(function() {

	/* вывод сеткой на главной */
	$('#dropdownMenu1').on('click',function (e) {
		var dropdownButton =  $('#dropdownMenu1'),
			dropdownTextContainer = dropdownButton.find('.dropdown__text')
			dropdownTextDefault = dropdownTextContainer.text(),
			findList = $('.catalog .list'),
			dropdownMenu = dropdownButton.next('.dropdown-menu');

		console.log(dropdownTextDefault);

		// допилю позже
			// dropdownMenu.toggle();

		// if (dropdownMenu.is(':hidden')) {
		// 	dropdownMenu.fadeIn('fast');
		// 	dropdownMenu.find()
		// }

		if ( findList.hasClass('catalog__grid') ) {
			findList.removeClass('catalog__grid');
			dropdownTextContainer.text('сеткой');
		} else {
			findList.addClass('catalog__grid');	
			dropdownTextContainer.text('линейкой');
		}

	});
	

	/* тук тук по вкладке корзина */
	$('.list__item_basket').on('click',function (e) {
		e.preventDefault();

		$('.list__item_basket').toggleClass('active');

		if ( $('.wish__list').is(':hidden') ) {
			$('.wish__list').fadeIn(500);
		} else {
			$('.wish__list').fadeOut(500);
		}
	});

	/* перемотка на верх */
	$('.icon.but__up').on('click', function() {
		$('body,document').animate({'scrollTop': 0}, 1500);	
	})

	/* слайдер на странице номер 3, да знаю, 
	нужно все перенести в модуль и оптимизировать */
	function returnToBeginn(next) {
		$('.product__wrap').stop(true)
						   .animate({'left': 0}, 1500);
		next.data().x = 0;
	}

	var scrollStep = $('.product__list .product__link:eq(0)').outerWidth(true);

	$('.right').on('click', function (e) {
		e.preventDefault();

		var next = $(this),
			prew = $('.left'),
			nextScroll = null,
			countClick = 0,
			visibleImageViewing = 3;

		if (next.data().x === undefined || next.data().x === 0) {
			
			$('.product__wrap').stop(true)
								.animate({"left": -scrollStep + 'px'}, 'slow');

			next.data({x: -scrollStep, countClick: ++visibleImageViewing});
			prew.data({x: -scrollStep, countClick: ++visibleImageViewing});

		} else {

			if ( $('.product__list img').length == next.data().countClick ) {

				returnToBeginn(next);
				return;
			}

			next.data({x: next.data().x - scrollStep, countClick: ++next.data().countClick});
			prew.data({x: prew.data().x - scrollStep, countClick: ++prew.data().countClick});

			nextScroll = next.data().x;
			$('.product__wrap').stop(true)
							   .animate({"left": nextScroll + 'px'}, 'slow');
		}
		
	});

	$('.left').on('click', function (e) {
		e.preventDefault();

		var wrapSlide = $('.product__wrap'),
			nextSlide = $('.right'),
			prewSlide = $(this)
			offsetPrewSlide = prewSlide.data().x;

		if ( wrapSlide.css('left') == 0 || offsetPrewSlide >= 0) {
			returnToBeginn(nextSlide);
		} else {

			prewSlide.data().x = offsetPrewSlide + scrollStep;
			nextSlide.data().x = prewSlide.data().x;
			wrapSlide.stop(true).animate({"left": prewSlide.data().x + 'px'}, 'slow');	
			
		}
		
	});
});
