document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll(".projectlink a");
  
    links.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      if (linkPath === currentPath) {
        link.parentElement.classList.add("active");
      }
    });
  });
  