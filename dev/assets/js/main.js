// import "./hoverintent";
import { skillScroll } from "./custom-scripts";
import { toggleNav } from "./animation";
import { transitions } from "./transitions";
// import { prefetch } from "./prefetch";
// import { prefetchnew } from "./prefetchnew";
let options = {
  // elements: ['body']
  doScrollingRightAway: true,
  animateScroll: false,
  animations: {
    '*': {
        in: function(next){
            // document.querySelector('#swup').style.opacity = 0;
            // TweenLite.to(document.querySelector('#swup'), .5, {
            //     opacity: 1,
            //     onComplete: next
            // });
            next();
        },
        out: function(next){
            // document.querySelector('#swup').style.opacity = 1;
            // TweenLite.to(document.querySelector('#swup'), .5, {
            //     opacity: 0,
            //     onComplete: next
            // });
            next();
        }
    },
}
};
import Swupjs from "swupjs";
const swupjs = new Swupjs(options);

// Initiate scripts 
  toggleNav(); 
  skillScroll();

// Reload scripts that run in content that changes, ie, Main, but not Header  
document.addEventListener('swup:contentReplaced', function () {
  skillScroll();
});

// document.addEventListener("turbolinks:load", function() {
  // 
  // skillScroll();
  // toggleNav(); 
  // prefetch();
  // prefetchnew();
  // 
  // TweenMax.set(".transition", {transform: 'translateY(100vh)'});
  // TweenMax.to(".transition", 2, {transform: 'translateY(-200vh)'});
  // 
  // document.addEventListener("turbolinks:visit", function() {
    // TweenMax.to(".transition", 1, {top:0});
    // transitions();
    // TweenMax.set(".transition", {top:300});
    // TweenMax.to(".transition", 2, {transform: 'translateY(-50px)'});
  // });
// 
// }); 

 