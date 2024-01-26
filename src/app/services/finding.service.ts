import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FindingService {

  constructor(private http: HttpClient) { }

  private findingsUrl = environment.apiUrl + 'settlements/findings/near_east';

  getNearEastFindings(rangeVals: number[]): Observable<any> {
    const url = `${this.findingsUrl}`
    return this.http.get<any[]>(this.findingsUrl);
  }
}
