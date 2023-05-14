import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroeDetailComponent } from './components/heroe-detail/heroe-detail.component';

const routes: Routes = [
  {
    path: 'heroes',
    component: HeroesComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'detail/:id',
    component: HeroeDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
