import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostData } from '../models/post-data';
import { PostService } from '../../services/post.service';

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

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.postId = parseInt(this.route.snapshot.paramMap.get('id')) || 0;
    this.getPostById();
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
}
