import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

//=======================================================

function createPromise(delay, status) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (status) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  return promise;
}

//======================================================
const refs = {
  delayField: document.querySelector('input[name="delay"]'),
  createBtn: document.querySelector('button[type="submit"]'),
};
// console.log(refs);

refs.createBtn.addEventListener('click', event => {
  event.preventDefault();
  try {
    const selectedInput = document.querySelector('input[name="state"]:checked');
    if (refs.delayField.value === '') {
      iziToast.show({
        position: 'topRight',
        backgroundColor: '#ffa000',
        messageColor: 'white',
        titleColor: 'white',
        closeOnClick: true,
        iconColor: 'white',
        displayMode: '2',
        title: 'Caution ',
        message: 'You must set Delay',
      });
    } else {
      createPromise(refs.delayField.value, selectedInput.value === 'fulfilled')
        .then(state => onFulfilled(state))
        .catch(state => onRejected(state));
    }
    selectedInput.checked = false;
  } catch (err) {
    iziToast.show({
      position: 'topRight',
      backgroundColor: '#ffa000',
      messageColor: 'white',
      titleColor: 'white',
      closeOnClick: true,
      iconColor: 'white',
      displayMode: '2',
      title: 'Caution ',
      message: 'You must choose State',
    });
  }

  refs.delayField.value = '';
});

function onFulfilled(delay) {
  iziToast.show({
    position: 'topRight',
    backgroundColor: '#59a10d',
    messageColor: 'white',
    titleColor: 'white',
    closeOnClick: true,
    iconColor: 'white',
    displayMode: '2',
    title: 'OK ',
    message: `✅ Fulfilled promise in ${delay}ms`,
  });
}

function onRejected(delay) {
  iziToast.show({
    position: 'topRight',
    backgroundColor: '#ef4040',
    messageColor: 'white',
    titleColor: 'white',
    closeOnClick: true,
    iconColor: 'white',
    displayMode: '2',
    title: 'Error ',
    message: `❌ Rejected promise in ${delay}ms`,
  });
}
