import { constant } from './constant.js?ver=3.8.1';
import { AddGuest } from './api.js?ver=3.8.1';
export function checkCookiesValueForAuthenticationPage() {
    if (Cookies.get(constant.cookies.Authentication)) {
        location.href = "../index.html";
    }
}

export function checkCookiesValueForOtherPage() {
    if (!Cookies.get(constant.cookies.Authentication)) {
        AddGuest();
    } else {
        const date = new Date(Cookies.get(constant.cookies.date));
        if (!date || new Date(date.setDate(date.getDate() + 3)) < new Date()) {
            Cookies.remove(constant.cookies.Authentication);
            Cookies.remove(constant.cookies.date);
            Cookies.remove(constant.cookies.UserId);
            location.href = "../login.html";
        }
    }
}
// RENT - SALE
export function AnnouncementType(typeNumber) {
    if (typeNumber == constant.AnnouncementType.Sale.index) {
        return constant.AnnouncementType.Sale.value;
    }
    else if (typeNumber == constant.AnnouncementType.Rent.index) {
        return constant.AnnouncementType.Rent.value;
    }
}
// Daily Weekly monthly Yearly
export function AnnouncementRentDurationType(RentType) {
    if (RentType == constant.AnnouncementRentType.Daily.index) {
        return constant.AnnouncementRentType.Daily.value;
    }
    if (RentType == constant.AnnouncementRentType.Weekly.index) {
        return constant.AnnouncementRentType.Weekly.value;
    }
    if (RentType == constant.AnnouncementRentType.Monthly.index) {
        return constant.AnnouncementRentType.Monthly.value;
    }
    if (RentType == constant.AnnouncementRentType.Yearly.index) {
        return constant.AnnouncementRentType.Yearly.value;
    }
}

// Residential - Commercial - Land
export function AnnouncementEstateTypeValue(StateType) {
    if (StateType == constant.AnnouncementEstateType.Residential.index) {
        return constant.AnnouncementEstateType.Residential.value
    } else if (StateType == constant.AnnouncementEstateType.Commercial.index) {
        return constant.AnnouncementEstateType.Commercial.value
    } else if (StateType == constant.AnnouncementEstateType.Land.index) {
        return constant.AnnouncementEstateType.Land.value
    }
}

export function AnnouncementEstateType(StateType, ResidentialType, CommercialType, LandType) {
    if (StateType == constant.AnnouncementEstateType.Residential.index) {
        return AnnouncementResidentialType(ResidentialType)
    } else if (StateType == constant.AnnouncementEstateType.Commercial.index) {
        return AnnouncementCommercialType(CommercialType)
    } else if (StateType == constant.AnnouncementEstateType.Land.index) {
        return AnnouncementLandType(LandType) + " " + constant.AnnouncementEstateType.Land.value
    }
}

// Square Foot - Square m2
export function AreaUnit(unitType) {
    if (unitType == constant.AreaUnit.SquareFut.index) {
        return constant.AreaUnit.SquareFut.value;
    }
    else {
        return constant.AreaUnit.SquareMeter.value;
    }
}


function AnnouncementResidentialType(ResidentialType) {
    if (ResidentialType == constant.AnnouncementResidentialType.Building.index) {
        return constant.AnnouncementResidentialType.Building.value;
    }
    else if (ResidentialType == constant.AnnouncementResidentialType.Apartment.index) {
        return constant.AnnouncementResidentialType.Apartment.value;
    }
    else if (ResidentialType == constant.AnnouncementResidentialType.Villa.index) {
        return constant.AnnouncementResidentialType.Villa.value;
    }
    else if (ResidentialType == constant.AnnouncementResidentialType.Duplex.index) {
        return constant.AnnouncementResidentialType.Duplex.value;
    }
    else if (ResidentialType == constant.AnnouncementResidentialType.Compound.index) {
        return constant.AnnouncementResidentialType.Compound.value;
    }
    else if (ResidentialType == constant.AnnouncementResidentialType.Chalet.index) {
        return constant.AnnouncementResidentialType.Chalet.value;
    }
    else if (ResidentialType == constant.AnnouncementResidentialType.Tower.index) {
        return constant.AnnouncementResidentialType.Tower.value;
    }
    else if (ResidentialType == constant.AnnouncementResidentialType.Studio.index) {
        return constant.AnnouncementResidentialType.Studio.value;
    }
    else if (ResidentialType == constant.AnnouncementResidentialType.FarmHouse.index) {
        return constant.AnnouncementResidentialType.FarmHouse.value;
    }
}

// Showroom - OfficeSpace - Shop - WareHouse
function AnnouncementCommercialType(CommercialType) {
    if (CommercialType == constant.AnnouncementCommercialType.Showroom.index) {
        return constant.AnnouncementCommercialType.Showroom.value
    }
    else if (CommercialType == constant.AnnouncementCommercialType.OfficeSpace.index) {
        return constant.AnnouncementCommercialType.OfficeSpace.value
    }
    else if (CommercialType == constant.AnnouncementCommercialType.Shop.index) {
        return constant.AnnouncementCommercialType.Shop.value
    }
    else if (CommercialType == constant.AnnouncementCommercialType.WareHouse.index) {
        return constant.AnnouncementCommercialType.WereHouse.value;
    }
}

// Agricultural - Industrial - Commercial - Residential
function AnnouncementLandType(LandType) {
    if (LandType == constant.AnnouncementLandType.Agricultural.index) {
        return constant.AnnouncementLandType.Agricultural.value;
    }
    else if (LandType == constant.AnnouncementLandType.Industrial.index) {
        return constant.AnnouncementLandType.Industrial.value;
    }
    else if (LandType == constant.AnnouncementLandType.Commercial.index) {
        return constant.AnnouncementLandType.Commercial.value;
    }
    else if (LandType == constant.AnnouncementLandType.Residential.index) {
        return constant.AnnouncementLandType.Residential.value;
    }
}

export function ConstrctFilterAnnouncementModel(type, Model) {
    var filterModel = Model;
    if (type == constant.variable.FilterationType.RentAnnouncement) {
        filterModel.Count = 10;
        filterModel.Page = 1;
        filterModel.AnnouncementFilter.AnnouncementType = constant.AnnouncementType.Rent.index;
        filterModel.AnnouncementFilter.SortingType = constant.SortingType.Newest.index;
    } else if (type == constant.variable.FilterationType.SaleAnnouncement) {
        filterModel.Count = 10;
        filterModel.Page = 1;
        filterModel.AnnouncementFilter.AnnouncementType = constant.AnnouncementType.Sale.index;
        filterModel.AnnouncementFilter.SortingType = constant.SortingType.Newest.index;
    }
    else if (type == constant.variable.FilterationType.TopRatedAnnouncement) {
        filterModel.Count = 3;
        filterModel.Page = 1;
        filterModel.AnnouncementFilter.SortingType = constant.SortingType.TopRated.index;
    }
    else if (type == constant.variable.FilterationType.MostViewAnnouncement) {
        filterModel.Count = 3;
        filterModel.Page = 1;
        filterModel.AnnouncementFilter.SortingType = constant.SortingType.MostView.index;
    }
    return filterModel;
}

export function SetAnouncementDataToHtml(HtmlClassName, ResponceObject, colSizes = null, WithoutBorder = null) {
    $(HtmlClassName).append(
        '<div class="' + (colSizes == null ? "col-xl-4 col-sm-6 col-12" : colSizes) + '">'
        +
        '<div class="ltn__product-item ltn__product-item-4 text-center---">' +
        '<div class="product-img">' +
        '<a href="../details.html?id=' + ResponceObject.id + '"><img src="' + (ResponceObject.photo.photo ? ResponceObject.photo.photo : "../img/Announcement_Default_Image.jpg") + '" alt="#" height="' + (colSizes ? "200" : "300") + '" width="100%"></a>' +
        '<div class="product-badge">' +
        '<ul>' +
        '<li class="sale-badge ' + (AnnouncementType(ResponceObject.announcementType) == "Sale" ? "bg-green---" : "bg-green") + '">For ' + AnnouncementType(ResponceObject.announcementType) + '</li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '<div class="product-info">' +
        '<div class="product-price">' +
        '<span > <span class="currency">' + ResponceObject.price + ' </span>' +
        (ResponceObject.announcementType == constant.AnnouncementType.Sale.index ?
            ' <label>  ' + ResponceObject.currencyCode + '</label></span>'
            : ' <label>  ' + ResponceObject.currencyCode + '/' + AnnouncementRentDurationType(ResponceObject.announcementRentType) + ' </label></span>') +
        '</span>' +
        '</div>' +
        '<h2 class="product-title"><a href="../details.html?id=' + ResponceObject.id + '">  ' + AnnouncementEstateType(ResponceObject.announcementEstateType, ResponceObject.announcementResidentialType, ResponceObject.commercialType, ResponceObject.landType)
        + ' For ' + AnnouncementType(ResponceObject.announcementType)
        + '</a></h2>' +
        '<div class="product-description">' +
        (ResponceObject.address ?
            '<p class="text2-1Line">' +
            ResponceObject.address +
            '</p>' : '<p class="text2-1Line"> No Location Specified</p>') +
        '</div>' +
        '<ul class="ltn__list-item-2 ' + (!WithoutBorder ? "ltn__list-item-2-before" : "") + '" >' +
        '<li style=' + (WithoutBorder ? "margin-right:15px" : "") + '>' +
        '<span>' + ResponceObject.bedroomCount + ' <i class="flaticon-bed"></i></span>' +
        'Bedrooms' +
        '</li>' +
        '<li style=' + (WithoutBorder ? "margin-right:15px" : "") + '>' +
        '<span>' + ResponceObject.bathroomCount + ' <i class="flaticon-clean"></i></span>' +
        ' Bathrooms' +
        '</li>' +
        '<li style=' + (WithoutBorder ? "margin-right:15px" : "") + '>' +
        '<span>' + ResponceObject.area + '  <i class="flaticon-square-shape-design-interface-tool-symbol"></i></span>' +
        AreaUnit(ResponceObject.AreaUnit) +
        '</li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</div>'
    );
}

export function iterateObjectAndAppendToHTML(type, appendSelector, selectedValue) {
    Object.keys(type).forEach(item => {
        OptionAppend(appendSelector, type[item].index, type[item].value, selectedValue)
    });
}

export function OptionAppend(Selector, index, value, selectedValue) {
    $(Selector).append("<option value='" + index + "' " + (selectedValue == index ? "selected" : "") + ">" + value + "</option>");
}

export function AnnouncementConstructionStatus(constructionStatus) {
    if (constructionStatus == constant.ConstructionStatus.ReadyToMove.index) {
        return constant.ConstructionStatus.ReadyToMove.value;
    }
    else if (constructionStatus == constant.ConstructionStatus.UnderConstruction.index) {
        return constant.ConstructionStatus.UnderConstruction.value;
    }
}
export function AnnouncementFurnishingStatus(furnishingStatus) {
    if (furnishingStatus == constant.FurnishingStatus.Furnished.index) {
        return constant.FurnishingStatus.Furnished.value;
    }
    else if (furnishingStatus == constant.FurnishingStatus.SemiFurnished.index) {
        return constant.FurnishingStatus.SemiFurnished.value;
    }
    else if (furnishingStatus == constant.FurnishingStatus.Unfurnished.index) {
        return constant.FurnishingStatus.Unfurnished.value;
    }
}

export function AnnouncementOwnerShip(ownerShip) {
    if (ownerShip == constant.OwnerShip.Freehold.index) {
        return constant.OwnerShip.Freehold.value;
    }
    else if (ownerShip == constant.OwnerShip.RealAgent.index) {
        return constant.OwnerShip.RealAgent.value;
    }
}


export function getEnumObject(type, objectItemIndex) {
    var itemObject;
    Object.values(type).forEach(item => {
        if (item.index == objectItemIndex) {
            itemObject = item;
        }
    });
    return itemObject;
}

export function headerLink() {
    $(".ltn__main-menu .menu-icon a").click((e) => {
        e.preventDefault();
        sessionStorage.setItem(constant.variable.FilterationSessionStoragekey.mainType, e.currentTarget.attributes["main-type"].value);
        sessionStorage.setItem(constant.variable.FilterationSessionStoragekey.mainCategory, e.currentTarget.attributes["main-category"].value);
        sessionStorage.setItem(constant.variable.FilterationSessionStoragekey.subCategory, e.currentTarget.attributes["sub-category"].value);
        location.href = constant.variable.Path.FilterPath;
    });
}
export function maskMoney(attribute) {
    var result = $(attribute).toArray()
    result.forEach(function (item) {
        var value = item.innerText.trim().split("").reverse();
        var new_value = [];
        var counter = 1;
        value.forEach(element => {
            if (counter % 4 == 0) {
                new_value.push(",");
            }
            new_value.push(element);
            counter++;
        })
        item.innerText = new_value.reverse().join("");
    })
}


export function Search() {
    $("#search-button").click(e => {
        if ($("#search-text").val()) {
            e.preventDefault();
            sessionStorage.setItem(constant.variable.FilterationSessionStoragekey.searchword, $("#search-text").val());
            location.href = "../Filter.html"
        }
    })

}

export function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        return true
    else
        return false
}


export function ValidateRegister() {
    let validate = true;
    $(".fullname-error").css("visibility", "hidden");
    $(".email-error").hide();
    $(".code-error").css("visibility", "hidden");
    $(".password-error").css("visibility", "hidden");
    $(".confirmpassword-error").css("visibility", "hidden");
    $(".condition-error").css("visibility", "hidden");
    $(".phone-error").css("visibility", "hidden");

    if (!$(".fullname").val()) {
        $(".fullname-error").text("Enter Full Name");
        $(".fullname-error").css("visibility", "visible");
        validate = false;
    } else if ($(".fullname").val().length < 3) {
        $(".fullname-error").text("Full Name must be greater than 3 letter");
        $(".fullname-error").css("visibility", "visible");
        validate = false;
    }

    if (!$(".email-value").val() && !ValidateEmail($(".email-value").val())) {
        $(".email-error").text("Enter Correct And Valid Email");
        $(".email-error").show();
        validate = false;
    }

    if (!$(".code").val()) {
        $(".code-error").text("Enter Verification Code");
        $(".code-error").css("visibility", "visible");
        validate = false;
    }

    if (!$(".phone-value").val()) {
        $(".phone-error").text("Enter Phone Number");
        $(".phone-error").css("visibility", "visible");
        validate = false;
    }

    if (!$(".password").val()) {
        $(".password-error").text("Enter password");
        $(".password-error").css("visibility", "visible");
        validate = false;
    } else if ($(".password").val().length < 6) {
        $(".password-error").text("Password must be greater than 6 character");
        $(".password-error").css("visibility", "visible");
        validate = false;

    }

    if (!$(".confirmpassword").val()) {
        $(".confirmpassword-error").text("Enter confirm password");
        $(".confirmpassword-error").css("visibility", "visible");
        validate = false;
    }

    if ($(".confirmpassword").val() !== $(".password").val()) {
        if ($(".password").val()) {
            $(".confirmpassword-error").text("Confirm Password must match Password");
            $(".confirmpassword-error").css("visibility", "visible");
        } else {
            $(".password-error").text("Confirm Password must match Password");
            $(".password-error").css("visibility", "visible");
        }

        validate = false;
    }

    if ($(".condition").is(':checked') == false) {
        $(".condition-error").text("you have to agree on Term And Condition");
        $(".condition-error").css("visibility", "visible");
        validate = false;
    }

    return validate;
}

(function accountdropdown() {
    if (Cookies.get(constant.cookies.Authentication)) {
        $(".account-dropdown").html(`<li><a href="account.html">My Account</a></li><li><a href="password.html">Change Password</a></li>`);
    }
}());

export function validateChangePasswod() {
    let validate = true;
    if (!$(".old-password").val()) {
        $(".old-password-error").text("Enter old password");
        $(".old-password-error").css("visibility", "visible");
        validate = false;
    }

    if (!$(".new-password").val()) {
        $(".new-password-error").text("Enter new password");
        $(".new-password-error").css("visibility", "visible");
        validate = false;
    } else if ($(".new-password").val().length < 6) {
        $(".new-password-error").text("new Password must be greater than 6 character");
        $(".new-password-error").css("visibility", "visible");
        validate = false;
    }

    if (!$(".confirmpassword").val()) {
        $(".confirmpassword-error").text("Enter confirm password");
        $(".confirmpassword-error").css("visibility", "visible");
        validate = false;
    }

    if ($(".confirmpassword").val() !== $(".new-password").val()) {
        if ($(".new-password").val()) {
            $(".confirmpassword-error").text("Confirm Password must match new Password");
            $(".confirmpassword-error").css("visibility", "visible");
        } else {
            $(".new-password-error").text("Confirm Password must match new Password");
            $(".new-password-error").css("visibility", "visible");
        }
        validate = false;
    }
    return validate;

}