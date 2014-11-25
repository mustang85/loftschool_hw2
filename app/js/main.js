$(function() {

	var scrollStep = $('#product__list img:eq(0)').outerWidth(true);

	$('.right').on('click', function () {
		var next = $(this),
			prew = $('.left'),
			nextScroll = null,
			countClick = 0,
			visibleImageViewing = 3;

		if (next.data().x == undefined || next.data().x === 0) {
			
			$('#product__list').stop(true).animate({"left": -scrollStep + 'px'}, 'slow');

			next.data({x: -scrollStep, countClick: ++visibleImageViewing});
			prew.data({x: -scrollStep, countClick: ++visibleImageViewing});

		} else {

			if ($('#product__list img').length == next.data().countClick) {
				$('#product__list').stop(true).animate({'left': 0}, 1500);
				next.data().x = 0;
				return;
			}

			next.data({x: next.data().x - scrollStep, countClick: ++next.data().countClick});
			prew.data({x: prew.data().x - scrollStep, countClick: ++prew.data().countClick});

			nextScroll = next.data().x;
			$('#product__list').stop(true).animate({"left": nextScroll + 'px'}, 'slow');
		}
		
	});

	$('.left').on('click', function () {

		var wrapSlide = $('#product__list'),
			nextSlide = $('.right'),
			prewSlide = $(this)
			offsetPrewSlide = prewSlide.data().x;

		if ( wrapSlide.css('left') == 0 || offsetPrewSlide >= 0) {
			wrapSlide.stop(true).animate({"left": 0 + 'px'}, 'slow');
			nextSlide.data().x = 0;
		} else {

			prewSlide.data().x = offsetPrewSlide + scrollStep;
			nextSlide.data().x = prewSlide.data().x;
			wrapSlide.stop(true).animate({"left": prewSlide.data().x + 'px'}, 'slow');	
			
		}
		
	});
});
