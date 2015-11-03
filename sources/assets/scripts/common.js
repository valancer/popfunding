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
	Invest.init();
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
		$listProducts,
		$products,
		$pawnSlider,

		_isDetail = false,
		init = function () {
			$listProducts = $('.list-products');
			$products = $('.product');
			$thumbs = $products.find('> figure .thumb > img');
			_containerWidth = $products.width();

			_isDetail = $products.hasClass('detail');
			$numbers = $('.convert.price');

			$pawnSlider = $('.pawn-photos .slider');
			
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

		if( $pawnSlider.length > 0 ) {
			$pawnSlider.slick({
				infinite: true,
				autoplay: true,
				speed: 300,
				dots: true,
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1
			});
		}
	}

	function addProducts($elements) {
		$listProducts.append($elements);

		var $_numbers = $elements.find('.convert.price');
		if( $_numbers.length > 0 ) {
			$_numbers.each(function () {
				convertNumberToImage($(this));
			});
		}

		var $_thumbs = $elements.find('.product > figure .thumb > img');
		$_thumbs.one('load', function() {
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
		},
		addProducts: function ($elements) {
			scope = this;
			
			addProducts($elements);
		}
	};
}(jQuery));




/********************************************************************************************/
/****************************************** 투자하기 ******************************************/
/********************************************************************************************/
var Invest = (function ($) {
	var scope,
		$investPopupContainer,
		$investBtnsContainer,

		$investPopup,
		$calcPopup,
		$calcAfterPopup,
		_isOpen = false,
		init = function () {
			$investPopupContainer = $('.invest-popup-container');
			$investBtnsContainer = $('.invest-product');
			
			$investPopup = $('#popup-invest');
			$calcPopup = $('#popup-calc');
			$calcAfterPopup = $('#popup-calc-after');
			
	 		initLayout();
			initEvent();

		};//end init

	function initLayout() {
	}

	function initEvent() {
		// 상세에서 - 투자 하기 버튼 영역관련
		$investBtnsContainer.on('click.Invest', '.btn-invest', function(e) {
			e.preventDefault();

			var attr = $(this).attr('disabled');
			if( attr !== undefined && attr == 'disabled' ) return;
			openInvestPopup();
		});

		// 참가금액 수정
		$investBtnsContainer.on('click.Invest', '.utils .update', function(e) {
			e.preventDefault();
			openInvestPopup();
		});

		// 수익금 계산하기
		$investBtnsContainer.on('click.Invest', '.utils .calc', function(e) {
			e.preventDefault();
			openCalcPopup();
		});
	}

	function bindPopupBtns($element, isMessage, callback) {
		var $btnCloase = $element.find('.btn-popup-close');
		$btnCloase.on('click', function(e) {
			var target = $(this).data('target');
			if( isMessage ) {
				closeMessage($element);
			} else {
				closeMainPopup($element);
			}
		});

		$btnNormal = $element.find('.btn-normal');
		$btnNormal.on('click', function(e) {
			if (typeof callback === "function") {
				callback($(this).val());
			} else {
				closeMessage($element);
			}
		});
	}


	function closeAllPopup($this) {
		if( $investPopup.is(':visible') ) {
			closeMainPopup($investPopup);
		}

		if( $calcPopup.is(':visible') )  {
			closeMainPopup($calcPopup);
		}

		if( $calcAfterPopup.is(':visible') )  {
			closeMainPopup($calcAfterPopup);
		}

		var $message = $('#popup-invest-message');
		if( $message.is(':visible') ) {
			closeMessage($message);
		}
	}

	function openInvestPopup() {
		if( _isOpen ) {
			closeAllPopup($investPopup);
		}

		$investPopup.show().addClass('animated fadeIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			$(this).removeClass('fadeIn');
			$investPopup.find('#price').focus();
			_isOpen = true;
		});
		bindPopupBtns($investPopup, false);
	}

	function openCalcPopup() {
		if( _isOpen ) {
			closeAllPopup($calcPopup);
		}

		$calcPopup.show().addClass('animated fadeIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			$(this).removeClass('fadeIn');
			$calcPopup.find('#price-calc').focus();
			_isOpen = true;
		});
		bindPopupBtns($calcPopup, false);
	}

	function openCalcAfterPopup() {
		if( _isOpen ) {
			closeAllPopup($calcAfterPopup);
		}

		$calcAfterPopup.show().addClass('animated fadeIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			$(this).removeClass('fadeIn');
			$calcAfterPopup.find('#price-calc-after').focus();
			_isOpen = true;
		});
		bindPopupBtns($calcAfterPopup, false);
	}


	function openMessage(options) {
		closeAllPopup();

		var $message = $('<aside id="popup-invest-message" class="invest-popup message animated fadeIn">' +
					'<div class="inner">' +
						'<button class="btn-popup-close" data-target="#popup-invest-message">팝업닫기</button>' +

						'<h1>' + options.title + '</h1>' +
						'<p>' + options.msg + '</p>' +
						'<p class="btns"><button class="btn-normal">확인</button></p>' +
					'</div>' +
				'</aside>');

		$investPopupContainer.append($message);
		bindPopupBtns($message, true);
	}

	function openConfirmMessage(options, callback) {
		var $message = $('<aside id="popup-invest-message" class="invest-popup message animated fadeIn">' +
					'<div class="inner">' +
						'<button class="btn-popup-close" data-target="#popup-invest-message">팝업닫기</button>' +

						'<h1>' + options.title + '</h1>' +
						'<p>' + options.msg + '</p>' +
						'<p class="btns">' +
							'<button class="btn-normal" value="true">예</button>\n' +
							'<button class="btn-normal" value="false">아니오</button>' +
						'</p>' +
					'</div>' +
				'</aside>');
		$investPopupContainer.append($message);
		bindPopupBtns($message, true, callback);
	}

	function closeMessage($element) {
		$element.addClass('animated fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			$(this).removeClass('fadeOut').remove();
			_isOpen = false;
		});
	}

	function closeMainPopup($element) {
		$element.addClass('animated fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			$(this).removeClass('fadeOut').hide();
			_isOpen = false;
		});
	}

	return {
		init: function () {
			scope = this;

			init();
		},
		message: function(options) {
			openMessage(options);
		},
		confirm: function(options, callback) {
			openConfirmMessage(options, callback);
		},
		openInvest: function() {
			openInvestPopup();
		},
		openCalc: function() {
			openCalcPopup();
		},
		openCalcAfter: function() {
			openCalcAfterPopup();
		},
		closeMessage: function() {
			closeAllPopup();
		}
	};
}(jQuery));
