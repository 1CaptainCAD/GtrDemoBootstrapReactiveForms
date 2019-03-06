import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { GuitarRoutingModule } from './guitar-routing.module';
import { GuitarShellComponent } from './guitar-shell/guitar-shell.component';
import { GuitarShellBrandListComponent } from './guitar-shell/guitar-shell-brand-list.component';
import { GuitarBrandService } from './guitar-brand.service';
import { GuitarService } from './guitar.service';
import { GuitarShellListComponent } from './guitar-shell/guitar-shell-list.component';
import { SharedModule } from '../shared/shared.module';
import { GuitarDetailComponent } from './guitar-detail/guitar-detail.component';
import { GuitarEditComponent } from './guitar-edit/guitar-edit.component';
import { GuitarEditGuard } from './guitar-edit/guitar-edit-guard.guard';
import { GuitarAddComponent } from './guitar-add/guitar-add.component';

@NgModule({
  declarations: [
    GuitarShellComponent,
    GuitarShellBrandListComponent,
    GuitarShellListComponent,
    GuitarDetailComponent,
    GuitarEditComponent,
    GuitarAddComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    GuitarRoutingModule,
    CurrencyMaskModule
  ],
  providers: [
    GuitarBrandService,
    GuitarService,
    GuitarEditGuard
  ]
})
export class GuitarModule { }
