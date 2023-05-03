import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError, catchError } from 'rxjs';
import { ErrorService } from '../error.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly ROOT_URL;

  constructor(private http: HttpClient, private errorService: ErrorService) {
    this.ROOT_URL = 'https://jsonplaceholder.typicode.com';
  }

  public get(uri: string): Observable<any> {
    return this.http.get(`${this.ROOT_URL}/${uri}`)
      .pipe(catchError(this.errorHandler.bind(this)))
  }

  public post(uri: string, payload: Object): Observable<any> {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload)
      .pipe(catchError(this.errorHandler.bind(this)))
  }

  public delete(uri: string, id: number): Observable<any> {
    return this.http.delete(`${this.ROOT_URL}/${uri}/${id}`)
      .pipe(catchError(this.errorHandler.bind(this)))
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}