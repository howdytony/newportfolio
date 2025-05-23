const letters = document.querySelectorAll('.logo .letter');
const colors = ['emerald', 'brick', 'robin', 'lavender', 'mustard'];

document.querySelector('.logo').addEventListener('mouseover', () => {
  letters.forEach((letter) => {
    const currentColor = colors.find(color => letter.classList.contains(color));
    const currentIndex = colors.indexOf(currentColor);
    const nextColor = colors[(currentIndex + 1) % colors.length];
    letter.classList.remove(currentColor);
    letter.classList.add(nextColor);
  });
});


class MyComponent extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `<h1>Hello world</h1>`;
    }
  }
  
  customElements.define('my-component', MyComponent);
  
  function showAbout() {
    var x = document.getElementById("about");
    var y = document.getElementByClass("hero");
    if (x.style.display === "none") {
      x.style.display = "block";
      y.style.display = "none";
    } else {
      x.style.display = "none";
      y.style.display = "block";
    }
  }
  
  function showPresently() {
    var x = document.getElementById("presently");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  
  function showBridge() {
    var x = document.getElementById("bridge");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  
  function showMamaCuddles() {
    var x = document.getElementById("mamacuddles");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }