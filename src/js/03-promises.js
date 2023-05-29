import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('form'),
  delay: document.querySelector('[name = "delay"]'),
  step: document.querySelector('[name = "step"]'),
  amount: document.querySelector('[name = "amount"]'),
};

refs.form.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();
  let delay = Number(refs.delay.value);

  for (let i = 1; i <= Number(refs.amount.value); i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, 3000);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, 3000);
      });

    delay += Number(refs.step.value);
  }
  e.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
