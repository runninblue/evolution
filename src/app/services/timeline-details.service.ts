import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimelineDetailsService {

  constructor(private http: HttpClient) { }

  private timelineUrl = environment.apiUrl + 'settlements/timeline';
  private timelineCyprusUrl = environment.apiUrl + 'settlements/timeline/cyprus';
  private timelineNearEastUrl = environment.apiUrl + 'settlements/timeline/near_east';
  private sliderValues = new Subject<number[]>();
  sliderValues$ = this.sliderValues.asObservable();

  getTimelineStartEnd() {
    return this.http.get<any[]>(this.timelineUrl);
  }

  getTimelineCyprusDetails() {
    return this.http.get<any[]>(this.timelineCyprusUrl);
    // .pipe(
    //   catchError(this.handleError<any[]>('getTimelineDetails', []))
    // );
  }

  setTimeRange(startValue: number, endValue: number): void {
    this.sliderValues.next([startValue, endValue]);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
