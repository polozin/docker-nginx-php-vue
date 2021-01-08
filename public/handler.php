<?php
include '../app/CatFacts.php';

$catFacts = new CatFacts();
$response = '';
if($_GET && $_GET["type"]){
    $type = htmlspecialchars($_GET["type"]);
    switch ($type){
        case "facts":
           $response = $catFacts->get();
           break;
    }
}
elseif ($_POST && $_POST["type"]){
    $type = htmlspecialchars($_GET["type"]);
    switch ($type){
        case "facts":
            $response = $catFacts->post(htmlspecialchars($_POST["data"]));
            break;
    }
}
echo $response;