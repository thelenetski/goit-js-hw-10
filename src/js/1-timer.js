import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  layout: 2,
  position: 'topRight',
});

const input = document.querySelector('#datetime-picker');
const start = document.querySelector('button');
const timerValues = [...document.querySelectorAll('.value')];

start.disabled = true;

const today = new Date();

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < today) {
      getDisabledStart();
      return;
    }
    userSelectedDate = selectedDates[0];
    start.disabled = false;
  },
};

function getDisabledStart() {
  start.disabled = true;
  iziToast.error({
    title: 'Error!!!',
    message: 'Please choose a date in the future',
  });
}

start.addEventListener('click', () => {
  //якщо обрали у календарі 1хв, і пізно натиснули старт, то нічого не буде
  if (userSelectedDate - Date.now() < 1000) {
    getDisabledStart();
    return;
  }
  timer();
});

flatpickr(input, options);

function convertMs(ms) {
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

function timer() {
  const resultConvert = convertMs(userSelectedDate - Date.now());
  timerValues.map(
    (value, index) =>
      (value.innerHTML = Object.values(resultConvert)
        [index].toString()
        .padStart(2, '0'))
  );
  let timerID = setTimeout(() => timer(), 1000);
  input.disabled = true;
  start.disabled = true;
  if (userSelectedDate - Date.now() < 1000) {
    clearInterval(timerID);
    input.disabled = false;
  }
}
