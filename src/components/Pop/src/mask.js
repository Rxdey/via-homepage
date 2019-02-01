import { addClass, removeClass } from '@/common/util';

class CreateMask {
  constructor({ el = '#rx-mask', maskClick = () => {} }) {
    this.id = el;
    this.mask = this.createMask(this.id);
    this.mask.addEventListener('click', maskClick);
  }

  createMask(id) {
    let divMask = document.querySelector(id);
    if (!divMask) {
      divMask = document.createElement('div');
      divMask.className = 'animated';
      divMask.id = 'rx-mask';
      divMask.style.display = 'none';
      document.body.appendChild(divMask);
      return divMask;
    }
    return divMask;
  }

  show() {
    this.mask.style.display = '';
    removeClass(this.mask, 'fadeOut');
    addClass(this.mask, 'fadeIn');
    return this;
  }

  hide() {
    // this.mask.style.opacity = 0;
    removeClass(this.mask, 'fadeIn');
    addClass(this.mask, 'fadeOut');
    setTimeout(() => {
      this.mask.style.display = 'none';
      removeClass(this.mask, 'fadeOut');
    }, 500);
    return this;
  }
}
export default CreateMask;
