
export { constant, Model }

const constant = {
    variable: {
        Path:{
            FilterPath:"../Filter.html"
        },
        langEn: {
            index: 0,
            value: "En"
        },
        langAr: {
            index: 1,
            value: "Ar"
        },
        FilterationSessionStoragekey: {
            mainType: "MainType",
            mainCategory: "MainCategory",
            subCategory: "subCategory",
            city: "City",
            sortingType:"SortingType",
            searchword:"search-word"
        },
        FilterationType:{
            SaleAnnouncement : "SaleAnnouncementTop10",
            RentAnnouncement:"RentAnnouncementTop10",
            IndexPageFilteration:"IndexPageFilteration",
            TopRatedAnnouncement:"TopRated",
            MostView: "mostViewAnnouncemnt"
        }
    },
    Headers:{
        HeaderDefault:{
            'content-type': "application/json-patch+json"
        },
        HeaderGuest:{
            deviceId: new DeviceUUID().get(),
            deviceToken: btoa(Math.random() + navigator.userAgent + Date()),
            osType: 2,
            language: null,
            "content-type": "application/json; charset=utf-8"
        },
        HeaderAuthenticatedUser:{
            Authorization: "Bearer " + Cookies.get("authenticate"),
            'content-type': "application/json-patch+json"
        }
    },
    base: "https://api.baitkm.com/",
    GuestController: {
        addGuest: "api/Guest/AddGuest/",
        guestProfile: "api/Guest/GuestProfile/"
    },
    TokenController: {
        Token: "api/Token/Token/",
        SendKey:"api/Token/SendKey",
        Verify :"api/Token/Verify"
    },
    AnnnouncementController: {
        FeaturedList: "api/Announcement/FeaturedList/",
        AnnouncementFilter: "api/Announcement/AnnouncementFilter/",
        AnnouncementDetails: "api/Announcement/MyAnnouncementDetails/",
        SimilarAnnouncement :"api/Announcement/SimilarAnnouncement/"
    },
    CityController: {
        CityGetList: "api/City/GetList/",
    },
    SubscribeController:{
        Subscribe:"api/Subscribe/Subscribe/"
    },
    UserController:{
        Register:"api/User/Register",
        SendKeyForgotPassword: "/api/User/SendKeyForgotPassword",
        CheckForgotKey: "/api/User/CheckForgotKey",
        ForgotPassword: "/api/User/ForgotPassword",
        ChangePassword: "/api/User/ChangePassword",
        GetUserDetails : "/api/User/GetDetails",
        EditUser : "/api/User/Edit",
    },
    cookies: {
        Authentication: "authenticate",
        UserId: "UserId",
        date : "Date"
    },
    resultStatus: {
        Info: {
            index: 0,
            value: "Info"
        },
        Warning: {
            index: 1,
            value: "Warning"
        },
        Error: {
            index: 2,
            value: "Error"
        }
    },
    AnnouncementType:
    {
        Sale: {
            index: 0,
            value: "Sale"
        },
        Rent: {
            index: 1,
            value: "Rent"
        }
    },
    AnnouncementEstateType:
    {
        Residential: {
            index: 0,
            value: "Residential"
        },
        Commercial: {
            index: 1,
            value: "Commercial"
        },
        Land: {
            index: 2,
            value: "Land"
        }
    },
    AnnouncementStatus:
    {
        Pending: {
            index: 0,
            value: "Pending"
        },
        Accepted: {
            index: 1,
            value: "Accepted"
        },
        Rejected: {
            index: 2,
            value: "Rejected"
        },
        Hidden: {
            index: 3,
            value: "Hidden"
        },
        Expired: {
            index: 4,
            value: "Expired"
        },
        //InReview,
        Featured6: {
            index: 6,
            value: "Featured"
        }
    },
    AnnouncementResidentialType:
    {
        Building: {
            index: 0,
            value: "Building"
        },
        Apartment: {
            index: 1,
            value: "Apartment"
        },
        Villa: {
            index: 2,
            value: "Villa"
        },
        Duplex: {
            index: 3,
            value: "Duplex"
        },
        Compound: {
            index: 4,
            value: "Compound"
        },
        Chalet: {
            index: 5,
            value: "Chalet"
        },
        Tower: {
            index: 6,
            value: "Tower"
        },
        Studio: {
            index: 7,
            value: "Studio"
        },
        FarmHouse: {
            index: 8,
            value: "FarmHouse"
        },
    },
    AnnouncementCommercialType:
    {
        Showroom: {
            index: 0,
            value: "Showroom"
        },
        OfficeSpace: {
            index: 1,
            value: "OfficeSpace"
        },
        Shop: {
            index: 2,
            value: "Shop"
        },
        WereHouse: {
            index: 3,
            value: "WereHouse"
        }
    },
    AnnouncementLandType:
    {
        Agricultural: {
            index: 0,
            value: "Agricultural"
        },
        Industrial: {
            index: 1,
            value: "Industrial"
        },//check
        Commercial: {
            index: 2,
            value: "Commercial"
        },
        Residential: {
            index: 3,
            value: "Residential"
        }
    },
    AnnouncementRentType:
    {
        Daily: {
            index: 0,
            value: "Daily"
        },
        Weekly: {
            index: 1,
            value: "Weekly"
        },
        Monthly: {
            index: 2,
            value: "Monthly"
        },
        Yearly: {
            index: 3,
            value: "Yearly"
        }
    },
    AnnouncementNotificationType:
    {
        Approve: {
            index: 1,
            value: "Approve"
        },
        Reject: {
            index: 2,
            value: "Reject"
        },
        RejectReason: {
            index: 3,
            value: "RejectReason"
        },
        OtherReason: {
            index: 4,
            value: "OtherReason"
        },
        Available: {
            index: 5,
            value: "Available"
        },
        NewNotification: {
            index: 6,
            value: "NewNotification"
        }
    },
    AnnouncementFeaturesType:
    {
        Parking:            {index:0,value :"Parking Area",image:"./img/icons/feature/Parking.svg"},
        SharedGym:          {index:1,value :"Shared Gym",image:"./img/icons/feature/shared_gym.svg"},
        Garden:             {index:2,value :"Garden",image:"./img/icons/feature/Garden.svg"},
        PrivateSwimmingPool:{index:3,value :"Private Swimming Pool",image:"./img/icons/feature/private_pool.svg"},
        PlayGround:         {index:4,value :"Play Ground",image:"./img/icons/feature/PlayGround.svg"},
        PetsAllowed:        {index:5,value :"Pets Allowed",image:"./img/icons/feature/pets_allowed.svg"},
        Kitchen:            {index:6,value :"Kitchen",image:"./img/icons/feature/Kitchen_imageset.svg"},
        SharedSwimmingPool: {index:7,value :"Shared Swimming Pool",image:"./img/icons/feature/shared_pool.svg"},
        Security:           {index:8,value :"Security",image:"./img/icons/feature/Security.svg"},
        Balncony:           {index:9,value :"Balncony",image:"./img/icons/feature/balcony.svg"},
        PrivateGym:         {index:10,value :"PrivateGym",image:"./img/icons/feature/private_gym.svg"},
        Elevator:           {index:11,value :"Elevator",image:"./img/icons/feature/Elevator.svg"},
        AC:                 {index:12,value :"AC",image:"./img/icons/feature/AC.svg"},
        CentralAC:          {index:13,value :"Central AC",image:"./img/icons/feature/central_ac.svg"},
        LaundryRoom:        {index:14,value :"Laundry Room",image:"./img/icons/feature/laundry_room.svg"},
        DriverRoom:         {index:15,value :"Driver Room",image:"./img/icons/feature/drivers_room.svg"},
        DiningRoom:         {index:16,value :"Dining Room",image:"./img/icons/feature/dining_room.svg"},
        MaidRoom:           {index:17,value :"Maid Room",image:"./img/icons/feature/maid_room.svg"},
        CoffeeShops:        {index:18,value :"Coffee Shops",image:"./img/icons/feature/coffee_shop.svg"},
        Extension:          {index:19,value :"Extension",image:"./img/icons/feature/Extension.svg"},
        HeatingSystem:      {index:20,value :"Heating System",image:"./img/icons/feature/heating_systems.svg"},
        LivingRoom:         {index:21,value :"Living Room",image:"./img/icons/feature/living_room.svg"},
        BusShuttle:         {index:22,value :"Bus Shuttle",image:"./img/icons/feature/bus_shuttl3.svg"},
        KinderGarDen:       {index:23,value :"Kinder Garden",image:"./img/icons/feature/Garden.svg"},
        SuperMarket:        {index:24,value :"SuperMarket",image:"./img/icons/feature/SuperMarket.svg"},
        Singles:            {index:25,value :"Singles",image:"./img/icons/feature/single.svg"},
        Families:           {index:26,value :"Families",image:"./img/icons/feature/family.svg"}
    },

    AreaUnit:
    {
        SquareMeter: {
            index: 0,
            value: "Square m2"
        },
        SquareFut: {
            index: 1,
            value: "Square Foot"
        }
    },
    SortingType: {
        Featured: {
            index:0,
            value: "Sorting by Featured"
        },
        Newest: {
            index:1,
            value: "Sorting by Newest"
        },
        PriceLow:{
            index:2,
            value: "Sorting by PriceLow"
        },
        PriceHigh: {
            index:3,
            value: "Sorting by PriceHigh"
        },
        BedsLeast:{
            index:4,
            value: "Sorting by BedsLeast"
        },
        BedsMost: {
            index:5,
            value: "Sorting by BedsMost"
        },
        MostView:{
            index:6,
            value: "Sorting by MostView"
        }, 
        TopRated:{
            index:7,
            value: "Sorting by TopRated"
        }, 
    },
    FurnishingStatus:{
        Furnished:{
            index:0,
            value: "Furnished"
        },
        SemiFurnished:{
            index:1,
            value: "Semi-Furnished"
        },
        Unfurnished:{
            index:2,
            value : "Unfurnished"
        }
    },
    ConstructionStatus:{
        UnderConstruction:{
            index:0,
            value:"Under Construction"
        },
        ReadyToMove:{
            index:1,
            value:"Ready To Move"
        },
    },
    OwnerShip:{
        Freehold:{
            index:0,
            value:"Free hold"
        },
        RealAgent:{
            index:1,
            value:"Real Agent"
        }
    },
    FacadeType:
    {
        WaterFront: {
            index: 0,
            value: "Water Front"
        },
        North : {
            index: 1,
            value: "North"
        },
        East: {
            index: 2,
            value: "East"
        },
        West : {
            index: 3,
            value: "West"
        },
        NorthEast : {
            index: 4,
            value: "NorthEast"
        },
        SouthEast : {
            index: 5,
            value: "SouthEast"
        },
        SouthWest : {
            index: 6,
            value: "SouthWest"
        },
        FourStreets : {
            index: 7,
            value: "Four Streets"
        },
        ThreeStreets : {
            index: 8,
            value: "ThreeStreets"
        },
        TwoStreets : {
            index: 9,
            value: "TwoStreets"
        },
        Streets: {
            index: 10,
            value: "Streets"
        }
    },
    BuildingAge :
    {
        Age1: {
            index: 0,
            value: "0-1 Year"
        },
        Age2: {
            index: 1,
            value: "1-2 Year"
        },
        Age3: {
            index: 2,
            value: "2-5 Year"
        },
        Age4: {
            index: 3,
            value: "+5 Year"
        },
        // Age5: {
        //     index: 4,
        //     value: "Streets"
        // }
    },
    SaleType:
    {
        New:{
            index: 0,
            value: "New"
        },
        Resale:{
            index: 1,
            value: "Resale"
        },
        Both:{
            index: 2,
            value: "Both"
        }
    }
    
}

const Model = {
    Filter: {
        Count: null,
        Page: null,
        DateFrom: "2022-06-01T20:18:39.998Z",
        AnnouncementFilter: {
            AnnouncementType: null,
            SortingType: null,
            CityId: null,
            AnnouncementResidentialType: null,
            AnnouncementRentType: null,
            CommercialType: null,
            AnnouncementEstateType: null,
            Search:null
        }
    },
    Subscribe :{
        Email: null,
        AnnouncementId:0
    },
    SendKey:{
        PhoneCode: null,
        VerificationTerm: null,
      },
    Verify:{
        Code :null,
        VerificationTerm :null,
        PhoneCode:null,
    },
    Register:{
        FullName: null,
        PhoneEmail: null,
        PhoneCode: null,
        VerificationTerm: null,
        // DateOfBirth: null,
        // CityId: null,
        // CityName: null,
        // CountryId: null,
        // CountryName: null,
        Password: null,
        ConfirmPassword: null
      },
    ForgetPassword:{
        Password :null,
        ConfirmPassword :null,
        PhoneCode:null,
        VerificationTerm:null,
    },
    ChangePassword:{
        OldPassword :null,
        NewPassword :null,
        ConfirmPassword :null,
       
    },
    EditUser:{
        FullName: null,
        PhoneEmail: null,
        PhoneCode: null,
      }
}

