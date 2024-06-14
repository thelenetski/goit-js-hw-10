import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  progressBar: false,
  icon: '',
  layout: 2,
  position: 'topRight',
});

const form = document.querySelector('.form');

let delay;
let state;

form.addEventListener('change', event => {
  if (event.target.name === 'delay') delay = event.target.value;
  if (event.target.name === 'state') state = event.target.value;
});

form.addEventListener('submit', event => {
  event.preventDefault();
  createPromise(delay, state);
});

function createPromise(delay, state) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(value => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${value}ms`,
        onOpening: () => console.log(`✅ Fulfilled promise in ${value}ms`),
      });
    })
    .catch(value => {
      iziToast.error({
        message: `❌ Rejected promise in ${value}ms`,
        onOpening: () => console.log(`❌ Rejected promise in ${value}ms`),
      });
    });
}
