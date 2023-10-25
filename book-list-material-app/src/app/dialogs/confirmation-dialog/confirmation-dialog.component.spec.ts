import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ConfirmDialogComponent } from "./confirmation-dialog.component";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/compiler";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

const matDialogMock = {
  close: () => null
}

describe('Confirm dialog component', () => {

  let component:ConfirmDialogComponent;
  let fixture:ComponentFixture<ConfirmDialogComponent>;

  beforeEach( () => {

    TestBed.configureTestingModule({
      declarations: [
        ConfirmDialogComponent
      ],
      providers: [
        // MatDialogRef,
        // MAT_DIALOG_DATA
        {
          provide:MAT_DIALOG_DATA,
          useValue: {}
        },
        {
          provide:MatDialogRef,
          useValue: matDialogMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

  });

  beforeEach( () => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onConfirm send true value', () => {

    // const service = fixture.debugElement.injector.get(MatDialogRef)
    const service = TestBed.inject(MatDialogRef);
    const spy = spyOn(service,'close');
    component.onConfirm();
    expect(spy).toHaveBeenCalledWith(true);

  });

  it('onDismiss send false value', () => {

    // const service = fixture.debugElement.injector.get(MatDialogRef)
    const service = TestBed.inject(MatDialogRef);
    const spy = spyOn(service,'close');
    component.onDismiss();
    expect(spy).toHaveBeenCalledWith(false);

  });


});
