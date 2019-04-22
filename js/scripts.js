$(document).ready(function(){

    $('.select-city').select2({
        width: 'resolve'
     });

    ymaps.ready(init);

    $('.clients').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1461,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              dots: false
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true,
              arrows: false
            }
          }
        ]
      });
    
     $('.form-baner__input--tel').inputmask({
        "mask": "+7 (999) 999-99-99"
        , "placeholder": "_"
        , showMaskOnHover: false
        , showMaskOnFocus: true
    });


    $('.navigation__button').click(function(){
        $('#modal-form').modal('show');
    });
    $('.contacts__requisites').click(function(){
        $('#modal-requisites').modal('show');
    });

    $('.open-agreement').click(function(){
        $('#modal-agreement').modal('show');
    });
    
    
});

function init() {
    var myMap = new ymaps.Map("map", {
        center: [55.702954, 37.662628]
        , zoom: 16
        , controls: ['zoomControl']
    });

    var myMapTwo = new ymaps.Map("mapTwo", {
        center: [55.818860, 37.750162]
        , zoom: 16
        , controls: ['zoomControl']
    });
    myMapTwo.geoObjects.add(new ymaps.Placemark([55.818860, 37.750162], {
        clusterCaption: 'Заголовок'
    },{
        iconLayout: 'default#image'
        , iconImageHref: 'img/mark.png'
        , iconImageSize: [24, 32]
        , iconImageOffset: [-12, -32]
    }));

    myMap.behaviors.disable('multiTouch');
    myMap.behaviors.disable('scrollZoom');
    var myGeoObjects = [];
    var flag_for_center = true;

    $(".adresses-list__item").each(function (e) {
        var latt = $(this).find('.show_on_map').attr("data-lat");
        var longg = $(this).find('.show_on_map').attr("data-lon");
        if (flag_for_center) {
            myMap.setCenter([latt, longg], 16, {
                checkZoomRange: false
            });
            flag_for_center = false;
        }
        myGeoObjects[e] = new ymaps.Placemark([latt, longg], {
            clusterCaption: 'Заголовок'
        }, {
            iconLayout: 'default#image'
            , iconImageHref: 'img/mark.png'
            , iconImageSize: [24, 32]
            , iconImageOffset: [-12, -32]
        });
    });
    
    var clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: false
        , clusterOpenBalloonOnClick: false
        , clusterBalloonPanelMaxMapArea: 0
        , clusterBalloonContentLayoutWidth: 300
        , clusterBalloonContentLayoutHeight: 200
        , clusterBalloonPagerSize: 2
        , clusterBalloonPagerVisible: false
    });

    clusterer.add(myGeoObjects);
    myMap.geoObjects.add(clusterer);

    $('.show_on_map').click(function(){
        myMap.setCenter(
            [parseFloat($(this).attr("data-lat"))
                , parseFloat($(this).attr("data-lon"))], 16, {
                checkZoomRange: false
            });
            if($(window).width() <= 767){
                $('body, html').animate({
                    scrollTop: $('#map').offset().top
                }, 500);
            }
    });
}