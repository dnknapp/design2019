// Toggle Nav Menu
export function toggleNav(){
  const header = document.querySelector("header"),
        nav = document.querySelector("nav"),
        navButton = document.querySelector(".header-nav-button"),
        navLink = document.querySelectorAll("nav a"),
        siteTitle = document.querySelector(".site-title");
    
    // Set up the nav items so they slide and fade in
    TweenMax.set("nav ul>*", {autoAlpha:0, y: +50});
    
    function openMenu() {
      nav.classList.toggle("hidden");
          header.classList.toggle("header-nav-active");
          let tl = new TimelineMax();
          tl
            .to("header", 0, {backgroundColor:"rgba(245, 245, 245, 1)"})  
            .staggerTo("nav ul>*", .4, {
              autoAlpha:1,
              y: 0,
              ease:Power1.easeInOut
              }, .02, .1);
    };

    function closeMenu() {
      let tl = new TimelineMax();
          tl
            .to("nav ul>*", .2, {autoAlpha:0})
            .to("header", .2, {backgroundColor:"transparent"})
            .set("nav ul>*", {y: +50});
            // .set("header", {backgroundColor:"transparent"});
            setTimeout(function() {
              nav.classList.toggle("hidden");
              header.classList.toggle("header-nav-active");
            }, 410);
    };

    // Open and close the menu when menu button is clicked
    navButton.addEventListener("click", function() {
        (nav.classList.contains("hidden")) ? openMenu() : closeMenu();
    }, false);

    // Close the menu when a nav link is clicked
    Array.from(navLink).forEach(link => {
      link.addEventListener("click", function() {
        // console.log("click");
        closeMenu();
      }, false);
    });

    // Close the Nav menu the Site Title is clicked
    siteTitle.addEventListener("click", function() {
      if (header.classList.contains("header-nav-active")) {
        closeMenu();
      }
    }, false);
};