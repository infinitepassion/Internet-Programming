 $(document).ready(function () {
    $.get("app.php/navigation")
        .done(function (data) {
            data = data.data;
            // console.log(data);
            $('#main-nav').html("");
            var html = "";
            for (var k in data) {
                if (data.hasOwnProperty(k)) {
                    //console.log(data[k]);
                    html += "<li> <a href= " + data[k].link + "> " + data[k].text + "</a> </li>\n";
                }
            }
            $('#main-nav').html(html);
        });
});