!function(){var t,e={btnStart:document.querySelector("button[data-start]"),btnStop:document.querySelector("button[data-stop]")};function n(o){o.target.disabled=!0,o.target.removeEventListener("click",n),a(),t=setInterval(a,1e3),e.btnStop.addEventListener("click",r)}function r(){e.btnStart.disabled=!1,clearInterval(t),e.btnStart.addEventListener("click",n),e.btnStop.removeEventListener("click",r)}function a(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}e.btnStart.addEventListener("click",n)}();
//# sourceMappingURL=01-color-switcher.ee09ac35.js.map
