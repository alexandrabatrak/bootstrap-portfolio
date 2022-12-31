(function () {
  'use strict';

  window.addEventListener('load', function () {
    let loader = document.getElementById('#loader');
    if (loader) {
      loader.classList.add('d-none');
    }

    // Don't animate if user prefers reduced motion
    // Credit to Nathan @ https://dev.to/natclark/checking-for-reduced-motion-preference-in-javascript-4lp9#:~:text=You%20can%20still%20disable%20those,%2Dmotion%3A%20reduce)%60).
    const reducedMotion =
      window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
      window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

    if (reducedMotion === false) {
      const typedText = document.getElementById('typed-text');
      typedText.parentNode.style.opacity = '0';
      let str = typedText.innerHTML;
      let i = 0;
      typedText.innerHTML = '';

      let typing = setInterval(function () {
        i++;
        typedText.innerHTML = str.slice(0, i) + '|';
        typedText.parentNode.style.opacity = '1';
        if (i == str.length) {
          clearInterval(typing);
          typedText.innerHTML = str;
        }
      }, 1);
    } else {
      const video = document.getElementById('#videoBg');
      video.pause();
      // return;
    }

    // NAV scroll behavior
    const nav = document.querySelector('nav');
    const startchange = document
      .querySelector('.title-wrapper')
      .getBoundingClientRect();
    let didScroll = false;
    // let lastScrollTop = 0;
    // const delta = 5;
    // const navbarHeight = nav.getBoundingClientRect().height;
    var offset = startchange.top + window.scrollY;

    window.addEventListener('scroll', function () {
      didScroll = true;
    });

    setInterval(function () {
      if (didScroll) {
        let st = window.scrollY;
        if (st > offset) {
          nav.classList.add('bg-black');
          nav.classList.remove('bg-transparent');
        } else {
          nav.classList.remove('bg-black');
          nav.classList.add('bg-transparent');
        }
        didScroll = false;
      }
    }, 250);
  });

  // On scroll animation
  // Credit to Shiho Kazama @ https://dev.to/miacan2021/fade-in-animation-on-scroll-with-intersectionobserver-vanilla-js-4p27
  // const reveal = document.querySelector('.reveal');
  // const callback = function (entries) {
  //   entries.forEach((entry) => {
  //     if (entry.isIntersecting) {
  //       entry.target.classList.add('inview');
  //     } else {
  //       entry.target.classList.remove('inview');
  //     }
  //   });
  // };
  // const io = new IntersectionObserver(callback);
  // io.observe(reveal);

  const items = document.querySelectorAll('.reveal');

  const active = function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('inview');
      } else {
        entry.target.classList.remove('inview');
      }
    });
  };
  const io2 = new IntersectionObserver(active);
  for (let i = 0; i < items.length; i++) {
    io2.observe(items[i]);
  }

  const pure = new PureCounter();
})();
