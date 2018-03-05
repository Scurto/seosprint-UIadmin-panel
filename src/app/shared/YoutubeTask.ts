export class YoutubeTask {
    taskId: string;
    countVideo: string;
    countReklama: string;
    countMove: string;
    reklamaFreeze: number;
    videoFreeze: number;
    strategy: string;
  
  
    constructor(taskId: string) {
      this.taskId = taskId;
      this.countVideo = '';
      this.countReklama = '';
      this.countMove = '';
      this.reklamaFreeze = 40;
      this.videoFreeze = 40;
      this.strategy = '';
    }
  }