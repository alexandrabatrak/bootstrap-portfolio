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
      animateSkills();
    }

    // Typing animation
    // This function has an issue with not stopping after the animation is complete.
    // TODO: figure out why
    // function typedText() {
    //   const typedText = document.getElementById('typed-text');
    //   typedText.parentNode.style.opacity = '0';
    //   let str = typedText.innerHTML;
    //   let i = 0;
    //   typedText.innerHTML = '';

    //   // set a variable for animation completion check, so that it doesn't continue animation after completion
    //   let animation = null;

    //   function typing() {
    //     if ((animation = null)) {
    //       return;
    //     }
    //     i += 25; // Increase the value of i in each iteration that determines the speed of typing animation
    //     typedText.innerHTML = str.slice(0, i) + '|';
    //     typedText.parentNode.style.opacity = '1';
    //     if (i == str.length) {
    //       typedText.innerHTML = str;
    //       cancelAnimationFrame(typing);
    //     } else {
    //       animation = requestAnimationFrame(typing);
    //     }
    //   }

    //   requestAnimationFrame(typing);
    // }

    // setInterval version of typedText
    function typedText() {
      const typedText = document.getElementById('typed-text');
      typedText.parentNode.style.opacity = '0';
      let str = typedText.innerHTML;
      let i = 0;
      typedText.innerHTML = '';

      function typing(interval) {
        return setInterval(() => {
          i++;
          typedText.innerHTML = str.slice(0, i) + '|';
          typedText.parentNode.style.opacity = '1';
          if (i == str.length) {
            clearInterval(typing);
            typedText.innerHTML = str;
          }
        }, interval);
      }

      // start animation when it's in view
      const observerTypedText = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          typing(5);
        } else {
          return;
        }
      });

      observerTypedText.observe(typedText);
    }

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
    const nav = document.querySelector('nav.navbar');
    const startchange = document
      .querySelector('.about')
      .getBoundingClientRect();
    var offset = startchange.top + window.scrollY;
    const footer = document.querySelector('footer.footer');

    window.addEventListener('scroll', () => {
      const st = window.scrollY;
      if (st > offset) {
        nav.classList.add('bg-black');
        nav.classList.remove('bg-transparent');
      } else {
        nav.classList.remove('bg-black');
        nav.classList.add('bg-transparent');
      }

      // slide nav up when reaching the footer of the page
      if (footer.getBoundingClientRect().top <= window.innerHeight) {
        nav.classList.add('is-up');
      } else {
        nav.classList.remove('is-up');
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
    const reveal = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('inview');
          observerReveal.unobserve(entry.target);
        }
      });
    };
    const observerReveal = new IntersectionObserver(reveal, {
      once: true,
    });
    items.forEach((item) => observerReveal.observe(item));

    // Reverse order of projects
    const container = document.querySelector('.work .grid');
    const child = Array.from(document.getElementsByClassName('project'));
    const button = document.getElementById('sortingButton');
    let toggle = true;
    button.addEventListener('click', () => {
      child.reverse().forEach((div) => container.appendChild(div));
      toggle = !toggle;
      if (toggle) {
        button.firstElementChild.innerHTML = 'Sort by latest';
      } else {
        button.firstElementChild.innerHTML = 'Sort by oldest';
      }
    });

    // animate skill list
    // Source https://codepen.io/tmhrtwg/pen/PvywxY.
    // Edited to fix error with negative margin and first element never appending to the last correctly.
    // Solution for stutter: configure exact value of differenceCheck based on a li size and it's margin.

    function animateSkills() {
      let skillsContainer = document.getElementById('skillsContainer');
      let leftSideOfContainer = skillsContainer.getBoundingClientRect().left;
      let rightSideOfContainer = skillsContainer.getBoundingClientRect().right;
      const skillsList = document.getElementById('skillsList');
      let currentLeftValue = 0;

      let animationInterval = window.setInterval(animationLoop, 20);

      skillsContainer.addEventListener('mouseenter', () => {
        window.clearInterval(animationInterval);
      });

      skillsContainer.addEventListener('mouseleave', () => {
        animationInterval = window.setInterval(animationLoop, 20);
      });

      // Update container edge values when window is resized
      // TODO still issue when resizing (not eve) - the margin increases expedencially
      window.addEventListener('resize', () => {
        leftSideOfContainer = skillsContainer.getBoundingClientRect().left;
        rightSideOfContainer = skillsContainer.getBoundingClientRect().right;
      });

      function animationLoop() {
        const firstListItem = skillsList.querySelector('ul li:first-child');
        let leftSideOfFirstItem = firstListItem.getBoundingClientRect().left;
        let rightSideOfFirstItem = firstListItem.getBoundingClientRect().right;
        const differenceCheck = 12;

        if (rightSideOfFirstItem - leftSideOfContainer < differenceCheck) {
          currentLeftValue = -1;
          // Update container edge values again to avoid weird positions
          rightSideOfFirstItem = firstListItem.getBoundingClientRect().right;
          leftSideOfFirstItem = firstListItem.getBoundingClientRect().left;
          const listItems = skillsList.querySelectorAll('ul li');
          listItems.forEach((item) => item.classList.remove('fade-out'));
          skillsList.appendChild(firstListItem);
        }
        if (leftSideOfFirstItem - leftSideOfContainer < 1) {
          firstListItem.classList.add('fade-out');
        } else {
          firstListItem.classList.remove('fade-out');
        }

        skillsList.style.marginLeft = `${currentLeftValue}px`;
        currentLeftValue--;
      }
    }

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
