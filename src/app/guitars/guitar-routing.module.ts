import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {GuitarShellComponent} from './guitar-shell/guitar-shell.component';
import {GuitarDetailComponent} from './guitar-detail/guitar-detail.component';
import {GuitarEditComponent} from './guitar-edit/guitar-edit.component';
import {GuitarEditGuard} from './guitar-edit/guitar-edit-guard.guard';
import {GuitarAddComponent} from './guitar-add/guitar-add.component';

const routes: Routes = [
  {path: '', component: GuitarShellComponent},
  {path: 'add',
    canDeactivate: [GuitarEditGuard],
    component: GuitarAddComponent
  },
  {path: ':id', component: GuitarDetailComponent},
  {path: ':id/edit',
    canDeactivate: [ GuitarEditGuard ],
    component: GuitarEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuitarRoutingModule { }
