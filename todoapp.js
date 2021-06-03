//unprotected
// stage = 0 - firstform, 1 - signupform, 2 - loginform, 3 - dashboard, 4 - todolist, 5 - account settings
let stage = 0;

function changeStage()  {
    switch(stage){
        case 0:
            firstForm.style.display="block";
            signUpForm.style.display="none";
            logInForm.style.display="none";
            dashboardForm.style.display="none";
            toDoForm.style.display="none";
            accSettingsForm.style.display="none";
            break;
        case 1:
            firstForm.style.display="none";
            signUpForm.style.display="block";
            logInForm.style.display="none";
            dashboardForm.style.display="none";
            toDoForm.style.display="none";
            accSettingsForm.style.display="none";
            break;
        case 2:
            firstForm.style.display="none";
            signUpForm.style.display="none";
            logInForm.style.display="block";
            dashboardForm.style.display="none";
            toDoForm.style.display="none";
            accSettingsForm.style.display="none";
            break;            
        case 3:
            firstForm.style.display="none";
            signUpForm.style.display="none";
            logInForm.style.display="none";
            dashboardForm.style.display="block";
            toDoForm.style.display="none";
            accSettingsForm.style.display="none";
            break;
        case 4:
            firstForm.style.display="none";
            signUpForm.style.display="none";
            logInForm.style.display="none";
            dashboardForm.style.display="none";
            toDoForm.style.display="block";
            accSettingsForm.style.display="none";
            break; 
        case 5:
                firstForm.style.display="none";
                signUpForm.style.display="none";
                logInForm.style.display="none";
                dashboardForm.style.display="none";
                toDoForm.style.display="none";
                accSettingsForm.style.display="block";
                break;                                 
        default:
            firstForm.style.display="block";
            signUpForm.style.display="none";
            logInForm.style.display="none";
            dashboardForm.style.display="none";
            toDoForm.style.display="none";  
            accSettingsForm.style.display="none";      
    }
    console.log("stage=" + stage);
    };

    function signUpClicked(){
        stage = 1;
        changeStage();
    };
    
    function logInClicked(){
        stage = 2;
        changeStage();
    };

    function validEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    function signUpFormClicked(){
        // 1-check sign up data 2-record data 3-go to dashboard form
        const checkBox = document.getElementById("agreement");
        const header = document.getElementById("headerSignUp");
        const email = document.getElementById("email");
        const fname = document.getElementById("fname");
        const lname = document.getElementById("lname");
        const password = document.getElementById("password");

        let errCnt = 0;
        let semicolon = "";

        header.innerText = "Please complete all information below:";
        header.style.color = "white";

        if(fname.value.length === 0 || lname.value.length === 0){
            header.innerText+=" missing First or Last name";
            errCnt++;
        };
        if(!validEmail(email.value)){
            semicolon = (errCnt>0)? "; " : " ";
            header.innerText+=semicolon +"Email not valid";
            errCnt++;
        };
        if(getUser(email.value) !== -1){
            semicolon = (errCnt>0)? "; " : " ";
            header.innerText+=semicolon +"Email already exists";
            errCnt++;
        };
        if(password.value.length === 0 ){
            semicolon = (errCnt>0)? "; " : " ";
            header.innerText+=semicolon +"Password missing";
            errCnt++;
        };
        if(!checkBox.checked){
            semicolon = (errCnt>0)? "; " : " ";
            header.innerText+=semicolon +"Check the agreement checkbox";
            errCnt++;
        };
        
        if(errCnt>0){
            header.style.color = "red";
            return;
        };
        
        // No errors - then add user to localStorage
        addUser(fname.value,lname.value,email.value,password.value);
        console.log(getUser(email.value));

        // Logged user data
        lufname=fname.value;
        lulname=lname.value;
        luemail=email.value;
        lupassword=password.value;

        // go to dashboard - todo lists
        stage = 3;
        changeStage();
 
        // Testing
        console.log("Email: "+ email.value);
        console.log(getUserLists(email.value));       
    };
    
    function logInFormClicked(){
        // 1st-check log in info 2nd- go to dashboard - todo lists form

        const email1 = document.getElementById("email1");
        const password1 = document.getElementById("password1");
        const header1 = document.getElementById("headerLogin");
        

        let errCnt = 0;
        let semicolon = "";

        header1.innerText = "Please complete all information below:";
        header1.style.color = "white";

        // Answers should not be so detailed in real application !!!
        // Answers should be ambiguous !!!
        
        if(!validEmail(email1.value)){
            semicolon = (errCnt>0)? "; " : " ";
            header1.innerText+=semicolon +"Email not valid";
            errCnt++;
        }else if(getUser(email1.value) === -1){
            semicolon = (errCnt>0)? "; " : " ";
            header1.innerText+=semicolon +"Email not found";
            errCnt++;
        }; 
        if(password1.value.length === 0 ){
            semicolon = (errCnt>0)? "; " : " ";
            header1.innerText+=semicolon +"Password missing";
            errCnt++;
        }else if(password1.value !== getPassword(email1.value) && errCnt === 0){
            semicolon = (errCnt>0)? "; " : " ";
            header1.innerText+=semicolon +"Password does not match";
            errCnt++;
        };
        
        if(errCnt>0){
            header1.style.color = "red";
            return;
        }; 
        
        // No errors - proceed to dashboard (todo lists)

        // Logged user data
        let objUser = getUser(email1.value);
        lufname = objUser.firstName;
        lulname = objUser.lastName;
        luemail = email1.value;
        lupassword = objUser.password;
        //console.log(lufname + " " + lulname + " "+ luemail);

        stage = 3;
        changeStage();

        // Testing
        console.log("Email: "+ email1.value);
        console.log(getUserLists(email1.value));
    };


function addUser(fname,lname,email,password){
    // Check if user already created
    if(getUser(email) !== -1) {
        return -1;
    };
    const objUser = {
                        "firstName": fname ,
                        "lastName": lname ,
                        "password": password ,
                        "todolists": [] 
                    };
    try{
        localStorage.setItem(email,JSON.stringify(objUser));
    }catch(e){
        console.error(e);
    };
    
};

function changeUser(fname,lname,email,password){

    //testing data here
    // let todolistExamp = [ { "listname" : "grocerylist", "items":   [
    //                                                 {"el": "Bakery and Bread", "checked":false},
    //                                                 {"el": "Meat and Seafood", "checked":false},
    //                                                 {"el": "Pasta and Rice", "checked":false},
    //                                                 {"el": "Dairy, Cheese, and Eggs", "checked":false}
    //                                                 ]   
    //                         },

    //                         { "listname" : "apparellist", "items":   [
    //                                                 {"el": "sweater", "checked":false},
    //                                                 {"el": "jacket", "checked":false},
    //                                                 {"el": "jeans", "checked":false},
    //                                                 {"el": "socks", "checked":false}
    //                                                 ]   
    //                         }
    //                     ]  ;                                                                             


    // lists are deleted !!!
    const objUser = {
                        "firstName": fname ,
                        "lastName": lname ,
                        "password": password ,
                        "todolists": [] 
                    };
    objUser.todolists = getUserLists(email);                
    //objUser.todolists = todolistExamp; //testing data               
    try{
        localStorage.setItem(email,JSON.stringify(objUser));
    }catch(e){
        console.error(e);
    };
    
};

function removeUser(email){
    localStorage.removeItem(email);
};

function getUser(email){
    try{
        var objUser = localStorage.getItem(email);
        if(objUser === null){
            return -1;
        };
        objUser = JSON.parse(objUser);
        return objUser;
    }catch(e){
        console.error(e);
    };
};

function getPassword(email){
    var objUser1 = getUser(email);
    if(objUser1 === -1) {
        return; //return undefined
    };
    return objUser1.password;
};

function getUserLists(email){
    try{
        var objUser = localStorage.getItem(email);
        if(objUser === null){
            return -1;
        };
        objUser = JSON.parse(objUser);
        return objUser.todolists
    }catch(e){
        console.error(e);
    };
};

function addUserList(email,list){
    try{
        var objUser = localStorage.getItem(email);
        if(objUser === null){
            return -1;
        };
        objUser = JSON.parse(objUser);
        objUser.todolists.push(list);
        console.log(objUser); 
    }catch(e){
        console.error(e);
    };
};

// DASHBOARD functions

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must enter something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

function logOut(){
    stage = 0;
    changeStage();
}

function changeAccSettings(){
    // display/edit account settings
    const asfname = document.getElementById("asfname");
    const aslname = document.getElementById("aslname");
    const asemail = document.getElementById("asemail");
    const aspassword = document.getElementById("aspassword");
    const asrepassword = document.getElementById("asrepassword");
    asfname.value=lufname;
    aslname.value=lulname;
    asemail.value=luemail;
    aspassword.value="012345678912";        //dummy password
    asrepassword.value="012345678921"; 
    stage = 5;
    changeStage();     
}

function AccSettingsSave(){
    
    let errCnt = 0;
    let semicolon = "";
    const header2 = document.getElementById("headerAccSettings");
    const asfname = document.getElementById("asfname");
    const aslname = document.getElementById("aslname");
    const asemail = document.getElementById("asemail");
    const aspassword = document.getElementById("aspassword");
    const asrepassword = document.getElementById("asrepassword");

    header2.innerText = "Account Settings:";
    header2.style.color = "white";

    
    if(asfname.value.length === 0 || aslname.value.length === 0){
        header2.innerText+=" missing First or Last name";
        errCnt++;
    };
    if(!validEmail(asemail.value)){
        semicolon = (errCnt>0)? "; " : " ";
        header2.innerText+=semicolon +"Email not valid";
        errCnt++;
    };
    if(aspassword.value.length === 0 || asrepassword.value.length === 0 || 
        aspassword.value !== asrepassword.value){
            semicolon = (errCnt>0)? "; " : " ";
            header2.innerText+=semicolon +"Password mismatch ";
            errCnt++;   

    };
    if(errCnt>0){
        header2.style.color = "red";
        return;
    };

    // No errors - then change User account Settings in localStorage
    changeUser(asfname.value,aslname.value,asemail.value,aspassword.value);
    lufname = asfname.value;
    lulname = aslname.value;
    luemail = asemail.value;
    lupassword = aspassword.value;
        
    stage = 3;
    changeStage();
 }

function AccSettingsCancel(){
 
    stage = 3;
    changeStage();    
}

// init
// show/hide form variables
let firstForm = document.getElementById("first-form" );
let signUpForm = document.getElementById("signup-form" );
let logInForm = document.getElementById("login-form" );
let dashboardForm = document.getElementById("dashboard-form" );
let toDoForm = document.getElementById("todo-form" );
let accSettingsForm = document.getElementById("account-settings-form" );

// button elements
let buttonSignUp = document.getElementById("signup");
let buttonLogIn = document.getElementById("login");
let buttonSignUpForm = document.getElementById("signupform");
let buttonLogInForm = document.getElementById("loginform");
let buttonAccSettings = document.getElementById("accSettingsBtn");
let buttonLogOut = document.getElementById("logOutBtn");
let buttonAccSettingsSave = document.getElementById("accsettingssave");
let buttonAccSettingsCancel = document.getElementById("accsettingscancel");

// add event listeners
buttonSignUp.addEventListener("click",signUpClicked);
buttonLogIn.addEventListener("click",logInClicked);
buttonSignUpForm.addEventListener("click",signUpFormClicked);
buttonLogInForm.addEventListener("click",logInFormClicked);
buttonAccSettings.addEventListener("click",changeAccSettings);
buttonLogOut.addEventListener("click",logOut);
buttonAccSettingsSave.addEventListener("click",AccSettingsSave);
buttonAccSettingsCancel.addEventListener("click",AccSettingsCancel);

// logged user data
let lufname,lulname,luemail,lupassword;

// remove users
removeUser("john.d@example.org");
removeUser("anna.s@example.org");

// check localStorage entries
console.log(getUser("emarinova@gmail.com"));    //Em1234567*
console.log(getUser("julian.gyuroff@gmail.com"));
console.log(getUser("john.d@example.org"));     //Jd1234567*
console.log(getUser("anna.s@example.org"));     //1
console.log(getUser("peter.j@example.org"));

