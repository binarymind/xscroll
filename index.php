<!DOCTYPE html>
<html>
<?php 
$maxPage=10;
if(isset($_GET["p"])) $p = intval($_GET["p"]);
else $p=0;
?>
	<head>
		<title>Test</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="chrome=1"/>
		<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
		<link rel="shortcut icon" href="./favicon.png?v=2" type="image/png" /> 
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black" /> 
		<link type="text/css" rel="stylesheet" rev="stylesheet" media="screen" href="./css/css/screen.css">
		<script type="text/javascript" src='http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js'></script>
		<script type="text/javascript" src='./src/iscroll.js'></script>
		<script type="text/javascript" src='./src/xscroll.js'></script>
		<script type="text/javascript" src='./js/custom.js'></script>
		<script type="text/javascript" src='./js/navigate.js'></script>
	</head>
	<body ajax-onload='loadPage' ajax-onunload="unloadPage">
		<h1>Pull down for previous</h1>
		<div id="wrapper" class="wrapper">
			<div id="scroller" class="scroller">
				<ul id="content"  ajax-onload='loadArticle' ajax-onunload='unloadArticle'>
					<?php
						if($p>0)
							echo '<li class="noSnap prev" id="prev-'.$p.'"><a title="page '.($p-1).'" ajax-href="index.php?p='.($p-1).'" ajax-target="#content" ajax-content="#content"  ajax-insert="prependOnce"></a><span class="icon"></span></li>';
						for($i=1;$i<=10;$i++) {
							echo '<li><img width="80" height="120" class="lazy" src="lazy.jpg" data-original="http://24.media.tumblr.com/tumblr_m2kgmbmf4t1qa1zngo1_400.jpg?v='.$p.''.$i.'" alt="title de limage"/>Item '.($p*10+$i).'</li>'."\n";
						}
						if($p<=$maxPage)
							echo '<li class="noSnap next" id="next-'.$p.'"><a title="page '.($p+1).'" ajax-href="index.php?p='.($p+1).'" ajax-target="#content" ajax-content="#content"  ajax-insert="appendOnce"></a><span class="icon"></span></li>';
					?>
				</ul>
			</div>
		</div>
		<h1>KIKOO LOL</h1>
		<h1>KIKOO LOL</h1>
		<h1>KIKOO LOL</h1>
		<h1>KIKOO LOL</h1>
		<h1>KIKOO LOL</h1>
	</body>
</html>
