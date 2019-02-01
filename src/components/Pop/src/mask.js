// import { addClass, removeClass } from '@/common/util';

// window.__$rxPopups = window.__$rxPopups || {};

// class CreateMask {
//   constructor({ el = '#rx-mask', maskClick = () => {}, isShow = false }) {
//     this.id = el;
//     this.mask = this.createMask(this.id);
//     this.mask.addEventListener('click', maskClick);
//     this.isShow = isShow;
//   }

//   createMask(id) {
//     let divMask = document.querySelector(id);
//     if (!divMask) {
//       divMask = document.createElement('div');
//       divMask.className = 'animated';
//       divMask.id = 'rx-mask';
//       divMask.style.display = 'none';
//       document.body.appendChild(divMask);
//       return divMask;
//     }
//     return divMask;
//   }

//   show() {
//     this.mask.style.display = '';
//     removeClass(this.mask, 'fadeOut');
//     addClass(this.mask, 'fadeIn');
//     this.isShow = true;
//     return this;
//   }

//   hide() {
//     if (!this.isShow) return;
//     const list = document.querySelectorAll('.rx-pop');
//     const isHide = Array.from(list).map(item => {
//       // if (item.style.display === 'none') {
//       //   console.log();
//       // }
//       console.log(item);
//     });
//     removeClass(this.mask, 'fadeIn');
//     addClass(this.mask, 'fadeOut');
//     setTimeout(() => {
//       this.mask.style.display = 'none';
//       removeClass(this.mask, 'fadeOut');
//       this.isShow = false;
//     }, 400);
//     return this;
//   }
// }
// export default CreateMask;
