'use strict';

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

function isInView(elem) {
  const elemTop = elem.getBoundingClientRect().top;
  const elemBottom = elem.getBoundingClientRect().bottom;

  return elemTop >= 0 && elemBottom <= window.innerHeight;
}

const videoElem = document.querySelector('.presentation__video');
let videoWasStarted = false;

window.addEventListener('scroll', () => {
  if (isInView(videoElem) && !videoWasStarted) {
    videoWasStarted = true;
    videoElem.play();
  } else if (!isInView(videoElem)) {
    videoElem.pause();
  }
});
