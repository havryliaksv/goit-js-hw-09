export default class Timer {
  constructor({ onIntervalUpdFace, endTimer }) {
    this.intervalId = null;
    this.selectedDateEnd = null;
    this.onIntervalUpdFace = onIntervalUpdFace;
    this.endTimer = endTimer;
  }

  setSelectedDateEnd(dateEnd) {
    this.selectedDateEnd = dateEnd;
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
    console.log('Start of countdown');
    this.intervalId = setInterval(() => {
      const timeEnd = this.selectedDateEnd;
      const timeStart = Date.now();
      const deltaTime = timeEnd - timeStart;
      if (deltaTime <= 0) {
        this.stop();
        this.endTimer();
        console.log('End of countdown');
        return;
      }
      const objTime = this.convertMs(deltaTime);
      objTime.days = this.addLeadingZero(objTime.days);
      objTime.hours = this.addLeadingZero(objTime.hours);
      objTime.minutes = this.addLeadingZero(objTime.minutes);
      objTime.seconds = this.addLeadingZero(objTime.seconds);
      this.onIntervalUpdFace(objTime);
    }, 1000);
  }

  stop() {
    console.log('Timer stoped');
    clearInterval(this.intervalId);
  }
}
