import {AfterViewInit, Component, ElementRef, OnInit, ViewChildren} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormBuilder, Validators, FormControlName} from '@angular/forms';
import { fromEvent, merge, Observable } from 'rxjs';

import {IGuitar} from '../guitar';
import {IGuitarBrand} from '../guitar-brand';
import {GuitarService} from '../guitar.service';
import {GuitarBrandService} from '../guitar-brand.service';

import { GenericValidator } from '../../shared/generic-validator';

@Component({
  selector: 'gtr-guitar-edit',
  templateUrl: './guitar-edit.component.html',
  styleUrls: ['./guitar-edit.component.css']
})
export class GuitarEditComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];

  get isDirty(): boolean {
    return this.guitarForm.dirty;
  }

  guitarForm: FormGroup;
  pageTitle = 'Guitar Edit';
  errorMessage: string;
  guitar: IGuitar;
  guitarBrand: IGuitarBrand;
  minNum = 0;
  maxNum = 5;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private guitarService: GuitarService,
              private guitarBrandService: GuitarBrandService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) {

    this.validationMessages = {
      price: {
        required: 'Price is required.'
      },
      description: {
        required: 'Description is required.'
      },
      rating: {
        required: 'Rating is required.',
        min: `Range is ${this.minNum} to ${this.maxNum}.`,
        max: `Range is ${this.minNum} to ${this.maxNum}.`
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);

  }


  ngOnInit(): void {
    this.guitarForm = this.fb.group({
      price: [0, Validators.required],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      rating: [this.maxNum, [Validators.required,
                   Validators.min(this.minNum),
                   Validators.max(this.maxNum)]]
    });

    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getGuitar(id);
    }
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element of the form.
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChages observable
    merge(this.guitarForm.valueChanges, ...controlBlurs).subscribe(
      value => {
        this.displayMessage = this.genericValidator.processMessages(this.guitarForm);
      }
    );
  }

  getGuitar(id: number) {
    this.guitarService.getGuitar(id).subscribe(
      guitar => {
        this.displayGuitar(guitar);
        this.pageTitle += ' ' + this.guitar.modelNumber;
      },
      error => this.errorMessage = <any>error
    );

    if (this.guitar) {
      this.guitarBrandService.getGuitarBrand(this.guitar.brandId).subscribe(
        brand => {
          this.guitarBrand = brand;
          this.pageTitle = `Editing ${this.guitarBrand.brandName} Guitar - Model # ${this.guitar.modelNumber}`;
        },
        error => this.errorMessage = <any>error
      );
    }
  }

  displayGuitar(guitar: IGuitar): void {
    if (this.guitarForm) {
      this.guitarForm.reset();
    }

    this.guitar = guitar;

    this.guitarForm.patchValue({
      price: this.guitar.price,
      description: this.guitar.description,
      rating: this.guitar.rating
    });

  }

  saveGuitar(): void {
    if (this.guitarForm.valid) {
      if (this.guitarForm.dirty) {
        const g = {...this.guitar, ...this.guitarForm.value};
        this.guitarService.saveGuitar(g)
          .subscribe(() => {
              this.onSaveComplete();
            },
            (error: any) => this.errorMessage = <any>error
          );
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors';
    }
  }

  cancel(): void {
    this.router.navigate(['/guitars']);
  }

  deleteGuitar() {
    if (this.guitar.id) {
      if (confirm(`Really delete guitar model # ${this.guitar.modelNumber}?`)) {
        this.guitarService.deleteGuitar(this.guitar.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    } else {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    this.guitarForm.reset(this.guitarForm.value);
    this.router.navigate(['/guitars']);
  }

}
