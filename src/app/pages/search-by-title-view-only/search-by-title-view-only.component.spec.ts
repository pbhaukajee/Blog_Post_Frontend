import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByTitleViewOnlyComponent } from './search-by-title-view-only.component';

describe('SearchByTitleViewOnlyComponent', () => {
  let component: SearchByTitleViewOnlyComponent;
  let fixture: ComponentFixture<SearchByTitleViewOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchByTitleViewOnlyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchByTitleViewOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
