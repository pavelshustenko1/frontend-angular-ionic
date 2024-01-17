import { Thing } from './thing.model';

export class Container {
  id: string = '';
  name: string = '';
  description: string = '';
  length: number = 0;
  width: number = 0;
  height: number = 0;
  capacity: number = 0;
  availableCapacity: number = 0;
  thingsInside: string[] = [];

  constructor(fields: Partial<Container>) {
    Object.assign(this, fields);
  }
}
