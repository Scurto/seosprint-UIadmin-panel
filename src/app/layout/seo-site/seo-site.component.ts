import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { SitesTask } from '../../shared/SitesTask';
import { SharedService } from '../../shared/services/SharedService';
import { SitesService } from '../../shared/services/SitesService';
import 'rxjs/add/observable/interval';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import 'rxjs/add/operator/toPromise';
import { Subscription } from "rxjs";
import { routerTransition } from '../../router.animations';
import { TransferModel } from '../../shared/TransferModel';

@Component({
  selector: 'app-seo-site',
  templateUrl: './seo-site.component.html',
  styleUrls: ['./seo-site.component.scss'],
  providers: [SitesService],
  animations: [routerTransition()]
})
export class SeoSiteComponent implements OnInit {
  
  taskCtrl: FormControl;
  filteredSitesTasks: Observable<SitesTask[]>;
  isReadyToStart: boolean = false;

  selectedTaskId: string;

  mainUrl: string;
  countUrls: string;
  countAdvertise: string;
  countMove: string;
  siteFreeze: number;
  advertiseFreeze: number;
  strategy: string = 'classic';
  oneTimeChanelLink: string;
  isOneTimeTask: boolean = false;
  sitesLeft: number = 0;
  startHtmlString: string;
  finishSiteUrls: string;
  finishAdvertiseUrls: string;
  showLoader: boolean = false;
  showLoaderError: boolean = false;
  failIterator: number = 0;
  prepearedModel: TransferModel;

  @ViewChild('webFrame') webFrame;
  @ViewChild('finishSiteUrlsHtml') finishSiteUrlsHtml;
  @ViewChild('finishAdvertiseHtml') finishAdvertiseHtml;
  @ViewChild('matTab') matTab;
  @ViewChild('startTime') startTime;
  @ViewChild('endTime') endTime;
  @ViewChild('endIcon') endIcon;
  @ViewChild('spiner') spiner;

  autoCloseAdvertiseFlag: boolean = true;

  constructor(private service: SitesService, private sharedService: SharedService) {
    this.taskCtrl = new FormControl();

    this.service.getListSitesTasksId().subscribe(
      result => {
        this.listSitesTasks = result;
        console.log('RESULT', result);
        this.taskCtrl.valueChanges.subscribe(taskId => {
          if (taskId != null) {
            this.selectedTaskId = taskId;
            this.getTaskModelById(this.selectedTaskId, this.listSitesTasks);
          }
        });
        
        this.filteredSitesTasks = this.taskCtrl.valueChanges
        .pipe(
          startWith(''),
          map(taskId => taskId ? this.filterTasks(taskId) : this.listSitesTasks.slice())
        );
      },
      error => {
        console.log('error', error)
        this.filteredSitesTasks = null;
      }
    );
   }

  ngOnInit() {
  }

  listSitesTasks: SitesTask[] = [
  ];

  onTaskIdClick() {
    this.service.getListSitesTasksId().subscribe(
      result => {
        this.listSitesTasks = result;
        console.log('RESULT', result);
        this.taskCtrl.valueChanges.subscribe(taskId => {
          if (taskId != null) {
            this.selectedTaskId = taskId;
            this.getTaskModelById(this.selectedTaskId, this.listSitesTasks);
          }
        });
        
        this.filteredSitesTasks = this.taskCtrl.valueChanges
        .pipe(
          startWith(''),
          map(taskId => taskId ? this.filterTasks(taskId) : this.listSitesTasks.slice())
        );
      },
      error => {
        console.log('error', error)
        this.filteredSitesTasks = null;
      }
    );
  }

  filterTasks(taskId: string) {
    return this.listSitesTasks.filter(task =>
      task.taskId.toLowerCase().indexOf(taskId.toLowerCase()) === 0);
  }

  getTaskModelById(taskId: string, listSitesTasks: SitesTask[]) {
    console.log('taskId', taskId);
    for (let task of listSitesTasks) {
      if (taskId == task.taskId) {
        this.mainUrl = task.mainUrl;
        this.countUrls = task.countSecondaryUrls;
        this.countAdvertise = task.countAdvertise;
        this.countMove = task.countAdvertiseMove;
        this.siteFreeze = task.siteFreeze;
        this.advertiseFreeze = task.advertiseFreeze;      
        this.strategy = task.strategy;
        this.sitesLeft = Number.parseInt(task.countSecondaryUrls); 
      }
    }    
  }

  apply() {
    this.showLoader = true;
    this.showLoaderError = false;
    this.service.getSiteUrls(this.mainUrl).subscribe(
      data => {
        console.log("getSiteUrls -> ", data);
        this.mainUrlsDatasource = data;
        this.showLoader = false;        
      },
      // error => alert(error),
      () => {
        console.log("request completed")
        this.showLoader = false;
        this.showLoaderError = true;
      }
    );
  }
  start() {}

  clear() {
    this.selectedTaskId = null;
    this.mainUrl = null;
    this.countUrls = null;
    this.countAdvertise = null;
    this.countMove = null;
    this.siteFreeze = null;
    this.advertiseFreeze = null;
    this.taskCtrl.reset();
    this.webFrame.nativeElement.src = null;
    this.sitesLeft = 0;
    this.mainUrlsDatasource = [];
    this.secondaryUrlsDatasource = [];
  }

  autoCloseAdvertise(event) {
    console.log('event', event.checked);
    let autoClose: string = event.checked ? "" : "no";
    this.sharedService.autoCloseAdvertise(autoClose).subscribe(
      data => {
        console.log("autoCloseAdvertise -> ", data);
      },
      // error => alert(error),
      () => console.log("request completed")
    );
  }

  nextStepWithUrls() {
    this.startHtmlString = '';
    this.matTab.selectedIndex = 1;

    this.getPrepareText()
    this.getAdvertise();
    
  }

  getPrepareText() {
    let myText: string = '';
    for (let url of this.secondaryUrlsDatasource) {
      myText += url + '<br>' + '<br>';
    }

    this.startHtmlString += myText;
  }  

  getAdvertise() {
    if (this.selectedTaskId != null) {
      Promise.resolve().then(_ => {        
        return this.service.advertiseListForSiteShow(this.selectedTaskId, this.countAdvertise, this.countMove, this.countUrls).toPromise();
      }).then(data => {        
        this.prepearedModel = data;
        this.isReadyToStart = true;
        let myText: string = '';
        for (let i = 0; i < this.prepearedModel.transferReklamaModel.length; i++) {
          myText = myText + this.prepearedModel.transferReklamaModel[i].gclidLine + '<br>';    
          for (let rekText of this.prepearedModel.transferReklamaModel[i].textLine) {
              myText = myText + rekText + '<br>';
          }    
          myText = myText + '<br>';    
        }
        this.startHtmlString += myText;
      }).catch(reason => {
        console.log('Promise fail', reason);
        if (this.failIterator < 10) {
          this.apply();
          this.failIterator++;
        } else {
          this.failIterator = 0;
          console.log('ALL BAD');
        }

      });
    }
  }

  addToFinalGrid(element) {
    this.sitesLeft-=1;
    this.service.isLinkActive(element).subscribe(result => {
      this.secondaryUrlsDatasource.push(element);      
    })    
  }

  removeFromSecondaryGrid(element) {
    this.secondaryUrlsDatasource.splice(this.secondaryUrlsDatasource.indexOf(element), 1);
    this.sitesLeft+=1;
  }

  removeAllFromSecondary() {    
    this.secondaryUrlsDatasource = [];
    this.sitesLeft = Number.parseInt(this.countUrls);
  }

  displayedColumns = ['name', 'checkButton'];
  
  mainUrlsDatasource = [];
  secondaryUrlsDatasource = [];
}