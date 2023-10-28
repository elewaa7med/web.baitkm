import { ChangePassword } from './api.js?ver=3.8.1';
import { constant } from './constant.js?ver=3.8.1';
import { validateChangePasswod ,checkCookiesValueForAuthenticationPage} from './general.js?ver=3.8.1';
$(function() {
    checkCookiesValueForAuthenticationPage();
    // click Update Password
    UpdatePassword();
});

function UpdatePassword(){
    $(".update-password").click(()=>{
        $(".old-password-error").css("visibility","hidden");
        $(".new-password-error").css("visibility","hidden");
        $(".confirmpassword-error").css("visibility","hidden");
        
        if(validateChangePasswod()){
            let oldPasswod = $(".old-password").val();
            let newPassword =  $(".new-password").val();
            let confirmPassword =  $(".confirmpassword").val();
            ChangePassword(oldPasswod,newPassword,confirmPassword).done((result)=>{
                if(result.messages[0].key == constant.resultStatus.Info.index){
                    location.href = "../index.html";
                }else{
                    $(".old-password-error").text(result.messages[0].value);
                    $(".old-password-error").css("visibility","visible");
                }
            });
        }   
        
    });
}



