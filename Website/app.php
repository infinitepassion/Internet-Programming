<?php
// Turn error reporting on during testing (not production)
error_reporting(1);

require('./includes/settings.php');
require('./includes/class_upload.php');
require('./includes/prev_next.php');

$params = parseUrl($_SERVER['REQUEST_URI']); 

$route = $params['route'];


if(array_key_exists("error",$params)){
    echo print_response($params);
    exit;
}
unset($params['route']); //remove route key from array

$db = new mysqli("localhost", $settings['username'], $settings['password'], $settings['dbname']);
// If we have an error connecting to the db, then exit page
if ($db->connect_errno) {
    print_response(['success'=>false,"error"=>"Connect failed: ".$db->connect_error]);
}

// not all items are legit
$routes = ['routes'=>
    [
        ['type'=>'post','name'=>'register','params'=>[]],
        ['type'=>'post','name'=>'login','params'=>[]],
        ['type'=>'get','name'=>'categories','params'=>[]],    
        ['type'=>'get','name'=>'search','params'=>[]], 
        ['type'=>'get','name'=>'navigation','params'=>[]],           
        ['type'=>'get','name'=>'browse','params'=>[]],
        ['type'=>'get','name'=>'browseCategory','params'=>[]],
        ['type'=>'get','name'=>'mainPage','params'=>[]],
        ['type'=>'get','name'=>'product','params'=>[]], 
        ['type'=>'get','name'=>'viewcart','params'=>[]], 
        ['type'=>'get','name'=>'aboutPage','params'=>[]]
    ]
];

$response = false;

switch($route){
    case 'mainPage':
         $view = file_get_contents('views/browse.html');
         echo render_view($view);
         break;
    case 'aboutPage'://not sure
         $view = file_get_contents('views/about.html');
         echo render_view($view);
         break;
    case 'addcart':
      
      
        $response['data'] = addcart($params);

         
         break;
    case 'browse':
         if(!array_key_exists('offset',$params)){
             $offset = 0;
         }else{
             $offset = $params['offset'];
         }
         if(!array_key_exists('size',$params)){
             $size = 100;
         }else{
             $size = $params['size'];
         }
         
         $response['data'] = browse($offset,$size);
         break; 
     case 'browseCategory':
     $params=$_SERVER['REQUEST_URI'];
    
        $param=explode("/",$params);
        $cat=$param[3];
        $cat= str_replace("%20", " ",$cat);
        
        $response['data'] = browseCategory($cat);
       
       // $view = file_get_contents('views/cat_details.html');
       // echo render_view($view);
         break; 

    case 'categories'://implemented
        if(!array_key_exists('offset',$params)){
            $offset = 0;
        }else{
            $offset = $params['offset'];
        }
        if(!array_key_exists('size',$params)){
            $size = 100;
        }else{
            $size = $params['size'];
        }
        $response['data'] = getCategories($offset,$size);
         break;

    case 'details':
        $params=$_SERVER['REQUEST_URI'];
        $param=explode("/",$params);
        //print_r($param[2]);
       // exit;
        $response['data']=getDetails($param[3]);
       
        //$view = file_get_contents('product-details.html');
       // echo render_view($view);
        break;
   // case 'fileUpload'://not sure
     //    $response = doUpload($settings,$_FILES,'./uploads');
       //  break;
    case 'delCart':
        $response['data']=delCart($params);
        break;
    case 'login':
  

        $username =$params['uname'];
        $password = $params['pswd'];
      
        $response['data']=validateLogin($username,$password);

    
        break;

    case 'navigation'://legacy
         $response['data'] = getMenuItems($menu_id);
         break;
    case 'payment':
        // Set your secret key: remember to change this to your live secret key in production
        // See your keys here: https://dashboard.stripe.com/account/apikeys
        \Stripe\Stripe::setApiKey("sk_test_fsND7pxOFRojkEM8Qh3lt64a");

        // Token is created using Checkout or Elements!
        // Get the payment token ID submitted by the form:
        $token = $_POST['stripeToken'];
        $charge = \Stripe\Charge::create([
            'amount' => 12345678,
            'currency' => 'usd',
            'description' => 'Example charge',
            'source' => $token,
        ]);
        //dd("succes payment");
        break;
    case 'product':
       
         $params=$_SERVER['REQUEST_URI'];
         $param=explode("/",$params);
         $pro=$param[3];
         $response['data'] = getProduct($pro);
        // echo render_view($view);
        // $view = file_get_contents('views/cat_details.html');
        // echo render_view($view);
          break; 


    case 'register':
            
        $email=$params['email'];
        $name=$params['name'];
        $uname=$params['rname'];
        $password=$params['password'];
        $phone=$params['phone'];
        
          $response['data']=register($email,$name,$uname,$password,$phone);
  
      
          break;
    case 'search':
        $view = file_get_contents('views/search.html');
        if(sizeof($params) > 0){
            $response['data'] = searchCandy($params);
        }
        else{
            $response['data'] = ['error'=>'No search params'];
        }
        //echo render_view($view);
        break;
    case 'viewcart':
        $response['data']=viewCart($params);
    
        break;
    default:
        $urls = [];
        foreach($routes['routes'] as $route){
            $urls[] = ['type'=>$route['type'],'url'=>'http://candylove.party'."/".$route['name']];
        }
        $response = $urls;
        $response['request_parts'] = $request_parts;
}

if($response !== false){
    $response['success']=true;
    //logg($response);
    print_response($response);
}
////////////////////////////////////////////////////////////////////////


function addcart($params)
{
    global $db;
   
    $item_id = $params['pid'];
    
    $uid = $params['uid'];

    $sql = "SELECT * FROM `products` WHERE id = '{$item_id}'";
    

    $result = $db->query($sql);

    while ($row = $result->fetch_assoc()) {
        $item = $row;
    }

    $price = $item['price'];
    
    $ip =$_SERVER['REMOTE_ADDR'];
    $time=time();
    $sql = "INSERT INTO `shopping_cart` (`uid`, `item_id`, `date_created`, `price`, `count`, `coupon_code`, `ip_address`, `guest`) VALUES ('{$uid}', {$item_id}, '{$time}', '{$price}', '1', '', '{$ip}', '1');";
    
    $result = $db->query($sql);

    return $result;


}

function browseCategory($cat)
{
    global $db;
    $sql = "SELECT *  FROM `products`WHERE  category like '{$cat}'";
   
   
    $result = $db->query($sql);
    
    while($row = $result->fetch_assoc()){
        $row['description'] = mb_convert_encoding($row['description'], 'UTF-8', 'UTF-8');
        $items[] = $row;
    }
  
    return $items;

}
function getCategories($offset = 0, $size = 20){
    global $db;

    $sql = "SELECT count(category) as num,category FROM `products` group by category order by num desc LIMIT {$offset}, {$size}";
   
    $result = $db->query($sql);

    while ($row = $result->fetch_assoc()) {
        $items[] = $row;
    }

    return $items; 
}

function delCart($params)
{
    $id=$params['id'];
    $uid=$params['uid'];
    global $db;

    $sql = "DELETE  FROM `shopping_cart` WHERE item_id='{$id}' and uid='{$uid}'";
    $result = $db->query($sql);
    

        $items[] = "";
   
    return $items;
}
function browse($offset=0,$size=10){
    global $db;

    $sql = "SELECT * FROM `products` LIMIT {$offset}, {$size}";

    $result = $db->query($sql);
    
    while($row = $result->fetch_assoc()){
        $row['description'] = mb_convert_encoding($row['description'], 'UTF-8', 'UTF-8');
        $items[] = $row;
    }
  
    return $items;
}
function viewCart($params)
{
    global $db;

    $items = [];

    $uid = $params['uid'];

    $sql = " SELECT * FROM `shopping_cart` s,`products`p where s.item_id=p.id  and s.uid = '{$uid}'";

    $result = $db->query($sql);

    while ($row = $result->fetch_assoc()) {
        $row['description'] = mb_convert_encoding($row['description'], 'UTF-8', 'UTF-8');
        $items[] = $row;
    }
   
    return $items;

}

function getDetails($id)
{
    global $db;
    $items = [];
    
$sql = "SELECT * FROM `products` WHERE id='{$id}'";


    $result = $db->query($sql);
    
    while($row = $result->fetch_assoc())
    {
        $row['description'] = mb_convert_encoding($row['description'], 'UTF-8', 'UTF-8');
        $items[] = $row;
    }
     return $items;

 
}

function getMenuItems($menu_id=1){
    
    if(!$menu_id){
        $menu_id = 1;
    }
    
    global $db;
    $items = [];
    $sql = "SELECT * from menu_items where mid = {$menu_id};";

    $result = $db->query($sql);
    
    while($row = $result->fetch_assoc()){
        $items[] = $row;
    }
    
    return $items;
}



function getProduct($id)
{
    global $db;
    $items = [];
    
$sql = "SELECT * FROM `products` WHERE name like{$id}";

    $result = $db->query($sql);
    
    while($row = $result->fetch_assoc()){
        $row['description'] = mb_convert_encoding($row['description'], 'UTF-8', 'UTF-8');
        $items[] = $row;
    }
     return $items;

 
}

function register($email,$name,$uname,$password,$phone)
{
    global $db;
  

    $sql=" INSERT INTO `user` (`email`, `name`, `uname`, `password`, `uid`, `phone`) VALUES ('{$email}','{$name}','{$uname}','{$password}',NULL,'{$phone}')";



    $result = $db->query($sql);
    $sql = "SELECT * FROM `user` where uname='{$uname}' ";



    
    $result = $db->query($sql);

    while($row = $result->fetch_assoc()){

       
        $items[] = $row;
    }
 
    return $items;
}


/**
 * Function searchCandy()
 * Params: 
 *    $params (array) : column_name = > value
 * 
 *    to build a search where clause
 * Example:
 *     Url: https://kidsnvans.fun/search/description/lemon/price/22.99 
 *     Builds: WHERE description LIKE lemon AND price LIKE 22.99 AND 1
 *             The "AND 1" just made it easier to implement
 * Return:
 *    Array of found items
 */
function searchCandy($params){

    global $db;
    $items = [];

    if(sizeof($params)==0){
       // return $items;
       $params="category";
    }

    // Start empty where clause
    $where = "WHERE ";

    // Loop through array adding "key like value"
    // along with an "and" in case there are more than one filter pairs
    foreach($params as $k => $v){
        $v= str_replace("%20", " ",$v);
        $where = $where." ".$k." LIKE '%".$v."%'" ;
    }

    // Add "1" for last and to make it work :) 
   // $where .= " 1";

    $sql = "SELECT * FROM `products` {$where}";
    
    $result = $db->query($sql);
    
    while($row = $result->fetch_assoc()){
        $row['description'] = mb_convert_encoding($row['description'], 'UTF-8', 'UTF-8');
        $items[] = $row;
    }
  

    return $items;

    
}


function validateLogin($uname,$pswd)
{
    global $db;
    $sql = "SELECT * FROM `user` where uname='{$uname}' and  password='{$pswd}'";
    $result = $db->query($sql);

    while($row = $result->fetch_assoc()){
       
        $items[] = $row;
    }
    return $items;

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
   // print_r($response);
    echo json_encode($response);
    exit;
}

/**
 * Function render_view($content)
 * Params: 
 *    $content: html content to be included in a built page
 */
function render_view($html,$scripts=[])
{
    //get access to the default scripts array
    global $default_js_scripts;
	
    //build page
    $page = file_get_contents('views/header.html');
  // $page .= file_get_contents('views/navigation.html');
   $page .= $html;
   $page .= file_get_contents('views/footer.html');

	//add additional scripts to default array
    foreach($scripts as $s){
        $default_js_scripts[] = "<script src=\"{$s}\"></script>\n";
    }
    $default_js_scripts[] = "\n</body>\n";
    $default_js_scripts[] = "</html>\n";

	//"build" the page by concatenating all parts
    $page .= "\n".implode("\n",$default_js_scripts);
    
    echo $page;
    exit;
}
/**
 * This method turns a url of the format: 
 *     https://domain.com/routename/k1/v1/k2/v2/kn/vn 
 *     into an Associative Array: 
 *     $kvp = [
 *        'route' => 'routename',
 *        'k1' => 'v1',
 *        'k2' => 'v2',
 *        'kn' => 'vn'
 *     ];
 */
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


    if(sizeof($parts)==1){
        return $kvp;
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


