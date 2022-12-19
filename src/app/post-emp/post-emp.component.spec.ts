import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostEmpComponent } from './post-emp.component';

describe('PostEmpComponent', () => {
  let component: PostEmpComponent;
  let fixture: ComponentFixture<PostEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostEmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
