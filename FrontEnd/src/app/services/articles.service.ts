import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleModel } from '../models/ArticleModel';
import { ArticleMenuModel } from '../models/ArticleMenuModel';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Article } from '../models/Article';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
    constructor(private http: HttpClient) {}

    public getById(id: ArticleMenuModel['id']): Observable<ArticleModel> {
        const url = `${environment.apiRoutes.articles.getById}/${id}`;
        const parameters = { withCredentials: true };
        return this.http.get<ArticleModel>(url, parameters);
    }

    public getGroupedByTag() {
      return this.http.get(environment.apiRoutes.articles.groupedGet, { withCredentials: true });
    }

    public getForCurrentUser() {
      return this.http.get(environment.apiRoutes.articles.getForCurrentUser, { withCredentials: true })
    }

    public create(article: Article) {
      return this.http.post(environment.apiRoutes.articles.post, article, { withCredentials: true });
    }

    public edit(article: Article, id: string) {
      return this.http.put(environment.apiRoutes.articles.put + `${id}`, article, { withCredentials: true });
    }

    public delete(article: ArticleModel): Observable<any> {
      const url = `${environment.apiRoutes.articles.delete}/${article.id}`;
      const parameters = { withCredentials: true };
      return this.http.delete(url, parameters);
    }
}
