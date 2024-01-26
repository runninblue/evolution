import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, Subject, catchError, debounce, debounceTime, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettlementsDetailsService {
  private rangeUrl = environment.apiUrl + 'settlements/range';
  LongLat = new Subject<{long: number, lng: number}>();

  constructor(private http: HttpClient) { }

  getSettlementsInRange(rangeVals: number[]): Observable<any> {
    const url = `${this.rangeUrl}/${rangeVals[0]}/${rangeVals[1]}`;
    return this.http.get<any[]>(url);
  }
}
