export class SitesTask {
    taskId: string;
    mainUrl: string;
    countSecondaryUrls: string;
    advertiseFreeze: number;
    siteFreeze: number;    
    strategy: string;
    countAdvertise: string;
    countAdvertiseMove: string
    secondaryUrls: Array<string>
  
    constructor(taskId: string) {
      this.taskId = taskId;
    //   this.countVideo = '';
    //   this.countReklama = '';
    //   this.countMove = '';
    //   this.reklamaFreeze = 40;
    //   this.videoFreeze = 40;
      this.strategy = '';
    }
}