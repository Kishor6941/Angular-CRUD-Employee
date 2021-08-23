import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCrudActionComponent } from './table-crud-action.component';

describe('TableCrudActionComponent', () => {
  let component: TableCrudActionComponent;
  let fixture: ComponentFixture<TableCrudActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCrudActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCrudActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
