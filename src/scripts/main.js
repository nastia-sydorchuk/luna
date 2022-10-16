'use strict';

// Slider
const features = [...document.querySelectorAll('.feature')];
const prev = document.querySelector('.icon--backward');
const next = document.querySelector('.icon--forward');
const counter = document.querySelector('.feature-navigation__number--active');

let position = 0;

const move = (currentPosition) => {
  features[position].classList.remove('features__feature--active');
  position = currentPosition;

  if (currentPosition > features.length - 1) {
    position = 0;
  } else if (currentPosition < 0) {
    position = features.length - 1;
  }

  features[position].classList.add('features__feature--active');
  counter.textContent = `0${position + 1}`;
};

prev.addEventListener('click', () => move(position - 1));
next.addEventListener('click', () => move(position + 1));

// Listening to Scroll
function isInView(elem) {
  const elemTop = elem.getBoundingClientRect().top;
  const elemBottom = elem.getBoundingClientRect().bottom;

  return elemTop >= 0 && elemBottom <= window.innerHeight;
}

const videoElem = document.querySelector('.presentation__video');
let videoWasStarted = false;
const nav = document.querySelector('nav');
const cross = document.querySelector('.icon--cross');
const menu = document.querySelector('.icon--menu');

window.addEventListener('scroll', () => {
  const navTop = nav.getBoundingClientRect().top;

  if (navTop < 0) {
    nav.style.transform = 'translateY(-100%)';
    window.history.pushState({}, 'Home', document.location.origin);
  }

  if (isInView(videoElem) && !videoWasStarted) {
    videoWasStarted = true;
    videoElem.play();
  } else if (!isInView(videoElem)) {
    videoElem.pause();
  }
});

menu.addEventListener('click', () => {
  nav.style.transform = 'translateY(0)';
});

cross.addEventListener('click', () => {
  nav.style.transform = 'translateY(-100%)';
});

// Form validation

const emailInput = document.querySelector('.form__field--email');
const messageInput = document.querySelector('.form__field--textarea');
const successMessage = document.querySelector('.form__message--success');
const form = document.querySelector('form');

const inputs = [emailInput, messageInput];
let formIsValid = false;
let isValidating = false;

const isEmailValid = (email) => {
  // eslint-disable-next-line
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(email.toLowerCase());
};

const resetInput = (element) => {
  element.previousElementSibling.classList.add('form__message--hidden');
  element.classList.remove('form__field--invalid');
};

const invalidateInput = (element) => {
  element.previousElementSibling.classList.remove('form__message--hidden');
  element.classList.add('form__field--invalid');
};

const validateInputs = () => {
  if (!isValidating) {
    return;
  }

  inputs.forEach(resetInput);
  formIsValid = true;

  if (!messageInput.value) {
    invalidateInput(messageInput);
    formIsValid = false;
  }

  if (!isEmailValid(emailInput.value)) {
    invalidateInput(emailInput);
    formIsValid = false;
  }
};

const clearForm = () => {
  emailInput.value = '';
  messageInput.value = '';
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  isValidating = true;
  validateInputs();

  if (formIsValid) {
    clearForm();
    successMessage.classList.remove('form__message--hidden');
  }
});

inputs.forEach((input) => {
  input.addEventListener('input', () => {
    resetInput(input);
    successMessage.classList.add('form__message--hidden');
  });
});
