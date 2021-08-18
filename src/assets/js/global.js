'use strict';

const loadTime = 1000;

const global = {
    init: function init()
    {
        global.fancybox.init();
        global.placeholder.init();
        global.phone.init();
        global.file.init();
        global.cvv.init();
        global.creditcard.init();
        global.textOnly.init();
        global.style.init();
        global.link.init();
        global.keyup.init();
        global.collapse.init();
        global.googleMap.init();
        global.preloader.init();
        global.scroll.init();          
        global.equalize.init();
        global.lazyload.init();
        global.select.init();
    },
    fancybox:{
        init: function init()
        {
            $(".fancybox").fancybox();
        }
    },
    cvv:{
        init: function init(){
            if(isset($('[type="cvv"]'))){
                $('[type="cvv"]').inputmask("999");
            }
            $('[type="cvv"]').on("focus click", function(){
                $(this).caretpos(0);
            });
        }
    },
    creditcard:{
        init: function init(){
            if(isset($('[type="creditcard"]'))){
                $('[type="creditcard"]').inputmask("9999 9999 9999 9999");
            }
            $('[type="creditcard"]').on("keyup", function(){
                $(this).attr("data-company", global.val.cardNumberCompany($(this).val()));
            });
            $('[type="creditcard"]').on("focus click", function(){
                $(this).caretpos(0);
            });
        }
    },
    placeholder:{
        init: function init()
        {
            if(isset($('[data-placeholder]'))){
                $("[data-placeholder]").each(function(){
                    var placeholder = $(this).data("placeholder");
                    $(this).attr("placeholder", placeholder);
                });
                $("[data-placeholder]").on("focus", function(){
                    $(this).attr("placeholder", "");
                });
                $("[data-placeholder]").on("blur", function(){
                    var placeholder = $(this).data("placeholder");
                    $(this).attr("placeholder", placeholder);
                });
                $('[data-placeholder]').placeholder();
            }
        }
    },
    file: {
        init: function init(){
            $('.fileInput input').on("change", function(event){
                if(event.target.files.length > 0){
                    let filename = event.target.files[0].name;
                    $(this).parents('.fileInput').find('.filename').text(filename);
                }else{
                    $(this).parents('.fileInput').find('.filename').text($(this).data("empty"));
                }                
            });
        }
    },
    phone:{
        init: function init()
        {
            if(isset($('[type="phone"]'))){
                $('[type="phone"]').on("keypress keyup", function(event){
                    if(event.which != 8 && isNaN(String.fromCharCode(event.which)) || $(this).val().length>16){
                        event.preventDefault();
                    }
                });
                $('[type="phone"]').attr("pattern", '\d{16}');
                $('[type="phone"]').attr("maxlength", "16");
                $('[type="phone"]').inputmask("0 (999) 999-9999");
                $('[type="phone"]').on("focus click", function(){
                    $(this).caretpos(3);
                });
            }
        }
    },
    textOnly:{
        init: function init()
        {
            $(".textOnly").on("keypress keyup", function(evt){
                var charCode = (evt.which) ? evt.which : event.keyCode;
                if (((charCode <= 93 && charCode >= 65) || (charCode <= 122 && charCode >= 97) || charCode == 8) || charCode == 350 || charCode == 351 || charCode == 32 || charCode == 304 || charCode == 286 || charCode == 287 || charCode == 231 || charCode == 199 || charCode == 305 || charCode == 214 || charCode == 246 || charCode == 220 || charCode == 252) {
                    return true;
                }
                return false;
            });
        }
    },
    style:{
        init: function init()
        {
            if(isset($('[data-style]'))){
                $('[data-style]').each(function(){
                    $(this).attr("style", $(this).data("style"));
                });
            }
        }
    },
    link:{
        init: function init()
        {
            if(isset($('[data-link]'))){
                $('[data-link]').each(function(){
                    $(this).css("cursor", "pointer");
                });
                $('[data-link]').on("click", function(){
                    window.location.href = $(this).data("link");
                });
            }
        }
    },
    keyup:{
        init: function init()
        {
            $("input,textarea").keyup(function(){
                var _this = $(this),
                    type = _this.attr("type"),
                    val = _this.val(),
                    valLen = val.length;
                if(valLen<3){
                    _this.addClass("formError");
                }else{
                    if(type == "text"){
                        global.val.text(val)?_this.removeClass("formError"):_this.addClass("formError");
                    }else if(type == "phone"){
                        global.val.tel(val)?_this.removeClass("formError"):_this.addClass("formError");
                    }else if(type == "creditcard"){
                        global.val.cardNumber(val)?_this.removeClass("formError"):_this.addClass("formError");
                    }else if(type == "cvv"){
                        global.val.cvv(val)?_this.removeClass("formError"):_this.addClass("formError");
                    }else if(type == "email"){
                        global.val.mail(val)?_this.removeClass("formError"):_this.addClass("formError");
                        global.val.clear(_this);
                    }else{
                        global.val.text(val)?_this.removeClass("formError"):_this.addClass("formError");
                    }
                }
            }).blur(function(){
                $(".landscapeMobile").addClass("isMobile");
            }).focus(function(){
                $(".landscapeMobile").removeClass("isMobile");
            });
        }
    },
    collapse:{
        init: function init()
        {
            $('.collapse').on('show.bs.collapse', function () {
                $(this).siblings('.panel-heading').addClass('active');
                $(this).parents('.accordion').find('.collapse').collapse('hide');
            });
            $('.collapse').on('hide.bs.collapse', function () {
                $(this).siblings('.panel-heading').removeClass('active');
            });
        }
    },
    googleMap:{
        init:function init()
        {
            $("[data-map]").each(function(i){
                var _this = $(this),
                    lat = _this.data("lat"),
                    lng = _this.data("lng"),
                    marker = _this.data("marker"),
                    zoom = _this.data("zoom")?_this.data("zoom"):15,
                    div = "googleMap"+ (i+1) +"";
                    
                _this.attr("id", div);
                google.maps.event.addDomListener(window, 'load', global.googleMap.load(lat, lng, div, marker, zoom));
            });
        },
        load: function load(lat, lng, div, marker, zoom)
        {
            var mapOptions = {
                zoom: zoom,
                disableDefaultUI: true,
                center: new google.maps.LatLng(lat, lng, 0)
            };
            var mapElement = document.getElementById(div);
            var map = new google.maps.Map(mapElement, mapOptions);
            var markerImage = {
                url: marker,
                anchor: new google.maps.Point(50, 50)
            };
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng, 0),
                animation: google.maps.Animation.BOUNCE,
                title: "",
                map : map,
                icon: markerImage
            });
        }
    },
    preloader: {
        init: function init() {
            if (!$.cookie("preloader") || isset($("#home"))) {
                window.onload = global.page.load();
                $.cookie("preloader", true);
            } else {
                $(".preloader").remove();
                global.page.load();
            }
        }
    },        
    scroll: {
        init: function init() {
            let lastScrollTop = 0;
            $(window).on("load resize scroll", function () {
                if ($(this).scrollTop() > $("header").outerHeight()) {
                    let st = $(this).scrollTop();
                    if (st > lastScrollTop) {
                        $("header").addClass("topUp");
                    } else {
                        $("header").removeClass("topUp");
                    }
                    lastScrollTop = st;
                }
                if ($(this).scrollTop() > $("header").outerHeight()) {
                    $("header").addClass("active");
                } else {
                    $("header").removeClass("active");
                }
            });
        }
    },
    equalize: {
        init: function init() {
            if(!isset($("[data-equalize-row] [data-lazyload]"))){
                $("[data-equalize-row]").equalize({
                    selector: "[data-equalize-item]"
                });
            }
        }
    },
    lazyload: {
        init: function(){
            $('[data-lazyload]').lazyload();
        }
    },
    select: {
        init: function(){
            $('[data-niceselect]').niceSelect();
            $('[data-niceselect]').on("click", function(){
                $(this).parent().addClass("openSelect");
            }).on("blur", function(){
                $(this).parent().removeClass("openSelect");
            });
            $(document).on("click", ".nice-select .option", function(){
                $('[data-niceselect]').parent().removeClass("openSelect");
            });
            if(isset($("[data-fselect]"))){
                $("[data-fselect]").each(function(){
                    $(this).fSelect();
                });
            }
        }
    },
    page:{
        load: function load()
        {
            if (isset($(".preloader"))) {                
                setTimeout(function(){ 
                    $(".preloader").addClass("hidden");
                    if(global.queryString()["go"]){
                        $('html,body').animate({
                            scrollTop: $(global.queryString()["go"]).offset().top - $("header").outerHeight()},
                        'slow');
                    }
                }, loadTime);
            }
            setTimeout(function(){
                app.pageLoad.init();
            }, isset($(".preloader")) ? (loadTime + 500) : (loadTime - 1000));
        }
    },
    val:{
        mail: function mail(text)
        {
            var rgx = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
            return rgx.test(text);
        },
        name: function name(text)
        {
            var rgx = /^[a-zA-Z\ş\ç\ö\ğ\ü\ı\Ş\Ç\Ö\Ğ\Ü\İ ]+$/gmi;
            return rgx.test(text);
        },
        tel: function tel(text)
        {
            var rgx = /[0-9-()+]{3,20}/m;
            return rgx.test(text);
        },
        text: function text(text)
        {
            return text.length>2;
        },
        clear: function clear(text)
        {
            var c={"Ç":"c","Ö":"o","Ş":"s","İ":"i","I":"i","Ü":"u","Ğ":"g","ç":"c","ö":"o","ş":"s","ı":"i","ü":"u","ğ":"g"};
            var s = text.val();
            var a = s.split('');
            for (var i = 0, l = a.length; i < l; i++) {
                a[i] = c[a[i]] || a[i];
            }
            s = a.join('');
            var r = s.replace(" ", "").toLowerCase();
            text.val(r);
        },
        cardNumber: function cardNumber(value){
            if (/[^0-9-\s]+/.test(value)) return false;
            let nCheck = 0, bEven = false;
            value = value.replace(/\D/g, "");
            for (var n = value.length - 1; n >= 0; n--) {
                var cDigit = value.charAt(n),
                    nDigit = parseInt(cDigit, 10);
                if (bEven && (nDigit *= 2) > 9) nDigit -= 9;
                nCheck += nDigit;
                bEven = !bEven;
            }
            return (nCheck % 10) == 0;
        },
        cvv: function cvv(value){
            return value.replace('_', '').length === 3;
        },
        cardNumberCompany: function cardNumberCompany(val) {
            val = val.replaceAll(' ', '');
            for (let index = val.length; index < 16; index++) {
                val += "0";
            }
            if (/^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/.test(val)) {
                return "discover";
            } else if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(val)) {
                return "mastercard";
            } else if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(val)) {
                return "visa";
            } else if (/^3[47][0-9]{13}$/.test(val)) {
                return "amex";
            }
        }
    },
    keyEvent:{
        enter: function enter(func){            
            $(document).keyup(function(event){
                if(event.keyCode == 13){
                    if (typeof (func) == 'function') {
                        func(event)
                    }
                }
            });
        },
        space: function enter(func){            
            $(document).keyup(function(event){
                if(event.keyCode == 32){
                    if (typeof (func) == 'function') {
                        func(event)
                    }
                }
            });
        },
        escape: function enter(func){            
            $(document).keyup(function(event){
                if(event.keyCode == 27){
                    if (typeof (func) == 'function') {
                        func(event)
                    }
                }
            });
        },
        copy: function enter(func){            
            $(document).keyup(function(event){
                if(event.keyCode == 67 && event.ctrlKey == true){
                    if (typeof (func) == 'function') {
                        func(event)
                    }
                }
            });
        },
        cut: function enter(func){            
            $(document).keyup(function(event){
                if(event.keyCode == 88 && event.ctrlKey == true){
                    if (typeof (func) == 'function') {
                        func(event)
                    }
                }
            });
        },
        paste: function enter(func){            
            $(document).keyup(function(event){
                if(event.keyCode == 86 && event.ctrlKey == true){
                    if (typeof (func) == 'function') {
                        func(event)
                    }
                }
            });
        }
    },
    rand: function rand(x)
    {
        var rand = Math.random().toString().substr(2, x);
        return parseInt(rand);
    },
    queryString: function queryString()
    {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    stBottom: function stBottom()
    {
        $('html,body').on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
            $('html,body').stop();
        });
        $('html,body').animate({ scrollTop: $(window).height() }, 'slow', function(){
            $('html,body').off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
        });
    },
    stTop: function stTop()
    {
        var verticalOffset = typeof (verticalOffset) !== 'undefined' ? verticalOffset : 0,
            element = $('body'),
            offset = element.offset(),
            offsetTop = offset.top;
        $('html,body').on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
            $('html,body').stop();
        });
        $('html,body').animate({ scrollTop: offsetTop - $("header").outerHeight() }, 'slow', function(){
            $('html,body').off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
        });
    },
    stDiv: function stDiv(element)
    {
        setTimeout(function(){
            $('html,body').on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
                $('html,body').stop();
            });
            $('html,body').animate({ scrollTop: (element.offset().top - $("header").outerHeight()) }, 'slow', function(){
                $('html,body').off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
            });
        }, 300);
    },    
    owlIndex: function owlIndex(e){
        let loop = e.relatedTarget.settings.loop;
        if (e.item) {
          if (loop) {
            let index = e.item.index - 1;
            let count = e.item.count;
            if (index > count) {
              index -= count;
            }
            if (index <= 0) {
              index += count;
            }
            return index - 1;
          } else {
            return e.item.index;
          }
        }
    }
}

function isset(e){return e.length>0}

global.init();