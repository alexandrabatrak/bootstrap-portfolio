window.addEventListener("load", function () {
  const code = document.getElementById("hero-code-block");
  code.parentNode.classList.remove("done");
  let str = code.innerHTML;
  let i = 0;
  code.innerHTML = "";

  let typing = setInterval(function () {
    i++;
    code.innerHTML = str.slice(0, i) + "|";
    if (i == str.length) {
      clearInterval(typing);
      code.innerHTML = str;

      setInterval(function () {
        code.parentNode.classList.add("done");
      }, 1200);
    }
  }, 1);

  // NAV scroll behavior
  const nav = document.querySelector("nav");
  const startchange = document.querySelector("main").getBoundingClientRect();
  let didScroll = false;
  var lastScrollTop = 0;
  var delta = 5;
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
    var st = window.scrollY;
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
