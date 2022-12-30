window.addEventListener("load", function () {
  // Don't animate if user prefers reduced motion
  // Credit  https://dev.to/natclark/checking-for-reduced-motion-preference-in-javascript-4lp9#:~:text=You%20can%20still%20disable%20those,%2Dmotion%3A%20reduce)%60).
  const reducedMotion =
    window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

  // if (!!reducedMotion) {
  //   return;
  // } else {
  // }

  if (reducedMotion === false) {
    const typedText = document.getElementById("typed-text");
    let str = typedText.innerHTML;
    let i = 0;
    typedText.innerHTML = "";

    let typing = setInterval(function () {
      i++;
      typedText.innerHTML = str.slice(0, i) + "|";
      if (i == str.length) {
        clearInterval(typing);
        typedText.innerHTML = str;
      }
    }, 1);
  } else {
    return;
  }

  // NAV scroll behavior
  const nav = document.querySelector("nav");
  const startchange = document.querySelector("main").getBoundingClientRect();
  let didScroll = false;
  let lastScrollTop = 0;
  const delta = 5;
  const navbarHeight = nav.getBoundingClientRect().height;
  var offset = startchange.top + window.scrollY;

  window.addEventListener("scroll", function () {
    didScroll = true;
  });

  setInterval(function () {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    let st = window.scrollY;
    if (st > offset) {
      nav.classList.add("bg-black");
      nav.classList.remove("bg-transparent");
    } else {
      nav.classList.remove("bg-black");
      nav.classList.add("bg-transparent");
    }

    // move nav up when scrolled down

    // if (Math.abs(lastScrollTop - st) <= delta) return;

    // if (st > lastScrollTop && st > navbarHeight) {
    //   nav.classList.add("is-up");
    // } else {
    //   if (st - window.innerHeight) {
    //     nav.classList.remove("is-up");
    //   }
    // }
    // lastScrollTop = st;
  }
});
