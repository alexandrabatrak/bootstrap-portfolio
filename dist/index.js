// const coffee = require( 'coffee-machine' );
// let today = new Date();
// let hours = today.getHours();


// class Coffee extends Energy {
//   constructor(code) {
//     let code = [];
//     const tired = sleepyEyes(e);

//     if (tired === true 
//         && (hours >= 09 && hours < 22)) {
//       code = tired.coffee.get().code.push();
//     } else {
//       code = tired.bed.sleep(); 
//     }

//     return code[0];
//   }
// }

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