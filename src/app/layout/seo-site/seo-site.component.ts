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
import { GclidCheckModel } from '../../shared/GclidCheckModel';

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
  oneTimeSitelLink: string;
  isOneTimeTask: boolean = false;
  sitesLeft: number = 0;
  startHtmlString: string;
  finishSiteUrls: string;
  finishAdvertiseUrls: string;
  showLoader: boolean = false;
  showLoaderError: boolean = false;
  failIterator: number = 0;
  prepearedModel: TransferModel;
  displayedColumns = ['name', 'checkButton'];

  mainUrlsDatasource = [];
  prepearedFinalList = [];

  @ViewChild('webFrame') webFrame;
  @ViewChild('finishSiteUrlsHtml') finishSiteUrlsHtml;
  @ViewChild('finishAdvertiseHtml') finishAdvertiseHtml;
  @ViewChild('matTab') matTab;
  @ViewChild('startTime') startTime;
  @ViewChild('endTime') endTime;
  @ViewChild('endIcon') endIcon;
  @ViewChild('spiner') spiner;

  autoCloseAdvertiseFlag: boolean = true;
  useProxyFlag: boolean = false;
  useUrlsFlag: boolean = false;

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
    this.service.getSiteUrls(this.mainUrl, this.selectedTaskId).subscribe(
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
  start() {
    let count = this.prepearedFinalList.length;
    let googleLink: string = "https://googleads.g.doubleclick.net/pagead/ads?client=ca-pub-2783044520727903&output=html&h=250&slotname=5375124397&adk=2419448805&adf=1842636954&w=300&loeid=38893311&url=http%3A%2F%2Fwww.jqueryscript.net%2F&ea=0&flash=0&wgl=1&adsid=NT&dt=1511261983354&bpp=59&bdt=175&fdt=318&idt=350&shv=r20171113&cbv=r20170110&saldr=sa&correlator=3271859956741&frm=24&ga_vid=1316891360.1511261984&ga_sid=1511261984&ga_hid=725781493&ga_fc=0&pv=2&iag=12&icsg=0&nhd=2&dssz=2&mdo=0&mso=0&u_tz=120&u_his=6&u_java=0&u_h=1080&u_w=1920&u_ah=1080&u_aw=1858&u_cd=24&u_nplug=4&u_nmime=5&adx=0&ady=0&biw=-12245933&bih=-12245933&isw=300&ish=250&ifk=3457247614&eid=21060867%2C21061122%2C38893301&oid=3&nmo=1&zm=4.38&loc=https%3A%2F%2Fwww.jqueryscript.net%2F&rx=0&eae=2&brdim=390%2C128%2C390%2C128%2C1858%2C0%2C1314%2C772%2C300%2C250&vis=1&rsz=%7C%7CcoE%7C&abl=NS&ppjl=f&pfx=0&fu=16&bc=1&jar=2017-11-21-10&ifi=1&dtd=401";
    const delay = (amount: number) => {
      return new Promise((resolve) => {
        setTimeout(resolve, amount);
      });
    };

    let strategyModel = {
      service: this.service,
      selectedTaskId: this.selectedTaskId,
      oneTimeSitelLink: this.oneTimeSitelLink,
      prepearedModel: this.prepearedModel,
      prepearedFinalList: this.prepearedFinalList,
      siteFreeze: this.siteFreeze,
      advertiseFreeze: this.advertiseFreeze,
      startTime: this.startTime,
      endTime: this.endTime,
      endIcon: this.endIcon,
      webFrame: this.webFrame,
      finishSiteUrlsHtml: this.finishSiteUrlsHtml,
      finishAdvertiseHtml: this.finishAdvertiseHtml
      // reklamaFreeze: this.reklamaFreeze,
      // videoFreeze: this.videoFreeze,
      // finishYoutubeUrlsHtml: this.finishYoutubeUrlsHtml,
      // finishAdvertiseHtml: this.finishAdvertiseHtml,
      // oneTimeChanelLink: this.oneTimeChanelLink,
      // startTime: this.startTime,
      // endTime: this.endTime,
      // endIcon: this.endIcon
    }

    if (this.strategy == 'classic') {
      classicStrategy(strategyModel);
    } else if (this.strategy == 'rpte') {
      // randomPositionTextEndStrategy(this.service, this.selectedTaskId, this.prepearedModel, this.finishYoutubeUrlsHtml, this.player, this.reklamaFreeze, this.videoFreeze, this.audio, this.oneTimeChanelLink);
    }

    async function classicStrategy(strategyModel) {
      if (strategyModel.service == null ||
        (strategyModel.selectedTaskId == null && strategyModel.oneTimeSitelLink == null)
        || strategyModel.prepearedModel == null
        // strategyModel.finishAdvertiseHtml == null ||
        // strategyModel.finishYoutubeUrlsHtml == null ||
        // strategyModel.player == null ||
        // audio == null ||
        // strategyModel.reklamaFreeze == null || strategyModel.videoFreeze == null
      ) {
        console.log("AHTUNG !!!!", strategyModel);
        return;
      }

      let startDelay: number = 35000;
      let siteDelay: number = strategyModel.siteFreeze * 1000;
      let primaryAdveriseDelay: number = strategyModel.advertiseFreeze * 1000;
      let secondaryAdvertiseDelay: number = strategyModel.advertiseFreeze * 1000;
      let finishDelay: number = 35000;

      // let startDelay: number = 0;
      // let siteDelay: number = 1 * 1000;
      // let primaryAdveriseDelay: number = 1 * 1000;
      // let secondaryAdvertiseDelay: number = 1 * 1000;
      // let finishDelay: number = 0;

      addTimer();

      await delay(startDelay);


      var websiteUrlsText = '';
      var advertiseText = '';
      websiteUrlsText += '<br>';
      advertiseText += '<br>';
      var gclidList: GclidCheckModel[] = [];

      for (let i = 0; i < strategyModel.prepearedFinalList.length; i++) {
        websiteUrlsText += strategyModel.prepearedFinalList[i] + '<br>';
        strategyModel.webFrame.nativeElement.src = strategyModel.prepearedFinalList[i];
        strategyModel.finishSiteUrlsHtml.nativeElement.innerHTML = websiteUrlsText;
        await delay(siteDelay);

        if (strategyModel.prepearedModel.transferReklamaModel.length > 0) {
          window.open(googleLink, "_blank");
          await delay(3000);
          strategyModel.service.getGClid().toPromise().then(result => {
            let checkModel: GclidCheckModel = new GclidCheckModel();
            checkModel.id = 'gclidId_' + i;
            checkModel.gclidLink = result;
            checkModel.time = new Date();
            gclidList.push(checkModel)

            console.log('resilt gclid', result)
            advertiseText = advertiseText + strategyModel.prepearedModel.transferReklamaModel[0].gclidLine + result + '<br>';
            strategyModel.finishAdvertiseHtml.nativeElement.innerHTML = advertiseText;
          });
          await delay(primaryAdveriseDelay);

          for (let rekText of strategyModel.prepearedModel.transferReklamaModel[0].textLine) {
            advertiseText = advertiseText + rekText + '<br>';
            strategyModel.finishAdvertiseHtml.nativeElement.innerHTML = advertiseText;
            await delay(secondaryAdvertiseDelay);
          }

          strategyModel.prepearedModel.transferReklamaModel.splice(0, 1);
          strategyModel.finishAdvertiseHtml.nativeElement.innerHTML = advertiseText;
        }

        websiteUrlsText += '<br>';
        advertiseText += '<br>';


      }

      await delay(finishDelay);
      strategyModel.endIcon.nativeElement.style.color = 'forestgreen'; // change icon color
      strategyModel.service.updateTask(strategyModel.selectedTaskId, strategyModel.prepearedModel.transferReklamaKeys).toPromise().then(result => {
        console.log('task completed');
      });

      for (let i = 0; i < gclidList.length; i++) {
        if (gclidList[i].gclidLink == null || gclidList[i].gclidLink == '') {
          strategyModel.service.reGetGclid(gclidList, gclidList[i].time).toPromise().then(result => {
            document.getElementById(gclidList[i].id).innerText = result
          });
        }
      }

      function addTimer() {
        let startTime = new Date();
        strategyModel.startTime.nativeElement.innerHTML = startTime.getHours() + ':' + startTime.getMinutes() + ':' + startTime.getSeconds(); // set start time

        let timeDelay = startDelay;
        let prepearedModelHelp: TransferModel = new TransferModel();
        prepearedModelHelp.transferReklamaModel = [];
        for (let model of strategyModel.prepearedModel.transferReklamaModel) {
          prepearedModelHelp.transferReklamaModel.push(model);
        }

        for (let i = 0; i < strategyModel.prepearedFinalList.length; i++) {
          timeDelay = timeDelay + siteDelay;
          if (prepearedModelHelp.transferReklamaModel.length > 0) {
            timeDelay = timeDelay + 3000;
            timeDelay = timeDelay + primaryAdveriseDelay;
            for (let rekText of strategyModel.prepearedModel.transferReklamaModel[0].textLine) {
              timeDelay = timeDelay + secondaryAdvertiseDelay;
            }
            prepearedModelHelp.transferReklamaModel.splice(0, 1);
          }
        }
        timeDelay = timeDelay + finishDelay;
        let endTime = new Date(startTime.getTime() + timeDelay);
        strategyModel.endTime.nativeElement.innerHTML = endTime.getHours() + ':' + endTime.getMinutes() + ':' + endTime.getSeconds(); // set end time
      }
    }
  }



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
    this.prepearedFinalList = [];
    this.startHtmlString = '';
    this.isReadyToStart = false;
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

  onUseProxy(event) {
    let useProxy: string = event.checked ? "" : "no";
    console.log('event', useProxy)
    this.service.isUseProxy(useProxy).subscribe(
      data => {
        console.log("isUseProxy -> ", data);
      },
      // error => alert(error),
      () => console.log("request completed")
    );
  }

  onUseUrls(event) {
      let useUrls: string = event.checked ? "" : "no";
      console.log('event', useUrls)
      this.service.isUseSecondaryUrls(useUrls).subscribe(
          data => {
              console.log("isUseSecondaryUrls -> ", data);
          },
          // error => alert(error),
          () => console.log("request completed")
      );
  }



  nextStepWithUrls() {
    this.startHtmlString = '';
    this.matTab.selectedIndex = 1;

    this.prepearedFinalList.sort(compareRandom); //mix array

    this.getPrepareText()
    this.getAdvertise();

    function compareRandom(a, b) {
      return Math.random() - 0.5;
    }
  }

  getPrepareText() {
    let myText: string = '';
    for (let url of this.prepearedFinalList) {
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
    this.sitesLeft -= 1;
    this.showLoader = true;
    this.service.isLinkActive(element).subscribe(result => {
      this.showLoader = false;
      this.prepearedFinalList.push(element);
    })
  }

  removeFromSecondaryGrid(element) {
    this.prepearedFinalList.splice(this.prepearedFinalList.indexOf(element), 1);
    this.sitesLeft += 1;
  }

  removeAllFromSecondary() {
    this.prepearedFinalList = [];
    this.sitesLeft = Number.parseInt(this.countUrls);
  }

  refreshStartResultArea() {
    this.nextStepWithUrls();
  }

  isNextStepAvailable() {
    return !(this.prepearedFinalList.length == Number.parseInt(this.countUrls));
  }
}
