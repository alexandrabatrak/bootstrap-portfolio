(function () {
  'use strict';

  // Loader
  window.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('#loader');
    if (loader) {
      setInterval(() => {
        // loader.classList.add('d-none');
        loader.remove();
      }, 500);
    }

    // Don't animate or play video if user prefers reduced motion
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reducedMotion) {
      videoPause();
    } else {
      typedText();
    }

    // Typing animation
    // Using requestAnimationFrame is better for perfomance than using setInterval
    function typedText() {
      const typedText = document.getElementById('typed-text');
      typedText.parentNode.style.opacity = '0';
      let str = typedText.innerHTML;
      let i = 0;
      typedText.innerHTML = '';

      function typing() {
        i += 3; // Increase the value of i by 3 in each iteration
        typedText.innerHTML = str.slice(0, i) + '|';
        typedText.parentNode.style.opacity = '1';
        if (i == str.length) {
          //~AnimationFrame is better for perfomance than setInterval
          cancelAnimationFrame(typing);
          typedText.innerHTML = str;
        } else {
          requestAnimationFrame(typing);
        }
      }

      requestAnimationFrame(typing);
      // To execute animation only once
      cancelAnimationFrame(typing);
    }

    // setInterval version of typedText
    // function typedText() {
    //  const typedText = document.getElementById('typed-text');
    //  typedText.parentNode.style.opacity = '0';
    //  let str = typedText.innerHTML;
    //  let i = 0;
    //  typedText.innerHTML = '';

    //  let typing = setInterval(() => {
    //    i++;
    //    typedText.innerHTML = str.slice(0, i) + '|';
    //    typedText.parentNode.style.opacity = '1';
    //    if (i == str.length) {
    //      clearInterval(typing);
    //      typedText.innerHTML = str;
    //    }
    //  }, 1);
    //}

    // Video pause
    const video = document.getElementById('videoBg');
    const btn = document.getElementById('pauseBtn');
    function videoPause() {
      video.pause();
      btn.classList.remove('fa-pause');
      btn.classList.add('fa-play');
      btn.firstElementChild.innerHTML = 'Pause';
    }

    btn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        btn.classList.remove('fa-play');
        btn.classList.add('fa-pause');
        btn.firstElementChild.innerHTML = 'Play';
      } else {
        videoPause();
      }
    });

    // NAV scroll behavior
    const nav = document.querySelector('nav');
    const startchange = document
      .querySelector('.title-wrapper')
      .getBoundingClientRect();
    var offset = startchange.top + window.scrollY;

    window.addEventListener('scroll', () => {
      const st = window.scrollY;
      if (st > offset) {
        nav.classList.add('bg-black');
        nav.classList.remove('bg-transparent');
      } else {
        nav.classList.remove('bg-black');
        nav.classList.add('bg-transparent');
      }
    });

    // On scroll animation
    // Source @ https://dev.to/miacan2021/fade-in-animation-on-scroll-with-intersectionobserver-vanilla-js-4p27
    const items = document.querySelectorAll('.reveal');

    // to keep applying class everytime scrolled into element
    // const show = (entries) => {
    //   entries.forEach((entry) => {
    //     if (entry.isIntersecting) {
    //       entry.target.classList.add('inview');
    //     } else {
    //       entry.target.classList.remove('inview');
    //     }
    //   });
    // };

    // to apply only once
    const show = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('inview');
          observer.unobserve(entry.target);
        }
      });
    };
    const observer = new IntersectionObserver(show, {
      once: true,
    });
    items.forEach((item) => observer.observe(item));

    // Reverse order of projects
    const container = document.querySelector('.work .grid');
    const child = Array.from(document.getElementsByClassName('project'));
    child.reverse().forEach((div) => container.appendChild(div));

    // Form validation by Bootstrap
    const formValidation = () => {
      const forms = document.querySelectorAll('.needs-validation');

      // Loop over them and prevent submission
      Array.from(forms).forEach((form) => {
        form.addEventListener('submit', (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        });
      });
    };
    formValidation();

    // Swiper init
    const swiper = new Swiper('.swiper', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    // Purecounter init
    const pure = new PureCounter();
  });
})();
