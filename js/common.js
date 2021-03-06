// common script
$(document).ready(function() {
  preventDefaultAnchor();
  setGNB();
  setPopup();
  setScrollToTop();
  $('body.sub #sticky-menu > .nav-update').css({'display': 'none'});
});

$(window).on('scroll', function() {
  setStickyMenu();
})

window.addEventListener('wheel', function(e) {
  var delta = e.deltaY;
  // console.log(delta);
  if (delta > 0) {
    $('#header').addClass('scrollDown');
  } else {
    $('#header').removeClass('scrollDown');
  }
})

function setScrollToTop() {
  $('.scrollToTop > a').click(function(e){
    e.preventDefault();
    $('html').stop(true).animate({'scrollTop':'0'},500);
    $('#header').removeClass('scrollDown');
  });
}

function setPopup() {
  $('a.popup-btn').on('click', function(e) {
    // var target = e.target;
    // var parent = target.
    // console.log(target);
    $('body').addClass('no-scroll');
    if ($(this).parent().hasClass('search-btn') === true) {
      $('#search-popup').addClass('on');
      $('.layer-mask').addClass('on');
    } else if ($(this).parent().hasClass('menu-btn') === true) {
      $('#all-menu').addClass('on');
    } else if ($(this).parent().hasClass('fam-site') === true) {
      $('#fam-site-popup').addClass('on');
      $('.layer-mask').addClass('on');
    }
  });
  $('a.close').on('click', function() {
    if ($(this).hasClass('mobile')) {
      $('#gnb').removeClass('open');
      $('#gnb ul.gnb > li').removeClass('on');
      $('#gnb ul.gnb div.box').css({'height': '0px'});
    }
    $('#all-menu').removeClass('on');
    $('.layer-popup').removeClass('on');
    $('body').removeClass('no-scroll');
    $('.layer-mask').removeClass('on');
  });
}

function setGNB() {
  var timerIdFocus = '';

  $('#gnb ul.gnb > li > a').on('mouseenter focusin', function() {
    if ($(window).width() < 1024) return false;
    $('#gnb ul.gnb > li > a').removeClass('on');
    $(this).addClass('on');
    $('#header').addClass('white');
  });
  $('#header').on('mouseleave', function() {
    $('#gnb > ul > li > a').removeClass('on');
  });
  $('div.lang > a').on('focusin', function() {
    if ($(window).width() < 1024) return false;
    $('#gnb > ul > li > a').removeClass('on');                         
  });
  
  //????????? GNB
  $('#gnb ul.gnb > li > a').on('click', function(e) {
    var windowWidth = $(window).width();
    if (windowWidth < 1024 && $(this).parent().find('ul').length > 0) {
      e.preventDefault();
      // if ($(this).parent().hasClass('on') === true) {
      //  console.log(this)
      //   $(this).parent().removeClass('on');
      //   // $(this).next().css({'height': '0'});
      // }
      $('#gnb ul.gnb > li').removeClass('on');
      $(this).parent().addClass('on');
      var height = 0;
      $(this).next().find('> ul').each(function() {
        height = $(this).outerHeight(true);
        // console.log(height);
      });
      $(this).next().css({'height': height + 'px'});
      $(this).parent().siblings().each(function() {
        $(this).find('div.box').css({'height': '0px'});
      });
    }
  });
  
  $('#all-menu div.menu-list > ul > li > ul').css({'height': 0});
  
  $('#all-menu div.menu-list > ul > li > a').on('click', function(e) {
    e.preventDefault();
    $('#all-menu div.menu-list > ul > li > a').removeClass('open')
    $(this).addClass('open');
    $('#all-menu div.menu-list > ul > li > ul').css({'height': 0});
    $(this).next().removeAttr("style");
  }); 

  $('#header #util-area > div.lang > a').on('click', function() {
    $(this).addClass('open');
    $('#header #util-area ul.lang-menu > li > a').on('click', function() {
      var attr = $(this).parent().attr('data-menu');
      var $this = $('#header #util-area > div.lang > a');
      if (attr === 'kor') {
        $this.text('KOR');
      } else {
        $this.text('ENG');
      }
      $this.removeClass('open');
    })
  });
}


function setStickyMenu() {
  var scrollAmt = $(document).scrollTop();
  // console.log(scrollAmt);
  if (scrollAmt > 150) {
    $('#sticky-menu').css({'display': 'block'});
    // console.log('scrolled')
  } else {
    $('#sticky-menu').css({'display': 'none'});
    // console.log('no')
  }
}

function setActive(selector, amount, start, type, startValue, changeValue) {
  $(selector).each(function() {
    var $selector = $(this);
    var scrollAmt = $(document).scrollTop();
    var elTop = 0;
    var elBottom = $selector.offset().top + $selector.outerHeight();
    var isStartBottom = start;
    if (isStartBottom === true || isStartBottom === undefined) {
      elTop = $selector.offset().top - $(window).height();
    } else {
      elTop = $selector.offset().top;
    }
    var elActivate = amount;
    var valueChange = changeValue;
    var valueStart = startValue;
    var activeEnd = $selector.offset().top + 1000;
    var scaleAmt = (((scrollAmt - elTop) * valueChange) / (activeEnd - elTop)) + valueStart;
    console.log(scaleAmt);

    console.log(elTop + ' ~ ' + elBottom + ' : ' + scrollAmt);
    console.log((elTop + elActivate));

    var isScroll = type;
    if (isScroll === true) {
      if (scrollAmt < elTop) {
        $selector.css({'width': (100 - scaleAmt) + '%'});
      } else if (scrollAmt > activeEnd) {

      } else {

      }
    } else {
      if (scrollAmt < elTop + elActivate) {
        $selector.removeClass('on');
      } else {
        $selector.addClass('on');
      }
    }
  });
}


function preventDefaultAnchor() {
  $(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
  });
}




