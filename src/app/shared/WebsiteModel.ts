export class WebsiteModel {
    taskId: string;
    lastDate: string;
    lastAdvertise: string;
    executionCount: number; 
  
    constructor() {
      this.taskId = '';
      this.lastDate = '';
      this.lastAdvertise = '';
      this.executionCount = 0;
    }
  }