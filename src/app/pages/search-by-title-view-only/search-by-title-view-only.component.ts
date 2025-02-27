import { Component, OnInit } from '@angular/core';
import { PostData } from '../models/post-data';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-by-title-view-only',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './search-by-title-view-only.component.html',
  styleUrl: './search-by-title-view-only.component.scss',
})
export class SearchByTitleViewOnlyComponent implements OnInit {
  postData: PostData[] = [];
  title: string = '';
  searchPerformed: boolean = false;
  noPostFound: boolean = false;

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
          this.noPostFound = false;
        } else {
          this.postData = [];
          this.noPostFound = true;
        }
      },
      (error) => {
        console.error('Something went wrong:', error);
      },
    );
  }
}
