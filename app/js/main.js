$(function() {

	/* output on the main grid */
	$('#dropdownMenu1').on('click',function (e) {
		var dropdownButton =  $('#dropdownMenu1'),
			dropdownTextContainer = dropdownButton.find('.dropdown__text')
			dropdownTextDefault = dropdownTextContainer.text(),
			findList = $('.catalog .list'),
			dropdownMenu = dropdownButton.next('.dropdown-menu');

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
	

	/* basket down */
	$('.list__item_basket').on('click',function (e) {
		e.preventDefault();

		$('.list__item_basket').toggleClass('active');

		if ( $('.wish__list').is(':hidden') ) {
			$('.wish__list').fadeIn(500);
		} else {
			$('.wish__list').fadeOut(500);
		}
	});

	/* scroll up page */
	$(document).on('scroll', function () {
		var but = $('.icon.but__up');

		if ( $(document).scrollTop() >= 250 ) {		
			but.fadeIn(400);

			but.on('click', function() {
				$('body,document').animate({'scrollTop': 0}, 1500);	
			});

			$(document).off('scroll');

		} else {
			but.fadeOut(400);
		}

	});


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

	// accordion
	// $('.nav .list__link').on('click', shopAccordion);

	// function shopAccordion(e) {
	// 	e.preventDefault();

	// 	var link = $(this),
	// 		nav = link.closest('.nav'),
	// 		item1Level = link.closest('.list__item'),
	// 		level2Nav = nav.find('a + .list');

	// 	if (level2Nav.css('display') == 'none') {
	// 		level2Nav.slideDown(400);
	// 		item1Level.addClass('list__item_active ');
	// 	} else {
	// 		level2Nav.slideUp(400)
	// 		item1Level.removeClass('list__item_active ');
	// 	}
	// }

	$('.nav .list__trigger').on('click', function (e) {
		e.preventDefault();

		var $this = $(this),
			item = $this.closest('.list__item'),
			list = $this.closest('.list'),
			items = list.find('.list__item'),
			content = item.find('.list__inner')
			otherContent = list.find('.list__inner'),
			duration = 400;

		if ( !item.hasClass('list__item_active') ) {
			items.removeClass('list__item_active');
			item.addClass('list__item_active');

			otherContent.stop(true,true).slideUp(duration);
			content.slideDown(duration);	
		} else {
			content.slideUp(duration);
			item.stop(true,true).removeClass('list__item_active');
		}
		
	});

});
