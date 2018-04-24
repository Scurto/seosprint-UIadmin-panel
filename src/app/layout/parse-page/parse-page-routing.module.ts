import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParsePageComponent } from './parse-page.component';

const routes: Routes = [
    {
        path: '',
        component: ParsePageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ParsePageRoutingModule {}
