import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[gtrMaxNumber][formControlName],[gtrMaxNumber][formControl],[gtrMaxNumber][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: MaxNumberDirective, multi: true}]
})
export class MaxNumberDirective implements Validator {
  @Input() gtrMaxNumber: number;

  constructor() { }

  validate(c: FormControl): {[key: string]: boolean} | null {
    let v = c.value;
    return (v > this.gtrMaxNumber) ? {'gtrMaxNumber': true} : null;
  }
}
