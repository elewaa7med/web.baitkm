import { EditUser } from './api.js?ver=3.8.1';
import { constant } from './constant.js?ver=3.8.1';
import { checkCookiesValue,checkCookiesValueForAuthenticationPage } from './general.js?ver=3.8.1';
$(function () {
    checkCookiesValueForAuthenticationPage();
    checkCookiesValue();
    GetAccountDetails();
    UpdateAccount();
});

function GetAccountDetails(){
    GetUserDetails().done((result)=>{
        if(result.messages[0].key == constant.resultStatus.Info.index){
            $(".fullname").val(result.data.fullName);
            $(".email-value").val(result.data.email);
            $(".phone-value").val(result.data.phone);
        }
    });
}

function UpdateAccount(){
    $(".update-account").click(()=>{
        EditUser(
        $(".fullname").val(),
        $(".phone-value").val(),
        $(".country-code").val(),
        ).done((result)=>{
            if(result.messages[0].key == constant.resultStatus.Info.index){
                
            }
        })
    });
}



