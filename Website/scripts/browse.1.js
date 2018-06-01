$.get("app.php/browse")
.done(function (data) {
    var html = "";
   
    data = data.data;
   // console.log(data);
    for (var i = 0; i < data.length; i++) {

        html += build_product_card(data[i]);
        //   console.log(html);
    }
    $('#productCard').html(html);
});

function build_product_card(data) {

var img = '"/candy_images/' + data.id + '_small' + '.jpg"';
var short = data.description.substr(0, 100) + "...";
var html = '';
html += '<div class="l_product_item" >';
html += '<div class="l_p_img" >';
html += '<a href="app.php/details/'+data.id+'" data-toggle="tooltip" onclick="event.preventDefault(); addCart()" title="Click Here for more details!">';
html += '<img src=' + img + ' alt=""> ';
html += '</a>';
html+='<br/>';
html += data.description;

html += '</div>';
//  html += '<div style=\'margin-left:60px>';
// html += data.description;
// html += '</div';
// html += '</div>';
html += '<div class="l_p_text"> ';
html += '<ul>';
html += '<li class="p_icon">';
html += '<a href="#">';
html += ' <i class="icon_piechart"></i>';
html += '</a>';
html += '</li>';
html += '<li >';
html += '<a class="add_cart_btn" onclick="event.preventDefault(); addCart()"   href="http://candylove.party/" >Add To Cart</a>';
html += '</li>';
html += '<li class="p_icon">';
html += '<a href="#">';
html += '<i class="icon_heart_alt"></i>';
html += '</a> </li>  </ul>';
html += '<h4 id="nameCart">' + data.name + '</h4>';
html += '  <h5>';
html += data.price + '</h5>';
html += ' </div>';
html += '</div>';

return html;
}
