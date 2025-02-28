import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { PostData } from '../models/post-data';

@Component({
  selector: 'app-new-post-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './new-post-form.component.html',
  styleUrl: './new-post-form.component.scss',
})
export class NewPostFormComponent implements OnInit {
  newPostForm: FormGroup;
  postId: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private postService: PostService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.newPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', [Validators.required, Validators.maxLength(5000)]],
      postedBy: ['', Validators.required],
    });

    //Add particular post data in the form
    this.postId = parseInt(this.route.snapshot.paramMap.get('id'));
    if (this.postId) {
      this.postService.getPostById(this.postId).subscribe((post: PostData) => {
        this.newPostForm.patchValue(post);
      });
    }
  }

  savePost() {
    if (this.newPostForm.invalid) {
      return;
    }
    const post = this.newPostForm.value;
    if (this.postId) {
      this.postService
        .updatePost(this.postId, post)
        .subscribe((result: string) => {
          console.log(result);
          this.router.navigate([`/individual-post/${this.postId}`]);
        });
    } else {
      this.postService.savePost(post).subscribe((result) => {
        console.log(result);
        this.router.navigate(['/posts']);
      });
    }
  }
}
