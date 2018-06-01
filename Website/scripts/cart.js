

/*
*
*event added in brows.js
*/
function addCart(id) { 

   // var text = document.getElementById("add_cart_btn").textContent;
   var guid=getCookie("candy_store");
   console.log(id);
    var value = "app.php/addcart/pid/"+id+"/uid/"+ guid;
    
    $.get(value)

        .done(function (data) {

    
          data = data.data; 
          
            
          
        });


     
}
function loadcart()
{
var  guid=getCookie("candy_store");
console.log(guid);
var value="app.php/viewcart/uid/"+guid;
//console.log(value);
$.get(value)
.done(function (data) {
    var html = "";
   
    data = data.data;
   // console.log(data);
    var total=0;
    html+=buildHead();
    console.log(html);
    for (var i = 0; i < data.length; i++) {
        total+= Number(data[i].price);
        
        html += buildCart(data[i]); 
    }
    console.log(total);
    html+=buildTotal(total);
    $('#load').html(html);
  ;
});
}

function buildHead()
{
    var html='';
  html+='  <thead>';
  html+='	<tr> 	';
  html+='<th style="width:50%">Product</th> 	';
  html+='						<th style="width:10%">Price</th> 	';
  html+='<th style="width:8%">Quantity</th> 		';
  html+='					<th style="width:22%" class="text-center">Subtotal</th> ';
  html+='<th style="width:10%"></th> 	'
  html+='					</tr> 					</thead> ';
  return html;
}
function buildTotal(total){
   var html='';
   html+='<tfoot>';
   html+=' <tr class="visible-xs">';
   html+='<td class="text-center"><strong>Total '+total+'</strong></td> 		</tr> 		<tr> 	<td>';
   html+='<a href="http://candylove.party/mainPage" class="btn btn-warning"><i class="fa fa-angle-left"></i> Continue Shopping</a></td> <td colspan="2" class="hidden-xs"></td>';
   html+='<td class="hidden-xs text-center"><strong>Total '+total+'</strong></td> 							<td><a href="checkout.html" class="btn btn-success btn-block">Checkout <i class="fa fa-angle-right"></i></a></td> 						</tr> ';
   html+='</tfoot>';
   return html;
}
function buildCart(data)
{

var img = '"/candy_images/' + data.item_id + '_small' + '.jpg"';

var html = '';
html += ' <tbody > <tr>';
html+='<td data-th="Product">';
html+='<div class="row">';
html+='<div class="col-sm-2 hidden-xs"><img src='+img+' height="42" width="42" alt="..." class="img-responsive"/></div>';
html+='<div class="col-sm-10">';
//html+='<h4 class="nomargin">'+data.item_id+'</h4>';
html+='<p>'+data.name+'</p>';
html+='</div>   </div> </td>';
html+='<td data-th="Price">'+data.price+'</td>';
html+='<td data-th="Quantity">     <input type="number" class="form-control text-center" value="1"> </td>';
html+='<td data-th="Subtotal" class="text-center">'+data.price+'</td> <td class="actions" data-th=""> '
html+='    <button class="btn btn-info btn-sm">' ;
html+='<i class="fa fa-refresh"></i></button> ';
html+='<button class="btn btn-danger btn-sm">';
html+='<i class="fa fa-trash-o" onclick="trash('+data.id+')" id='+data.id+'></i></button>	</td></tr>';
html+='</tbody>';
return html;
}


function trash(id)
{
 // console.log(id);
 var  guid=getCookie("candy_store");
var value="app.php/delCart/id/"+id+"/uid/"+guid;
//console.log(value);
$.get(value)
.done(function (data) {
 
 loadcart();

});
}