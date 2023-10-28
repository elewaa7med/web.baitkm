import { constant, Model } from './constant.js?ver=3.8.1';
import { getAnnouncementDetailsById,getSimilarAnnouncement,SubscribeAnnouncement,getAnnouncement, AddGuest} from './api.js?ver=3.8.1';
import { AnnouncementType,AnnouncementRentDurationType,AnnouncementEstateType,headerLink,
        AnnouncementConstructionStatus,AnnouncementFurnishingStatus,AnnouncementOwnerShip,
        SetAnouncementDataToHtml,getEnumObject,maskMoney,Search ,checkCookiesValueForOtherPage} from './general.js?ver=3.8.1';

$(function() {
    checkCookiesValueForOtherPage();
    headerLink();
    Search();
    if (location.search) {
        var announcementId = location.search.split("=")[1];
        GetAnnouncementDetails(announcementId);
        $(".SubscribeButton").click((event)=>{
            event.preventDefault();
            if($("#SubscribeEmail").val() && announcementId){
                SubscribeAnnouncement(announcementId,$("#SubscribeEmail").val());
                $("#SubscribeEmail").val("")
            }
        });
    } else {
        // No announcementId do action
    }
});

function GetAnnouncementDetails(announcementId) {
    $.when(getAnnouncementDetailsById(announcementId),getSimilarAnnouncement(announcementId),getAnnouncement(constant.variable.FilterationType.TopRatedAnnouncement),
    getAnnouncement(constant.variable.FilterationType.MostView))
        .then((announcementDetails,similarAnnouncement,TopRatedAnnouncemnt,mostViewAnnouncemnt) => {
            if (announcementDetails[0].messages[0].key == constant.resultStatus.Info.index) {
                console.log(announcementDetails[0].data);
                SetAnnouncementDetailsToHtml(announcementDetails[0].data);
            }
            if (similarAnnouncement[0].messages[0].key == constant.resultStatus.Info.index) {
                if(similarAnnouncement[0].data.data.length > 0){
                    AppendSimilarAnnouncemntDetails();
                    similarAnnouncement[0].data.data.forEach(function (similarAnnouncementItem) {
                        SetAnouncementDataToHtml(".similarAnnouncment", similarAnnouncementItem,"col-xl-6 col-sm-6 col-12");
                    });
                }
            }
            if (TopRatedAnnouncemnt[0].messages[0].key == constant.resultStatus.Info.index) {
                if(TopRatedAnnouncemnt[0].data.data.length > 0){
                    $(".ltn__top-rated-product-widget").show();
                    TopRatedAnnouncemnt[0].data.data.forEach(function (TopRatedAnnouncementItem) {
                        AppendTopRatedAnnouncemnt(TopRatedAnnouncementItem);
                    });
                }
            }
            if (mostViewAnnouncemnt[0].messages[0].key == constant.resultStatus.Info.index) {
                if(mostViewAnnouncemnt[0].data.data.length > 0){
                    mostViewAnnouncemnt[0].data.data.forEach(function (mostViewAnnouncemnt) {
                        SetAnouncementDataToHtml(".propular-properties", mostViewAnnouncemnt,"col-12",true);
                    });
                }
            }
            $("body").append(`
            <script src="./js/External/plugins.js"></script>
            <script src="./js/External/main.js"></script>`);
            
            $(".loader-container ").fadeOut();
            $(".body-wrapper").fadeIn();
            maskMoney('.currency');
        });
}


function SetAnnouncementDetailsToHtml(announcementDetails) {
    setAnnouncementCoverImage(announcementDetails.photos,announcementDetails.photo.photo)
    AppendPropertyMainDetials(announcementDetails);
    //Property Details
    AppendPropertyDetails(announcementDetails);

    AppendAnnouncerProfile(announcementDetails);
}
function setAnnouncementCoverImage(announcementDetailsphotos,mainPhoto){
    console.log(announcementDetailsphotos);
    if(announcementDetailsphotos.length > 2){
        if(mainPhoto){
            $(".announcement-cover").append(`
                <div class="col-lg-12">
                    <div class="ltn__img-slide-item-4">
                        <a href="`+mainPhoto+`" data-rel="lightcase:myCollection">
                            <img src="`+mainPhoto+`" alt="Image" style="width:926px;height:677px">
                        </a>
                    </div>
                </div>
            `)
        }
        announcementDetailsphotos.forEach(item=>{
                $(".announcement-cover").append(`
                    <div class="col-lg-12">
                        <div class="ltn__img-slide-item-4">
                            <a href="`+item.photo+`" data-rel="lightcase:myCollection">` +
                            (item.type == "video"?
                            `<video id="video" src="`+item.photo+`" type="video/mp4" style="width:926px;height:677px" controls></video>`
                            :`<img src="`+item.photo+`" alt="Image" style="width:926px;height:677px">`)
                            +`
                            </a>
                        </div>
                    </div>
                `);
        });
        
    }else if(announcementDetailsphotos.length > 0 && announcementDetailsphotos.length < 2 ){
        if(mainPhoto){
            $(".announcement-cover").append(`
                <div class="col-lg-12">
                    <div class="ltn__img-slide-item-4">
                        <a href="`+mainPhoto+`" data-rel="lightcase:myCollection">
                            <img src="`+mainPhoto+`" alt="Image" style="width:926px;height:677px">
                        </a>
                    </div>
                </div>
                    <div class="ltn__img-slide-item-4">
                        <a href="`+announcementDetailsphotos[0].photo+`" data-rel="lightcase:myCollection">` +
                        (announcementDetailsphotos[0].type == "video"?
                        `<video id="video" src="`+announcementDetailsphotos[0].photo+`" type="video/mp4" style="width:926px;height:677px" controls></video>`
                        :`<img src="`+announcementDetailsphotos[0].photo+`" alt="Image" style="width:926px;height:677px">`)
                        +`
                        </a>
                    </div>
                </div>
            `)
        }else{
            for(let counter = 0 ; counter < 2 ; counter++){
                $(".announcement-cover").append(`
                    <div class="col-lg-12">
                        <div class="ltn__img-slide-item-4">
                            <a href="`+announcementDetailsphotos[0].photo+`" data-rel="lightcase:myCollection">` +
                            (announcementDetailsphotos[0].type == "video"?
                            `<video id="video" src="`+announcementDetailsphotos[0].photo+`" type="video/mp4" style="width:926px;height:677px" controls></video>`
                            :`<img src="`+announcementDetailsphotos[0].photo+`" alt="Image" style="width:926px;height:677px">`)
                            +`
                            </a>
                        </div>
                    </div>
                `)
        }
        
        }
    }else{
        if(mainPhoto){
            $(".announcement-cover").append(`
                <div class="col-lg-12">
                    <div class="ltn__img-slide-item-4">
                        <a href="`+mainPhoto+`" data-rel="lightcase:myCollection">
                            <img src="`+mainPhoto+`" alt="Image" style="width:926px;height:677px">
                        </a>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="ltn__img-slide-item-4">
                        <a href="`+mainPhoto+`" data-rel="lightcase:myCollection">
                            <img src="`+mainPhoto+`" alt="Image" style="width:926px;height:677px">
                        </a>
                    </div>
                </div>
            `)
        }else{
            $(".announcement-cover").append(`
                <div class="col-lg-12">
                    <div class="ltn__img-slide-item-4">
                        <a href="../img/Announcement_Default_Image.jpg" data-rel="lightcase:myCollection">
                            <img src="../img/Announcement_Default_Image.jpg" alt="Image">
                        </a>
                    </div>
                </div> 
                <div class="col-lg-12">
                    <div class="ltn__img-slide-item-4">
                        <a href="../img/Announcement_Default_Image.jpg" data-rel="lightcase:myCollection">
                            <img src="../img/Announcement_Default_Image.jpg" alt="Image">
                        </a>
                    </div>
                </div>
            `)
        }
    }
    
}

function AppendPropertyMainDetials(announcementDetails){
    $(".announcement-details").append(
        `<h4 class="title-2 product-price text-Orange"> <span class="currency">`
    + announcementDetails.price + `</span> ` +
        (announcementDetails.announcementType == constant.AnnouncementType.Sale.index ?
            announcementDetails.currencyCode 
            : announcementDetails.currencyCode + '/' + AnnouncementRentDurationType(announcementDetails.announcementRentType)  )+
    `</h4>
    <h1>`
        +AnnouncementEstateType(announcementDetails.announcementEstateType, announcementDetails.announcementResidentialType, announcementDetails.commercialType, announcementDetails.landType)  
        + ` For ` 
        + AnnouncementType(announcementDetails.announcementType)+
    `</h1>
    <div class="ltn__blog-meta">
        <ul>

            <li class="ltn__blog-category">
                <a class="sale-badge" ` + (AnnouncementType(announcementDetails.announcementType) == "Sale" ? "bg-green---" : "bg-green") + ` >For ` + AnnouncementType(announcementDetails.announcementType) + `</a>
            </li>
            <li class="ltn__blog-date">
                <i class="far fa-calendar-alt"></i>Last Update Since: `+ Math.floor(getDifferenceInDays(new Date(announcementDetails.updateDate),new Date()))+`
            </li>
            <li class="ltn__blog-date">
                <i class="far fa-calendar-alt"></i>Refferal: `+announcementDetails.id+`
            </li>
            <li>
                <a><i class="fas fa-star"></i>`+announcementDetails.rating+`</a>
            </li>
        </ul>
    </div>
    ` 
    +(announcementDetails.address?
    `<label><span class="ltn__secondary-color"><i class="flaticon-pin"></i></span>
        `+announcementDetails.address+`
    </label>`:``)
    + (announcementDetails.description ? 
    `<p>` + announcementDetails.description + `</p>
    `:``));
}
function AppendPropertyDetails(announcementDetails){
    $(".announcement-details").append(
        `
        <h4 class="title-2">Property Detail</h4>
        <div class="property-detail-info-list section-bg-1 clearfix mb-60">
            <ul>
            `+
                (announcementDetails.bathroomCount > 0 ? `<li><label>Bathrooms:</label> <span>`+announcementDetails.bathroomCount+`</span></li>`:``)+
                (announcementDetails.bedroomCount >0 ? `<li><label>Bedroom count:</label> <span>`+announcementDetails.bedroomCount+`</span></li>`:``)+
                (announcementDetails.area>0 ? `<li><label>Area:</label> <span>`+announcementDetails.area+`</span></li>`:``)+
                (announcementDetails.sittingCount>0 ? `<li><label>Sitting count:</label> <span>`+announcementDetails.sittingCount+`</span></li>`:``)+
                (announcementDetails.floor>0 ? `<li><label>Floor:</label> <span>`+announcementDetails.floor+`</span></li>`:``)+
                (announcementDetails.constructionStatus>0 ? `<li><label>Construction status:</label> <span>`+AnnouncementConstructionStatus(announcementDetails.constructionStatus)+`</span></li>`:``)+
                (announcementDetails.furnishingStatus>0 ? `<li><label>Furnishing status:</label> <span>`+AnnouncementFurnishingStatus(announcementDetails.furnishingStatus)+`</span></li>`:``)+
                (announcementDetails.ownerShip>0 ? `<li><label>OwnerShip:</label> <span>`+AnnouncementOwnerShip(announcementDetails.ownerShip)+`</span></li>`:``)+
                (announcementDetails.numberOfAppartment > 0 ? `<li><label>Number of appartment:</label> <span>`+announcementDetails.numberOfAppartment+`</span></li>`:``)+
                (announcementDetails.numberOfShop > 0 ? `<li><label>Number of shop:</label> <span>`+announcementDetails.numberOfShop+`</span></li>`:``)+
                (announcementDetails.numberOfUnits > 0 ? `<li><label>Number of units:</label> <span>`+announcementDetails.numberOfUnits+`</span></li>`:``)+
                (announcementDetails.numberOfVilla > 0 ? `<li><label>Number of villa:</label> <span>`+announcementDetails.numberOfVilla+`</span></li>`:``)+
                (announcementDetails.numberOfWareHouse > 0 ? `<li><label>Number of wareHouse:</label> <span>`+announcementDetails.numberOfWareHouse+`</span></li>`:``)+
                (announcementDetails.streetWidth > 0 ? `<li><label>Street width:</label> <span>`+announcementDetails.streetWidth+`</span></li>`:``)+
                (announcementDetails.planNumber > 0 ? `<li><label>Plan number:</label> <span>`+announcementDetails.planNumber+`</span></li>`:``)+
                (announcementDetails.meterPrice != null ? `<li><label>Meter price:</label> <span>`+announcementDetails.meterPrice+`</span></li>`:``)+
                (announcementDetails.mediasCount > 0 ? `<li><label>Medias count:</label> <span>`+announcementDetails.mediasCount+`</span></li>`:``)+
                (announcementDetails.livingArea > 0 ? `<li><label>Living area:</label> <span>`+announcementDetails.livingArea+`</span></li>`:``)+
                (announcementDetails.landNumber > 0 ? `<li><label>Land number:</label> <span>`+announcementDetails.landNumber+`</span></li>`:``)+
                (announcementDetails.balconyArea > 0 ? `<li><label>Balcony area:</label> <span>`+announcementDetails.balconyArea+`</span></li>`:``)+

                (announcementDetails.buildingAge > 0 ? `<li><label>Building age:</label> <span>`+getEnumObject(constant.BuildingAge,announcementDetails.buildingAge).value+`</span></li>`:``)+
                (announcementDetails.facadeType !=null ? `<li><label>Facade type:</label> <span>`+getEnumObject(constant.FacadeType, announcementDetails.facadeType).value+`</span></li>`:``)+
                (announcementDetails.saleType != null ? `<li><label>Sale type:</label> <span>`+getEnumObject(constant.SaleType,announcementDetails.saleType).value+`</span></li>`:``)+

                (announcementDetails.fireSystem == true && announcementDetails.commercialType ? `<li><label>Fire system:</label> <span>`+announcementDetails.fireSystem ? "Yes": "No" +`</span></li>`:``)+
                (announcementDetails.laborResidence == true && announcementDetails.commercialType? `<li><label>Labor residence:</label> <span>`+announcementDetails.laborResidence ? "Yes": "No" +`</span></li>`:``)+
                (announcementDetails.officeSpace == true && announcementDetails.commercialType ? `<li><label>Office space:</label> <span>`+announcementDetails.officeSpace ? "Yes": "No" +`</span></li>`:``)+

            `
            </ul>
        </div>
        `
        +
        (announcementDetails.features.length > 0 ?
        `<h4 class="title-2">Features</h4>
        <div class="property-detail-feature-list clearfix mb-45">
            <ul class="Feature-list">

            </ul>
        </div>` : ``)
        +
        (announcementDetails.photos.length > 0 ?
        `   
        <h4 class="title-2">From Our Gallery</h4>
        <div class="ltn__property-details-gallery mb-30">
            <div class="row gallary-list">
               
            </div>
        </div>` : ``)
        +
        (announcementDetails.lat && announcementDetails.lng ?
        `
        <h4 class="title-2">Location</h4>
        
        <div class="property-details-google-map mb-60">
            <div id="map"></div>
        </div>
        ` 
        : ``)
        );

        if(announcementDetails.lat && announcementDetails.lng){
            $("body").append(`<script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCsKMeLK7OnIw21n4Eauhuvwz6jelimj2Q&callback=initMap&v=weekly"></script>`);
            window.initMap = initMap;
            function initMap() {
                // The location of Uluru
                const uluru = { lat: announcementDetails.lat, lng: announcementDetails.lng };
                // The map, centered at Uluru
                const map = new google.maps.Map(document.getElementById("map"), {
                  zoom: 20,
                  center: uluru,
                });
                // The marker, positioned at Uluru
                const marker = new google.maps.Marker({
                  position: uluru,
                  map: map,
                });
                
            }
        }
        FeatureList(announcementDetails.features)
        GallaryList(announcementDetails.photos)
}

function FeatureList(featuers){
    featuers.forEach((item)=>{
        var object = getEnumObject(constant.AnnouncementFeaturesType,item);
        $(".Feature-list").append(`
        <li>
            <div class="property-detail-feature-list-item">

                <img src="`+object.image+`" alt="Image" style="width:45px; height: auto" class="Padding-R-Icon">
                <div>
                    <h6>`+object.value+`</h6>

                </div>
            </div>

        </li>
    `)
    })
}

function GallaryList(photos){
    photos.forEach((item)=>{
        $(".gallary-list").append(`
            <div class="col-md-6">
                <a href="`+item.photo+`" data-rel="lightcase:myCollection">` +
                (item.type == "video"?
                `<video class="mb-30" id="video" src="`+item.photo+`" type="video/mp4" controls poster="`+item.photo+`" style="width:100%;height:270px"></video>`
                :`<img class="mb-30" src="`+item.photo+`" alt="Image">`)
                +`
                </a>
            </div>
        `);
    });
}

function AppendSimilarAnnouncemntDetails(){
    $(".announcement-details").append(
        `
            <h4 class="title-2"> Similar Announcements</h4>
            <div class="row similarAnnouncment">
            </div>
        `
    );
}


  
function AppendAnnouncerProfile(announcementDetails){
    $(".announcement-more-details").prepend(
        `
        <div class="widget ltn__author-widget">
            <div class="ltn__author-widget-inner text-center">
                <img src="`+announcementDetails.userProfilePhoto.photo+`" alt="Image">
                <h5>`+announcementDetails.userName+`</h5>
                `+
                (announcementDetails.realAgentCompanyName != null ? ` <h6>Agent</h6> <h5>` + announcementDetails.realAgentCompanyName +`</h5>` : ``)
                +`
                <div class="ltn__social-media">
                    <ul>`+ (announcementDetails.userPhone != null ? `<li><a href="tel:`+announcementDetails.userPhone+`" title="Phone"> <i class="fas fa-phone-alt fa-2xl"></i>  </a></li>`: `` )+ `
                    `+ (announcementDetails.whatsApp != null ? `<li><a href="https://wa.me/`+(announcementDetails.whatsAppCountryCode + announcementDetails.whatsApp)+`" title="Whats App"><i class="fab fa-whatsapp fa-2xl"></i></a></li>`: `` )+ `
                    `+ (announcementDetails.ownerEmail != null ? `<li><a href="mailto:`+announcementDetails.ownerEmail+`" title="Email"> <i class="fas fa-envelope fa-2xl"></i>  </a></li>`: `` )+ `
                    `+ (announcementDetails.ownerEmail != null ? `<li><a href="" title="Message"><i class="fas fa-comment fa-2xl"></i></a></li>`: `` )+ `
                        
                        
                        
                    </ul>
                </div>
            </div>
        </div>
        `
        );
}

var count = 0;
function AppendTopRatedAnnouncemnt(TopRatedAnnouncementItem){
    $(".topRatedList").append(`
        <li>
            <div class="top-rated-product-item clearfix">
                <div class="top-rated-product-img">
                <a href="../details.html?id=`+TopRatedAnnouncementItem.id+`"><img src="` + (TopRatedAnnouncementItem.photo.photo ? TopRatedAnnouncementItem.photo.photo : "../img/Announcement_Default_Image.jpg") + `" alt="#" width="100%"></a>
                </div>
                <div class="top-rated-product-info">
                    <div class="product-ratting">
                        <ul class="RatingStarsCount`+(count)+`">
                        </ul>
                    </div>
                    <h6><a href="../details.html?id=`+TopRatedAnnouncementItem.id+`">`
                    +AnnouncementEstateType(TopRatedAnnouncementItem.announcementEstateType, 
                        TopRatedAnnouncementItem.announcementResidentialType, 
                        TopRatedAnnouncementItem.commercialType, TopRatedAnnouncementItem.landType)  
                    + ` For ` 
                    + AnnouncementType(TopRatedAnnouncementItem.announcementType)+
                    ` </a></h6>
                    <div class="product-price">
                        <h4 class="title-2 product-price text-Orange"> <span class="currency">`
                        + TopRatedAnnouncementItem.price + `</span> ` +
                            (TopRatedAnnouncementItem.announcementType == constant.AnnouncementType.Sale.index ?
                                TopRatedAnnouncementItem.currencyCode 
                                : TopRatedAnnouncementItem.currencyCode + '/' + AnnouncementRentDurationType(TopRatedAnnouncementItem.announcementRentType)  )+
                        `</h4>
                    </div>
                </div>
            </div>
        </li>
    `
    );
    SetStarsRatingCount(count,TopRatedAnnouncementItem.rating)
    count++;
}
function SetStarsRatingCount(count,rating){
    for(let counter = 0 ; counter < rating; counter++){
        $(".RatingStarsCount"+count).append(
            `<li><a ><i class="fas fa-star"></i></a></li>`
        );
    }
}

function getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  }
  