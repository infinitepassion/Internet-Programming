
grabProducts(0, 9,$('#contentcandy-'),'all',attach_cart_events);


function grabProducts(offset, size, $dom_ele,category,callback) {

    $dom_ele.html("");

    offset = (typeof offset !== 'undefined') ? offset : 0;
    size = (typeof size !== 'undefined') ? size : 10;
    category = (typeof category !== 'undefined') ? category : 'all';

    var route = "app.php/browse/offset/" + offset + "/size/" + size + "/category/" + category;

    $.get(route)
        .done(function (data) {
            data = data.data;

            for(var i=0;i<data.length;i++){
                $dom_ele.append(build_product_card(data[i]));
            }
            callback();
        });
}

function build_product_card(data) {
    console.log(data);
    var img = data.image_path+'_small'+'.'+data.img_type;
    console.log(img)
    var short = data.description.substr(0,100)+"...";
    var html = '';
    html += '<div class="col-lg-4 col-md-6 mb-4">';
    html += ' <div class="card h-100">';
    html += '  <a href="#"><img class="card-img-top" src="'+img+'" alt=""></a>';
    html += '   <div class="card-body">';
    html += '    <h4 class="card-title">';
    html += '      <a href="#">'+data.name+'</a>';
    html += '    <span><i class="fas fa-shopping-cart addcart" data-pid="'+data.id+'" style="font-size:14px"></i></span>';
    html += '    </h4>';
    html += '    <h5>$'+data.price+'</h5>';
    html += '    <p class="card-text">'+short+'</p>';
    html += '   </div>';
    //html += '   <div class="card-footer">';
    //html += '   <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>';
    //html += '  </div>';
    html += ' </div>';
    html += '</div>';
    return html;
}



function attach_cart_events(){

    var guid = getCookie("candy_store");

    console.log("adding cart events");
    $(".addcart").click(function(e){
        // console.log($( this ).data());
        // console.log(e);
        var data = $( this ).data();
        console.log(data.pid);
        console.log(guid);
        var route = "app.php/addCart/pid/" + data.pid + "/uid/"+guid;

        $.get(route)
            .done(function (data) {
                console.log(data);
            });
    });

    $("#view-cart").click(function(e){
        console.log($( this ).data());
        var route = "app.php/getCart/uid/"+guid;

        $.get(route)
            .done(function (data) {
                console.log(data);
            });
    });
}

