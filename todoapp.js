//unprotected
// stage = 0 - firstform, 1 - signupform, 2 - loginform, 3 - dashboard, 4 - todolist
let stage = 0;

function changeStage()  {
    switch(stage){
        case 0:
            firstForm.style.display="block";
            signUpForm.style.display="none";
            logInForm.style.display="none";
            dashboardForm.style.display="none";
            toDoForm.style.display="none";
            break;
        case 1:
            firstForm.style.display="none";
            signUpForm.style.display="block";
            logInForm.style.display="none";
            dashboardForm.style.display="none";
            toDoForm.style.display="none";
            break;
        case 2:
            firstForm.style.display="none";
            signUpForm.style.display="none";
            logInForm.style.display="block";
            dashboardForm.style.display="none";
            toDoForm.style.display="none";
            break;            
        case 3:
            firstForm.style.display="none";
            signUpForm.style.display="none";
            logInForm.style.display="none";
            dashboardForm.style.display="block";
            toDoForm.style.display="none";
            break;
        case 4:
            firstForm.style.display="none";
            signUpForm.style.display="none";
            logInForm.style.display="none";
            dashboardForm.style.display="none";
            toDoForm.style.display="block";
            break;            
        default:
            firstForm.style.display="block";
            signUpForm.style.display="none";
            logInForm.style.display="none";
            dashboardForm.style.display="none";
            toDoForm.style.display="none";        
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
        // 1-check sign up data 2-record data 3-go to login form
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

        // go to dashboard - todo lists
        stage = 3;
        changeStage();
    };
    
    function logInFormClicked(){
        // 1-check log in info 2- go to dashboard - todo lists form

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
        
        // No errors - proceed to dashboard

        stage = 3;
        changeStage();
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


// init
let firstForm = document.getElementById("first-form" );
let signUpForm = document.getElementById("signup-form" );
let logInForm = document.getElementById("login-form" );
let dashboardForm = document.getElementById("dashboard-form" );
let toDoForm = document.getElementById("todo-form" );

let buttonSignUp = document.getElementById("signup");
let buttonLogIn = document.getElementById("login");
let buttonSignUpForm = document.getElementById("signupform");
let buttonLogInForm = document.getElementById("loginform");

// add event listeners
buttonSignUp.addEventListener("click",signUpClicked);
buttonLogIn.addEventListener("click",logInClicked);
buttonSignUpForm.addEventListener("click",signUpFormClicked);
buttonLogInForm.addEventListener("click",logInFormClicked);

// check localStorage entries
console.log(getUser("emarinova@gmail.com"));
console.log(getUser("julian.gyuroff@gmail.com"));
console.log(getUser("john.d@example.org"));
console.log(getUser("anna.s@example.org"));
console.log(getUser("peter.j@example.org"));

