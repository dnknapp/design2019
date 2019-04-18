// Toggle Nav Menu
(function(){
  const navButton = document.querySelector(".header-nav-button"),
        nav = document.querySelector("nav"),
        header = document.querySelector("header");

    navButton.addEventListener("click", function() {
      nav.classList.toggle("hide"),
      header.classList.toggle("header-nav-active");
    }, false);
})();

// Skills Arrow Buttons
// (function() {
//   const skillArrowL = document.querySelector(".btn-skill.btn-arrow-left"),
//         skillArrowR = document.querySelector(".btn-skill.btn-arrow-right"),
//         skillContainer = document.querySelector(".skill-card-container");

//     skillArrowR.addEventListener("click", function() {
//       sideScroll(skillContainer,"right",10,256,10);
//     }, false);

//     skillArrowL.addEventListener("click", function() {
//       sideScroll(skillContainer,"left",10,256,10);
//     }, false);

//     function sideScroll(element,direction,speed,distance,step){
//       scrollAmount = 0;
//       var slideTimer = setInterval(function(){
//           if(direction == 'left'){
//               element.scrollLeft -= step;
//           } else {
//               element.scrollLeft += step;
//           }
//           scrollAmount += step;
//           if(scrollAmount >= distance){
//               window.clearInterval(slideTimer);
//           }
//       }, speed);
//     }
// })();

// Skills Arrow Button using GSAP
(function(){
  const skillArrowL = document.querySelector(".btn-skill.btn-arrow-left"),
        skillArrowR = document.querySelector(".btn-skill.btn-arrow-right"),
        skillContainer = document.querySelector(".skill-card-container"),
        setArrow = function(LR, alpha) {TweenMax.set(LR, {autoAlpha:alpha});},
        showArrow = function(LR, alpha) {TweenMax.to(LR, .1, {autoAlpha:alpha});};

        
  let   scrollAmount = 0, // Starting value
        scrollStep = 300, // How many pixels we scroll on each click
        scrollSpeed = .3, 
        containerWidth = skillContainer.scrollWidth,
        viewportWidth = document.documentElement.clientWidth,
        maxAmount = containerWidth - viewportWidth,
        onresize = function(e) {
          let newContainerWidth = skillContainer.scrollWidth,
              newViewportWidth = document.documentElement.clientWidth;
              maxAmount = newContainerWidth - newViewportWidth;
              if (newContainerWidth <= newViewportWidth) {
                TweenMax.to(skillArrowR, .1, {autoAlpha:0});
              } else {
                TweenMax.to(skillArrowR, .1, {autoAlpha:1});
              }
              // console.log(maxAmount);
        },
        onscroll = function(e) {
          let scrollXPosition = 0,
              ticking = false;
              newScrollXPosition = skillContainer.scrollLeft;
              scrollXPosition = newScrollXPosition;

          // console.log(scrollXPosition);
          if (!ticking) {
            window.requestAnimationFrame(function() {
              // if (scrollXPosition < maxAmount) {
              //   TweenMax.to(skillArrowR, .1, {autoAlpha:1});
              // } else {
              //   TweenMax.to(skillArrowR, .1, {autoAlpha:0});
              // }

              // if (scrollXPosition == "0") {
              //   TweenMax.to(skillArrowL, .1, {autoAlpha:0});
              // } else {
              //   TweenMax.to(skillArrowL, .1, {autoAlpha:1});
              // }

              // (scrollXPosition < maxAmount) ? TweenMax.to(skillArrowR, .1, {autoAlpha:1}) : TweenMax.to(skillArrowR, .1, {autoAlpha:0});
              // (scrollXPosition == "0") ? TweenMax.to(skillArrowL, .1, {autoAlpha:0}) : TweenMax.to(skillArrowL, .1, {autoAlpha:1});
              
              (scrollXPosition < maxAmount) ? showArrow(skillArrowR, 1) : showArrow(skillArrowR, 0);
              (scrollXPosition == "0") ? showArrow(skillArrowL, 0) : showArrow(skillArrowL, 1);
              // console.log(scrollXPosition);
              ticking = false;
            });
              ticking = true;
          }
        };

        skillContainer.addEventListener("scroll", onscroll);
        
        window.addEventListener("resize", onresize);
        
        setArrow(skillArrowL, 0); //Always start with Left Arrow hidden
        (containerWidth <= viewportWidth) && setArrow(skillArrowR, 0); // Check widths and hide Right Arrow if needed


        // TweenMax.set(skillArrowL, {autoAlpha:0});
        // if (containerWidth <= viewportWidth) {
        //   TweenMax.set(skillArrowR, {autoAlpha:0});
        // } else {
        //   TweenMax.set(skillArrowR, {autoAlpha:1});
        // } 

        skillArrowR.addEventListener("click", function() {
          if (scrollAmount + scrollStep < maxAmount ) {
            let newAmount = scrollAmount + scrollStep;
                scrollAmount = newAmount;
          } else {
            scrollAmount = maxAmount;
          }
            TweenMax.to(skillContainer, scrollSpeed, {scrollTo:{x:scrollAmount}});
              // console.log(maxAmount, scrollAmount);
        }, false);

        skillArrowL.addEventListener("click", function() {
          if (scrollAmount - scrollStep > "0") {
            let newAmount = scrollAmount - scrollStep;
                scrollAmount = newAmount;
          } else {
            scrollAmount = 0;
          }
            TweenMax.to(skillContainer, scrollSpeed, {scrollTo:{x:scrollAmount}});
              // console.log(maxAmount, scrollAmount);
        }, false);
})();