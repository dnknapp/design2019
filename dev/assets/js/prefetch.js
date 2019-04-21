export function prefetch(){
// document.addEventListener("turbolinks:load", () => {
  var hoverIntentOptions = {
    interval: 50,
    sensitivity: 5
  };

  document.querySelectorAll("a").forEach(node => {
    if (node.dataset.turbolinks === "false") {
      return;
    }
    var prefetcher;
    hoverintent(
      node,
      function() {
        var href = this.getAttribute("href");
        if (!href.match(/^\//)) {
          return;
        }

        if (prefetcher) {
          if (prefetcher.getAttribute("href") != href) {
            prefetcher.getAttribute("href", href);
          }
        } else {
          var link = document.createElement("link");
          link.setAttribute("rel", "prefetch");
          link.setAttribute("href", href);

          prefetcher = document.body.appendChild(link);
        }
      },
      function() {}
    ).options(hoverIntentOptions);
  });
// });
};