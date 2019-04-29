// import "./hoverintent";
import skillScroll from "./skillscroll";
// import toggleNav from "./togglenav";
import { navTweenSet, openMenu, closeMenu, navButtonListener, navLinkListener, siteTitleListener } from "./togglenav";
import { transitions } from "./pagetransitions";
let options = {
  debugMode: false,
  elements: ['#swup', '.nav-replace'], // Nav reloads every time so that activePage in _macro-nav.njk updates
  doScrollingRightAway: false,
  animateScroll: false,
  animations: {
    '*': {
        in: function(next){
            document.querySelector('#swup').style.opacity = 0;
            TweenMax.to(document.querySelector('#swup'), .5, {
                opacity: 1,
                onComplete: next
            });
            // next();
        },
        out: function(next){
            document.querySelector('#swup').style.opacity = 1;
            TweenMax.to(document.querySelector('#swup'), .5, {
                opacity: 0,
                onComplete: next
            });
            // next();
        }
    },
}
};
import Swupjs from "swupjs";
const swupjs = new Swupjs(options);

// Initiate scripts 
  // toggleNav(); 
  // skillScroll();

// Reload scripts that run in content that changes, ie, Main, but not Header  
// document.addEventListener('swup:contentReplaced', function () {
//   // toggleNav();
//   skillScroll();
// }); 

// toggleNav()


function init() {
  // Init Nav
  navTweenSet(); // Sets up menu items for animation 
  navButtonListener(); // Opens and closes menu
  navLinkListener(); // Closes menu when menu item is clicked
  siteTitleListener(); // Closes menu when Site Title is clicked
  if(document.querySelector(".skill-card-container")) {
    skillScroll();
  }
}
init();
// Reload scripts that run in content that changes, ie, Main, but not Header  
document.addEventListener('swup:contentReplaced', function () {
  navTweenSet(); // Sets up menu items for animation
  navLinkListener(); // Closes menu when menu item is clicked
  if(document.querySelector(".skill-card-container")) {
    skillScroll();
  }
}); 

