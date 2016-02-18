// console 객체가 없을 경우
if (!window.console) {
	window.console = {
		log : function(){},
		dir : function(){}
	};
} else if (!window.console.dir){
	window.console.dir = function(){};
}

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
	PrivateProduct.init();
	BondsProduct.init();
	Invest.init();
	Story.init();
	Popup.init();
});




/********************************************************************************************/
/****************************************** 헤더 ******************************************/
/********************************************************************************************/
var Header = (function ($) {
	var scope,
		$headerContainer,
		$user,
		$btnHelp,
		init = function () {
			$headerContainer = $('header.header');
			$user = $headerContainer.find('.user');
			$convert = $user.find('.convert');
			$btnHelp = $headerContainer.find('.btn-help');

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
		if( $btnHelp.length > 0 ) {
			$btnHelp.magnificPopup({
				type: 'ajax',
				alignTop: true,
				mainClass: 'mfp-fade',
				closeOnContentClick: false,
				closeOnBgClick: true
			});
		}
	}

	function convertNumberToImage($element) {
		var value = $.trim($element.text().toLowerCase());
		var convert = '';

		if( $element.hasClass('invest') ) {
			$element.addClass(value);
		} else if( $element.hasClass('loan') ) {
			var array = value.split('');

			for( var i=0; i<array.length; i++ ) {
				if( isNaN(array[i]) ) {
					convert += '<em class="overdue-' + array[i] + '">' + array[i] + '</em>';
				} else {
					convert += '<em class="bid' + array[i] + '">' + array[i] + '</em>\n';
				}
			}
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
				arrows: false,
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
/*********************************** 기업 투자 상품 목록 및 상품 ***********************************/
/********************************************************************************************/
var Product = (function ($) {
	var _containerWidth = 0,
		$container,
		$listProducts,
		$products,
		$pawnSlider,

		_isDetail = false,
		init = function () {
			$container = $('.contents.invest');
			$listProducts = $container.find('.list-products');
			$products = $container.find('.product');
			$thumbs = $products.find('> figure .thumb > img');
			_containerWidth = $products.width();

			_isDetail = $products.hasClass('detail');
			$numbers = $container.find('.convert.price');

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

	function imageload($elements) {
		$elements.one('load', function() {
		}).each(function() {
			if( this.complete ) {
				var width = $(this).width();
				var left = (-width/2 + _containerWidth/2);
				$(this).show().css('left', left).addClass('animated fadeIn');
			}
		});
	}

	function initEvent() {
		imageload($thumbs);

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
		imageload($_thumbs);
	}

	function convertNumberToImage($element) {
		var array = $element.text().split('');
		var convert = '';
		for( var i=0; i<array.length; i++ ) {
			if( array[i] == "," ) {
				convert += '<span class="price-comma">' + array[i] + '</span>';
			} else if( array[i] == '.' ) {
				convert += '<span class="price-dot">' + array[i] + '</span>';
			} else if( array[i] == '%' ) {
				convert += '<span class="price-percent">' + array[i] + '</span>';
			} else if( array[i] == '원' ) {
				convert += '<span class="price-won">' + array[i] + '</span>';
			} else {
				convert += '<span class="price' + array[i] + '">' + array[i] + '</span>';
			}
		}
		// convert += array[array.length-1];
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
/*********************************** 개인 투자 상품 목록 및 상품 ***********************************/
/********************************************************************************************/
var PrivateProduct = (function ($) {
	var $container,
		$listProducts,
		$products,
		$countAndRatings,
		$numbers,
		$tooltips,

		_isDetail = false,
		init = function () {
			$container = $('.contents.private-invest');
			$listProducts = $container.find('.list-products');
			$products = $container.find('.product');

			_isDetail = $products.hasClass('detail');
			if( _isDetail ) {
				$tooltips = $products.find('.trust-ratings > p');
			}

			$countAndRatings = $container.find('.convert.cr');
			$numbers = $container.find('.convert.price');

	 		initLayout();
			initEvent();

		};//end init

	function initLayout() {
		if( $numbers.length > 0 ) {
			$numbers.each(function () {
				convertNumberToImage($(this));
			});
		}
		if( $countAndRatings.length > 0 ) {
			$countAndRatings.each(function () {
				convertCRToImage($(this));
			});
		}
	}

	function initEvent() {
		if( _isDetail ) {
			if( $tooltips.length > 0 ) {
				$tooltips.on('mouseover', function(e) {
					var $target = $(this).find('.tooltip');
					$target.show();
				}).on('mouseout', function(e) {
					var $target = $(this).find('.tooltip');
					$target.hide();
				});
			}
		}
	}


	function convertCRToImage($element) {
		var value = $.trim($element.text().toLowerCase());
		var convert = '';

		var array = value.split('');
		console.log(array.length);

		for( var i=0; i<array.length; i++ ) {
			if( $element.closest('.borrowing-count').length > 0 ) {
				convert += '<em class="bid' + array[i] + '">' + array[i] + '</em>\n';
			} else if( $element.closest('.credit-rating').length > 0 ) {
				convert += '<em class="overdue-' + array[i] + '">' + array[i] + '</em>';
			} else {
				convert += '<em class="overdue-' + array[i] + '">' + array[i] + '</em>';
			}
		}
		$element.html(convert);
	}

	function convertNumberToImage($element) {
		var array = $element.text().split('');
		var convert = '';
		for( var i=0; i<array.length; i++ ) {
			if( array[i] == '%' ) {
				convert += '<span class="price-percent">' + array[i] + '</span>';
			} else {
				convert += '<span class="price' + array[i] + '">' + array[i] + '</span>';
			}
		}
		$element.html(convert);
	}

	return {
		init: function () {
			init();
		}
	};
}(jQuery));




/********************************************************************************************/
/*********************************** 채권 투자 상품 목록 및 상품 ***********************************/
/********************************************************************************************/
var BondsProduct = (function ($) {
	var _containerWidth = 0,
		$container,
		$listProducts,
		$products,
		$countAndRatings,
		$numbers,
		$tooltips,

		_isDetail = false,
		init = function () {
			$container = $('.contents.bonds-invest');
			$listProducts = $container.find('.list-products');
			$products = $container.find('.product');
			$thumbs = $products.find('> figure .thumb > img');
			_containerWidth = $products.find('> figure .thumb').width();

			_isDetail = $products.hasClass('detail');
			if( _isDetail ) {
				$tooltips = $products.find('.trust-ratings > p');
			}

			$countAndRatings = $container.find('.convert.cr');
			$numbers = $container.find('.convert.price');

	 		initLayout();
			initEvent();

		};//end init

	function initLayout() {
		if( $numbers.length > 0 ) {
			$numbers.each(function () {
				convertNumberToImage($(this));
			});
		}
		if( $countAndRatings.length > 0 ) {
			$countAndRatings.each(function () {
				convertCRToImage($(this));
			});
		}
	}

	function initEvent() {
		imageload($thumbs);

		if( _isDetail ) {
			if( $tooltips.length > 0 ) {
				$tooltips.on('mouseover', function(e) {
					var $target = $(this).find('.tooltip');
					$target.show();
				}).on('mouseout', function(e) {
					var $target = $(this).find('.tooltip');
					$target.hide();
				});
			}
		}
	}


	function imageload($elements) {
		$elements.one('load', function() {
		}).each(function() {
			if( this.complete ) {
				var width = $(this).width();
				var left = (-width/2 + _containerWidth/2);
				$(this).show().css('left', left).addClass('animated fadeIn');
			}
		});
	}

	function convertCRToImage($element) {
		var value = $.trim($element.text().toLowerCase());
		var convert = '';

		var array = value.split('');

		if( $element.closest('.borrowing-count').length > 0 ) {
			convert += '<em class="bid' + array[0] + '">' + array[0] + '</em>\n';
		} else if( $element.closest('.credit-rating').length > 0 ) {
			convert += '<em class="overdue-' + array[0] + '">' + array[0] + '</em>';
		} else {
			convert += '<em class="overdue-' + array[0] + '">' + array[0] + '</em>';
		}
		$element.html(convert);
	}

	function convertNumberToImage($element) {
		var array = $element.text().split('');
		var convert = '';
		for( var i=0; i<array.length; i++ ) {
			if( array[i] == '%' ) {
				convert += '<span class="price-percent">' + array[i] + '</span>';
			} else {
				convert += '<span class="price' + array[i] + '">' + array[i] + '</span>';
			}
		}
		$element.html(convert);
	}

	return {
		init: function () {
			init();
		}
	};
}(jQuery));




/********************************************************************************************/
/************************************* 팝스토리 목록 및 상품 *************************************/
/********************************************************************************************/
var Story = (function ($) {
	var _containerWidth = 0,
		$container,
		$listProducts,
		$products,
		_isDetail = false,
		init = function () {
			$container = $('.contents.popstory');
			$listProducts = $container.find('.list-popstory');
			$products = $container.find('.pop-story');
			$thumbs = $products.find('> figure .thumb > img');
			_containerWidth = $products.width();

	 		initLayout();
			initEvent();
		};//end init

	function initLayout() {
	}

	function imageload($elements) {
		$elements.one('load', function() {
			console.log('load');
		}).each(function() {
			if( this.complete ) {
				var width = $(this).width();
				var left = (-width/2 + _containerWidth/2);
				$(this).show().css('left', left).addClass('animated fadeIn');
			}
		});
	}

	function initEvent() {
		imageload($thumbs);
	}

	function addProducts($elements) {
		$listProducts.append($elements);

		var $_thumbs = $elements.find('.product > figure .thumb > img');
		imageload($_thumbs);
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
/******************************************* 팝업 ********************************************/
/********************************************************************************************/
var Popup = (function ($) {
	var $btnToggles,
		$btnClose,
		$btnOvers;
		init = function () {
			$btnToggles = $('.va-toogle-btns');
			$btnClose = $('.popup button.btn-popup-close');
			$btnOvers = $('.va-over-btns');

			initLayout();
			initEvent();
		};//end init

	function initLayout() {

	}

	function initEvent() {
		if( $btnClose.length > 0 ) {
			$btnClose.on('click', function(e) {
				var target = $(this).data('target');
				$(target).hide();
			});
		}

		// 전체 토글 버튼
		$btnToggles.on('click', function(e) {
			e.preventDefault();

			var target = null;
			if( $(this).is('[value]') ) {
				target = $(this).val();
			} else if( $(this).is('[href]') ) {
				target = $(this).attr('href');
			}
			$(target).toggle();
		});

		// 전체 마우스 오버 버튼
		$btnOvers.on('mouseover', function(e) {
			var target = null;
			if( $(this).is('[value]') ) {
				target = $(this).val();
			} else if( $(this).is('[href]') ) {
				target = $(this).attr('href');
			}
			$(target).show();
			
		}).on('mouseout', function(e) {
			var target = null;
			if( $(this).is('[value]') ) {
				target = $(this).val();
			} else if( $(this).is('[href]') ) {
				target = $(this).attr('href');
			}
			$(target).hide();
		});
	}

	return {
		init: function() {
			init();
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
		$frPopup,
		_isOpen = false,
		init = function () {
			$investPopupContainer = $('.invest-popup-container');
			$investBtnsContainer = $('.invest-product');
			
			$investPopup = $('#popup-invest');
			$calcPopup = $('#popup-calc');
			$calcAfterPopup = $('#popup-calc-after');
			$frPopup = $investPopupContainer.find('.btn-fr');
			
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

		$frPopup.on('click', function(e) {
			e.preventDefault();
			var target = $(this).attr('href');
			$(target).toggle();
		});
	}

	function bindPopupBtns($element, isMessage, callback) {
		var $btnClose = $element.find('.btn-popup-close');
		$btnClose.on('click', function(e) {
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
