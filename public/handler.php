<?php
include '../app/CatFacts.php';

$catFacts = new CatFacts();
header('Content-Type: application/json;  charset=utf-8');
$response = '["any error"]';
if($_GET && $_GET["type"]){
    $type = htmlspecialchars($_GET["type"]);
    switch ($type){
        case "facts":
           $response = $catFacts->get();
           break;
    }
}

if ($_POST && $_POST["type"]){
    $type = htmlspecialchars($_POST["type"]);
    switch ($type){
        case "facts":
            $response = $catFacts->post($_POST["payload"]);
            break;
    }
}
echo $response;