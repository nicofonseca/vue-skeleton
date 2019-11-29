let allowTouchUp = true;
let allowTouchDown = true;
let touchY = 0;

function handleMouseWheel(e) {
  const target = e.currentTarget;
  const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
  let isUp = null;
  let isDown = null;

  if (delta <= 0) {
    isDown = true;
    isUp = false;
  } else if (delta > 0) {
    isUp = true;
    isDown = false;
  }
  if (
    (isUp && target.scrollTop > 0) ||
    (isDown && target.scrollTop < target.scrollHeight - target.clientHeight)
  ) {
    e.stopPropagation();
  } else {
    e.preventDefault();
  }
}

function handleTouchStart(e) {
  const target = e.currentTarget;
  allowTouchUp = target.scrollTop > 0;
  allowTouchDown = target.scrollTop < target.scrollHeight - target.clientHeight;
  touchY = e.touches[0].pageY;
}

function handleTouchMove(e) {
  const isUp = e.touches[0].pageY > touchY;
  const isDown = e.touches[0].pageY < touchY;
  touchY = e.touches[0].pageY;
  if ((isUp && allowTouchUp) || (isDown && allowTouchDown)) {
    e.stopPropagation();
  } else {
    e.preventDefault();
  }
}

export default {
  unbind(el) {
    el.removeEventListener('mousewheel', handleMouseWheel);
    el.removeEventListener('DOMMouseScroll', handleMouseWheel);
    el.removeEventListener('touchstart', handleTouchStart);
    el.removeEventListener('touchmove', handleTouchMove);
  },
  inserted(el) {
    el.addEventListener('mousewheel', handleMouseWheel);
    el.addEventListener('DOMMouseScroll', handleMouseWheel);
    el.addEventListener('touchstart', handleTouchStart);
    el.addEventListener('touchmove', handleTouchMove);
  },
};
