import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  commentsForm: FormGroup;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private commentService: CommentService,
  ) {}

  ngOnInit(): void {
    this.postId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.getPostById();

    this.commentsForm = this.formBuilder.group({
      postedBy: [null, Validators.required],
      comment: [null, Validators.required],
    });
  }

  postComment() {
    const comments = this.commentsForm.value;
    this.commentService.createComment(this.postId, comments).subscribe(
      (result) => {
        console.log(result);
        alert('Comment posted successfully!');
      },
      (error) => {
        console.error('Error posting comment:', error);
        alert('Failed to post a comment.');
      },
    );
  }

  getPostById() {
    if (this.postId) {
      this.postService
        .getPostById(this.postId)
        .subscribe((postData: PostData) => {
          this.postData = postData;
        });
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
}
