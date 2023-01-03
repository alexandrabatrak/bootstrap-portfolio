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
    const nav = document.querySelector('nav.navbar');
    const startchange = document
      .querySelector('.title-wrapper')
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
    // TODO: Find a solution for stutter: just before the element is near the left edge, the margin is reset to 0 and it pushes the element to the right
    // Solution: configure exact value of differenceCheck based on a li size and it's margin.

    function animateSkills() {
      const skillsContainer = document.getElementById('skillsContainer');
      const leftSideOfContainer = skillsContainer.getBoundingClientRect().left;
      const rightSideOfContainer =
        skillsContainer.getBoundingClientRect().right;
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
