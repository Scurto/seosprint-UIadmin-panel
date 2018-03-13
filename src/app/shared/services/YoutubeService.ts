import {Headers, URLSearchParams, ResponseType, ResponseContentType} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable, BehaviorSubject} from "rxjs";
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { YoutubeTask } from "../YoutubeTask";
import { TransferModel } from "../TransferModel";
import { SharedService } from "./SharedService";
import { TaskMock } from "../mock/TaskMock";


/**
 * Created by scurto on 04.09.2017.
 */

@Injectable()
export class YoutubeService {
  

  constructor(private _http: HttpClient, private sharedService: SharedService) {}

  headers: HttpHeaders = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});  
  
  HTTPS_URL: string = 'https://localhost:8443';
//   HTTPS_URL: string = 'http://localhost:8080';
  getTaskModelById(modelTaskId: string) {

    var json = JSON.stringify({taskId: modelTaskId});

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    

    return  this._http.post(this.HTTPS_URL + "/getTaskModel",
      json
    ).map(res => res);
  }

  getListYoutubeTasksId(): Observable<YoutubeTask[]> {
    var json = JSON.stringify({});
    console.log(this.sharedService.getMockDataFlag());
    if (!this.sharedService.getMockDataFlag()) {
      return  this._http.post<YoutubeTask[]>(this.HTTPS_URL + "/youtube/listAllTaskModel", json)
    } else {
      let mockTaskList = new TaskMock().getListMockTasks();
      return new BehaviorSubject<YoutubeTask[]>(mockTaskList).asObservable();      
    }    
  }

  getLastUsedReklama(modelTaskId: string) {

    var json = JSON.stringify({taskId: modelTaskId});

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return  this._http.post(this.HTTPS_URL + "/getTaskModel",
      json 
    ).map(res => res);
  }



  postJSON() {
    var json = JSON.stringify({var1: "test", var2: 3});
    var params = "json="+json;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.post(
      'http://validate.jsontest.com',
      params
    ).map(res => res);
  }

  youtubeCheck(chanelId: string): Observable<YouTubeVideoList> {
    let params = new HttpParams();
    params = params.append('part', "snippet");
    params = params.append('channelId', chanelId);
    params = params.append('maxResults', '50');
    params = params.append('order', 'date');
    params = params.append('key', 'AIzaSyD4uG1sdLHryZMwVDnUQBXXIdvGhAtGquA');

    return  this._http.get<YouTubeVideoList>("https://www.googleapis.com/youtube/v3/search", {params: params});
  }


  testJms() {
    var json = JSON.stringify({
      time: '1-1',
      gclid: '123456789'
    });

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return  this._http.post(this.HTTPS_URL + "/gclid/testJms",
      json
      
    ).map(res => res);
  }


  

  apply(modelTaskId: string, countReklama: string, countMove: string, countVideo: string): Observable<TransferModel> {
    let json = JSON.stringify({
      taskId: modelTaskId,
      countOfReklama: countReklama,
      countOfMove: countMove,
      countOfVideo: countVideo
    });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this._http.post<TransferModel>(this.HTTPS_URL + "/youtube/reklamaListForShow", json).map(res => res);
  }

  advertiseListForShow(modelTaskId: string, countReklama: string, countMove: string, countVideo: string): Observable<TransferModel> {
    let json = JSON.stringify({
      taskId: modelTaskId,
      countOfReklama: countReklama,
      countOfMove: countMove,
      countOfVideo: countVideo
    });    

    return this._http.post<TransferModel>(this.HTTPS_URL + "/youtube/reklamaListForShow", json, {headers: this.headers});
  }

  oneTimeAdvertiseListForShow(chanelUrl: string, countReklama: string, countMove: string, countVideo: string): Observable<TransferModel> {
    let json = JSON.stringify({
      oneTimeChanelUrl: chanelUrl,
      countOfReklama: countReklama,
      countOfMove: countMove,
      countOfVideo: countVideo
    });    

    return this._http.post<TransferModel>(this.HTTPS_URL + "/youtube/oneTimeAdvertiseListForShow", json, {headers: this.headers});
  }

  advertiseListWithYoutubeList(modelTaskId: string, countReklama: string, countMove: string, countVideo: string, listVideo: string[]): Observable<TransferModel> {
    let json = JSON.stringify({
      taskId: modelTaskId,
      countOfReklama: countReklama,
      countOfMove: countMove,
      countOfVideo: countVideo,
      listOfVideo: listVideo
    });

    return this._http.post<TransferModel>(this.HTTPS_URL + "/youtube/getMixedList", json, {headers: this.headers}); 
  }

  updateTask(modelTaskId: string, modelLastReklama: string) {
    var json = JSON.stringify({
      taskId: modelTaskId,
      lastReklama: modelLastReklama
    });

    return  this._http.post(this.HTTPS_URL + "/youtube/updateTask", json,{headers: this.headers}).map(res => {
      console.log("update result->", res);
    });
  }

  getGClid() {    
    return this._http.get(this.HTTPS_URL + "/gclid/getGClid", {responseType: 'text'})
  }  
}