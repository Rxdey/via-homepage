export function getScrollEventTarget (element) {
  let currentNode = element;
  while (currentNode && currentNode.tagName !== 'HTML' && currentNode.nodeType === 1) {
    const overflowY = window.getComputedStyle(currentNode).overflowY;
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return currentNode;
    }
    currentNode = currentNode.parentNode;
  }
  return window;
}

export function getScrollTop (element) {
  if (element === window) {
    return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
  }
  return element.scrollTop;
}

export function getOffset (el) {
  const box = el.getBoundingClientRect();
  const body = document.body;
  const clientTop = el.clientTop || body.clientTop || 0;
  const clientLeft = el.clientLeft || body.clientLeft || 0;
  const scrollTop = window.pageYOffset || el.scrollTop;
  const scrollLeft = window.pageXOffset || el.scrollLeft;
  return {
    top: box.top + scrollTop - clientTop,
    left: box.left + scrollLeft - clientLeft
  };
}

export function transitionEnd (el, fun) {
  const arr = ['msTransitionEnd', 'mozTransitionEnd', 'oTransitionEnd', 'webkitTransitionEnd', 'transitionend'];
  const handler = {
    handleEvent (event, ...arg) {
      arr.forEach((eventName) => {
        el.removeEventListener(eventName, handler, false);
      });
      fun.apply(el, arg);
    }
  };
  arr.forEach((eventName) => {
    el.addEventListener(eventName, handler, false);
  });
}

export function hasClass (el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  }
  return (` ${el.className} `).indexOf(` ${cls} `) > -1;
}

export function addClass (el, cls) {
  if (!el) return;
  let curClass = el.className;
  const classes = (cls || '').split(' ');

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (clsName) {
      if (el.classList) {
        el.classList.add(clsName);
      } else if (!hasClass(el, clsName)) {
        curClass += ` ${clsName}`;
      }
    }
  }

  if (!el.classList) {
    el.className = curClass;
  }
}

export function removeClass (el, cls) {
  if (!el || !cls) return;
  const classes = cls.split(' ');
  let curClass = ` ${el.className} `;

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) {
      if (el.classList) {
        el.classList.remove(clsName);
      } else if (hasClass(el, clsName)) {
        curClass = curClass.replace(` ${clsName} `, ' ');
      }
    }
  }
  if (!el.classList) {
    el.className = curClass ? curClass.trim() : curClass;
  }
}
