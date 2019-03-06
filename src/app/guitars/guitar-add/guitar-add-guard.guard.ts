import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { GuitarAddComponent } from './guitar-add.component';

@Injectable()
export class GuitarAddGuard implements CanDeactivate<GuitarAddComponent> {
  canDeactivate(component: GuitarAddComponent): boolean {
    if (component.isDirty) {
      const guitarModel = component.guitar.modelNumber || ' New Guitar';
      return confirm(`Navigate away and lose all changes to ${guitarModel}`);
    }
    return true;
  }
}

