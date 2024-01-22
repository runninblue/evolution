import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimelineDetailsService {

  constructor(private http: HttpClient) { }

  timelineUrl = environment.apiUrl + 'settlements/timeline';

  getTimelineDetails() {
    return this.http.get<any[]>(this.timelineUrl);
    // .pipe(
    //   catchError(this.handleError<any[]>('getTimelineDetails', []))
    // );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
