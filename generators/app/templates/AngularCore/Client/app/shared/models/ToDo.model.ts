export class Todo {
  id: number;
  todo = '';
  createDate: Date = new Date();
  complete = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
