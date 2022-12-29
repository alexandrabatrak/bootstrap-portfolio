window.addEventListener('load', function () {
  const code = document.getElementById('hero-code-block');
  code.parentNode.classList.remove('done');
  let str = code.innerHTML;
  let i = 0;
  code.innerHTML = "";

  let typing = setInterval(function() {
      i++;
      code.innerHTML = str.slice(0, i) + "|";
      if (i == str.length) {
          clearInterval(typing);
          code.innerHTML = str;

          setInterval(function() {
            code.parentNode.classList.add('done'); 
          }, 1200);
      }
  }, 1);
});