(function(){
	$(document).ready(function(){
		var agents = [/(opr|opera)/gim,/(chrome)/gim,/(firefox)/gim,/(safari)/gim,/(msie[\s]+[\d]+)/gim,/(trident).*rv:(\d+)/gim];
		var agent = navigator.userAgent.toLocaleLowerCase();
		for(var ag in agents){
			if(agent.match(agents[ag])){
				$(document.body).addClass(String(RegExp.$1+RegExp.$2).replace(/opr/,'opera').replace(/trident/,'msie').replace(/\s+/,''));
				break;
			}
		}
	});
})();



$(document).ready(function (e) {
	Header.init();
	Main.init();
	Product.init();
});




/********************************************************************************************/
/****************************************** 헤더 ******************************************/
/********************************************************************************************/
var Header = (function ($) {
	var scope,
		$headerContainer,
		$user,
		init = function () {
			$headerContainer = $('header.header');
			$user = $headerContainer.find('.user');
			$convert = $user.find('.convert');

			initLayout();
			initEvent();
		};//end init

	function initLayout() {
		if( $convert.length > 0 ) {
			$convert.each(function () {
				convertNumberToImage($(this));
			});
		}
	}

	function initEvent() {
		
	}

	function convertNumberToImage($element) {
		var value = $.trim($element.text().toLowerCase());
		var convert = '';

		if( $element.hasClass('invest') ) {
			$element.addClass(value);
		} else if( $element.hasClass('loan') ) {
			console.log(value);
			var array = value.split('');
			convert += '<em class="bid' + array[0] + '">' + array[0] + '</em>\n';
			convert += '<em class="overdue-' + array[1] + '">' + array[1] + '</em>';
			$element.html(convert);
		}
	}

	return {
		init: function () {
			scope = this;

			init();
		}
	};
}(jQuery));




/********************************************************************************************/
/****************************************** 메인 ******************************************/
/********************************************************************************************/
var Main = (function ($) {
	var scope,
		$type,
		$typeSlider,
		$banner,
		$bannerSlider,
		init = function () {
			$type = $('.main .investment-type');
			$typeSlider = $type.find('.slider');
			$banner = $('.main .banners');
			$bannerSlider = $banner.find('.slider');

			initLayout();
			initEvent();
		};//end init

	function initLayout() {
		
	}

	function initEvent() {

		// 투자유형 슬라이더
		if( $typeSlider.length > 0 ) {
			$typeSlider.slick({
				infinite: true,
				autoplay: true,
				pauseOnHover: true,
				initialSlide: 1,
				autoplaySpeed: 3000,
				speed: 300,
				dots: false,
				arrows: true,
				slidesToShow: 1,
				slidesToScroll: 1
			});
		}

		// 배너 슬라이더
		if( $bannerSlider.length > 0 ) {
			$bannerSlider.slick({
				infinite: true,
				autoplay: true,
				pauseOnHover: true,
				autoplaySpeed: 3300,
				speed: 300,
				dots: true,
				arrows: false,
				slide: 'a',
				slidesToShow: 1,
				slidesToScroll: 1
			});
		}
	}

	return {
		init: function () {
			scope = this;

			init();
		}
	};
}(jQuery));




/********************************************************************************************/
/****************************************** 상품 개별 ******************************************/
/********************************************************************************************/
var Product = (function ($) {
	var scope,
		_containerWidth = 0,
		$products,
		_isDetail = false,
		init = function () {
			$products = $('.product');
			$thumbs = $products.find('.thumb > img');
			_containerWidth = $products.width();

			_isDetail = $products.hasClass('detail');
			$numbers = $('.convert.price');
			
	 		initLayout();
			initEvent();

		};//end init

	function initLayout() {
		if( $numbers.length > 0 ) {
			$numbers.each(function () {
				convertNumberToImage($(this));
			});
		}
	}

	function initEvent() {
		$thumbs.one('load', function() {
		}).each(function() {
			if( this.complete ) {
				var width = $(this).width();
				var left = (-width/2 + _containerWidth/2);
				$(this).show().css('left', left).addClass('animated fadeIn');
			}
		});
	}

	function convertNumberToImage($element) {
		var array = $element.text().split('');
		var convert = '';
		for( var i=0; i<array.length-1; i++ ) {
			if( array[i] == "," ) {
				convert += '<span class="price-comma">' + array[i] + '</span>';
			} else {
				convert += '<span class="price' + array[i] + '">' + array[i] + '</span>';
			}
		}
		convert += array[array.length-1];
		$element.html(convert);
	}

	return {
		init: function () {
			scope = this;

			init();
		}
	};
}(jQuery));