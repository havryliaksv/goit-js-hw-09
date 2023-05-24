const INTERVAL = 1000;
let intervalId;

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};

refs.btnStart.addEventListener('click', onBtnStartClick);

function onBtnStartClick(e) {
  e.target.disabled = true;
  e.target.removeEventListener('click', onBtnStartClick);
  changeBackgroundBody();
  intervalId = setInterval(changeBackgroundBody, INTERVAL);
  refs.btnStop.addEventListener('click', onBtnStopClick);
}

function onBtnStopClick() {
  refs.btnStart.disabled = false;
  clearInterval(intervalId);
  refs.btnStart.addEventListener('click', onBtnStartClick);
  refs.btnStop.removeEventListener('click', onBtnStopClick);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function changeBackgroundBody() {
  document.body.style.backgroundColor = getRandomHexColor();
}
