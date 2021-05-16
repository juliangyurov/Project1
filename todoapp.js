//unprotected
// stage = 0 - firstform, 1 - signupform, 2 - todolist
let stage = 0;

function changeStage()  {
    switch(stage){
        case 0:
            firstForm.style.display="block";
            signUpForm.style.display="none";
            logInForm.style.display="none";
            toDoForm.style.display="none";
            break;
        case 1:
            firstForm.style.display="none";
            signUpForm.style.display="block";
            logInForm.style.display="none";
            toDoForm.style.display="none";
            break;
        case 2:
            firstForm.style.display="none";
            signUpForm.style.display="none";
            logInForm.style.display="block";
            toDoForm.style.display="none";
            break;            
        case 3:
            firstForm.style.display="none";
            signUpForm.style.display="none";
            logInForm.style.display="none";
            toDoForm.style.display="block";
            break;
        default:
            firstForm.style.display="block";
            signUpForm.style.display="none";
            logInForm.style.display="none";
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

        if(fname.value.length === 0 || lname.value.length === 0){
            header.innerText+=" missing First or Last name";
            errCnt++;
        };
        if(!validEmail(email.value)){
            semicolon = (errCnt>0)? "; " : " ";
            header.innerText+=semicolon +"Email not valid";
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
            return;
        };

        stage = 2;
        changeStage();
    };
    
    function logInFormClicked(){
        // 1-check log in info 2- go to todo form
        stage = 3;
        changeStage();
    };



// init
let firstForm = document.getElementById("first-form" );
let signUpForm = document.getElementById("signup-form" );
let logInForm = document.getElementById("login-form" );
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



