import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[gtrMinNumber][formControlName],[gtrMinNumber][formControl],[gtrMinNumber][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinNumberDirective, multi: true}]
})
export class MinNumberDirective implements Validator {
  @Input() gtrMinNumber: number;

  constructor() { }

  validate(c: FormControl): {[key: string]: boolean} | null {
    let v = c.value;
    return (v < this.gtrMinNumber) ? {'gtrMinNumber': true} : null;
  }

}
