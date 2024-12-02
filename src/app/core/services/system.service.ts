import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { MetaData, Rates, Systems } from '../models/system.model';
import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class SystemService {
  private http = inject(HttpClient);

  getResources(): Observable<Systems[]> {
    return this.http
      .get<{ meta: MetaData; data: Systems[] }>(
        environment.apiUrl + '/v3/systems'
      )
      .pipe(map((res) => res.data));
  }

  getResource(id: string): Observable<Systems> {
    return this.http
      .get<{ data: Systems }>(environment.apiUrl + '/v3/systems/' + id)
      .pipe(map((res) => res.data));
  }

  getRatesAssociated(id: string) : Observable<Rates> {
    return this.http.get(environment.apiUrl + '/json/rates/' + id)
  }
}
