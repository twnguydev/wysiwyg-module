<?php

function BBCodeDisplay($text){
	$text = nl2br($text);

	$text = preg_replace(
        '/\[video\]https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)\[\/video\]/i',
        '[video]https://www.youtube.com/embed/$1[/video]',
        $text
    );

	$text = preg_replace(
        '/\[video\]https:\/\/www\.dailymotion\.com\/video\/([a-zA-Z0-9]+)\[\/video\]/i',
        '[video]https://www.dailymotion.com/embed/video/$1[/video]',
        $text
    );

	$text = preg_replace_callback(
        '/\[video\]https:\/\/www\.tiktok\.com\/@([^\/]+)\/video\/(\d+)\[\/video\]/i',
        function ($matches) {
            $embedUrl = "https://www.tiktok.com/embed/" . $matches[2];
            return '<iframe src="' . $embedUrl . '" width="640" height="360" frameborder="0" allowfullscreen></iframe>';
        },
        $text
    );

	$tag = array(
		'/\[b\](.*?)\[\/b\]/is',
		'/\[i\](.*?)\[\/i\]/is',
		'/\[u\](.*?)\[\/u\]/is',
		'/\[s\](.*?)\[\/s\]/is',
		'/\[sup\](.*?)\[\/sup\]/is',
		'/\[code\](.*?)\[\/code\]/is',
		'/\[quote\](.*?)\[\/quote\]/is',
		'/\[quote\=(.*?)\](.*?)\[\/quote\]/is',
		'/\[right](.*?)\[\/right\]/is',
		'/\[center](.*?)\[\/center\]/is',
		'/\[justify](.*?)\[\/justify\]/is',
		'/\[list\](.*?)\[\/list\]/is',
		'/\[list=1\](.*?)\[\/list\]/is',
		'/\[\*\](.*?)(\n|\r\n?)/is',
		'/\[img\](.*?)\[\/img\]/is',
		'/\[video\](.*?)\[\/video\]/is',
		'/\[url\](.*?)\[\/url\]/is',
		'/\[url\=(.*?)\](.*?)\[\/url\]/is',
		'/\[color\=(.*?)\](.*?)\[\/color\]/is',
		'/\[size\=(.*?)\](.*?)\[\/size\]/is',
		'/\[fw\=(.*?)\](.*?)\[\/fw\]/is'
	);

	$h = array(
		'<b>$1</b>',
		'<i>$1</i>',
		'<u>$1</u>',
		'<span style="text-decoration:line-through;">$1</span>', 
		'<sup>$1</sup>',  
		'<pre><code>$1</code></pre>', 
		'<blockquote>$1</blockquote>',
		'<blockquote><cite>$1 : </cite>$2</blockquote>',  
		'<div style="text-align:right;">$1</div>',
		'<div style="text-align:center;">$1</div>',
		'<div style="text-align:justify;">$1</div>',
		'<ul>$1</ul>',
		'<ol>$1</ol>',
		'<li>$1</li>',
		'<img src="$1" />',
		'<iframe width="560" height="315" src="$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
		'<a href="$1">$1</a>',
		'<a href="$1">$2</a>',
		'<span style="color:$1">$2</span>',
		'<span style="font-size:$1px">$2</span>',
		'<span style="font-weight:$1">$2</span>'
	);

	$n = 1;
	while($n > 0){
		$text = preg_replace($tag, $h, $text, -1, $n);
	}
	return preg_replace(array('/\[(.*?)\]/is', '/\[\/(.*?)\]/is'), '', $text);
}