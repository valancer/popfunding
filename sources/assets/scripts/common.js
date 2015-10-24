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
	Product.init();
});



var Product = (function ($) {
	var scope,
		_containerWidth = 0,
		$products,
		init = function () {
			$products = $('.product');
			$thumbs = $products.find('.thumb > img');
			_containerWidth = $products.width();
			
	 		initLayout();
			initEvent();

		};//end init

	function initLayout() {
		
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
	return {
		init: function () {
			scope = this;

			init();
		}
	};
}(jQuery));