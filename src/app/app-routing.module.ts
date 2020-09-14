import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillGroupComponenet } from './billGroup/billGroup.component';


const routes: Routes = [
  {path: 'billGroup', component: BillGroupComponenet }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
