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

  @ViewChild('webFrame') webFrame;

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
      }
    }
  }

  apply() {
    console.log(this.webFrame);
    // this.webFrame.nativeElement.src = 'https://www.bigmir.net';
    this.webFrame.nativeElement.src = this.mainUrl;
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

  getSiteUrls() {
    console.log(this.mainUrlsDatasource.length > 0)
    this.service.getSiteUrls('').subscribe(
      data => {
        console.log("getSiteUrls -> ", data);
        this.mainUrlsDatasource = data;
      },
      // error => alert(error),
      () => console.log("request completed")
    );
  } 

  addToFinalGrid(element) {
    console.log('element', element);
    this.secondaryUrlsDatasource.push(element);
  }

  removeFromSecondaryGrid(element) {
    console.log('element', this.secondaryUrlsDatasource.indexOf(element));
    console.log('element', this.secondaryUrlsDatasource.indexOf('elemeasdasdnt'));
    this.secondaryUrlsDatasource.splice(this.secondaryUrlsDatasource.indexOf(element), 1);
    
  }

  displayedColumns = ['name', 'checkButton'];
  
  mainUrlsDatasource = [];
  secondaryUrlsDatasource = [];
}