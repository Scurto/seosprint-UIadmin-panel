import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeoSiteComponent } from './seo-site.component';


const routes: Routes = [
    {
        path: '',
        component: SeoSiteComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SeoSiteRoutingModule {}