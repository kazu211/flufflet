import type { GetRequest } from "~/types/types";

export { };

declare global {
  interface Date {
      ym(): string;
      ymj(): string;
      ymo(): GetRequest;
      ymd(): string;
  }
}

Date.prototype.ym = function () {
  return `${this.getFullYear()}-${('0' +(this.getMonth() + 1)).slice(-2)}`
};

Date.prototype.ymj = function () {
  return `${this.getFullYear()}年${('0' +(this.getMonth() + 1)).slice(-2)}月`
};

Date.prototype.ymd = function() {
  return `${this.getFullYear()}-${('0' +(this.getMonth() + 1)).slice(-2)}-${('0' +(this.getDate())).slice(-2)}`
}

Date.prototype.ymo = function() {
  return { year: `${this.getFullYear()}`, month: `${('0' +(this.getMonth() + 1)).slice(-2)}` }
}
