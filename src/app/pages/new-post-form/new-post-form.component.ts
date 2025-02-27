import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-new-post-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './new-post-form.component.html',
  styleUrl: './new-post-form.component.scss',
})
export class NewPostFormComponent implements OnInit {
  newPostForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private postService: PostService,
  ) {}
  ngOnInit(): void {
    this.newPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', [Validators.required, Validators.maxLength(5000)]],
      postedBy: ['', Validators.required],
      img: ['', Validators.required],
    });
  }

  createPost() {
    if (this.newPostForm.invalid) {
      return;
    }

    const post = this.newPostForm.value;
    this.postService.createNewPost(post).subscribe((result) => {
      console.log(result);
      this.router.navigate(['/posts']);
    });
  }
}
