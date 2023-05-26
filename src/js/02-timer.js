import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';
import Timer from './timer';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
      Notify.failure('Please choose a date in the future', {
        timeout: 3000,
      });
    } else {
      refs.btnStart.disabled = false;
      timer.setSelectedDateEnd(dateEnd);
      console.log('Date of timer finish: ', timer.selectedDateEnd);
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

const timer = new Timer({
  onIntervalUpdFace: updateTimerElements,
  endTimer: endTimer,
});

refs.btnStart.disabled = true;

refs.btnStart.addEventListener('click', onClickBtn);

function updateTimerElements(objTime) {
  refs.days.textContent = objTime.days;
  refs.hours.textContent = objTime.hours;
  refs.minutes.textContent = objTime.minutes;
  refs.seconds.textContent = objTime.seconds;
}

function endTimer() {
  refs.btnStart.textContent = 'Start';
  refs.input.disabled = false;
  Notify.success('End of countdown', {
    timeout: 5000,
  });
}

function onClickBtn() {
  if (selectedDate.selectedDates[0] - Date.now() <= 0) {
    Notify.failure('Please choose a date in the future', {
      timeout: 3000,
    });
    refs.btnStart.disabled = true;
    return;
  }
  if (refs.btnStart.textContent === 'Start') {
    refs.btnStart.textContent = 'Stop';
    refs.input.disabled = true;
    timer.start();
    Notify.success('Timer started', {
      timeout: 1000,
    });
  } else {
    refs.btnStart.textContent = 'Start';
    refs.input.disabled = false;
    timer.stop();
    Notify.warning('Timer stoped', {
      timeout: 1000,
    });
  }
}
