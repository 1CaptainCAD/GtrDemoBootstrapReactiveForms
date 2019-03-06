import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { GuitarEditComponent } from './guitar-edit.component';

@Injectable()
export class GuitarEditGuard implements CanDeactivate<GuitarEditComponent> {
  canDeactivate(component: GuitarEditComponent): boolean {
    if (component.isDirty) {
      const guitarModel = component.guitar.modelNumber || ' Edit Guitar';
      return confirm(`Navigate away and lose all changes to ${guitarModel}`);
    }
    return true;
  }
}

