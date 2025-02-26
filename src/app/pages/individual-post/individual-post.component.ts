import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { PostData } from '../models/post-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-individual-post',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './individual-post.component.html',
  styleUrl: './individual-post.component.scss',
})
export class IndividualPostComponent implements OnInit {
  postId: number;
  postData: PostData;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.postId = parseInt(this.route.snapshot.paramMap.get('id'));
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
