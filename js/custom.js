loadingLi=null;

var resizePageTimer = null;
var hideBar = function(){
	setTimeout(function(){
		window.scrollTo(0, 1); 
	}, 1);
};
myScroll = null;
body = $("body");

$("html").on('pullingdown', '.wrapper', function(){$(this).addClass("pulling-down");});
$("html").on('pulleddown', '.wrapper', function(){$(this).addClass("pulled-down");});
$("html").on('pullingup', '.wrapper', function(){$(this).addClass("pulling-up");});
$("html").on('pulledup', '.wrapper', function(){$(this).addClass("pulled-up");});
$("html").on('cancelpullingdown , cancelpullingup', '.wrapper', function(e){$(this).removeClass("pulling-up pulled-up pulling-down pulled-down");});

//$("html").on('touchmove', ".wrapper", function (e) { e.preventDefault(); });
	
var initSlideshow = function() {
	if(myScroll) {return false;}
	myScroll = new xScroll('wrapper', {
		useTransition: true,
		snap:'li:not(.noSnap)',
		lazySelector : 'img.lazy',
		pullDownAction : function() {$(this.scroller).find("a:first").click();}
	});
};

var unloadArticle = function(options){
	options.callback();
}
var loadArticle = function(options) {
	$('.wrapper').removeClass("pulling-up pulled-up pulling-down pulled-down");
	if(loadingLi) loadingLi.removeClass("loading");
	//var currPage = myScroll.currPageY;
	window.setTimeout(function(){
		myScroll.refresh();
	}, 1);
};		
	
var resetSlideShow = function() {
	slideshowScroll.destroy();
	slideshowScroll = null;
};
var resizePage = function() {
	hideBar();
	myScroll.refresh();
};

var highGraphics = function(){
	if(Modernizr.inputtypes.email) $("body").addClass("high-graphics");
};
var unloadPage = function(options){
	options.callback();
};
(function($) {
	// get unique selector as #id if have id otherwise create id and return the proper selector
	$.fn.prependOnce = function(html) {
		if($(this).find("#"+$('<ul>'+html+'</ul>').find('.prev').attr("id")).length==0) {
			$(this).prepend(html);
		}
		return this;
	};
	$.fn.appendOnce = function(html) {
		if($(this).find("#"+$('<ul>'+html+'</ul>').find('.next').attr("id")).length==0) {
			$(this).append(html);
		}
		return this;
	};
})(jQuery);	

var loadPage = function(options) {
	body = $("body");
	hideBar();
	highGraphics();
	initSlideshow();
	loadArticle();
	resizePage();
};