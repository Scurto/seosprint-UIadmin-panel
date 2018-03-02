import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeoYoutubeComponent } from './seo-youtube.component';

const routes: Routes = [
    {
        path: '',
        component: SeoYoutubeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SeoYoutubeRoutingModule {}