// import "./hoverintent";
import { skillScroll } from "./skillscroll";
import { toggleNav } from "./togglenav";
import { transitions } from "./pagetransitions";
let options = {
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