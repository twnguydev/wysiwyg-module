<?php

include 'convert_api.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

$content = $_POST['content'];
$converted_text = BBCodeDisplay($content);

echo $converted_text;