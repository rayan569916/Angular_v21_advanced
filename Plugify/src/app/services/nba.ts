import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { config } from './config';
import { AuthResponse } from '../features/interface';

@Injectable({
  providedIn: 'root',
})
export class Nba {
  private balldontlieBaseUrl =config.balldontlie;
  private wikipediaBaseUrl =config.wikipedia;
  private apiBaseUrl=`${config.apiBaseUrl}`;

  private authToken="b096bbb1-b477-4fa7-a194-21304fbaeeaa";

  private balldontlieHeader = new HttpHeaders({
    'Authorization':this.authToken
  })

  constructor(private http: HttpClient) {}

  getPlayerDetails(): Observable<any>{
    const headers=this.balldontlieHeader;
    return this.http.get(`${this.balldontlieBaseUrl}/v1/players`,{ headers });
  }

  getPlayerSummaryFromWikipedia(player:string): Observable<any>{
    return this.http.get(`${this.wikipediaBaseUrl}/summary/${player}`);
  }

  getPlayerMediaListFromWikipedia(player:string): Observable<any>{
    return this.http.get(`${this.wikipediaBaseUrl}/media-list/${encodeURIComponent(player)}`);
  }

  loginFlaskAPI(payload: {email:string,password:string}): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiBaseUrl}/auth/login`,payload).pipe(
      tap((res:AuthResponse)=>{
        localStorage.setItem('accessToken',res.access_token);
        localStorage.setItem('refreshToken',res.refresh_token);
      })
    );
  }

  signupFlaskAPI(payload:{email:string,password:string}): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiBaseUrl}/auth/signup`,payload)
    .pipe(tap((res:AuthResponse)=>{
        localStorage.setItem('accessToken',res.access_token);
        localStorage.setItem('refreshToken',res.refresh_token);
    }));
  }

  refreshAPI(): Observable<any>{
    const token=localStorage.getItem('refreshToken');
    return this.http.post(`${this.apiBaseUrl}/auth/refresh`,{},{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
  }

  getNbaSummary(): Observable<any>{
    const token=localStorage.getItem('accessToken')
    return this.http.get(`${this.apiBaseUrl}/nba//nba_summary`)
  }
}