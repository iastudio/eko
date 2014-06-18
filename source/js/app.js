
/////////////////
//    SLIDER   //
/////////////////

(function(){

    var sliderSpeed = 500;

    var slideCount = $('#slider-hero ul.slider__container li.slider__item').length;

    $('#slider-hero ul.slider__container li.slider__item').each(function(i, el){
        $(el).attr('data-index', i);
        $('#slider-hero .slider__dots').append('<div class="slider__dot"></div>');
    });
    $('#slider-hero .slider__dot:eq(0)').addClass('active');

    if ($('.slider__item').length > 0) {
        if ($('#slider-hero').attr('data-count') == undefined)
            $('#slider-hero').attr('data-count', 0);
        var count = parseInt($('#slider-hero').attr('data-count'));

        var slidesCount = $('#slider-hero .slider__item').size()-1;
    }

    $('#slider-hero .slider__nav').on('click', function(e) {
        e.preventDefault();
        if ($('#slider-hero .slider__item:animated').size()>0) return;
        
        var direction;
        $(this).hasClass('slider__nav--next') ? direction = 1 : direction = 0;

        if (direction == 0)
            (count == 0) ? count = slidesCount + 1 : count = count;
        else
            (count == slidesCount) ? count = - 1 : count = count;

        $('#slider-hero .slider__item.active').fadeOut(sliderSpeed, 'easeInOutQuad', function() {
            $(this).removeClass('active');
            (direction == 1) ? count++ : count--;
            $('#slider-hero .slider__item').eq(count).hide();
            $('#slider-hero .slider__item').eq(count).addClass('active');
            $('#slider-hero .slider__item').eq(count).fadeIn(sliderSpeed, 'easeInOutQuad');
            $('#slider-hero .slider__dot.active').removeClass('active');
            $('#slider-hero .slider__dot').eq(count).addClass('active');
            ///
            $('#slider-hero').attr('data-count', count);
        });
    });

})();

///////////
//  MAP  //
///////////

(function(){

    if (document.getElementById('map')) {
        ymaps.ready( function() {
            var myMap = new ymaps.Map('map', {
                    center: [43.114621, 131.909083],
                    zoom: 17,
                    controls: []
                }),
                myPlacemark = new ymaps.Placemark([43.114621, 131.909083], {
                    balloonContentHeader: "Эколюкс",
                    balloonContentBody: "г. Владивосток, ул Светланская 78б, оф 103",
                    balloonContentFooter: "8 (423) 277-66-22, 277-66-22",
                    hintContent: "Эколюкс"
                }, {
                    preset: "islands#dotCircleIcon",
                    iconColor: '#669a11'
                });
            myMap.geoObjects.add(myPlacemark);
        });
    }

})();


///////////////////
//  SPEC-SLIDER  //
///////////////////


(function(){

    var easing = "easeInOutSine";
    $('.specslider__nav').on( 'click', function( event ) {
        //debugger;
        var $this = $(this);
        var $inner = $this.parent().parent().find('.specslider__wrapper');
        var maxCount = $inner.find('.specslider__item').length-4;
        if ($inner.attr('data-count') == undefined)
            $inner.attr('data-count', 0);
        var count = parseInt($inner.attr('data-count'));
        var marg = parseInt($inner.css('margin-left'));
        var width = parseInt($inner.find('.specslider__item').css('width'));

        event.preventDefault();
        if ($inner.is(':animated')) {return;}
        
        if ( $this.hasClass("specslider__nav--prev") ) {
            if (count <= 0) {
                return;
            } else {
                marg = marg+width;
                count -= 1;
            }
        } else if (count < maxCount) {
            marg = marg-width;
            count += 1;
        }

        $inner.animate({
            marginLeft: marg+'px'
        }, {
          duration: 500,
          easing: easing
        });

        $inner.attr('data-count', count);
        
    });
})();


////////////////////////
//  PLACEHOLDERS FIX  //
////////////////////////

(function(){

    if ($.fn.placeholder.input && $.fn.placeholder.textarea) {
    } else if ($.fn.placeholder.input) {
        $('textarea').placeholder();
    } else {
        $('input, textarea').placeholder();
    }

})();

/////////////////////////
//  BROWSER DETECTION  //
/////////////////////////

var BrowserDetect = 
{
    init: function () 
    {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) ||       this.searchVersion(navigator.appVersion) || "Unknown";
    },

    searchString: function (data) 
    {
        for (var i=0 ; i < data.length ; i++)   
        {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) != -1)
            {
                return data[i].identity;
            }
        }
    },

    searchVersion: function (dataString) 
    {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },

    dataBrowser: 
    [
        { string: navigator.userAgent, subString: "Chrome",  identity: "Chrome" },
        { string: navigator.userAgent, subString: "MSIE",    identity: "Explorer" },
        { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
        { string: navigator.userAgent, subString: "Safari",  identity: "Safari" },
        { string: navigator.userAgent, subString: "Opera",   identity: "Opera" }
    ]

};

BrowserDetect.init();