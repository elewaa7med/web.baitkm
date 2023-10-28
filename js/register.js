import { TokenSendKeyVerification ,VerifyCode,Register,AddGuest} from './api.js?ver=3.8.1';
import { constant } from './constant.js?ver=3.8.1';
import { ValidateEmail,ValidateRegister , checkCookiesValueForAuthenticationPage} from './general.js?ver=3.8.1';
$(function() {
    checkCookiesValueForAuthenticationPage();
    // Send Verfication Code
    sendVerificationCode();
    // click Register Button
    ValidateCodeWithEmailThenRegisterNewUser();
});

function ValidateCodeWithEmailThenRegisterNewUser(){
   
    $(".create-account").click(()=>{
        debugger;
        // validate all value before Register
        var valid = ValidateRegister();
        if(valid){
            let email = $(".email-value").val();
            let code =  $(".code").val();
            VerifyCode(null,email,code).done((result)=>{
                if(result.messages[0].key == constant.resultStatus.Info.index){
                    RegisterUser();
                }else{
                    $(".code-error").text(result.messages[0].value);
                    $(".code-error").css("visibility","visible");
                }
            });
        }   
        
    });
}
function RegisterUser(){
    debugger;
    Register($(".fullname").val(),
            $(".phone-value").val(),
            $(".country-code").val(),
            $(".email-value").val(),
            $(".password").val(),
            $(".confirmpassword").val()
    ).done((result)=>{
        console.log(result);
        if(result.messages[0].key == constant.resultStatus.Info.index){
            location.href="./../login.html"
        }
    });
}

function sendVerificationCode(){
    $(".verfication").click(()=>{
        $(".email-error").hide();
        let email = $(".email-value").val();
        if(email && ValidateEmail(email)){
        TokenSendKeyVerification(null,email).done((result)=>{
            if(result.messages[0].key == constant.resultStatus.Info.index){
                $(".email-error").text("Verification Code Sent Successfully. Please check you Email");
                $(".email-error").css("color","#07a507");
                $(".email-error").show();

            }else{
             $(".email-error").text(result.messages[0].value);
             $(".email-error").show();
            }
        });
        }else{
            $(".email-error").text("Enter Correct And Valid Email");
            $(".email-error").show();
        }
    })
}
