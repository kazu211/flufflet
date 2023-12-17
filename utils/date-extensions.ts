export { };

declare global {
  interface Date {
      ym(): string;
  }
}

Date.prototype.ym = function () {
  return `${this.getFullYear()}-${('0' +(this.getMonth() + 1)).slice(-2)}`
};
