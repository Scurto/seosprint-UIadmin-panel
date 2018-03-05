import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import 'rxjs/add/operator/toPromise';
import { Subscription } from "rxjs";
import { FormControl } from '@angular/forms';
import { YoutubeTask } from '../../shared/YoutubeTask';

@Component({
  moduleId: module.id,
  selector: 'app-seo-youtube',
  templateUrl: './seo-youtube.component.html',
  styleUrls: ['./seo-youtube.component.scss']
})
export class SeoYoutubeComponent implements OnInit {

  taskCtrl: FormControl; 

  filteredYoutubeTasks: Observable<any[]>; // REMOVE
// listYoutubeTasks: YoutubeTask[] = [];
  listYoutubeTasks: YoutubeTask[] = [ //REMOVE
    {      
      taskId: '1',
      countVideo: '0',
      countReklama: '0',
      countMove: '0',
      reklamaFreeze: 45,
      videoFreeze: 45,
      strategy: ''
    },
    {
      taskId: '2',
      countVideo: '0',
      countReklama: '0',
      countMove: '0',
      reklamaFreeze: 45,
      videoFreeze: 45,
      strategy: ''
    },
    {
      taskId: '3',
      countVideo: '0',
      countReklama: '0',
      countMove: '0',
      reklamaFreeze: 45,
      videoFreeze: 45,
      strategy: ''
    },
    {
      taskId: '4',
      countVideo: '0',
      countReklama: '0',
      countMove: '0',
      reklamaFreeze: 45,
      videoFreeze: 45,
      strategy: ''
    }
  ];

  constructor() {
    this.taskCtrl = new FormControl();
    // this.service.getListYoutubeTasksId().toPromise().then(result => {
    //   this.listYoutubeTasks = result;
    //   console.log('RESULT', result);
    //   this.taskCtrl.valueChanges.subscribe(state => {
    //     if (state != null) {
    //       this.selectedTaskId = state;
    //       this.getTaskModelById(this.selectedTaskId, this.listYoutubeTasks);
    //     }
    //   });

      // this.filteredYoutubeTasks = this.taskCtrl.valueChanges
      //   .startWith(null)
      //   .map(taskId => taskId ? this.filterTasks(taskId) : this.listYoutubeTasks.slice());
    // });

    this.filteredYoutubeTasks = this.taskCtrl.valueChanges
      .pipe(startWith(''),
        map(taskId => taskId ? this.filterTasks(taskId) : this.listYoutubeTasks.slice())
      );
    
  }

  filterTasks(taskId: string) {
    return this.listYoutubeTasks.filter(task =>
      task.taskId.toLowerCase().indexOf(taskId.toLowerCase()) === 0);
  }

  ngOnInit() {

  }


  player: YT.Player;
  id: string = 'qDuKsiwS5xw';

  savePlayer(player) {
    this.player = player;
    console.log('player instance', player)
  }

  onStateChange(event) {
    console.log('player state', event.data);
  }
}
