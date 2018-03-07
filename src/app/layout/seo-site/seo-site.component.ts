import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seo-site',
  templateUrl: './seo-site.component.html',
  styleUrls: ['./seo-site.component.scss']
})
export class SeoSiteComponent implements OnInit {
  
  isReadyToStart: boolean = false;

  countUrls: string;
  countAdvertise: string;
  countMove: string;
  siteFreeze: string;
  advertiseFreeze: string;
  oneTimeChanelLink: string;
  isOneTimeTask: boolean = false;

  autoCloseAdvertiseFlag: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  apply() {}
  start() {}

  clear() {
    // this.mainTaskId = '';
    this.countUrls = null;
    this.countAdvertise = null;
    this.countMove = null;
    this.siteFreeze = null;
    this.advertiseFreeze = null;
    // this.taskCtrl.reset();
    // this.startHtmlString = '';
    // this.finishHtmlString = '';
    // this.isReadyToStart = false;
    // this.descriptionContainerString = '';
    // this.selectedTaskId = null;
    this.oneTimeChanelLink = null;
  }

  autoCloseAdvertise(event) {
    // console.log('event', event.checked);
    // let autoClose: string = event.checked ? "" : "no";
    // this.service.autoCloseAdvertise(autoClose).subscribe(
    //   data => {
    //     console.log("autoCloseAdvertise -> ", data);
    //   },
    //   // error => alert(error),
    //   () => console.log("request completed")
    // );
  }

}
