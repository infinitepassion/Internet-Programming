function build_search(data) {
    
   

    var img = '"/candy_images/' + data.id + '_small' + '.jpg"';
    var short = data.description.substr(0, 100) + "...";
    var html = '';
    html += '<div class="l_product_item" >';
    html += ' <div>';
    html += '<a href=""  '+data.id+'" data-toggle="tooltip" onclick="loadPage('+data.id+')" target="1234"  title="Click Here for more details!">';
    
    html += '<h6 align="left" '+data.id+'>' + data.name + '</h4>';
    html += '</a>';
    html += ' </div>';
    html += '<div class="l_p_img">';
   
    html += '<img src=' + img + ' alt=""  style="width:100px;height:100px>';
    
    html+='<br/>';
    
    
    html += '</div>';
    html += ' </div>';
   
    
    
    return html;
    }

function viewProduct(id){

    //console.log(id);
    var value = "app.php/details/" + id;
     console.log(value);
       $.get(value)

           .done(function (data) {
               var html = "";
              
               data = data.data;
               console.log(data);
               for (var i = 0; i <data.length; i++) {
   
                 // html += build_search(data[i]);
                  console.log(data[i]);
               
           }
          $('#productCard').html("");
           });

}

$("#search_txt").keyup(function (e) {
   // console.log([e.keyCode, e.key]);
    var txt = $('#search_txt').val();
    if (e.keyCode == 13) {


        var value = "app.php/search/name/" + txt;
     //   console.log(value);
        $.get(value)
            .done(function (data) {
                var html = "";
               
                data = data.data;

               // console.log(data);
                if (data.length==0)
                    html+="0 "+ txt+"'s are found";
                    else
                    {
                for (var i = 0; i <data.length; i++) {
    
                   html += build_search(data[i]);
                   // console.log(data[i]);
                }
            }
                $('#productCard').html(html);
            });

    }


})



function build_product_card_details(data) {

    var img = '"/candy_images/' + data.id + '_small' + '.jpg"';
    var short = data.description.substr(0, 100) + "...";
    var html = '';
    html += '<div class="l_product_item" >';
    html += '<div class="l_p_img" >';
    html += '<a href=""  '+data.id+'" data-toggle="tooltip" onclick="loadPage('+data.id+')"  target="_blank" title="Click Here for more details!">';
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
    html += '<a class="add_cart_btn" onclick="event.preventDefault(); addCart('+data.id+')" href="https://candylove.party" >Add To Cart</a>';
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
function loadPage(id)
{
    value="app.php/details/"+id;
    $.get(value)
    .done(function (data) {
        var html = "";
       
        data = data.data;
       console.log(data);
        for (var i = 0; i < data.length; i++) {
    
            html += build_product_card_details(data[i]);
            console.log(html);
        }
        $('#productCard').html(html);
    });
}

