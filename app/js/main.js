$(function() {

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
