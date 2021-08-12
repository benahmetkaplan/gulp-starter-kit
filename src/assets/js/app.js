const app = {
    init: function init() {
        app.events.init();
        app.owl.init();
    },
    events:{
        init: function init(){
            /// events
        }
    },
    pageLoad: {
        init: function init(){
            AOS.init();
        }
    },
    owl: {
        init: function init() {
            app.owl.singleOwl();
        },
        singleOwl: function singleOwl() {
            if (isset($(".single-owl"))) {
                var $singleOwl = $('.single-owl');
                $singleOwl.each(function(){
                    var $this = $(this),
                    $singleOwlLength = $this.find(".item").length;
                    $this.owlCarousel({
                        items: 1,
                        slideBy: 1,
                        margin: 0,
                        nav: $singleOwlLength > 1,
                        touchDrag: $singleOwlLength > 1,
                        mouseDrag: $singleOwlLength > 1,
                        loop: $singleOwlLength > 1,
                        dragEndSpeed: 500,
                        dotsSpeed: 2000,
                        smartSpeed: 2000,
                        autoplaySpeed: 2000,
                        autoplay: $singleOwlLength > 1
                    });
                    if($singleOwlLength === 1){
                        $this.addClass("single");
                    }
                    if($singleOwlLength === 0){
                        $this.addClass("hidden");
                    }
                });
            }
        },
    }
};

app.init();