import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostData } from '../pages/models/post-data';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  api: string = 'http://localhost:8080/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  createNewPost(post: PostData): Observable<PostData> {
    return this.http.post<PostData>(
      this.api.concat('/posts'),
      post,
      this.httpOptions,
    );
  }

  getAllPosts(): Observable<PostData[]> {
    return this.http.get<PostData[]>(
      this.api.concat('/posts'),
      this.httpOptions,
    );
  }

  getPostById(postId: number): Observable<PostData> {
    return this.http.get<PostData>(
      this.api + `/posts/${postId}`,
      this.httpOptions,
    );
  }

  searchPostByTitle(title: string): Observable<PostData[]> {
    return this.http.get<PostData[]>(
      this.api + `/posts/search/${title}`,
      this.httpOptions,
    );
  }

  likePost(postId: number): Observable<string> {
    return this.http.patch<string>(
      this.api + `/posts/${postId}/like`,
      this.httpOptions,
      {
        responseType: 'text' as 'json',
      },
    );
  }
}
