import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Nba {
  private baseUrl =
    'https://api.allorigins.win/raw?url=https://api.balldontlie.io/v2';

  constructor(private http: HttpClient) {}

  getPlayerDetails(): Observable<any>{
    return this.http.get(`${this.baseUrl}/players`)
  }
}
