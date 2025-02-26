import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostData } from '../models/post-data';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  postList: PostData[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((postList: PostData[]) => {
      this.postList = postList;
    });
  }
}
