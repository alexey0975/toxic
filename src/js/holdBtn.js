export default function holdBtn(doFn, cancelFn = () => false) {
  this.addEventListener('mousedown', () => {
    const timeOut = setTimeout(() => {
      const interval = setInterval(() => {
        doFn();
        cancelFn() && clearInterval(interval);
      }, 50);

      this.addEventListener('mouseup', () => {
        clearInterval(interval);
      });

      this.addEventListener('mouseout', () => {
        clearInterval(interval);
      });
    }, 1000);

    this.addEventListener('mouseup', () => {
      clearTimeout(timeOut);
    });

    this.addEventListener('mouseout', () => {
      clearTimeout(timeOut);
    });
  });
}
