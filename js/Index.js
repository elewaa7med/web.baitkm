import { constant } from './constant.js?ver=3.8.1';
import { getLast10FeaturedList, getAnnouncement, getCityList, AddGuest } from './api.js?ver=3.8.1';
import { SetAnouncementDataToHtml, iterateObjectAndAppendToHTML, OptionAppend,headerLink,maskMoney,Search,checkCookiesValueForOtherPage } from './general.js?ver=3.8.1';

checkCookiesValueForOtherPage();
  
$(document).ready(() => {
    headerLink();
    Search();
    sessionStorage.removeItem(constant.variable.FilterationSessionStoragekey.sortingType);
    FetchHomeIndexData();
});


function FetchHomeIndexData() {
    $.when(getLast10FeaturedList(), getAnnouncement(constant.variable.FilterationType.RentAnnouncement),
        getAnnouncement(constant.variable.FilterationType.SaleAnnouncement), getCityList())
        .then(function (Last10Featured, Last10AnnounceMentForRent, Last10AnnounceMentForSale, CityList) {
            if (Last10Featured[0].messages[0].key == constant.resultStatus.Info.index) {
                Last10Featured[0].data.data.forEach(function (featuredAnnouncement) {
                    SetAnouncementDataToHtml(".Featured-list", featuredAnnouncement);
                });
            }
            if (Last10AnnounceMentForRent[0].messages[0].key == constant.resultStatus.Info.index) {
                Last10AnnounceMentForRent[0].data.data.forEach(function (AnnouncementForSale) {
                    SetAnouncementDataToHtml(".AnnouncementForRent", AnnouncementForSale);
                });
            }
            if (Last10AnnounceMentForSale[0].messages[0].key == constant.resultStatus.Info.index) {
                Last10AnnounceMentForSale[0].data.data.forEach(function (AnnouncementForSale) {
                    SetAnouncementDataToHtml(".AnnouncementForSale", AnnouncementForSale);
                });
            }
            if (CityList[0].messages[0].key == constant.resultStatus.Info.index) {
                CityList[0].data.forEach(function (city) {
                    OptionAppend("#City", city.id, city.name)
                });
            }
            SetMainCategoryinFilteration();
            $("body").append(
                '<script src="./js/External/plugins.js"></script>'
                + '<script src="./js/External/main.js"></script>'
            );
            $('select').niceSelect();
            $('select').niceSelect("update");
            OnMainCategoryinFilteractionChange();
            // back from filter page and MainCategory Still save value then upload sub category
            if ($("#div-main-category div.nice-select .selected").attr("data-value")) {
                MainCategoryChangeAction();
            }

            $(".loader-container ").fadeOut();
            $(".body-wrapper").fadeIn();
            maskMoney('.currency');
        });

}

function SetMainCategoryinFilteration() {
    iterateObjectAndAppendToHTML(constant.AnnouncementEstateType, "#main-category");
}

function OnMainCategoryinFilteractionChange() {
    $("#div-main-category .nice-select").change(() => {
        MainCategoryChangeAction();
    });
}

function MainCategoryChangeAction() {
    $("#sub-category").empty();
    $("#sub-category").append("<option value='' selected>Sub Property</option>");
    let mainCategorySelectedValue = $("#div-main-category div.nice-select .selected").attr("data-value");

    if(!mainCategorySelectedValue){
        $("#sub-category").empty();
        $("#sub-category").append("<option value='' selected>Sub Property</option>");
    }
    else if (mainCategorySelectedValue == constant.AnnouncementEstateType.Residential.index) {
        iterateObjectAndAppendToHTML(constant.AnnouncementResidentialType, "#sub-category");
    } else if (mainCategorySelectedValue == constant.AnnouncementEstateType.Commercial.index) {
        iterateObjectAndAppendToHTML(constant.AnnouncementCommercialType, "#sub-category");
    } else if (mainCategorySelectedValue == constant.AnnouncementEstateType.Land.index) {
        iterateObjectAndAppendToHTML(constant.AnnouncementLandType, "#sub-category");
    }
        
    $('select').niceSelect("update");
}

$("#FilterAnnouncement").click(() => {
    $("#filter-error-message").hide();
    sessionStorage.clear();

    let MainCategory = $("#div-main-category div.nice-select .selected").attr("data-value");
    let SubCategory = $("#div-sub-category div.nice-select .selected").attr("data-value");
    let CityId = $("#div-city div.nice-select .selected").attr("data-value");

    sessionStorage.setItem(constant.variable.FilterationSessionStoragekey.mainType, $("#Main-Type .active").attr("id"));
    sessionStorage.setItem(constant.variable.FilterationSessionStoragekey.mainCategory, MainCategory);
    sessionStorage.setItem(constant.variable.FilterationSessionStoragekey.subCategory, SubCategory);
    
    if (CityId) {
        sessionStorage.setItem(constant.variable.FilterationSessionStoragekey.city, CityId);
        sessionStorage.setItem(constant.variable.FilterationSessionStoragekey.cityName, $("#div-city div.nice-select .selected").text());
    }

    if (MainCategory  || CityId) {
        location.href = constant.variable.Path.FilterPath;
    }    else{
        $("#filter-error-message").text("You must Select Property Or Location at least");
        $("#filter-error-message").fadeIn();
    }
});


