let t;const e={btnStart:document.querySelector("button[data-start]"),btnStop:document.querySelector("button[data-stop]")};function n(o){o.target.disabled=!0,o.target.removeEventListener("click",n),r(),t=setInterval(r,1e3),e.btnStop.addEventListener("click",a)}function r(){document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}function a(){e.btnStart.disabled=!1,clearInterval(t),e.btnStart.addEventListener("click",n),e.btnStop.removeEventListener("click",a)}e.btnStart.addEventListener("click",n);
//# sourceMappingURL=01-color-switcher.b0f05fb9.js.map
