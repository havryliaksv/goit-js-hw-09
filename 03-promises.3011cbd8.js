var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},t={},n=e.parcelRequire7bc7;null==n&&((n=function(e){if(e in o)return o[e].exports;if(e in t){var n=t[e];delete t[e];var r={id:e,exports:{}};return o[e]=r,n.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,o){t[e]=o},e.parcelRequire7bc7=n);var r=n("iQIUW");const i={form:document.querySelector("form"),delay:document.querySelector('[name = "delay"]'),step:document.querySelector('[name = "step"]'),amount:document.querySelector('[name = "amount"]')};function l(e,o){return new Promise(((t,n)=>{const r=Math.random()>.3;setTimeout((()=>{r?t({position:e,delay:o}):n({position:e,delay:o})}),o)}))}i.form.addEventListener("submit",(function(e){e.preventDefault();let o=Number(i.delay.value);for(let e=1;e<=Number(i.amount.value);e+=1)l(e,o).then((({position:e,delay:o})=>{r.Notify.success(`✅ Fulfilled promise ${e} in ${o}ms`,3e3),console.log(`✅ Fulfilled promise ${e} in ${o}ms`)})).catch((({position:e,delay:o})=>{r.Notify.failure(`❌ Rejected promise ${e} in ${o}ms`,3e3),console.log(`❌ Rejected promise ${e} in ${o}ms`)})),o+=Number(i.step.value);e.currentTarget.reset()}));
//# sourceMappingURL=03-promises.3011cbd8.js.map
