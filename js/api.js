
import { constant, Model } from './constant.js?ver=3.8.1';
import { ConstrctFilterAnnouncementModel } from './general.js?ver=3.8.1';

if (Cookies.get(constant.cookies.Authentication)) {
    var header = constant.Headers.HeaderAuthenticatedUser;
} else {
    var header = constant.Headers.HeaderGuest;
    header.language = constant.variable.langEn.index;
}
var PagingModel = {
    Page: 1,
    Count: 10,
    DateFrom: "2022-05-22T19:58:19.562Z"
}
var SimilarPagingModel = {
    Page: 1,
    Count: 4,
    DateFrom: "2022-05-22T19:58:19.562Z"
}

export function Login(tokenModel) {
    debugger;
    header.language = constant.variable.langEn.index;
    $.ajax({
        url: constant.base + constant.TokenController.Token,
        headers: header,
        method: 'Post',
        dataType: 'json',
        data: JSON.stringify(tokenModel),
        success: function (object) {
            if (object.messages[0].key == constant.resultStatus.Error.index) {
                $(".WrongLogin").fadeIn();
            }
            if (object.messages[0].key == constant.resultStatus.Info.index) {
                Cookies.set(constant.cookies.Authentication, object.data.accessToken);
                Cookies.set(constant.cookies.UserId, object.data.id);
                Cookies.set(constant.cookies.date , new Date())
                location.href = "../index.html";
            }

        }
    });
}

export function AddGuest() {
    $.ajax({
        url: constant.base + constant.GuestController.addGuest,
        headers: header,
        method: 'POST',
        dataType: 'json',
        success: function (object) {
            if (object.messages[0].key == constant.resultStatus.Info.index) {
                // console.log(object.data);
            }
        }
    });
}

export function getLast10FeaturedList() {
    return $.ajax({
        url: constant.base + constant.AnnnouncementController.FeaturedList,
        data: jQuery.param({ sortingType: "0" }),
        headers: header,
        method: 'Post',
        dataType: 'json',
        data: JSON.stringify(PagingModel),
    });
}

export function getAnnouncement(type, filterModel = null) {
    if (type)
        filterModel = ConstrctFilterAnnouncementModel(type, Model.Filter);
    return $.ajax({
        url: constant.base + constant.AnnnouncementController.AnnouncementFilter,
        headers: header,
        method: 'Post',
        dataType: 'json',
        data: JSON.stringify(filterModel),
    });
}

export function getAnnouncementDetailsById(announcementId) {
    return $.ajax({
        url: constant.base + constant.AnnnouncementController.AnnouncementDetails+announcementId,
        headers: header,
        method: 'GET',
        dataType: 'json',
    });
}

export function getSimilarAnnouncement(announcementId) {
    return $.ajax({
        url: constant.base + constant.AnnnouncementController.SimilarAnnouncement + announcementId,
        headers: header,
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(SimilarPagingModel),
    });
}


export function getCityList() {
    return $.ajax({
        url: constant.base + constant.CityController.CityGetList,
        method: 'GET',
        dataType: 'json',
    });
}


export function SubscribeAnnouncement(announcementId,Email) {
    Model.Subscribe.AnnouncementId = announcementId;
    Model.Subscribe.Email = Email;
    return $.ajax({
        url: constant.base + constant.SubscribeController.Subscribe,
        headers: header,
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(Model.Subscribe),
    });
}

export function TokenSendKeyVerification(PhoneCode,VerificationTerm){
    Model.SendKey.PhoneCode = PhoneCode;
    Model.SendKey.VerificationTerm = VerificationTerm;
    return $.ajax({
        url: constant.base + constant.TokenController.SendKey,
        headers: constant.Headers.HeaderDefault,
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(Model.SendKey),
    });
}
export function VerifyCode(PhoneCode,VerificationTerm,Code){
    Model.Verify.PhoneCode = PhoneCode;
    Model.Verify.VerificationTerm = VerificationTerm;
    Model.Verify.Code = Code;
    return $.ajax({
        url: constant.base + constant.TokenController.Verify,
        headers: constant.Headers.HeaderDefault,
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(Model.Verify),
    });
}

export function Register(FullName,PhoneEmail,PhoneCode,VerificationTerm,
                         Password,ConfirmPassword){
    Model.Register.FullName = FullName;
    Model.Register.PhoneEmail = PhoneEmail;
    Model.Register.PhoneCode = PhoneCode;
    Model.Register.VerificationTerm = VerificationTerm;
    Model.Register.Password = Password;
    Model.Register.ConfirmPassword = ConfirmPassword;
    console.log(Model.Register);
    return $.ajax({
        url: constant.base + constant.UserController.Register,
        headers: constant.Headers.HeaderDefault,
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(Model.Register),
    });
}

export function SendKeyForgotPassword(PhoneCode,VerificationTerm){
    Model.SendKey.PhoneCode = PhoneCode;
    Model.SendKey.VerificationTerm = VerificationTerm;
    return $.ajax({
        url: constant.base + constant.UserController.SendKeyForgotPassword,
        headers: constant.Headers.HeaderDefault,
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(Model.SendKey),
    });
}

export function CheckForgotKey(PhoneCode,VerificationTerm,Code){
    Model.Verify.PhoneCode = PhoneCode;
    Model.Verify.VerificationTerm = VerificationTerm;
    Model.Verify.Code = Code;
    return $.ajax({
        url: constant.base + constant.UserController.CheckForgotKey,
        headers: constant.Headers.HeaderDefault,
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(Model.Verify),
    });
}

export function ForgotPassword(password,confirmpassword,PhoneCode,VerificationTerm){
    Model.ForgetPassword.PhoneCode = PhoneCode;
    Model.ForgetPassword.password = password;
    Model.ForgetPassword.confirmpassword = confirmpassword;
    Model.ForgetPassword.VerificationTerm = VerificationTerm;
    return $.ajax({
        url: constant.base + constant.UserController.ForgotPassword,
        headers: constant.Headers.HeaderDefault,
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(Model.ForgetPassword),
    });
}


export function ChangePassword(oldPassword, newpassword,confirmpassword){
    Model.ChangePassword.OldPassword = oldPassword;
    Model.ChangePassword.NewPassword = newpassword;
    Model.ChangePassword.ConfirmPassword = confirmpassword;
    return $.ajax({
        url: constant.base + constant.UserController.ChangePassword,
        headers: header,
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(Model.ChangePassword),
    });
}

export function GetUserDetails(){
    return $.ajax({
        url: constant.base + constant.UserController.GetUserDetails,
        headers: header,
        method: 'GET',
        dataType: 'json',
    });
}

export function EditUser(fullName, PhoneEmail,PhoneCode){
    Model.EditUser.FullName = fullName;
    Model.EditUser.PhoneEmail = PhoneEmail;
    Model.EditUser.PhoneCode = PhoneCode;
    return $.ajax({
        url: constant.base + constant.UserController.EditUser,
        headers: header,
        method: 'PUT',
        dataType: 'json',
        data: JSON.stringify(Model.ChangePassword),
    });
}