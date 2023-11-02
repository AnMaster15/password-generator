// slider

let inputslider=document.querySelector("[data-lengthslider]");
let lengthdisplay=document.querySelector("[data-lengthnumber]")
let passworddisplay=document.querySelector(" [data-passworddisplay]")
let copybtn=document.querySelector("[data-copy]")
let copymsg=document.querySelector("[data-copymsg]")
let uppercasecheck=document.querySelector("#uppercase")
let lowercasecheck=document.querySelector("#lowercase")
let numberscheck=document.querySelector("#numbers")
let symbolscheck=document.querySelector("#symbols")
let indicator=document.querySelector("[data-indicator]")
let generatebtn=document.querySelector(".generate")
let allcheckbox=document.querySelectorAll("input[type=checkbox]")
const symbols='~?$#@!%^&*<>';


let password="";
let passwordlength=5;
let checkcount=0;
handleslider();
//let circle color grey
setindincator("#ccc");

//set passwordlength
function handleslider(){

    inputslider.value=passwordlength;
    lengthdisplay.innerText=passwordlength;

    const min =inputslider.min;
    const max=inputslider.max;
    inputslider.style.backgroundSize=((passwordlength-min)*100/(max-min))+"% 100%"

}

function setindincator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getrandominterger(min,max){
    return Math.floor(Math.random()*(max-min))+min;//takki min se suru ho

}

function generaterandomnumber(){
    return getrandominterger(0,9);
}

function generatelowercase(){
   return String.fromCharCode(getrandominterger(97,123));
}

function generateuppercase(){
    return String.fromCharCode(getrandominterger(65,91));
 }

 function generatesymbols(){
    const random =getrandominterger(0,symbols.length);
    return symbols.charAt(random);//show character at the string
 }

 function calcstrength(){
    let hasupper=false;
    let haslower=false;
    let hasnum=false;
    let hassym=false;

    if(lowercasecheck.checked) haslower=true;
    if(uppercasecheck.checked) hasupper=true;
    if(numberscheck.checked) hasnum=true;
    if(symbolscheck.checked) hassym=true;

    if((hasupper && haslower && hasnum) || (hasupper && haslower && hassym) || (hassym && haslower && hasnum) || (hasupper && hassym && hasnum) || passwordlength>=7){

    setindincator("#0f0");

 }else if((haslower || hassym)&&(haslower||hasnum)&&passwordlength>=5){
    setindincator("#ff0")
 }else{
    setindincator("#f00")
 }
}

async function copycontent(){
    try{
        await navigator.clipboard.writeText(passworddisplay.value);
        copymsg.innerText="copied";
    }
    catch(e){
        copymsg.innerText="Failed"
    }
//to make copy wala span visible 
    copymsg.classList.add("active");

    setTimeout(()=>{
        copymsg.classList.remove("active");
    },2000);

}

function handlecheckboxchange(){
    checkcount=0;
    allcheckbox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkcount++;
        }
    })

//special condition

if(passwordlength<checkcount){
    passwordlength=checkcount;
    handleslider();
}
}
allcheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handlecheckboxchange);
})

inputslider.addEventListener('input',(ev)=>{
    passwordlength=ev.target.value;
    handleslider();
})

copybtn.addEventListener('click',()=>{
    if(passworddisplay.value){
        copycontent();
    }

})

function shufflepassword(array){
    //fisher yales method
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }

    let str="";
    array.forEach((el)=>{
        str+=el
    });
    return str;

}

generatebtn.addEventListener('click',()=>{
    //none of the checkboxes checked
    if(checkcount==0)
    return;

    if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleslider();
    }

    //lets start the journey
console.log("hello");
    //remove old password
    password="";

    // if(uppercasecheck.checked){
    //     password +=generateuppercase;
    // }

    // if(lowercasecheckcasecheck.checked){
    //     password +=generatelowercase;
    // }

    // if(numberscheckcheck.checked){
    //     password +=generaterandomnumber;
    // }

    // if(symbolscheck.checked){
    //     password +=generatesymbols;
    // }

    let funcarr=[];

    if(uppercasecheck.checked){
        funcarr.push(generateuppercase);
    }

    if(lowercasecheck.checked){
        funcarr.push(generatelowercase);
    }
    if(numberscheck.checked){
        funcarr.push(generaterandomnumber);
    }
    if(symbolscheck.checked){
        funcarr.push(generatesymbols);
    }

    //compulsory

    for(let i=0; i<funcarr.length;i++){
        password+=funcarr[i]();
    }

    //remaining add

    for(let i=0;i<passwordlength-funcarr.length;i++){
        let ranindex=getrandominterger(0,funcarr.length);
        password+=funcarr[ranindex]();
    }
    console.log("dsbg");
    //shuffle the pass

    password=shufflepassword(Array.from(password));

    //show in ui

    passworddisplay.value=password;

    //calculate strength

    calcstrength();

    
});

