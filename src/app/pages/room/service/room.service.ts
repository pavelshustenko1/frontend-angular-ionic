import { Injectable } from '@angular/core';
import { RoomService } from '../interfaces/room-service.interface';
import { Thing } from '../models/thing.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Container } from '../models/container.model';

@Injectable()
export class RoomSeerviceImpl implements RoomService {
  constructor(private httpClient: HttpClient) {}

  getThings(): Observable<Thing[]> {
    return this.httpClient.get<Thing[]>(`${environment.baseUrl}/things`);
  }

  addTing(dto: Partial<Thing>): Observable<Thing> {
    return this.httpClient.post<Thing>(`${environment.baseUrl}/things`, dto);
  }

  deleteTing(id: string): Observable<Thing> {
    return this.httpClient.delete<Thing>(`${environment.baseUrl}/things/${id}`);
  }

  getContainers(): Observable<Container[]> {
    return this.httpClient.get<Container[]>(
      `${environment.baseUrl}/containers`
    );
  }

  addContainer(dto: Partial<Container>): Observable<Container> {
    return this.httpClient.post<Container>(
      `${environment.baseUrl}/containers`,
      dto
    );
  }

  deleteContainer(id: string): Observable<Container> {
    return this.httpClient.delete<Container>(
      `${environment.baseUrl}/containers/${id}`
    );
  }

  putThing(thingId: string, containerId: string): Observable<Container> {
    return this.httpClient.post<Container>(`${environment.baseUrl}/actions`, {
      thingId,
      containerId,
    });
  }

  removeThing(thingId: string, containerId: string): Observable<Container> {
    return this.httpClient.post<Container>(
      `${environment.baseUrl}/actions/remove`,
      {
        thingId,
        containerId,
      }
    );
  }
}
