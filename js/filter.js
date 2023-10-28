import { constant, Model } from './constant.js?ver=3.8.1';
import {
    SetAnouncementDataToHtml, iterateObjectAndAppendToHTML, AnnouncementType,
    AnnouncementEstateTypeValue, AnnouncementEstateType, headerLink, maskMoney, Search, checkCookiesValueForOtherPage
} from './general.js?ver=3.8.1';
import { getAnnouncement } from './api.js?ver=3.8.1';

var filterModel = Model.Filter;
$(function () {
    checkCookiesValueForOtherPage();
    Search();
    headerLink();

    let MainType = sessionStorage.getItem(constant.variable.FilterationSessionStoragekey.mainType);
    let MainCategory = sessionStorage.getItem(constant.variable.FilterationSessionStoragekey.mainCategory);
    let subCategory = sessionStorage.getItem(constant.variable.FilterationSessionStoragekey.subCategory);
    let CityId = sessionStorage.getItem(constant.variable.FilterationSessionStoragekey.city);
    let CityName = sessionStorage.getItem(constant.variable.FilterationSessionStoragekey.cityName);
    let sortingType = sessionStorage.getItem(constant.variable.FilterationSessionStoragekey.sortingType);
    let searchword = sessionStorage.getItem(constant.variable.FilterationSessionStoragekey.searchword);

    filterModel.Page = 1;
    filterModel.Count = 10;

    if (!searchword) {
        $(".page-filteration-data ul").append(
            '<li><span class="ltn__secondary-color"><i class="fas fa-home"></i></span> ' + AnnouncementType(MainType) + '</li>'
            + (MainCategory ? '<li>' + AnnouncementEstateTypeValue(MainCategory) + '</li>' : '')
            + (subCategory ? '<li>' + AnnouncementEstateType(MainCategory, subCategory, subCategory, subCategory) + '</li>' : '')
            + (CityName ? '<li>' + CityName + '</li>' : '')
        );


        filterModel.AnnouncementFilter.AnnouncementType = MainType;
        filterModel.AnnouncementFilter.AnnouncementEstateType = MainCategory;
        filterModel.AnnouncementFilter.CityId = CityId;
        filterModel.AnnouncementFilter.SortingType = sortingType;

        if (MainCategory == constant.AnnouncementEstateType.Commercial.index) {
            filterModel.AnnouncementFilter.CommercialType = subCategory;
        } else if (MainCategory == constant.AnnouncementEstateType.Residential.index) {
            filterModel.AnnouncementFilter.AnnouncementResidentialType = subCategory;
        } else if (MainCategory == constant.AnnouncementEstateType.Land.index) {
            filterModel.AnnouncementFilter.AnnouncementRentType = subCategory;
        }
    } else {
        $(".page-filteration-data ul").append(
            '<li><span class="ltn__secondary-color"><i class="fas fa-home"></i></span>  SearchFor </li>'
            + '<li>' + searchword + '</li>'
        );
        filterModel.AnnouncementFilter.Search = searchword;
    }

    FilteredAnnouncementFetch(filterModel, sortingType);
    $('select').niceSelect();

});

function FilteredAnnouncementFetch(filterModel, sortingType) {
    $(".loader-container ").fadeIn();
    clearFilterAnnouncementSection();
    $.when(getAnnouncement(constant.variable.FilterationType.IndexPageFilteration, filterModel))
        .then(function (FilterResult) {
            if (FilterResult.messages[0].key == constant.resultStatus.Info.index) {
                FilterResult.data.data.forEach(function (FilteredAnnouncement) {
                    SetAnouncementDataToHtml(".FilteredAnnouncement", FilteredAnnouncement);
                });
                setPagination(FilterResult.data.pageCount);
                PaginationNumberClick();
                if (FilterResult.data.data.length > 0) {
                    iterateObjectAndAppendToHTML(constant.SortingType, "#sorting-type", sortingType);
                    SortingTypeChange();
                    $('select').niceSelect("update");
                } else {
                    $(".FilteredAnnouncement").append("<p class='filter-no-data'>No Data To Show in This Selected Filteration</p>");
                }
                $(".FilteredAnnouncement").fadeIn();
                $(".showing-product-number span").text("Showing " + FilterResult.data.itemCount + " of " + FilterResult.data.mapAreaFilterCount + " results");
            }
            $(".loader-container ").fadeOut();
            maskMoney('.currency');
        });

}

function PaginationNumberClick() {
    $(".pageination li a").click((e) => {
        e.preventDefault();
        if (e.target.id != filterModel.Page) {
            StyleChangeOnClickPageNumber(e.target.id)
            filterModel.Page = e.target.id;
            FilteredAnnouncementFetch(filterModel);
        }
    });
    function StyleChangeOnClickPageNumber(id) {
        $(".pageination li").removeClass("active");
        $("#page-" + id).addClass("active");
    }
}



function setPagination(count) {
    if (count > 1) {
        $(".pageination").empty();
        $(".pageination").append(`
            <li ><a href="#"><i class="fas fa-angle-double-left"></i></a></li>
            <li class="left-after"><a href="#"><i class="fas fa-angle-double-right"></i></a></li>
            `);
        for (let counter = 1; counter <= count; counter++)
            $(".pageination .left-after").before(
                "<li  id='page-" + counter + "'class='" + (filterModel.Page == counter ? "active removable" : "removable") + "'><a id='" + counter + "' href='#'>" + counter + "</a></li>"
            );
    }
}

function SortingTypeChange() {
    $("#div-main-sorting-type .nice-select").change(() => {
        let SortingType = $("#div-main-sorting-type div.nice-select .selected").attr("data-value");
        if (SortingType != sessionStorage.getItem(constant.variable.FilterationSessionStoragekey.sortingType)) {
            sessionStorage.setItem(constant.variable.FilterationSessionStoragekey.sortingType, SortingType);
            filterModel.AnnouncementFilter.SortingType = SortingType;
            FilteredAnnouncementFetch(filterModel);
        }
    });
}
function clearFilterAnnouncementSection() {
    $(".FilteredAnnouncement").fadeOut();
    $(".FilteredAnnouncement").empty();
}