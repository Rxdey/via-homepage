const transferDom = {
  // bind(el) {
  //   // console.dir(el);
  // },
  inserted(el) {
    document.body.appendChild(el);
  },
  // update(el, binding) {},
  unbind(el) {
    document.body.removeChild(el);
  }
};
export default transferDom;
