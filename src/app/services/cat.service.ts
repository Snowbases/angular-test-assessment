import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  constructor(private httpClient: HttpClient) {}

  getTags(): Observable<any> {
    return this.httpClient.get(`https://cataas.com/api/tags`);
  }

  getCatFactsText(): Observable<any> {
    return this.httpClient.get(`https://meowfacts.herokuapp.com`);
  }

  getRandomGeneratedCatImage(data: { tag: string; factsText: string }): Observable<any> {
    const { tag, factsText } = data;

    return this.httpClient.get(`https://cataas.com/c/${tag}/s/${factsText}`, {
      responseType: 'blob',
      observe: 'response'
    });
  }
}
