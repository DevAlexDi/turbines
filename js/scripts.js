$(document).ready(function(){
   
    $("#to_top").click(function(){
        $("html, body").animate({scrollTop:0},500);
    });
    
    $(window).scroll(function(){
        if($(window).scrollTop() > 0){
            $('#to_top').addClass('showed');
        }
        else{
            $('#to_top').removeClass('showed');
        }
    });
    
    $('.menu__list__item--sub-menu').click(function(e){
        e.stopPropagation();
        if(!$(this).hasClass('opened')){
            $(this).addClass('opened');
        }
        else{
            $(this).removeClass('opened');
        }
        
    });
    $('body').click(function(){
        if($('.menu__list__item--sub-menu').hasClass('opened')){
            $('.menu__list__item--sub-menu').removeClass('opened');
        }
    });
    
    $('.see-more').click(function(){
        $('.price__left__list--hidden').addClass('showed');
        $(this).addClass('hide');
    });

    
     $('.tel-inp').inputmask({
        "mask": "+7 (999) 999-99-99"
        , "placeholder": "_"
        , showMaskOnHover: false
        , showMaskOnFocus: true
    });
});