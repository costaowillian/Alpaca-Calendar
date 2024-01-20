import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './screens/calendar/calendar.component';
import { AccessPageComponent } from './screens/access-page/access-page.component';
import { GuardGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CalendarComponent,
    canActivate: [GuardGuard],
    children: [{ path: 'home', component: CalendarComponent }],
  },
  { path: 'access-page', component: AccessPageComponent },
  { path: '**', redirectTo: 'access-page' }, // Redireciona para 'access-page' se a rota não for reconhecida
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
