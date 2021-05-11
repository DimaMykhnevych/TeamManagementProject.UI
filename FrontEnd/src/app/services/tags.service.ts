import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class TagsService {
    constructor(private http: HttpClient) {}

    public getTags() {
      return this.http.get(environment.apiRoutes.tags.get, { withCredentials: true });
    }

    public create(label: string) {
      const tag = {
        label: label
      };
      return this.http.post(environment.apiRoutes.tags.post, tag, { withCredentials: true });
    }
}
