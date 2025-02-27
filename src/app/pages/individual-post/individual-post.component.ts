import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { PostData } from '../models/post-data';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { CommentSection } from '../models/comment-section';

@Component({
  selector: 'app-individual-post',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './individual-post.component.html',
  styleUrl: './individual-post.component.scss',
})
export class IndividualPostComponent implements OnInit {
  postId: number;
  postData: PostData;
  postList: PostData[] = [];
  commentsForm: FormGroup;
  commentList: CommentSection[] = [];

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private commentService: CommentService,
  ) {}

  ngOnInit(): void {
    this.postId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.getPostById();
    this.getCommentsByPost();

    this.commentsForm = this.formBuilder.group({
      postedBy: [null, Validators.required],
      comment: [null, Validators.required],
    });
  }

  postComment() {
    const comments = this.commentsForm.value;
    if (!comments.comment) {
      alert('Please provide a comment before posting!');
    } else {
      this.commentService.createComment(this.postId, comments).subscribe(
        (result) => {
          console.log(result);
          alert('Comment posted successfully!');

          this.commentsForm.reset();

          this.getCommentsByPost();
        },
        (error) => {
          console.error('Error posting comment:', error);
          alert('Failed to post a comment.');
        },
      );
    }
  }

  getCommentsByPost() {
    this.commentService.getAllCommmentsByPost(this.postId).subscribe(
      (commentList: CommentSection[]) => {
        this.commentList = commentList;
      },
      (error) => {
        console.error('Something went wrong:', error);
      },
    );
  }

  getPostById() {
    if (this.postId) {
      this.postService.getPostById(this.postId).subscribe(
        (postData: PostData) => {
          this.postData = postData;
          this.getCommentsByPost();
        },
        (error) => {
          console.error('Something went wrong:', error);
        },
      );
    }
  }

  likePost(): void {
    this.postService.likePost(this.postId).subscribe(
      (result: string) => {
        if (result === 'success') {
          alert('Post liked successfully');
          if (this.postData) {
            this.postData.likeCount += 1;
          }
        }
      },
      (error) => {
        console.error('Error liking post:', error);
        alert('Failed to like the post.');
      },
    );
  }

  getAllpost(): void {
    this.postService.getAllPosts().subscribe((postList: PostData[]) => {
      this.postList = postList;
    });
  }

  deletePost(postId: number): void {
    const confirmation = confirm('Are you sure you want to delete this post?');
    if (confirmation) {
      this.postService.deletPostById(postId).subscribe((result: string) => {
        if (result === 'success') {
          alert('Post deleted successfully');
          this.router.navigate(['/posts']);
        }
      });
    }
  }
}
