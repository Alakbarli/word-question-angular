import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextCortexAiService {
  private baseUrl = 'https://api.textcortex.com/v1/texts/blogs';
  private authToken = 'gAAAAABkuTiecuIDUpI-TLrbTvAZOEAmWxaW_eygHtI3TPdY-gB_uFOH_ngV3oSq4mfbqAHA84tr4-5tgvcO8Xle1VcoL5qB0riXCA4O2yMPpGwn9Rrl2NY0T5GcDvw-Xn0tmdmPi5NM';
  constructor(private http: HttpClient) { }
  post(data: string): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data, { headers: this.getHeaders() });
  }
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`
    });
  }
}
