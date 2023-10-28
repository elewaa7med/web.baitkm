import { constant } from './constant.js?ver=3.8.1';
import { AddGuest,Login,SendKeyForgotPassword,CheckForgotKey, ForgotPassword} from './api.js?ver=3.8.1';
import { headerLink,Search } from './general.js?ver=3.8.1';
import { ValidateEmail,ValidateRegister,checkCookiesValueForAuthenticationPage } from './general.js?ver=3.8.1';

$(function () {
  checkCookiesValueForAuthenticationPage();
  headerLink();
  Search();
  signInClick();
  ForgetEmailSendVerificationCode();
  
});

function signInClick(){
  $("#signIn").click(() => {
    $(".WrongLogin").fadeOut();
    var tokenModel = {
      VerificationTerm: $("#verificationTerm").val(),
      Password: $("#password").val(),
    }
    if($("#verificationTerm").val() && $("#password").val()){
      
      Login(tokenModel);
    }else{
      $(".WrongLogin").text("Please Enter Valid Email and Password");
      $(".WrongLogin").fadeIn();
    }
  });
}

function ForgetEmailSendVerificationCode(){
  let sendVerificationCodeFlag = false;
  $(".Send-forget-password-key").click(()=>{
    if(sendVerificationCodeFlag == false){
      $(".email-error").css("visibility","hidden");
      let forgetEmail = $(".forget-email").val();
      if(forgetEmail && ValidateEmail(forgetEmail)){
        SendKeyForgotPassword(null,forgetEmail).done((result)=>{
          if(result.messages[0].key == constant.resultStatus.Info.index){
            UpdateSuccesssSendingVerificationCode();
            sendVerificationCodeFlag = true;
          }else{
            UpdateFailedSendingVerificationCode(result.messages[0].value);
          }
        });
      }else{
        UpdateFailedSendingVerificationCode("Please enter correct and valid email");
      }
    }else{
      if(ValidateRegister){
        CheckForgotKey(null,$(".forget-email").val(),$(".code").val()).done((result)=>{
          if(result.messages[0].key == constant.resultStatus.Info.index){
            ForgotPasswordCall();
          }else{
            $(".code-error").text(result.messages[0].value);
            $(".code-error").css("visibility","visible");
          }
        });
      }
    }
  });
}

function UpdateSuccesssSendingVerificationCode(){
  $(".email-error").text("Verification Code Sent successfully, please check mail")
  $(".email-error").css("visibility","visible");
  $(".email-error").css("color","#07a507");
  $(".modal-forget-email .code-error").show();
  $(".modal-forget-email .password-error").show();
  $(".modal-forget-email .confirmpassword-error").show();
  $(".modal-forget-email .code").show();
  $(".modal-forget-email .password").show();
  $(".modal-forget-email .confirmpassword").show();
  $(".Send-forget-password-key").text("Update Password");
}

function UpdateFailedSendingVerificationCode(errorText)
{
  $(".email-error").text(errorText)
  $(".email-error").css("visibility","visible");
}

function ForgotPasswordCall(){
  ForgotPassword($(".password").val(),$(".confirmpassword").val()
  ,$(".code").val(),$(".forget-email").val(),).done((result)=>{
    if(result.messages[0].key == constant.resultStatus.Info.index){
      $('#ltn_forget_password_modal').modal('hide');
      $("#ltn_success_modal").modal("show");
    }
  });
}

// console.log(Cookies.get(constant.cookies.Authentication));
// console.log("-----------------------------------")
// console.log(Cookies.get(constant.cookies.UserId))