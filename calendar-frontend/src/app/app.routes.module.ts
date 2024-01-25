import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule, RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
