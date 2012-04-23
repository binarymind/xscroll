/******************** iScroll **********************/
(function(){var g=Math,f=/webkit/i.test(navigator.appVersion)?"webkit":/firefox/i.test(navigator.userAgent)?"Moz":/trident/i.test(navigator.userAgent)?"ms":"opera"in window?"O":"",t=/android/gi.test(navigator.appVersion),u=/iphone|ipad/gi.test(navigator.appVersion),p=/playbook/gi.test(navigator.appVersion),B=/hp-tablet/gi.test(navigator.appVersion),v="WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix,l="ontouchstart"in window&&!B,z=f+"Transform"in document.documentElement.style,C=u||p,D=function(){return window.requestAnimationFrame|| window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(b){return setTimeout(b,1)}}(),A=window.cancelRequestAnimationFrame||window.webkitCancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||clearTimeout,w="onorientationchange"in window?"orientationchange":"resize",x=l?"touchstart":"mousedown", q=l?"touchmove":"mousemove",r=l?"touchend":"mouseup",s=l?"touchcancel":"mouseup",y="Moz"==f?"DOMMouseScroll":"mousewheel",n="translate"+(v?"3d(":"("),o=v?",0)":")",p=function(b,a){var c=this,d;c.wrapper="object"==typeof b?b:document.getElementById(b);c.wrapper.style.overflow="hidden";c.scroller=c.wrapper.children[0];c.options={hScroll:!0,vScroll:!0,x:0,y:0,bounce:!0,bounceLock:!1,momentum:!0,lockDirection:!0,useTransform:!0,useTransition:!1,topOffset:0,checkDOMChanges:!1,hScrollbar:!0,vScrollbar:!0, fixedScrollbar:t,hideScrollbar:u,fadeScrollbar:u&&v,scrollbarClass:"",zoom:!1,zoomMin:1,zoomMax:4,doubleTapZoom:2,wheelAction:"scroll",snap:!1,snapThreshold:1,onRefresh:null,onBeforeScrollStart:function(a){a.preventDefault()},onScrollStart:null,onBeforeScrollMove:null,onScrollMove:null,onBeforeScrollEnd:null,onScrollEnd:null,onTouchEnd:null,onDestroy:null,onZoomStart:null,onZoom:null,onZoomEnd:null};for(d in a)c.options[d]=a[d];c.x=c.options.x;c.y=c.options.y;c.options.useTransform=z?c.options.useTransform: !1;c.options.hScrollbar=c.options.hScroll&&c.options.hScrollbar;c.options.vScrollbar=c.options.vScroll&&c.options.vScrollbar;c.options.zoom=c.options.useTransform&&c.options.zoom;c.options.useTransition=C&&c.options.useTransition;c.options.zoom&&t&&(n="translate(",o=")");c.scroller.style[f+"TransitionProperty"]=c.options.useTransform?"-"+f.toLowerCase()+"-transform":"top left";c.scroller.style[f+"TransitionDuration"]="0";c.scroller.style[f+"TransformOrigin"]="0 0";c.options.useTransition&&(c.scroller.style[f+ "TransitionTimingFunction"]="cubic-bezier(0.33,0.66,0.66,1)");c.options.useTransform?c.scroller.style[f+"Transform"]=n+c.x+"px,"+c.y+"px"+o:c.scroller.style.cssText+=";position:absolute;top:"+c.y+"px;left:"+c.x+"px";c.options.useTransition&&(c.options.fixedScrollbar=!0);c.refresh();c._bind(w,window);c._bind(x);l||(c._bind("mouseout",c.wrapper),"none"!=c.options.wheelAction&&c._bind(y));c.options.checkDOMChanges&&(c.checkDOMTime=setInterval(function(){c._checkDOMChanges()},500))};p.prototype={enabled:!0, x:0,y:0,steps:[],scale:1,currPageX:0,currPageY:0,pagesX:[],pagesY:[],aniTime:null,wheelZoomCount:0,handleEvent:function(b){switch(b.type){case x:if(!l&&0!==b.button)break;this._start(b);break;case q:this._move(b);break;case r:case s:this._end(b);break;case w:this._resize();break;case y:this._wheel(b);break;case "mouseout":this._mouseout(b);break;case "webkitTransitionEnd":this._transitionEnd(b)}},_checkDOMChanges:function(){!this.moved&&!this.zoomed&&!(this.animating||this.scrollerW==this.scroller.offsetWidth* this.scale&&this.scrollerH==this.scroller.offsetHeight*this.scale)&&this.refresh()},_scrollbar:function(b){var a=document,c;this[b+"Scrollbar"]?(this[b+"ScrollbarWrapper"]||(c=a.createElement("div"),this.options.scrollbarClass?c.className=this.options.scrollbarClass+b.toUpperCase():c.style.cssText="position:absolute;z-index:100;"+("h"==b?"height:7px;bottom:1px;left:2px;right:"+(this.vScrollbar?"7":"2")+"px":"width:7px;bottom:"+(this.hScrollbar?"7":"2")+"px;top:2px;right:1px"),c.style.cssText+=";pointer-events:none;-"+ f+"-transition-property:opacity;-"+f+"-transition-duration:"+(this.options.fadeScrollbar?"350ms":"0")+";overflow:hidden;opacity:"+(this.options.hideScrollbar?"0":"1"),this.wrapper.appendChild(c),this[b+"ScrollbarWrapper"]=c,c=a.createElement("div"),this.options.scrollbarClass||(c.style.cssText="position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);-"+f+"-background-clip:padding-box;-"+f+"-box-sizing:border-box;"+("h"==b?"height:100%":"width:100%")+";-"+f+ "-border-radius:3px;border-radius:3px"),c.style.cssText+=";pointer-events:none;-"+f+"-transition-property:-"+f+"-transform;-"+f+"-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);-"+f+"-transition-duration:0;-"+f+"-transform:"+n+"0,0"+o,this.options.useTransition&&(c.style.cssText+=";-"+f+"-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)"),this[b+"ScrollbarWrapper"].appendChild(c),this[b+"ScrollbarIndicator"]=c),"h"==b?(this.hScrollbarSize=this.hScrollbarWrapper.clientWidth,this.hScrollbarIndicatorSize= g.max(this.hScrollbarSize*this.hScrollbarSize/this.scrollerW>>0,8),this.hScrollbarIndicator.style.width=this.hScrollbarIndicatorSize+"px",this.hScrollbarMaxScroll=this.hScrollbarSize-this.hScrollbarIndicatorSize,this.hScrollbarProp=this.hScrollbarMaxScroll/this.maxScrollX):(this.vScrollbarSize=this.vScrollbarWrapper.clientHeight,this.vScrollbarIndicatorSize=g.max(this.vScrollbarSize*this.vScrollbarSize/this.scrollerH>>0,8),this.vScrollbarIndicator.style.height=this.vScrollbarIndicatorSize+"px",this.vScrollbarMaxScroll= this.vScrollbarSize-this.vScrollbarIndicatorSize,this.vScrollbarProp=this.vScrollbarMaxScroll/this.maxScrollY),this._scrollbarPos(b,!0)):this[b+"ScrollbarWrapper"]&&(z&&(this[b+"ScrollbarIndicator"].style[f+"Transform"]=""),this[b+"ScrollbarWrapper"].parentNode.removeChild(this[b+"ScrollbarWrapper"]),this[b+"ScrollbarWrapper"]=null,this[b+"ScrollbarIndicator"]=null)},_resize:function(){var b=this;setTimeout(function(){b.refresh()},t?200:0)},_pos:function(b,a){b=this.hScroll?b:0;a=this.vScroll?a:0; this.options.useTransform?this.scroller.style[f+"Transform"]=n+b+"px,"+a+"px"+o+" scale("+this.scale+")":(b>>=0,a>>=0,this.scroller.style.left=b+"px",this.scroller.style.top=a+"px");this.x=b;this.y=a;this._scrollbarPos("h");this._scrollbarPos("v")},_scrollbarPos:function(b,a){var c="h"==b?this.x:this.y;this[b+"Scrollbar"]&&(c*=this[b+"ScrollbarProp"],0>c?(this.options.fixedScrollbar||(c=this[b+"ScrollbarIndicatorSize"]+(3*c>>0),8>c&&(c=8),this[b+"ScrollbarIndicator"].style["h"==b?"width":"height"]= c+"px"),c=0):c>this[b+"ScrollbarMaxScroll"]&&(this.options.fixedScrollbar?c=this[b+"ScrollbarMaxScroll"]:(c=this[b+"ScrollbarIndicatorSize"]-(3*(c-this[b+"ScrollbarMaxScroll"])>>0),8>c&&(c=8),this[b+"ScrollbarIndicator"].style["h"==b?"width":"height"]=c+"px",c=this[b+"ScrollbarMaxScroll"]+(this[b+"ScrollbarIndicatorSize"]-c))),this[b+"ScrollbarWrapper"].style[f+"TransitionDelay"]="0",this[b+"ScrollbarWrapper"].style.opacity=a&&this.options.hideScrollbar?"0":"1",this[b+"ScrollbarIndicator"].style[f+ "Transform"]=n+("h"==b?c+"px,0":"0,"+c+"px")+o)},_start:function(b){var a=l?b.touches[0]:b,c,d;if(this.enabled){this.options.onBeforeScrollStart&&this.options.onBeforeScrollStart.call(this,b);(this.options.useTransition||this.options.zoom)&&this._transitionTime(0);this.zoomed=this.animating=this.moved=!1;this.dirY=this.dirX=this.absDistY=this.absDistX=this.distY=this.distX=0;this.options.zoom&&l&&1<b.touches.length&&(d=g.abs(b.touches[0].pageX-b.touches[1].pageX),c=g.abs(b.touches[0].pageY-b.touches[1].pageY), this.touchesDistStart=g.sqrt(d*d+c*c),this.originX=g.abs(b.touches[0].pageX+b.touches[1].pageX-2*this.wrapperOffsetLeft)/2-this.x,this.originY=g.abs(b.touches[0].pageY+b.touches[1].pageY-2*this.wrapperOffsetTop)/2-this.y,this.options.onZoomStart&&this.options.onZoomStart.call(this,b));if(this.options.momentum&&(this.options.useTransform?(c=getComputedStyle(this.scroller,null)[f+"Transform"].replace(/[^0-9-.,]/g,"").split(","),d=1*c[4],c=1*c[5]):(d=1*getComputedStyle(this.scroller,null).left.replace(/[^0-9-]/g, ""),c=1*getComputedStyle(this.scroller,null).top.replace(/[^0-9-]/g,"")),d!=this.x||c!=this.y))this.options.useTransition?this._unbind("webkitTransitionEnd"):A(this.aniTime),this.steps=[],this._pos(d,c);this.absStartX=this.x;this.absStartY=this.y;this.startX=this.x;this.startY=this.y;this.pointX=a.pageX;this.pointY=a.pageY;this.startTime=b.timeStamp||Date.now();this.options.onScrollStart&&this.options.onScrollStart.call(this,b);this._bind(q);this._bind(r);this._bind(s)}},_move:function(b){var a=l? b.touches[0]:b,c=a.pageX-this.pointX,d=a.pageY-this.pointY,e=this.x+c,i=this.y+d,h=b.timeStamp||Date.now();this.options.onBeforeScrollMove&&this.options.onBeforeScrollMove.call(this,b);if(this.options.zoom&&l&&1<b.touches.length)e=g.abs(b.touches[0].pageX-b.touches[1].pageX),i=g.abs(b.touches[0].pageY-b.touches[1].pageY),this.touchesDist=g.sqrt(e*e+i*i),this.zoomed=!0,a=1/this.touchesDistStart*this.touchesDist*this.scale,a<this.options.zoomMin?a=0.5*this.options.zoomMin*Math.pow(2,a/this.options.zoomMin): a>this.options.zoomMax&&(a=2*this.options.zoomMax*Math.pow(0.5,this.options.zoomMax/a)),this.lastScale=a/this.scale,e=this.originX-this.originX*this.lastScale+this.x,i=this.originY-this.originY*this.lastScale+this.y,this.scroller.style[f+"Transform"]=n+e+"px,"+i+"px"+o+" scale("+a+")",this.options.onZoom&&this.options.onZoom.call(this,b);else{this.pointX=a.pageX;this.pointY=a.pageY;if(0<e||e<this.maxScrollX)e=this.options.bounce?this.x+c/2:0<=e||0<=this.maxScrollX?0:this.maxScrollX;if(i>this.minScrollY|| i<this.maxScrollY)i=this.options.bounce?this.y+d/2:i>=this.minScrollY||0<=this.maxScrollY?this.minScrollY:this.maxScrollY;this.distX+=c;this.distY+=d;this.absDistX=g.abs(this.distX);this.absDistY=g.abs(this.distY);6>this.absDistX&&6>this.absDistY||(this.options.lockDirection&&(this.absDistX>this.absDistY+5?(i=this.y,d=0):this.absDistY>this.absDistX+5&&(e=this.x,c=0)),this.moved=!0,this._pos(e,i),this.dirX=0<c?-1:0>c?1:0,this.dirY=0<d?-1:0>d?1:0,300<h-this.startTime&&(this.startTime=h,this.startX= this.x,this.startY=this.y),this.options.onScrollMove&&this.options.onScrollMove.call(this,b))}},_end:function(b){if(!(l&&0!=b.touches.length)){var a=this,c=l?b.changedTouches[0]:b,d,e,i={dist:0,time:0},h={dist:0,time:0},k=(b.timeStamp||Date.now())-a.startTime,j=a.x,m=a.y;a._unbind(q);a._unbind(r);a._unbind(s);a.options.onBeforeScrollEnd&&a.options.onBeforeScrollEnd.call(a,b);if(a.zoomed)j=a.scale*a.lastScale,j=Math.max(a.options.zoomMin,j),j=Math.min(a.options.zoomMax,j),a.lastScale=j/a.scale,a.scale= j,a.x=a.originX-a.originX*a.lastScale+a.x,a.y=a.originY-a.originY*a.lastScale+a.y,a.scroller.style[f+"TransitionDuration"]="200ms",a.scroller.style[f+"Transform"]=n+a.x+"px,"+a.y+"px"+o+" scale("+a.scale+")",a.zoomed=!1,a.refresh(),a.options.onZoomEnd&&a.options.onZoomEnd.call(a,b);else{if(a.moved){if(300>k&&a.options.momentum){i=j?a._momentum(j-a.startX,k,-a.x,a.scrollerW-a.wrapperW+a.x,a.options.bounce?a.wrapperW:0):i;h=m?a._momentum(m-a.startY,k,-a.y,0>a.maxScrollY?a.scrollerH-a.wrapperH+a.y-a.minScrollY: 0,a.options.bounce?a.wrapperH:0):h;j=a.x+i.dist;m=a.y+h.dist;if(0<a.x&&0<j||a.x<a.maxScrollX&&j<a.maxScrollX)i={dist:0,time:0};if(a.y>a.minScrollY&&m>a.minScrollY||a.y<a.maxScrollY&&m<a.maxScrollY)h={dist:0,time:0}}i.dist||h.dist?(i=g.max(g.max(i.time,h.time),10),a.options.snap&&(h=j-a.absStartX,k=m-a.absStartY,g.abs(h)<a.options.snapThreshold&&g.abs(k)<a.options.snapThreshold?a.scrollTo(a.absStartX,a.absStartY,200):(h=a._snap(j,m),j=h.x,m=h.y,i=g.max(h.time,i))),a.scrollTo(j>>0,m>>0,i)):a.options.snap? (h=j-a.absStartX,k=m-a.absStartY,g.abs(h)<a.options.snapThreshold&&g.abs(k)<a.options.snapThreshold?a.scrollTo(a.absStartX,a.absStartY,200):(h=a._snap(a.x,a.y),(h.x!=a.x||h.y!=a.y)&&a.scrollTo(h.x,h.y,h.time))):a._resetPos(200)}else l&&(a.doubleTapTimer&&a.options.zoom?(clearTimeout(a.doubleTapTimer),a.doubleTapTimer=null,a.options.onZoomStart&&a.options.onZoomStart.call(a,b),a.zoom(a.pointX,a.pointY,1==a.scale?a.options.doubleTapZoom:1),a.options.onZoomEnd&&setTimeout(function(){a.options.onZoomEnd.call(a, b)},200)):a.doubleTapTimer=setTimeout(function(){a.doubleTapTimer=null;for(d=c.target;1!=d.nodeType;)d=d.parentNode;"SELECT"!=d.tagName&&"INPUT"!=d.tagName&&"TEXTAREA"!=d.tagName&&(e=document.createEvent("MouseEvents"),e.initMouseEvent("click",!0,!0,b.view,1,c.screenX,c.screenY,c.clientX,c.clientY,b.ctrlKey,b.altKey,b.shiftKey,b.metaKey,0,null),e._fake=!0,d.dispatchEvent(e))},a.options.zoom?250:0)),a._resetPos(200);a.options.onTouchEnd&&a.options.onTouchEnd.call(a,b)}}},_resetPos:function(b){var a= 0<=this.x?0:this.x<this.maxScrollX?this.maxScrollX:this.x,c=this.y>=this.minScrollY||0<this.maxScrollY?this.minScrollY:this.y<this.maxScrollY?this.maxScrollY:this.y;if(a==this.x&&c==this.y){if(this.moved&&(this.moved=!1,this.options.onScrollEnd&&this.options.onScrollEnd.call(this)),this.hScrollbar&&this.options.hideScrollbar&&("webkit"==f&&(this.hScrollbarWrapper.style[f+"TransitionDelay"]="300ms"),this.hScrollbarWrapper.style.opacity="0"),this.vScrollbar&&this.options.hideScrollbar)"webkit"==f&& (this.vScrollbarWrapper.style[f+"TransitionDelay"]="300ms"),this.vScrollbarWrapper.style.opacity="0"}else this.scrollTo(a,c,b||0)},_wheel:function(b){var a=this,c,d;if("wheelDeltaX"in b)c=b.wheelDeltaX/12,d=b.wheelDeltaY/12;else if("wheelDelta"in b)c=d=b.wheelDelta/12;else if("detail"in b)c=d=3*-b.detail;else return;if("zoom"==a.options.wheelAction){if(d=a.scale*Math.pow(2,1/3*(d?d/Math.abs(d):0)),d<a.options.zoomMin&&(d=a.options.zoomMin),d>a.options.zoomMax&&(d=a.options.zoomMax),d!=a.scale)!a.wheelZoomCount&& a.options.onZoomStart&&a.options.onZoomStart.call(a,b),a.wheelZoomCount++,a.zoom(b.pageX,b.pageY,d,400),setTimeout(function(){a.wheelZoomCount--;!a.wheelZoomCount&&a.options.onZoomEnd&&a.options.onZoomEnd.call(a,b)},400)}else c=a.x+c,d=a.y+d,0<c?c=0:c<a.maxScrollX&&(c=a.maxScrollX),d>a.minScrollY?d=a.minScrollY:d<a.maxScrollY&&(d=a.maxScrollY),a.scrollTo(c,d,0)},_mouseout:function(b){var a=b.relatedTarget;if(a)for(;a=a.parentNode;)if(a==this.wrapper)return;this._end(b)},_transitionEnd:function(b){b.target== this.scroller&&(this._unbind("webkitTransitionEnd"),this._startAni())},_startAni:function(){var b=this,a=b.x,c=b.y,d=Date.now(),e,f,h;b.animating||(b.steps.length?(e=b.steps.shift(),e.x==a&&e.y==c&&(e.time=0),b.animating=!0,b.moved=!0,b.options.useTransition)?(b._transitionTime(e.time),b._pos(e.x,e.y),b.animating=!1,e.time?b._bind("webkitTransitionEnd"):b._resetPos(0)):(h=function(){var k=Date.now(),j;if(k>=d+e.time){b._pos(e.x,e.y);b.animating=false;b.options.onAnimationEnd&&b.options.onAnimationEnd.call(b); b._startAni()}else{k=(k-d)/e.time-1;f=g.sqrt(1-k*k);k=(e.x-a)*f+a;j=(e.y-c)*f+c;b._pos(k,j);if(b.animating)b.aniTime=D(h)}},h()):b._resetPos(400))},_transitionTime:function(b){b+="ms";this.scroller.style[f+"TransitionDuration"]=b;this.hScrollbar&&(this.hScrollbarIndicator.style[f+"TransitionDuration"]=b);this.vScrollbar&&(this.vScrollbarIndicator.style[f+"TransitionDuration"]=b)},_momentum:function(b,a,c,d,e){var a=g.abs(b)/a,f=a*a/0.0012;0<b&&f>c?(c+=e/(6/(6.0E-4*(f/a))),a=a*c/f,f=c):0>b&&f>d&&(d+= e/(6/(6.0E-4*(f/a))),a=a*d/f,f=d);return{dist:f*(0>b?-1:1),time:a/6.0E-4>>0}},_offset:function(b){for(var a=-b.offsetLeft,c=-b.offsetTop;b=b.offsetParent;)a-=b.offsetLeft,c-=b.offsetTop;b!=this.wrapper&&(a*=this.scale,c*=this.scale);return{left:a,top:c}},_snap:function(b,a){var c,d,e;e=this.pagesX.length-1;c=0;for(d=this.pagesX.length;c<d;c++)if(b>=this.pagesX[c]){e=c;break}e==this.currPageX&&0<e&&0>this.dirX&&e--;b=this.pagesX[e];d=(d=g.abs(b-this.pagesX[this.currPageX]))?500*(g.abs(this.x-b)/d): 0;this.currPageX=e;e=this.pagesY.length-1;for(c=0;c<e;c++)if(a>=this.pagesY[c]){e=c;break}e==this.currPageY&&0<e&&0>this.dirY&&e--;a=this.pagesY[e];c=(c=g.abs(a-this.pagesY[this.currPageY]))?500*(g.abs(this.y-a)/c):0;this.currPageY=e;e=g.max(d,c)>>0;return{x:b,y:a,time:e||200}},_bind:function(b,a,c){(a||this.scroller).addEventListener(b,this,!!c)},_unbind:function(b,a,c){(a||this.scroller).removeEventListener(b,this,!!c)},destroy:function(){this.scroller.style[f+"Transform"]="";this.vScrollbar=this.hScrollbar= !1;this._scrollbar("h");this._scrollbar("v");this._unbind(w,window);this._unbind(x);this._unbind(q);this._unbind(r);this._unbind(s);this.options.hasTouch||(this._unbind("mouseout",this.wrapper),this._unbind(y));this.options.useTransition&&this._unbind("webkitTransitionEnd");this.options.checkDOMChanges&&clearInterval(this.checkDOMTime);this.options.onDestroy&&this.options.onDestroy.call(this)},refresh:function(){var b,a,c,d=0;a=0;this.scale<this.options.zoomMin&&(this.scale=this.options.zoomMin); this.wrapperW=this.wrapper.clientWidth||1;this.wrapperH=this.wrapper.clientHeight||1;this.minScrollY=-this.options.topOffset||0;this.scrollerW=this.scroller.offsetWidth*this.scale>>0;this.scrollerH=(this.scroller.offsetHeight+this.minScrollY)*this.scale>>0;this.maxScrollX=this.wrapperW-this.scrollerW;this.maxScrollY=this.wrapperH-this.scrollerH+this.minScrollY;this.dirY=this.dirX=0;this.options.onRefresh&&this.options.onRefresh.call(this);this.hScroll=this.options.hScroll&&0>this.maxScrollX;this.vScroll= this.options.vScroll&&(!this.options.bounceLock&&!this.hScroll||this.scrollerH>this.wrapperH);this.hScrollbar=this.hScroll&&this.options.hScrollbar;this.vScrollbar=this.vScroll&&this.options.vScrollbar&&this.scrollerH>this.wrapperH;b=this._offset(this.wrapper);this.wrapperOffsetLeft=-b.left;this.wrapperOffsetTop=-b.top;if("string"==typeof this.options.snap){this.pagesX=[];this.pagesY=[];c=this.scroller.querySelectorAll(this.options.snap);b=0;for(a=c.length;b<a;b++)d=this._offset(c[b]),d.left+=this.wrapperOffsetLeft, d.top+=this.wrapperOffsetTop,this.pagesX[b]=d.left<this.maxScrollX?this.maxScrollX:d.left*this.scale,this.pagesY[b]=d.top<this.maxScrollY?this.maxScrollY:d.top*this.scale}else if(this.options.snap){for(this.pagesX=[];d>=this.maxScrollX;)this.pagesX[a]=d,d-=this.wrapperW,a++;this.maxScrollX%this.wrapperW&&(this.pagesX[this.pagesX.length]=this.maxScrollX-this.pagesX[this.pagesX.length-1]+this.pagesX[this.pagesX.length-1]);a=d=0;for(this.pagesY=[];d>=this.maxScrollY;)this.pagesY[a]=d,d-=this.wrapperH, a++;this.maxScrollY%this.wrapperH&&(this.pagesY[this.pagesY.length]=this.maxScrollY-this.pagesY[this.pagesY.length-1]+this.pagesY[this.pagesY.length-1])}this._scrollbar("h");this._scrollbar("v");this.zoomed||(this.scroller.style[f+"TransitionDuration"]="0",this._resetPos(200))},scrollTo:function(b,a,c,d){var e=b;this.stop();e.length||(e=[{x:b,y:a,time:c,relative:d}]);b=0;for(a=e.length;b<a;b++)e[b].relative&&(e[b].x=this.x-e[b].x,e[b].y=this.y-e[b].y),this.steps.push({x:e[b].x,y:e[b].y,time:e[b].time|| 0});this._startAni()},scrollToElement:function(b,a){var c;if(b=b.nodeType?b:this.scroller.querySelector(b))c=this._offset(b),c.left+=this.wrapperOffsetLeft,c.top+=this.wrapperOffsetTop,c.left=0<c.left?0:c.left<this.maxScrollX?this.maxScrollX:c.left,c.top=c.top>this.minScrollY?this.minScrollY:c.top<this.maxScrollY?this.maxScrollY:c.top,a=void 0===a?g.max(2*g.abs(c.left),2*g.abs(c.top)):a,this.scrollTo(c.left,c.top,a)},scrollToPage:function(b,a,c){c=void 0===c?400:c;this.options.onScrollStart&&this.options.onScrollStart.call(this); if(this.options.snap)b="next"==b?this.currPageX+1:"prev"==b?this.currPageX-1:b,a="next"==a?this.currPageY+1:"prev"==a?this.currPageY-1:a,b=0>b?0:b>this.pagesX.length-1?this.pagesX.length-1:b,a=0>a?0:a>this.pagesY.length-1?this.pagesY.length-1:a,this.currPageX=b,this.currPageY=a,b=this.pagesX[b],a=this.pagesY[a];else if(b*=-this.wrapperW,a*=-this.wrapperH,b<this.maxScrollX&&(b=this.maxScrollX),a<this.maxScrollY)a=this.maxScrollY;this.scrollTo(b,a,c)},disable:function(){this.stop();this._resetPos(0); this.enabled=!1;this._unbind(q);this._unbind(r);this._unbind(s)},enable:function(){this.enabled=!0},stop:function(){this.options.useTransition?this._unbind("webkitTransitionEnd"):A(this.aniTime);this.steps=[];this.animating=this.moved=!1},zoom:function(b,a,c,d){var e=c/this.scale;this.options.useTransform&&(this.zoomed=!0,d=void 0===d?200:d,b=b-this.wrapperOffsetLeft-this.x,a=a-this.wrapperOffsetTop-this.y,this.x=b-b*e+this.x,this.y=a-a*e+this.y,this.scale=c,this.refresh(),this.x=0<this.x?0:this.x< this.maxScrollX?this.maxScrollX:this.x,this.y=this.y>this.minScrollY?this.minScrollY:this.y<this.maxScrollY?this.maxScrollY:this.y,this.scroller.style[f+"TransitionDuration"]=d+"ms",this.scroller.style[f+"Transform"]=n+this.x+"px,"+this.y+"px"+o+" scale("+c+")",this.zoomed=!1)},isReady:function(){return!this.moved&&!this.zoomed&&!this.animating}};"undefined"!==typeof exports?exports.iScroll=p:window.iScroll=p})();
/******************** / iScroll **********************/
/******************** xScroll **********************/
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
