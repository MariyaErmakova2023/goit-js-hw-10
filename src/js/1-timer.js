import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let intervalId;
let userSelectedDate;

/*============================================================= */
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hoursnpm i
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
/*============================================================= */
function addLeadingZero({ days, hours, minutes, seconds }) {
  days = days.toString().padStart(2, '0');
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');
  return { days, hours, minutes, seconds };
}

const refs = {
  startBtn: document.querySelector('[data-start]'),
  timerDays: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timerMinutes: document.querySelector('[data-minutes]'),
  timerSeconds: document.querySelector('[data-seconds]'),
};
refs.startBtn.disabled = true;
flatpickr('#datetime-picker', {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  defaultDate: new Date(),
  time_24hr: true,
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      iziToast.show({
        position: 'topRight',
        backgroundColor: 'red',
        messageColor: 'white',
        titleColor: 'white',
        closeOnClick: true,
        iconColor: 'white',
        title: 'Error',
        message: 'Please choose a date in the future',
      });
    } else {
      const userDate = selectedDates[0];
      userSelectedDate = userDate;
      refs.startBtn.disabled = false;
    }
  },
});

refs.startBtn.addEventListener('click', () => {
  intervalId = setInterval(() => {
    refs.startBtn.disabled = true;
    const currentTime = Date.now();
    const diff = userSelectedDate - currentTime;
    const time = convertMs(diff);
    const str = addLeadingZero(time);

    refs.timerDays.textContent = str.days;
    refs.timerHours.textContent = str.hours;
    refs.timerMinutes.textContent = str.minutes;
    refs.timerSeconds.textContent = str.seconds;
  }, 1000);

  setTimeout(() => {
    clearInterval(intervalId);
  }, userSelectedDate - Date.now());

  refs.startBtn.disabled = false;
});
