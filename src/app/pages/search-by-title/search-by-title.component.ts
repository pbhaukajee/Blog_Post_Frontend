import { Component, OnInit } from '@angular/core';
import { PostData } from '../models/post-data';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-by-title',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './search-by-title.component.html',
  styleUrl: './search-by-title.component.scss',
})
export class SearchByTitleComponent implements OnInit {
  postData: PostData[] = [];
  title: string = '';
  searchPerformed: boolean = false;
  noPostsFound: boolean = false;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    if (this.title) {
      this.searchPostByTitle();
    }
  }

  searchPostByTitle() {
    this.searchPerformed = true;
    this.postService.searchPostByTitle(this.title).subscribe(
      (postData: PostData[]) => {
        if (postData.length > 0) {
          this.postData = postData;
          this.noPostsFound = false;
        } else {
          this.postData = [];
          this.noPostsFound = true;
        }
      },
      (error) => {
        console.error('Something went wrong:', error);
      },
    );
  }
}
