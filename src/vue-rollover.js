/**
 * VueRollover
 */

let transitionProp = 'transition';
let transitionEndEvent = 'transitionend';
let animationProp = 'animation';
let animationEndEvent = 'animationend';

if (window.ontransitionend === undefined &&
  window.onwebkittransitionend !== undefined
) {
  transitionProp = 'WebkitTransition';
  transitionEndEvent = 'webkitTransitionEnd';
}
if (window.onanimationend === undefined &&
  window.onwebkitanimationend !== undefined
) {
  animationProp = 'WebkitAnimation';
  animationEndEvent = 'webkitAnimationEnd';
}

/**
 * 文字（'1.0s'など）をミリ秒に変換
 * @param s {string}
 * @returns {number}
 */
function toMs(s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000;
}

/**
 * duration + delayの最大値を返す
 * @param durations {array<string>}
 * @param delays {array<string>}
 */
function getMaxTime(durations, delays) {
  return Math.max.apply(null, durations.map((d, i) => {
    return toMs(d) + (delays[i] !== undefined ? toMs(delays[i]) : 0);
  }));
}

/**
 * 要素のtransition, animationの最大値を返す（duration + delay）
 * @param el {Element}
 * @returns {number}
 */
function getTimeout(el) {
  const styles = window.getComputedStyle(el);
  const transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  const transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  const transitionTimeout = getMaxTime(transitionDurations, transitionDelays);
  const animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  const animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  const animationTimeout = getMaxTime(animationDurations, animationDelays);
  return Math.max(transitionTimeout, animationTimeout);
}

/**
 * requestAnimationFrame
 */
const raf = window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : setTimeout;

/**
 * nextFrame
 */
function nextFrame(fn) {
  raf(() => { raf(fn); });
}

/**
 *
 * @param name {string}
 * @returns {object}
 */
function getClassName(name) {
  return {
    enter: `${name}-enter`,
    enterTo: `${name}-enter-to`,
    enterActive: `${name}-enter-active`,
    leave: `${name}-leave`,
    leaveTo: `${name}-leave-to`,
    leaveActive: `${name}-leave-active`
  };
}

export default class VueRollover {
  constructor() {}
}

VueRollover.install = function (Vue) {
  Vue.directive('rollover', {
    inserted (el, binding, vnode) {
      const r = {
        isOver: false,
        isPlaying: false,
        name: getClassName('v'),
        durationEnter: null,
        durationLeave: null
      };

      if (typeof binding.value === 'object') {
        const { name, duration } = binding.value;
        if (typeof name === 'string') {
          r.name = getClassName(name);
        }
        if (typeof duration === 'object') {
          if (typeof duration.enter === 'number') {
            r.durationEnter = duration.enter;
          }
          if (typeof duration.leave === 'number') {
            r.durationLeave = duration.leave;
          }
        } else if (typeof duration === 'number') {
          r.durationEnter = duration;
          r.durationLeave = duration;
        }
      }

      r.onMouseEnter = (function() {
        this.isOver = true;
        if (this.isPlaying === false) { r.startEnter(); }
      }).bind(r);

      r.onMouseLeave = (function() {
        this.isOver = false;
        if (this.isPlaying === false) { r.startLeave(); }
      }).bind(r);

      r.startEnter = (function() {
        this.isPlaying = true;

        el.classList.remove(r.name.leaveTo);
        el.classList.add(r.name.enter);

        nextFrame(() => {
          el.classList.add(r.name.enterActive);

          nextFrame(() => {
            const timeout = r.durationEnter || getTimeout(el);

            el.classList.remove(r.name.enter);
            el.classList.add(r.name.enterTo);

            setTimeout(() => {
              this.isPlaying = false;
              el.classList.remove(r.name.enterActive);
              if (this.isOver === false) {
                this.startLeave();
              }
            }, timeout + 1);
          });
        });
      }).bind(r);

      r.startLeave = (function() {
        this.isPlaying = true;

        el.classList.remove(r.name.enterTo);
        el.classList.add(r.name.leave);

        nextFrame(() => {
          el.classList.add(r.name.leaveActive);

          nextFrame(() => {
            const timeout = r.durationLeave || getTimeout(el);

            el.classList.remove(r.name.leave);
            el.classList.add(r.name.leaveTo);

            setTimeout(() => {
              this.isPlaying = false;
              el.classList.remove(r.name.leaveActive);
              if (this.isOver === true) {
                this.startEnter();
              }
            }, timeout);
          });
        });
      }).bind(r);

      el.addEventListener('mouseenter', r.onMouseEnter);
      el.addEventListener('mouseleave', r.onMouseLeave);

      vnode.__rollover = r;
    },

    unbind (el, binding, vnode) {
      const r = vnode.__rollover;

      el.removeEventListener('mouseenter', r.onMouseEnter);
      el.removeEventListener('mouseleave', r.onMouseLeave);

      delete vnode.__rollover;
    }
  });
};