import { Observable } from 'rxjs';
import { Thing } from '../models/thing.model';
import { Container } from '../models/container.model';

export interface RoomService {
  getThings(): Observable<Thing[]>;
  getContainers(): Observable<Container[]>;
  addTing(dto: Partial<Thing>): Observable<Thing>;
  addContainer(dto: Partial<Container>): Observable<Container>;
  deleteContainer(id: string): Observable<Container>;
  deleteTing(id: string): Observable<Thing>;
  putThing(thingId: string, containerId: string): Observable<Container>;
  removeThing(thingId: string, containerId: string): Observable<Container>;
}
