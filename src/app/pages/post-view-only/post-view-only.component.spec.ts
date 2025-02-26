import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostViewOnlyComponent } from './post-view-only.component';

describe('PostViewOnlyComponent', () => {
  let component: PostViewOnlyComponent;
  let fixture: ComponentFixture<PostViewOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostViewOnlyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostViewOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
