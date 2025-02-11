import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemReorderEventDetail } from '@ionic/angular';

import { ListePage } from './liste.page';

const routes: Routes = [
  {
    path: '',
    component: ListePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListePageRoutingModule {}
