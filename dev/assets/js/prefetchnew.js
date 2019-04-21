// References: 
// https://github.com/turbolinks/turbolinks/issues/313
// https://gist.github.com/hopsoft/ab500a3b584e2878c83137cb539abb32
// Requires Turbolinks
// Anchors must explicitly opt-in to prefetch behavior. <a data-prefetch='true' ...>


export function prefetchnew() {
  const hoverTime = 400;
  const fetchers = {};
  const doc = document.implementation.createHTMLDocument('prefetch');

  

  function fetchPage(url, success) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('VND.PREFETCH', 'true');
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status !== 200) return;
      success(xhr.responseText);
    };
    xhr.send();
  }

  function prefetchTurbolink(url) {
    fetchPage(url, responseText => {
      doc.open();
      doc.write(responseText);
      doc.close();
      let snapshot = Turbolinks.Snapshot.fromHTMLElement(doc.documentElement);
      Turbolinks.controller.cache.put(url, snapshot);
    });
  }

  function prefetch(url) {
    if (prefetched(url)) return;
    prefetchTurbolink(url);
  }

  function prefetched(url) {
    return location.href === url || Turbolinks.controller.cache.has(url);
  }

  function prefetching(url) {
    return !!fetchers[url];
  }

  function cleanup(event) {
    const element = event.target;
    clearTimeout(fetchers[element.href]);
    element.removeEventListener('mouseleave', cleanup);
  }

  document.addEventListener('mouseover', event => {
    console.log("hover");
    if (!event.target.dataset.prefetch) return;
    let url = event.target.href;
    if (prefetched(url)) return;
    if (prefetching(url)) return;
    cleanup(event);
    event.target.addEventListener('mouseleave', cleanup);
    fetchers[url] = setTimeout(() => prefetch(url), hoverTime);
  });
};  