import { ComponentFixture, TestBed, inject } from "@angular/core/testing";
import { CartComponent } from "./cart.component";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from "src/app/services/book.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "src/app/models/book.model";

// export interface Book {
//   id?: string;
//   name: string;
//   author: string;
//   isbn: string;
//   description?: string;
//   photoUrl?: string;
//   price?: number;
//   amount?: number;
// }

const listBook:Book[] = [
  {
    name:'',
    author: '',
    isbn: '',
    price:15,
    amount:2
  },
  {
    name:'',
    author: '',
    isbn: '',
    price:20,
    amount:1
  },
  {
    name:'',
    author: '',
    isbn: '',
    price:8,
    amount:7
  }
];

describe('Cart component', () => {

  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let service:BookService;


  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        // CartComponent
      ],
      providers: [
        BookService,
        CartComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

  });

  beforeEach( () => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = fixture.debugElement.injector.get(BookService);
    spyOn(service,'getBooksFromCart').and.callFake( () => listBook)

  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should create', inject([CartComponent], (testComponent:CartComponent) => {
    expect(testComponent).toBeTruthy();
  }));

  it('getTotalPrice returns an amount', () => {
    const totalPrice = component.getTotalPrice(listBook);
    expect(totalPrice).toBeGreaterThan(0);
    expect(totalPrice).not.toBeNull();
  });

  it('onInputNumberChange increments correctly', () => {
    const action = 'plus';
    const book = {
      name:'',
      author: '',
      isbn: '',
      price:15,
      amount:2
    };

    // const service = (component as any)._bookService;
    // const service2 = component["_bookService"];
    // const service = fixture.debugElement.injector.get(BookService);

    const spy1 = spyOn(service,'updateAmountBook').and.callFake( () => null);
    const spy2 = spyOn(component, 'getTotalPrice').and.callFake( () => null);

    expect(book.amount).toBe(2);

    component.onInputNumberChange(action,book);

    expect(book.amount === 3).toBeTrue();

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();

  });

  it('onInputNumberChange decrements correctly', () => {
    const action = 'minus';
    const book = {
      name:'',
      author: '',
      isbn: '',
      price:15,
      amount:3
    };

    // const service = (component as any)._bookService;
    // const service2 = component["_bookService"];
    // const service = fixture.debugElement.injector.get(BookService);

    const spy1 = spyOn(service,'updateAmountBook').and.callFake( () => null);
    const spy2 = spyOn(component, 'getTotalPrice').and.callFake( () => null);

    expect(book.amount).toBe(3);

    component.onInputNumberChange(action,book);

    expect(book.amount).toBe(2);

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();

  });

  it('onClearBooks works correctly', () => {

    const spy1 = spyOn((component as any), '_clearListCartBook').and.callThrough();
    const spy2 = spyOn(service, 'removeBooksFromCart').and.callFake( () => null);

    component.listCartBook = listBook;
    component.onClearBooks();

    expect(component.listCartBook.length).toBe(0);

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();

  })

});
