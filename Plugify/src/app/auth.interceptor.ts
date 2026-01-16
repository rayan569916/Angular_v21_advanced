import { HttpInterceptor,HttpRequest,HttpHandler,HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Nba} from './services/nba'
import { catchError,switchMap,throwError } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private service:Nba) {}

    intercept(request: HttpRequest<any>,handler: HttpHandler){
        const token = localStorage.getItem('accessToken');

        if (token){
            request=request.clone({
                setHeaders:{
                    Authorization: `Bearer ${token}`
                }
            })
        }

        return handler.handle(request).pipe(
            catchError((res:HttpErrorResponse) => {
                if(res.status===401 && res.error?.error === 'TOKEN_EXPIRED'){
                    return this.service.refreshAPI().pipe(
                        switchMap(res=>{
                            localStorage.setItem('accessToken',res.access_token)

                            const retryReq=request.clone({
                                setHeaders:{
                                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                                }
                            })
                            return handler.handle(retryReq);
                        }),
                        catchError((err)=>{
                            return throwError(() => err);
                        })
                    )
                }
                return throwError(() => res);
                }
            )
        )
    }

}