import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TaskDetialPage } from './task-detial.page';

describe('TaskDetialPage', () => {
  let component: TaskDetialPage;
  let fixture: ComponentFixture<TaskDetialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDetialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
