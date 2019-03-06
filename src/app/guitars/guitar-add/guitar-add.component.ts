import {AfterViewInit, Component, ElementRef, OnInit, ViewChildren} from '@angular/core';
import {FormGroup, FormBuilder, FormControlName, Validators} from '@angular/forms';

import { IGuitarBrand } from '../guitar-brand';
import { GuitarBrandService } from '../guitar-brand.service';
import { IGuitar } from '../guitar';
import { GuitarService } from '../guitar.service';
import { Router } from '@angular/router';
import {GenericValidator} from '../../shared/generic-validator';
import {fromEvent, merge, Observable} from 'rxjs';

@Component({
  selector: 'gtr-guitar-add',
  templateUrl: './guitar-add.component.html',
  styleUrls: ['./guitar-add.component.css']
})
export class GuitarAddComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];

  guitarForm: FormGroup;
  pageTitle = 'Add Guitar';
  errorMessage: string;
  guitarBrands: IGuitarBrand[];
  guitars: IGuitar[];
  guitarBrand: IGuitarBrand;
  guitar: IGuitar;

  minRatingNum = 0;
  maxRatingNum = 5;
  minStringQty = 4;
  maxStringQty = 12;
  minFretQty = 10;
  maxFretQty = 30;
  minScaleLength = 20;
  maxScaleLength = 30;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  get isDirty(): boolean {
    return this.guitarForm.dirty;
  }

  constructor(private guitarBrandService: GuitarBrandService,
              private guitarSevice: GuitarService,
              private router: Router,
              private fb: FormBuilder
              ) {
    this.validationMessages = {
      modelNumber: {
        required: 'Model # is required.'
      },
      price: {
        required: 'Price is required.'
      },
      description: {
        required: 'Description is required.'
      },
      rating: {
        required: 'Rating is required.',
        min: `Range is ${this.minRatingNum} to ${this.maxRatingNum}.`,
        max: `Range is ${this.minRatingNum} to ${this.maxRatingNum}.`
      },
      numberOfStrings: {
        required: 'String qty is required.',
        min: `Range is ${this.minStringQty} to ${this.maxStringQty}.`,
        max: `Range is ${this.minStringQty} to ${this.maxStringQty}.`
      },
      numberOfFrets: {
        required: 'Rating is required.',
        min: `Range is ${this.minFretQty} to ${this.maxFretQty}.`,
        max: `Range is ${this.minFretQty} to ${this.maxFretQty}.`
      },
      scaleLength: {
        required: 'Rating is required.',
        min: `Range is ${this.minScaleLength} to ${this.maxScaleLength}.`,
        max: `Range is ${this.minScaleLength} to ${this.maxScaleLength}.`
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);

  }

  ngOnInit() {
    this.guitarBrandService.getGuitarBrands().subscribe(
      (data: IGuitarBrand[]) => {
        this.guitarBrands = data;
        if (this.guitarBrands && this.guitarBrands.length) {
          this.guitarBrand = this.guitarBrands[0];
        }
        console.log('Brands = ' + JSON.stringify(data));
      }
    );

    this.guitarSevice.getGuitars().subscribe(
      data => {
        this.guitars = data;
      },
      error => this.errorMessage = <any>error
    );

    this.guitarSevice.getGuitar(0).subscribe(
      (data: IGuitar) => {
        this.guitar = data;
        console.log('Initialized guitar = ' + JSON.stringify(data));
      },
      (error: any) => this.errorMessage = <any>error
    );

    this.guitarForm = this.fb.group({
      brandId: this.guitarBrands,
      modelNumber: [this.guitar.modelNumber, Validators.required],
      guitarType: 1,
      price: [this.guitar.price, Validators.required],
      description: [this.guitar.description, Validators.required],
      rating: [this.guitar.rating, [Validators.required,
        Validators.min(this.minRatingNum),
        Validators.max(this.maxRatingNum)]],
      stringType: this.guitar.stringType,
      numberOfStrings: [this.guitar.numberOfStrings, [Validators.required,
        Validators.min(this.minStringQty),
        Validators.max(this.maxStringQty)]],
      numberOfFrets: [this.guitar.numberOfFrets, [Validators.required,
        Validators.min(this.minFretQty),
        Validators.max(this.maxFretQty)]],
      scaleLength: [this.guitar.scaleLength, [Validators.required,
        Validators.min(this.minScaleLength),
        Validators.max(this.maxScaleLength)]],
    });

    this.guitarForm.get('brandId').setValue(1 );

    if (this.errorMessage) {
      console.log(this.errorMessage);
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

  addGuitar(): void {
    if (this.guitarForm.valid) {
      if (this.guitarForm.dirty) {
        this.guitar.brandId = this.guitarBrand.id;
        const g = {...this.guitar, ...this.guitarForm.value};
        this.guitarSevice.saveGuitar(g).subscribe(
          () => {
            this.onAddComplete();
          },
          (error: any) => this.errorMessage = <any>error
        );
      } else {
        this.onAddComplete();
      }
    } else {
      this.errorMessage = 'Please correct validation errors.';
    }
  }

  cancel() {
    this.router.navigate(['/guitars']);
  }


  private onAddComplete(): void {
    this.guitarForm.reset(this.guitarForm.value);
    this.router.navigate(['/guitars']);
  }

  onBrand() {
    console.log('Selected guitar brand = ' + JSON.stringify(this.guitarForm.get('brandId').value));
  }

}
