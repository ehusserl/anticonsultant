/*
	FlexNav.js 1.3.3

	Created by Jason Weaver http://jasonweaver.name
	Released under http://unlicense.org/

//
*/


(function() {
  var $;

  $ = jQuery;

/*  FLEXNAV containing function */
  $.fn.flexNav = function(options) {
    var $nav, $top_nav_items, breakpoint, count, nav_percent, nav_width, resetMenu, resizer, settings, showMenu, toggle_selector, touch_selector;

/*  option settings  */
    settings = $.extend({
      'animationSpeed': 250,
      'transitionOpacity': true,
      'menuButtonSelector': '.menu-button',
      'submenuButtonSelector': '.submenu-button',
      'hoverIntent': false,
      'hoverIntentTimeout': 150,
      'calcItemWidths': false,
      'hover': true
    }, options);

/*   */
    $nav = $(this);
    $nav.addClass('with-js');
    if (settings.transitionOpacity === true) {
      $nav.addClass('opacity');
    }    
    $nav.find("li").each(function() {
      if ($(this).has("ul").length) {
        return $(this).addClass("item-with-ul").find("ul").hide();
      }
    });
    
 /*   */
    
    if (settings.calcItemWidths === true) {
      $top_nav_items = $nav.find('>li');
      count = $top_nav_items.length;
      nav_width = 100 / count;
      nav_percent = nav_width + "%";
    }
    if ($nav.data('breakpoint')) {
      breakpoint = $nav.data('breakpoint');
    }


/* SHOWMENU */
/*  show menus paying attention to settings.hover and .transitionOpacity   */
    showMenu = function() {
      if ($nav.hasClass('lg-screen') === true && settings.hover === true) {
        if (settings.transitionOpacity === true) {
          return $(this).find('>ul').addClass('flexnav-show').stop(true, true).animate({
            height: ["toggle", "swing"],
            opacity: "toggle"
          }, settings.animationSpeed);
        } else {
          return $(this).find('>ul').addClass('flexnav-show').stop(true, true).animate({
            height: ["toggle", "swing"]
          }, settings.animationSpeed);
        }
      }
    };


/*  RESETMENU  */
/*  reset menus paying attention to settings.hover and .transitionOpacity   */
    resetMenu = function() {
      if ($nav.hasClass('lg-screen') === true && $(this).find('>ul').hasClass('flexnav-show') === true && settings.hover === true) {
        if (settings.transitionOpacity === true) {
          return $(this).find('>ul').removeClass('flexnav-show').stop(true, true).animate({
            height: ["toggle", "swing"],
            opacity: "toggle"
          }, settings.animationSpeed);
        } else {
          return $(this).find('>ul').removeClass('flexnav-show').stop(true, true).animate({
            height: ["toggle", "swing"]
          }, settings.animationSpeed);
        }
      }
    };


/* RESIZER */
/* resize based on breakpoint stated in initial flexnav ul */
    resizer = function() {
      var selector;

 /*  resizer: smaller than (or equal to) breakpoint */

      if ($(window).width() <= breakpoint) {
        $nav.removeClass("lg-screen").addClass("sm-screen");
        if (settings.calcItemWidths === true) {
          $top_nav_items.css('width', '100%');
        }
/*        selector = settings['buttonSelector'] + ', ' + settings['buttonSelector'] + ' .touch-button'; */
        selector = settings['menuButtonSelector'] + ', ' + settings['menuButtonSelector'] + ' .touch-button';
        $(selector).removeClass('active');
        return $('.one-page li a').on('click', function() {
          return $nav.removeClass('flexnav-show');
        });

 /*  resizer: larger than breakpoint */

      } else if ($(window).width() > breakpoint) {
        $nav.removeClass("sm-screen").addClass("lg-screen");
        if (settings.calcItemWidths === true) {
          $top_nav_items.css('width', nav_percent);
        }
        $nav.removeClass('flexnav-show').find('.item-with-ul').on();
        $('.item-with-ul').find('ul').removeClass('flexnav-show');
        resetMenu();

 /* resizer: with hoverIntent, allow for hover to toggle menus */

        if (settings.hoverIntent === true) {
          return $('.item-with-ul').hoverIntent({
            over: showMenu,
            out: resetMenu,
            timeout: settings.hoverIntentTimeout
          });

 /*  resizer: without hoverIntent, require mousedown to open menu */

        } else if (settings.hoverIntent === false) {
          return $('.item-with-ul').on('mouseenter', showMenu).on('mouseleave', resetMenu);
        }
      }
    };


//  orig - button creator
//     $(settings['buttonSelector']).data('navEl', $nav);
//     touch_selector = '.item-with-ul, ' + settings['buttonSelector'];
//     $(touch_selector).append('<span class="touch-button"></span>');
// 	toggle_selector = settings['buttonSelector'] + ', ' + settings['buttonSelector'] + ' .touch-button';
//     $(toggle_selector).on('click', function(e) {
//       var $btnParent, $thisNav, bs;
//       $(toggle_selector).toggleClass('active');
//       e.preventDefault();
//       e.stopPropagation();
//       bs = settings['buttonSelector'];
//       $btnParent = $(this).is(bs) ? $(this) : $(this).parent(bs);
//       $thisNav = $btnParent.data('navEl');
//       return $thisNav.toggleClass('flexnav-show');
//     });

//  $(touch_selector).append('<span class="touch-button"><i class="fa fa-arrow-circle-down"></i></span>');

//  menu
    $(settings['menuButtonSelector']).data('navEl', $nav);
    touch_selector = '.item-with-ul, ' + settings['menuButtonSelector'];
//--> comment this out  $(touch_selector).append('<span class="touch-button"><i class="fa fa-arrow-circle-down"></i></span>');
	 $(touch_selector).append('<span class="touch-button"></span>');
//--> comment this out     $(touch_selector).append('<span class="touch-button fa-stack fa-lg"><i class="fa fa-square-o fa-stack-2x"></i><i class="fa fa-bars fa-stack-1x"></i></span>');
   toggle_selector = settings['menuButtonSelector'] + ', ' + settings['menuButtonSelector'] + ' .touch-button';
    $(toggle_selector).on('click', function(e) {
      var $btnParent, $thisNav, bs;
      $(toggle_selector).toggleClass('active');
      e.preventDefault();
      e.stopPropagation();
      bs = settings['menuButtonSelector'];
      $btnParent = $(this).is(bs) ? $(this) : $(this).parent(bs);
      $thisNav = $btnParent.data('navEl');
      return $thisNav.toggleClass('flexnav-show');
    });
// 
//  submenu
    $(settings['submenuButtonSelector']).data('navEl', $nav);
    touch_selector = '.item-with-ul, ' + settings['submenuButtonSelector'];
	$(touch_selector).append('<span class="touch-button"><i class="fa fa-arrow-circle-down fa-2x"></i></span>'); 
   toggle_selector = settings['submenuButtonSelector'] + ', ' + settings['submenuButtonSelector'] + ' .touch-button';
    $(toggle_selector).on('click', function(e) {
      var $btnParent, $thisNav, bs;
      $(toggle_selector).toggleClass('active');
      e.preventDefault();
      e.stopPropagation();
      bs = settings['submenuButtonSelector'];
      $btnParent = $(this).is(bs) ? $(this) : $(this).parent(bs);
      $thisNav = $btnParent.data('navEl');
      return $thisNav.toggleClass('flexnav-show');
    });


/*  xxxxxxxx */
    $('.touch-button').on('click', function(e) {
      var $sub, $touchButton;
      $sub = $(this).parent('.item-with-ul').find('>ul');
      $touchButton = $(this).parent('.item-with-ul').find('>span.touch-button');
      if ($nav.hasClass('lg-screen') === true) {
        $(this).parent('.item-with-ul').siblings().find('ul.flexnav-show').removeClass('flexnav-show').hide();
      }
      if ($sub.hasClass('flexnav-show') === true) {
        $sub.removeClass('flexnav-show').slideUp(settings.animationSpeed);
        return $touchButton.removeClass('active');
      } else if ($sub.hasClass('flexnav-show') === false) {
        $sub.addClass('flexnav-show').slideDown(settings.animationSpeed);
        return $touchButton.addClass('active');
      }
    });

/*  xxxxxxxx */
    $nav.find('.item-with-ul *').focus(function() {
      $(this).parent('.item-with-ul').parent().find(".open").not(this).removeClass("open").hide();
      return $(this).parent('.item-with-ul').find('>ul').addClass("open").show();
    });
    resizer();
    return $(window).on('resize', resizer);
  };
  

}).call(this);