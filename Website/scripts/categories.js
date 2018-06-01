$.get("app.php/categories")
    .done(function (data) {
        data = data.data;
        $('#cat').html("");
        var html = "";
        html += "<option> Categories </option>\n"
        for (var k in data) {
            if (data.hasOwnProperty(k)) {
                html += '<option> ' + data[k].category + '</option>\n';
                // console.log(html);
            }
        }
        $('#cat').html(html);
    });

function gethyperlinkvalue(){

    var text = document.getElementById("link").textContent;
    value="app.php/product/" + text
    console.log(text);
  
}

function getValue() {
    var text = document.getElementById("cat").value;
    console.log(text);
    var value = "app.php/browseCategory/" + text;
    
    $.get(value)

        .done(function (data) {

    
          data = data.data; 
          
            
            var html = "";
            for (var i = 0; i < data.length; i++) {
               // console.log("hello");
                if (data.hasOwnProperty(i)) {
                   
                    console.log(data[i]);
                    html += buildPage(data[i]);
                }
            }
            $('#productCard').html(html);
        });

}
function buildPage(data){

    
    var img = '"/candy_images/' + data.id + '_small' + '.jpg"';
    var short = data.description.substr(0, 100) + "...";
    var html = '';
    html += '<div class="l_product_item" >';
    html += ' <div>';
    html += '<a href=""  '+data.id+'" data-toggle="tooltip" onclick="loadPage('+data.id+')" target="_blank" title="Click Here for more details!">';
    html += '<h6 align="left" id="link">' + data.name + '</h4>';
    html += '</a>';
    html += ' </div>';
    html += '<div class="l_p_img">';
    html += '<a href="" data-toggle="tooltip" title="Click Here for more details!">';
    html += '<img src=' + img + ' alt=""  style="width:100px;height:100px>';
    html += '</a>';
    html+='<br/>';
    
    
    html += '</div>';
    html += ' </div>';
    return html;
}



function buildDetails(data){

    
    var img = '"/candy_images/' + data.id + '_small' + '.jpg"';
    var short = data.description.substr(0, 100) + "...";
    var html = '';
    html += '<div class="l_product_item" >';
    html += ' <div>';
    html += '<a href="" onclick="gethyperlinkvalue()"  id="links" data-toggle="tooltip" title="Click Here for more details!">';
    html += '<h6 align="left" id="link">' + data.name + '</h4>';
    html += '</a>';
    html += ' </div>';
    html += '<div class="l_p_img">';
    html += '<a href="" data-toggle="tooltip" title="Click Here for more details!">';
    html += '<img src=' + img + ' alt=""  style="width:100px;height:100px>';
    html += '</a>';
    html+='<br/>';
    
    
    html += '</div>';
    html += ' </div>';
    return html;
}



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
    html += '<a href="">';
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

