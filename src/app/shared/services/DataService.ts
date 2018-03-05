import {Headers, URLSearchParams} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs";
import { HttpClient } from "@angular/common/http";


/**
 * Created by scurto on 04.09.2017.
 */

@Injectable()
export class DataService {


  constructor(private _http: HttpClient) {}

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

  getListYoutubeTasksId() {
    var json = JSON.stringify({});

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return  this._http.post(this.HTTPS_URL + "/youtube/listAllTaskModel",
      json
    ).map(res => res);
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

  youtubeCheck(chanelId: string) {

    let params: URLSearchParams = new URLSearchParams();
    params.set('part', "snippet");
    params.set('channelId', chanelId);
    params.set('maxResults', '50');
    params.set('order', 'date');
    params.set('key', 'AIzaSyD4uG1sdLHryZMwVDnUQBXXIdvGhAtGquA');

    return  this._http.get("https://www.googleapis.com/youtube/v3/search"
    ).map(res => res);

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


  autoCloseAdvertise(autoClose: string) {
    var json = JSON.stringify({
      flag: autoClose
    });

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return  this._http.post(this.HTTPS_URL + "/gclid/setAutoCloseAdvertise",
      json      
    ).map(res => res);
  }

  apply(modelTaskId: string, countReklama: string, countMove: string, countVideo: string) {
    let json = JSON.stringify({
      taskId: modelTaskId,
      countOfReklama: countReklama,
      countOfMove: countMove,
      countOfVideo: countVideo
    });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this._http.post(this.HTTPS_URL + "/youtube/reklamaListForShow",
      json

    ).map(res => res);
  }

  applyPromise(modelTaskId: string, countReklama: string, countMove: string, countVideo: string) {
    let json = JSON.stringify({
      taskId: modelTaskId,
      countOfReklama: countReklama,
      countOfMove: countMove,
      countOfVideo: countVideo
    });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this._http.post(this.HTTPS_URL + "/youtube/reklamaListForShow",
      json
    );
  }

  applyPromiseWithYoutubeList(modelTaskId: string, countReklama: string, countMove: string, countVideo: string, listVideo: string[]) {
    let json = JSON.stringify({
      taskId: modelTaskId,
      countOfReklama: countReklama,
      countOfMove: countMove,
      countOfVideo: countVideo,
      listOfVideo: listVideo
    });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this._http.post(this.HTTPS_URL + "/youtube/getMixedList",
      json
    );
  }

  updateTask(modelTaskId: string, modelLastReklama: string) {
    var json = JSON.stringify({
      taskId: modelTaskId,
      lastReklama: modelLastReklama
    });

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return  this._http.post(this.HTTPS_URL + "/youtube/updateTask",
      json
    ).map(res => {
      console.log("update result->", res);
    });
  }

  getGClid() {
    console.log("getGClid");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this._http.get(this.HTTPS_URL + "/gclid/getGClid",
      // json,
      
    );
  }




//   private currentPriceUrl = 'http://api.coindesk.com/v1/bpi/currentprice.json';

//   async getPrice(currency: string): Promise<number> {
//     const response = await this._http.get(this.currentPriceUrl).toPromise();
//     return response.json().bpi[currency].rate;
//   }
}