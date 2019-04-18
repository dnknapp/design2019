// Toggle Nav Menu
(function(){
  const navButton = document.querySelector(".header-nav-button"),
        nav = document.querySelector("nav"),
        header = document.querySelector("header"),
        navTl = new TimelineMax();
        // timeout = null;   

    TweenMax.set("ul>*", {autoAlpha:0, x: +50});
          
    navButton.addEventListener("click", function() {
        
        if (nav.classList.contains("hidden")) {
          // Show the Menu
          nav.classList.toggle("hidden");
          header.classList.toggle("header-nav-active");
          let tl = new TimelineMax();
          tl
            .to("header", .2, {backgroundColor:"#ddd"})  
            .staggerTo("ul>*", .4, {
              autoAlpha:1,
              x: 0,
              ease:Power1.easeInOut
              }, .02, .1);
        } else {
          // Hide and reset the menu
          let tl = new TimelineMax();
          tl
            .to("ul>*", .2, {autoAlpha:0})
            .to("header", .2, {backgroundColor:"transparent"})
            .set("ul>*", {x: +50});
            // .set("header", {backgroundColor:"transparent"});
            setTimeout(function() {
              nav.classList.toggle("hidden");
              header.classList.toggle("header-nav-active");
            }, 1000);
        }


        





    }, false);
})();