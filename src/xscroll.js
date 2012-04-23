/******************** xScroll **********************/
//just merge the js files for real use iscroll and then xscroll extension
(function(){
	var m = Math,
	mround = function (r) { return r >> 0; },
	vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
		(/firefox/i).test(navigator.userAgent) ? 'Moz' :
		(/trident/i).test(navigator.userAgent) ? 'ms' :
		'opera' in window ? 'O' : '',

    // Browser capabilities
    isAndroid = (/android/gi).test(navigator.appVersion),
    isIDevice = (/iphone|ipad/gi).test(navigator.appVersion),
    isPlaybook = (/playbook/gi).test(navigator.appVersion),
    isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),

    has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix(),
    hasTouch = 'ontouchstart' in window && !isTouchPad,
    hasTransform = vendor + 'Transform' in document.documentElement.style,
    hasTransitionEnd = isIDevice || isPlaybook,

	nextFrame = (function() {
	    return window.requestAnimationFrame
			|| window.webkitRequestAnimationFrame
			|| window.mozRequestAnimationFrame
			|| window.oRequestAnimationFrame
			|| window.msRequestAnimationFrame
			|| function(callback) { return setTimeout(callback, 1); }
	})(),
	cancelFrame = (function () {
	    return window.cancelRequestAnimationFrame
			|| window.webkitCancelAnimationFrame
			|| window.webkitCancelRequestAnimationFrame
			|| window.mozCancelRequestAnimationFrame
			|| window.oCancelRequestAnimationFrame
			|| window.msCancelRequestAnimationFrame
			|| clearTimeout
	})(),

	// Events
	RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
	START_EV = hasTouch ? 'touchstart' : 'mousedown',
	MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
	END_EV = hasTouch ? 'touchend' : 'mouseup',
	CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup',
	WHEEL_EV = vendor == 'Moz' ? 'DOMMouseScroll' : 'mousewheel',

	// Helpers
	trnOpen = 'translate' + (has3d ? '3d(' : '('),
	trnClose = has3d ? ',0)' : ')';


	//extends iScroll
	var xScroll = function(el, options){
	    
	    iScroll.call(this, el, options);
	    var that = this;
	    //init vars
		that.pullUpTimout = null;
		that.pullDownTimeout = null;
		that.checkPullTimer = null;
		that.pullingDown = false;
		that.pullingUp = false;
		that.lazySelector = null;
		that.showImagesTimer = null;
		that.move = {x:0, y:0};
		that.startScroll = {x:0, y:0};
		that.currentlyLockedDirection = false;
		//2 drag on the edges force leave edge (default behaviour)
		that.leaveEdge = false;
		that.options.onBeforeScrollStart = function (e) {
			var that = this;
			var inBoundY = (that.pullDownAction || that.y <0) && (that.pullUpAction || that.y>that.maxScrollY);
			if(inBoundY || that.leaveEdge) {
				that.leaveEdge=false;
				e.preventDefault();
			} else that.leaveEdge = true;
		};
	    if(options) {
	    	if(typeof options.pullDownAction !='undefined') this.pullDownAction = options.pullDownAction;
	    	if(typeof options.pullUpAction !='undefined') this.pullUpAction = options.pullUpAction;
			if(typeof options.pullUpAction !='undefined') this.pullUpAction = options.pullUpAction;	    
	    	if(typeof options.lazySelector !='undefined') this.lazySelector = options.lazySelector;
	    	if(typeof options.onBeforeScrollStart !='undefined') this.options.onBeforeScrollStart = options.onBeforeScrollStart;
	    } 
	    
	};
	xScroll.prototype = iScroll.prototype;
	
	//define standard pull down/up actions
	xScroll.prototype.pullDownAction = null;
	xScroll.prototype.pullUpAction = null;

	
	//Clear pull timeouts
	xScroll.prototype.clearPullUp = function(){
		var that = this;
		if(that.pullUpTimeout) {
			clearTimeout(that.pullUpTimeout);
			this.pullUpTimeout = null;
		}
		if(that.pullingUp) {
			$(that.wrapper).trigger("cancelpullingup");
			that.pullingUp = false;
		}
	};
	xScroll.prototype.clearPullDown = function(){
		var that = this;
		if(that.pullDownTimeout) {
			clearTimeout(that.pullDownTimeout);
			that.pullDownTimeout = null;
		}
		if(that.pullingDown) {
			$(that.wrapper).trigger("cancelpullingdown");
			that.pullingDown = false;
		}
	};
	//check pull
	xScroll.prototype.checkPull = function(timeout){
		if(typeof timeout == "undefined") timeout=null;
		var that = this;
		that.checkPullTimer = null;
		if(that.y>0) {
			if(!that.options.pullDownAction) return;
			//in any case = NO pullUp
			that.clearPullUp();
			if(!that.pullingDown) {
				//we are potentially pulling down, set timout to be sure
				$(that.wrapper).trigger("pullingdown");
				that.pullingDown = true;
				that.pullDownTimeout = setTimeout(function(){that.checkPull(true)}, 1500);
			} else if(timeout==true){
				that.clearPullDown();
				$(that.wrapper).trigger("pulleddown");
				that.pullDownAction();
			}
		} else {
			if(!that.options.pullUpAction) return;
			//in any case = NO pullDown
			that.clearPullDown();
			if(that.y < that.maxScrollY) {
				if(!that.pullingUp) {
					//we are potentially pulling down, set timout to be sure
					$(that.wrapper).trigger("pullingup");
					that.pullingUp = true;
					that.pullUpTimeout = setTimeout(function(){that.checkPull(true)}, 1500);
				} else if(timeout==true) {
					that.clearPullUp();
					$(that.wrapper).trigger("pulledup");
					that.pullUpAction();
				}
			} else {
				//in any case = NO pullUp
				that.clearPullUp();
			}
				
		}
	};
	xScroll.prototype.showVisibleImages = function() {
		var that = this;
		myScrollWrapper=$(myScroll.wrapper);
		that.myScrollHeight = myScrollWrapper.height();
		that.myScrollWrapperOffset = myScrollWrapper.offset().top;
		myScrollWrapper.find(that.lazySelector+":not(.loading-mage):not(.loaded)").each(function() {
			var myOffset = $(this).offset().top;
			if(myOffset>=that.myScrollWrapperOffset && myOffset<that.myScrollWrapperOffset+that.myScrollHeight) {
				var myImg = $(this);
				myImg.addClass('loading-image');
				myImg.attr("src", myImg.attr('data-original')).css({opacity:0}).load(function() {
					$(this).animate({opacity:1},0).addClass('loaded').removeClass("loading-image");				
				});
			}
		});
	};
	xScroll.prototype._start = function (e) {
		var that = this,
			point = hasTouch ? e.touches[0] : e,
			matrix, x, y,
			c1, c2;

		if (!that.enabled) return;

		if (that.options.onBeforeScrollStart) that.options.onBeforeScrollStart.call(that, e);

		if (that.options.useTransition || that.options.zoom) that._transitionTime(0);

		that.moved = false;
		that.animating = false;
		that.zoomed = false;
		that.distX = 0;
		that.distY = 0;
		that.absDistX = 0;
		that.absDistY = 0;
		that.dirX = 0;
		that.dirY = 0;
		
		start = {
			x:that.wrapper.scrollLeft+point.pageX,
			y:that.wrapper.scrollTop+point.pageY
		};
		that.startScroll =  {x:point.pageX, y:point.pageY};
		that.move =  {x:0, y:0};
		that.currentlyLockedDirection = false;
		
		// Gesture start
		if (that.options.zoom && hasTouch && e.touches.length > 1) {
			c1 = m.abs(e.touches[0].pageX-e.touches[1].pageX);
			c2 = m.abs(e.touches[0].pageY-e.touches[1].pageY);
			that.touchesDistStart = m.sqrt(c1 * c1 + c2 * c2);

			that.originX = m.abs(e.touches[0].pageX + e.touches[1].pageX - that.wrapperOffsetLeft * 2) / 2 - that.x;
			that.originY = m.abs(e.touches[0].pageY + e.touches[1].pageY - that.wrapperOffsetTop * 2) / 2 - that.y;

			if (that.options.onZoomStart) that.options.onZoomStart.call(that, e);
		}

		if (that.options.momentum) {
			if (that.options.useTransform) {
				// Very lame general purpose alternative to CSSMatrix
				matrix = getComputedStyle(that.scroller, null)[vendor + 'Transform'].replace(/[^0-9-.,]/g, '').split(',');
				x = matrix[4] * 1;
				y = matrix[5] * 1;
			} else {
				x = getComputedStyle(that.scroller, null).left.replace(/[^0-9-]/g, '') * 1;
				y = getComputedStyle(that.scroller, null).top.replace(/[^0-9-]/g, '') * 1;
			}
			
			if (x != that.x || y != that.y) {
				if (that.options.useTransition) that._unbind('webkitTransitionEnd');
				else cancelFrame(that.aniTime);
				that.steps = [];
				that._pos(x, y);
			}
		}

		that.absStartX = that.x;	// Needed by snap threshold
		that.absStartY = that.y;

		that.startX = that.x;
		that.startY = that.y;
		that.pointX = point.pageX;
		that.pointY = point.pageY;

		that.startTime = e.timeStamp || Date.now();

		if (that.options.onScrollStart) that.options.onScrollStart.call(that, e);

		that._bind(MOVE_EV);
		that._bind(END_EV);
		that._bind(CANCEL_EV);
	},
	xScroll.prototype._move = function(e) {
		var that = this,
			point = hasTouch ? e.touches[0] : e,
			deltaX = point.pageX - that.pointX,
			deltaY = point.pageY - that.pointY,
			newX = that.x + deltaX,
			newY = that.y + deltaY,
			c1, c2, scale,
			timestamp = e.timeStamp || Date.now();

		if (that.options.onBeforeScrollMove) that.options.onBeforeScrollMove.call(that, e);
		
		// Zoom
		if (that.options.zoom && hasTouch && e.touches.length > 1) {
			c1 = m.abs(e.touches[0].pageX - e.touches[1].pageX);
			c2 = m.abs(e.touches[0].pageY - e.touches[1].pageY);
			that.touchesDist = m.sqrt(c1*c1+c2*c2);

			that.zoomed = true;

			scale = 1 / that.touchesDistStart * that.touchesDist * this.scale;

			if (scale < that.options.zoomMin) scale = 0.5 * that.options.zoomMin * Math.pow(2.0, scale / that.options.zoomMin);
			else if (scale > that.options.zoomMax) scale = 2.0 * that.options.zoomMax * Math.pow(0.5, that.options.zoomMax / scale);

			that.lastScale = scale / this.scale;

			newX = this.originX - this.originX * that.lastScale + this.x,
			newY = this.originY - this.originY * that.lastScale + this.y;

			this.scroller.style[vendor + 'Transform'] = trnOpen + newX + 'px,' + newY + 'px' + trnClose + ' scale(' + scale + ')';

			if (that.options.onZoom) that.options.onZoom.call(that, e);
			return;
		}

		that.pointX = point.pageX;
		that.pointY = point.pageY;

		// Slow down if outside of the boundaries
		if (newX > 0 || newX < that.maxScrollX) {
			newX = that.options.bounce ? that.x + (deltaX / 2) : newX >= 0 || that.maxScrollX >= 0 ? 0 : that.maxScrollX;
		}
		if (newY > that.minScrollY || newY < that.maxScrollY) { 
			newY = that.options.bounce ? that.y + (deltaY / 2) : newY >= that.minScrollY || that.maxScrollY >= 0 ? that.minScrollY : that.maxScrollY;
		}

		if (that.absDistX < 6 && that.absDistY < 6) {
			that.distX += deltaX;
			that.distY += deltaY;
			that.absDistX = m.abs(that.distX);
			that.absDistY = m.abs(that.distY);

			return;
		}

		// Lock direction
		if (that.options.lockDirection) {
			if (that.absDistX > that.absDistY + 5) {
				newY = that.y;
				deltaY = 0;
				//e.preventDefault
			} else if (that.absDistY > that.absDistX + 5) {
				newX = that.x;
				deltaX = 0;
			}
		}
		//process the movement of the touch
		that.move.x = point.pageX - that.startScroll.x;
		that.move.y = point.pageY - that.startScroll.y;
		
		//matteo : i don't know why that.y is <0 when it should be 0 when no scroll no ? 
		//thus this next line bugs around that.y==0
		//is the movement inside the iscroll bounds
		var inBoundY = (that.pullDownAction || (deltaY!=0 && that.y+deltaY<0)) && (that.pullUpAction || (that.y+deltaY>that.maxScrollY));
		//is this an horizontal scroll ?
		var isHorizontalScroll = Math.abs(that.move.x)>3*Math.abs(that.move.y);
		
		if(( that.currentlyLockedDirection || isHorizontalScroll) ||  (inBoundY && !isHorizontalScroll)) {
			//use iscroll if : inboundy if vertical scroll
			//or if currently locked or is horizontal scroll
			//if this is a horizontal scroll record that
			if(!isHorizontalScroll) that.currentlyLockedDirection=true;
			
			//prevent any default scroll
			e.preventDefault();
		} else {
			//regular scroll
			//vertical regular scroll : don't change x 
			if(!isHorizontalScroll) newX = that.x;
			
			//regular scroll : don't change the y
			newY=that.y;	
		}
		that.moved = true;
		that._pos(newX, newY);
		that.dirX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
		that.dirY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

		if (timestamp - that.startTime > 300) {
			that.startTime = timestamp;
			that.startX = that.x;
			that.startY = that.y;
		}
		if (that.options.onScrollMove) that.options.onScrollMove.call(that, e);
		
		if(that.options.pullDownAction || that.options.pullUpAction) {
			if(that.checkPullTimer) clearTimeout(that.checkPullTimer);
			that.checkPullTimer = setTimeout(function(){that.checkPull()}, 10);	
		}
		if(!that.lazySelector) return;		
		if(that.showImagesTimer) clearTimeout(that.showImagesTimer);
		that.showImagesTimer = setTimeout(function(){that.showVisibleImages();}, 600);
	};
	xScroll.prototype.oldrefresh = xScroll.prototype.refresh;
	xScroll.prototype.refresh = function() {
		var that= this;
		that.oldrefresh();
		if(!that.lazySelector) return;		
		that.showVisibleImages();
	};
	
	xScroll.prototype._oldend = xScroll.prototype._end;
	xScroll.prototype._oldend = xScroll.prototype._end;
	xScroll.prototype._end = function(e) {
		var that = this;
		that.clearPullUp();
		that.clearPullDown();
		that._oldend(e);
	};
	//define scope
	if (typeof exports !== 'undefined') exports.xScroll = xScroll;
	else window.xScroll = xScroll;
})();
/******************** /xScroll **********************/
