// Skills Arrow Button using GSAP
(function(){
  const skillContainer = document.querySelector(".skill-card-container");
  
  if (skillContainer) { // Run script only if skillContainer exists
  const skillArrowL = document.querySelector(".btn-skill.btn-arrow-left"),
        skillArrowR = document.querySelector(".btn-skill.btn-arrow-right"),
        setArrow = function(LR, alpha) {TweenMax.set(LR, {autoAlpha:alpha});},
        showArrow = function(LR, alpha) {TweenMax.to(LR, .1, {autoAlpha:alpha});};

      
  let   mediaMed = window.matchMedia("(min-width: 768px)").matches, // These should match the media queries in Sass
        mediaWide = window.matchMedia("(min-width: 1200px)").matches,
        containerWidth = skillContainer.scrollWidth,
        viewportWidth = document.documentElement.clientWidth,
        maxAmount = containerWidth - viewportWidth,
        scrollAmount = 0, // 0 Starting value, will be updated on scroll or click
        skillCard = document.querySelector(".skill-card").offsetWidth,
        scrollStep = (mediaWide) ? (skillCard * 3 + 144) // 3 = number of whole cards displayed, 144 = 3 grid gaps
                   : (mediaMed) ? (skillCard * 2 + 96) // 2 = number of whole cards displayed, 96 = 2 grid gaps
                   : (skillCard + (viewportWidth / 20)), // viewportWidth / 20 = 5% grid gap
        scrollSpeed = .5, 
        ticking = false,
        onresize = function(e) {
          let mediaMed = window.matchMedia("(min-width: 768px)").matches, // Update when window size changes
              mediaWide = window.matchMedia("(min-width: 1200px)").matches,
              newContainerWidth = skillContainer.scrollWidth,
              newViewportWidth = document.documentElement.clientWidth,
              newSkillCard = document.querySelector(".skill-card").offsetWidth;
              
          maxAmount = newContainerWidth - newViewportWidth;
          
          (mediaWide) ? (scrollStep = newSkillCard * 3 + 144) // 3 = number of whole cards displayed, 144 = 3 grid gaps
          : (mediaMed) ? (scrollStep = newSkillCard * 2 + 96) // 2 = number of whole cards displayed, 96 = 2 grid gaps
          : (scrollStep = newSkillCard + (newViewportWidth / 20)) // viewportWidth / 20 = 5% grid gap

          if (!ticking) {
            window.requestAnimationFrame(function() { 
              (newContainerWidth <= newViewportWidth) ? showArrow(skillArrowR, 0) : showArrow(skillArrowR, 1);
              // console.log(scrollStep);
              ticking = false;
            });
              ticking = true;
          }
        },
        onscroll = function(e) {
          newAmount = skillContainer.scrollLeft;
          scrollAmount = newAmount;

          if (!ticking) {
            window.requestAnimationFrame(function() {
              (scrollAmount < maxAmount) ? showArrow(skillArrowR, 1) : showArrow(skillArrowR, 0);
              (scrollAmount == "0") ? showArrow(skillArrowL, 0) : showArrow(skillArrowL, 1);
              // console.log(scrollAmount);
              ticking = false;
            });
              ticking = true;
          }
        };

        skillContainer.addEventListener("scroll", onscroll); // Check which arrows are needed when user scrolls
        
        window.addEventListener("resize", onresize); // Check if arrows are needed if window is resized
        
        setArrow(skillArrowL, 0); //Always start with Left Arrow hidden
        (containerWidth <= viewportWidth) ? setArrow(skillArrowR, 0) : setArrow(skillArrowR, 1); // Check widths and hide Right Arrow if needed

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
  }
})();