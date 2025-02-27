import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostData } from '../models/post-data';
import { PostService } from '../../services/post.service';
import { CommentSection } from '../models/comment-section';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-post-view-only',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './post-view-only.component.html',
  styleUrl: './post-view-only.component.scss',
})
export class PostViewOnlyComponent implements OnInit {
  postId: number;
  postData: PostData;
  commentList: CommentSection[] = [];

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private commentService: CommentService,
  ) {}

  ngOnInit(): void {
    this.postId = parseInt(this.route.snapshot.paramMap.get('id')) || 0;
    this.getPostById();
    this.getCommentsByPost();
  }

  getCommentsByPost() {
    if (this.postId) {
      this.commentService.getAllCommmentsByPost(this.postId).subscribe(
        (commentList: CommentSection[]) => {
          this.commentList = commentList;
        },
        (error) => {
          console.error('Something went wrong:', error);
        },
      );
    }
  }

  getPostById() {
    if (this.postId) {
      this.postService
        .getPostById(this.postId)
        .subscribe((postData: PostData) => {
          this.postData = postData;
          this.getCommentsByPost();
        });
    }
  }

  likePost(): void {
    this.postService.likePost(this.postId).subscribe(
      (result: string) => {
        if (result === 'success') {
          alert('Post liked successfully');
          this.getPostById();
        }
      },
      (error) => {
        console.error('Error liking post:', error);
        alert('Failed to like the post. Please try again later.');
      },
    );
  }
}
