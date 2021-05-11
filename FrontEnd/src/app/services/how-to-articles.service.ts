import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HowToArticleModel } from '../models/HowToArticleModel';

@Injectable({
  providedIn: 'root'
})
export class HowToArticlesService {
  constructor(private http: HttpClient) { }

  public getAll(searchQuery: string = ''): Observable<HowToArticleModel[]> {
    const parameters = { withCredentials: true };

    if (searchQuery !== '')
    {
      parameters[`params`] = new HttpParams().append('search', searchQuery);
    }

    return this.http.get<HowToArticleModel[]>(
      environment.apiRoutes.howToArticles.get, parameters);
  }

  public create(article: HowToArticleModel): Observable<any> {
    const parameters = { withCredentials: true };
    return this.http.post(
      environment.apiRoutes.howToArticles.post, article, parameters
    );
  }

  public delete(article: HowToArticleModel): Observable<any> {
    const url = `${environment.apiRoutes.howToArticles.delete}/${article.id}`;
    const parameters = { withCredentials: true };
    return this.http.delete(url, parameters);
  }

  public edit(id: HowToArticleModel['id'], article: HowToArticleModel): Observable<any> {
    const url = `${environment.apiRoutes.howToArticles.edit}/${id}`;
    const parameters = { withCredentials: true };
    return this.http.put(url, article, parameters);
  }
}
