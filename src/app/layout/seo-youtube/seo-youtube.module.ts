import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoYoutubeRoutingModule } from './seo-youtube-routing.module';
import { SeoYoutubeComponent } from './seo-youtube.component';

@NgModule({
  imports: [CommonModule, SeoYoutubeRoutingModule],
    declarations: [SeoYoutubeComponent]
})
export class SeoYoutubeModule { }
