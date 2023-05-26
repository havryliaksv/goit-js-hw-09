import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';

let selectedDate = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const dateEnd = selectedDates[0];
    const dateStart = Date.now();
    if (dateEnd - dateStart <= 0) {
      refs.btnStart.disabled = true;
      alert('Please choose a date in the future');
    } else {
      refs.btnStart.disabled = false;
    }
  },
});

const refs = {
  input: selectedDate.element,
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

class Timer {
  constructor({ onInterval, endTimer }) {
    this.intervalId = null;
    this.selectedDate = selectedDate.selectedDates[0];
    this.onInterval = onInterval;
    this.endTimer = endTimer;
  }
  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
  start() {
    this.intervalId = setInterval(() => {
      const timeEnd = this.selectedDate;
      const timeStart = Date.now();
      const deltaTime = timeEnd - timeStart;
      if (deltaTime <= 0) {
        this.stop();
        this.endTimer();
        return;
      }
      const objTime = this.convertMs(deltaTime);
      objTime.days = this.addLeadingZero(objTime.days);
      objTime.hours = this.addLeadingZero(objTime.hours);
      objTime.minutes = this.addLeadingZero(objTime.minutes);
      objTime.seconds = this.addLeadingZero(objTime.seconds);
      this.onInterval(objTime);
    }, 1000);
  }
  stop() {
    clearInterval(this.intervalId);
  }
}

refs.btnStart.disabled = true;

refs.btnStart.addEventListener('click', onClickStart);

function updateTimerElements(objTime) {
  refs.days.textContent = objTime.days;
  refs.hours.textContent = objTime.hours;
  refs.minutes.textContent = objTime.minutes;
  refs.seconds.textContent = objTime.seconds;
}

function endTimer() {
  // refs.btnStart.removeEventListener('click', onClickStop);
  refs.btnStart.addEventListener('click', onClickStart);
  refs.btnStart.textContent = 'Start';
  refs.input.disabled = false;
}

function onClickStart() {
  const timer = new Timer({
    onInterval: updateTimerElements,
    endTimer: endTimer,
  });

  refs.input.disabled = true;
  timer.start();
  refs.btnStart.textContent = 'Stop';
  refs.btnStart.removeEventListener('click', onClickStart);
  refs.btnStart.addEventListener('click', onClickStop);

  function onClickStop() {
    refs.btnStart.textContent = 'Start';
    refs.input.disabled = false;
    timer.stop();
    refs.btnStart.removeEventListener('click', onClickStop);
    refs.btnStart.addEventListener('click', onClickStart);
  }
}
