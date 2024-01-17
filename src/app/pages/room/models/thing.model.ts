export class Thing {
  id: string = '';
  name: string = '';
  description: string = '';
  length: number = 0;
  width: number = 0;
  height: number = 0;
  capacity: number = 0;
  isUsed: boolean = false;

  constructor(fields: Partial<Thing>) {
    Object.assign(this, fields);
  }
}
