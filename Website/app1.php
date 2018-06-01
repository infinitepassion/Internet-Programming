<?php
// Turn error reporting on during testing (not production)
error_reporting(1);

require('./includes/settings.php');
require('./includes/class_upload.php');


$params = parseUrl($_SERVER['REQUEST_URI']); 

$route = $params['route'];
if(array_key_exists("error",$params)){
    echo print_response($params);
    exit;
}
unset($params['route']); //remove route key from array

$db = new mysqli("localhost", $settings['username'], $settings['password'], $settings['dbname']);
function parseUrl($url){
    $parts = explode('/', $_SERVER['REQUEST_URI']);

    $kvp = [];

    // find the index of "app.php" (this filename)
    $i = array_search('app.php',$parts);

    // The route name should be located right after.
    $kvp["route"] = $parts[$i+1];

    // remove all unnecessary entries (up till now)
    for($j = 0;$j<=$i+1;$j++){
        array_shift($parts);
    }

    //check to see if last item is empty
    if(trim($parts[sizeof($parts)-1]) == ""){
        array_pop($parts);
    }

    if(sizeof($parts) % 2 == 1){
        $kvp["error"] = "Key value pairs do not match up!";
        return $kvp;
    }
    for($j=0;$j<sizeof($parts);$j+=2){
        $kvp[$parts[$j]] = $parts[$j+1];
    }
    return $kvp;
    
}

/**
 * Function print_response($respoonse)
 * 
 * This function builds a response object for requests that need a json 
 * data object. 
 */
function print_response($response){
    if($response['data']){
        $response['data_size'] = sizeof($response['data']);
    }
    header('Content-Type: application/json');
    //print_r($response);
    echo json_encode($response);
    exit;
}



print_r("hello");

exit;

