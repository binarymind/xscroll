




xScroll
===========================

just a small extension of the famous iScroll from cubiq with build in features. I put here a small list using the pullDown action, lazyload and polite scroll. 

## pull down /up actions

simply add in the option when you create your xScroll the parameter 

``` js
pullDownAction : function() {/* do you pull down action here */}
pullUpAction : function() {/* do you pull up action here */}
```

exemple

``` js
	myScroll = new xScroll('wrapper', {
		pullDownAction : function() {$(this.scroller).find("a:first").click();}
		pullUpAction : function() {$(this.scroller).find("a:last").click();}
	});
```

each of these parameters is optional.

the $(xscroll.wrapper) trigger those events (usefull to add css classes etc): 

* `pullingdown` | `pullingup` : when the user is pullingup / down the scroll
* `pulleddown` | `pulledup` : just before the scroll is executing the pulldown / pullup action
* `cancelpullingdown` | `cancelpullingup` : if the user cancel the pullingup/pulling down

note : your turn to do anything appropriate after the pullUpAction | pullDownAction.

## lazy image load

regular lazy load plugins doesn't work with iscroll, just add the selector of your images you want to lazy load and xScroll will handle that in basic way.

``` js
	myScroll = new xScroll('wrapper', {
		lazySelector : 'img.lazy'
	});
``` 

your images must have the attribute data-original which contains the link to the real src-file :

example : 
  
``` html
	<img width="80" height="120" class="lazy" src="lazy.jpg" data-original="http://24.media.tumblr.com/tumblr_m2kgmbmf4t1qa1zngo1_400.jpg
```   

## polite scroll

if you continue scrolling when you are down the scroll / up the scroll, the scroll leave the page its natural scroll. (except if you want to pull down/up to refresh of course)

## thanks,contribution etc

This is of course just some work i use for my use, if you have any feedback/evolutions etc, fell free to contribute/share.. Thanks for those who do great work (matteo you're the first one here !)

all the best
bastien