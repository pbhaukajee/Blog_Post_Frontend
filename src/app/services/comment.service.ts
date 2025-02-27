import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentSection } from '../pages/models/comment-section';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  api: string = 'http://localhost:8080/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  createComment(
    postId: number,
    comments: CommentSection,
  ): Observable<CommentSection> {
    const params = {
      postId: postId,
    };

    return this.http.post<CommentSection>(
      this.api.concat('/posts/comments/create'),
      comments,
      {
        params,
      },
    );
  }

  getAllCommmentsByPost(postId: number): Observable<CommentSection[]> {
    return this.http.get<CommentSection[]>(
      this.api + `/posts/comments/${postId}`,
      this.httpOptions,
    );
  }
}
