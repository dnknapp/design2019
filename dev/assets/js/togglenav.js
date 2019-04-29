import { Power2 } from "gsap";

// Export individual Functions
// Toggle Nav Menu    
export function navTweenSet() {
  // Set up the nav items so they slide and fade in
TweenMax.set("nav ul>*", {autoAlpha:0, y: +50});
};

export function openMenu() {
let header = document.querySelector("header");
let nav = document.querySelector("nav");
nav.classList.remove("hidden");
    header.classList.add("header-nav-active");
    let tl = new TimelineMax();
    tl
      .to("header", 0, {backgroundColor:"rgba(245, 245, 245, 1)"})  
      .staggerTo("nav ul>*", .4, {
        autoAlpha:1,
        y: 0,
        ease:Power1.easeInOut
        }, .02, .1);
        console.log("open");
};

export function closeMenu() {
let header = document.querySelector("header");
let nav = document.querySelector("nav");
let tl = new TimelineMax();
    tl
      .to("nav ul>*", .2, {autoAlpha:0})
      .to("header", .2, {backgroundColor:"transparent"})
      .set("nav ul>*", {y: +50});
      // .set("header", {backgroundColor:"transparent"});
      setTimeout(function() {
        nav.classList.add("hidden");
        header.classList.remove("header-nav-active");
      }, 410);
      console.log("closed");
};


export function navButtonListener() {
// Open and close the menu when menu button is clicked
let nav = document.querySelector("nav");
let navButton = document.querySelector(".header-nav-button");
let navLine = document.querySelectorAll(".nav-line");
let tl = new TimelineMax();
navButton.addEventListener("click", function() {
  (nav.classList.contains("hidden")) ? openMenu() : closeMenu();
}, false);
navButton.addEventListener("mouseenter", () => {
  
    tl
      .staggerTo(navLine, .2, {x:3, repeat:1, ease: Power1.easeInOut, yoyo:true}, .05);
      // .to(navLine, .2, {backgroundColor:red});
      console.log("hover");
});

};

export function navLinkListener() {
// Close the menu when a nav link is clicked
let navLink = document.querySelectorAll("nav a");
Array.from(navLink).forEach(link => {
link.addEventListener("click", () => {
  // console.log("click");
  closeMenu();
}, false);
});
};

export function siteTitleListener() {
// Close the Nav menu the Site Title is clicked
let header = document.querySelector("header");
let siteTitle = document.querySelector(".site-title");
siteTitle.addEventListener("click", () => {
if (header.classList.contains("header-nav-active")) {
  closeMenu();
}
}, false);
};
// All Function in one export
// // Toggle Nav Menu
// export default function toggleNav(){
//   let header = document.querySelector("header"),
//         nav = document.querySelector("nav"),
//         navButton = document.querySelector(".header-nav-button"),
//         navLink = document.querySelectorAll("nav a"),
//         siteTitle = document.querySelector(".site-title");

//     // Set up the nav items so they slide and fade in
//     TweenMax.set("nav ul>*", {autoAlpha:0, y: +50});
    
//     function openMenu() {
//       nav.classList.remove("hidden");
//           header.classList.add("header-nav-active");
//           let tl = new TimelineMax();
//           tl
//             .to("header", 0, {backgroundColor:"rgba(245, 245, 245, 1)"})  
//             .staggerTo("nav ul>*", .4, {
//               autoAlpha:1,
//               y: 0,
//               ease:Power1.easeInOut
//               }, .02, .1);
//               console.log("open");
//     };

//     function closeMenu() {
//       let tl = new TimelineMax();
//           tl
//             .to("nav ul>*", .2, {autoAlpha:0})
//             .to("header", .2, {backgroundColor:"transparent"})
//             .set("nav ul>*", {y: +50});
//             // .set("header", {backgroundColor:"transparent"});
//             setTimeout(function() {
//               nav.classList.add("hidden");
//               header.classList.remove("header-nav-active");
//             }, 410);
//             console.log("closed");
//     };

//     // Open and close the menu when menu button is clicked
//     navButton.addEventListener("click", function() {
//         (nav.classList.contains("hidden")) ? openMenu() : closeMenu();
//     }, false);

//     // Close the menu when a nav link is clicked
//     Array.from(navLink).forEach(link => {
//       link.addEventListener("click", () => {
//         // console.log("click");
//         closeMenu();
//       }, false);
//     });

//     // Close the Nav menu the Site Title is clicked
//     siteTitle.addEventListener("click", () => {
//       if (header.classList.contains("header-nav-active")) {
//         closeMenu();
//       }
//     }, false);
// };