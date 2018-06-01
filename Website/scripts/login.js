function validateLogin(form){

var id=form.uname.txt;
id=document.getElementById('uname').value;
var pswd=form.pswd;
pswd=document.getElementById('pswd').value;
console.log(id);
var value = "app.php/login/uname/"+id+"/pswd/"+ pswd;
console.log(pswd);
console.log(value);
    
    $.get(value)

        .done(function (data) {
            data = data.data; 
            console.log(data);
            if (data === null)
            {
               // document.write("Invalid username/password");
               window.alert("Invalid username/password");
            }
            else
            {
               console.log(data);
                setCookie("candy_store",id,1);
                location.replace("https://candylove.party/mainPage");
            }
    });
}
function validateRegister(form){
        
    
var name=form.uname.txt;
name=document.getElementById('name').value;
var pswd=form.pswd;
pswd=document.getElementById('password').value;
var email=document.getElementById('email').value;
var rname=document.getElementById('rname').value;
var phone=document.getElementById('phone').value;
var password=document.getElementById('password').value;
var value = "app.php/register/name/"+name+"/email/"+ email+"/rname/"+rname+"/phone/"+ phone+"/password/"+password;

console.log(value);
    
    $.get(value)

        .done(function (data) {
          
            data = data.data; 
         
            if (data === null)
            {
               // document.write("Invalid username/password");
               window.alert("Registration error");
            }
            else
            {
               console.log(data[0].uid);
                console.log(data);
                setCookie("candy_store",data[0].uid,1);
              location.replace("https://candylove.party/mainPage");
            }
            
    });

     
}

