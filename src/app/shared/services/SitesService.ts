import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SharedService } from "./SharedService";
import { Observable } from "rxjs/Observable";
import { SitesTask } from "../SitesTask";
import { BehaviorSubject } from "rxjs";
import { TransferModel } from "../TransferModel";
import {GclidCheckModel} from "../GclidCheckModel";

@Injectable()
export class SitesService {

    constructor(private _http: HttpClient, private sharedService: SharedService) {}

    headers: HttpHeaders = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

    HTTPS_URL: string = 'https://localhost:8443';

    getListSitesTasksId(): Observable<SitesTask[]> {
        var json = JSON.stringify({});
        console.log(this.sharedService.getMockDataFlag());
        if (!this.sharedService.getMockDataFlag()) {
          return  this._http.post<SitesTask[]>(this.HTTPS_URL + "/website/listAllSitesModel", json)
        } else {
        //   let mockTaskList = new TaskMock().getListMockTasks();
        //   return new BehaviorSubject<SitesTask[]>(mockTaskList).asObservable();
        }
    }

    getSiteUrls(url: string, id: string): Observable<String[]> {
        var json = JSON.stringify({
            mainUrl: url,
            taskId: id
        });
        return  this._http.post<String[]>(this.HTTPS_URL + "/website/getListSiteUrls", json, {headers: this.headers})        
    }

    decodeUrl(decodeUrl: string) {
        var json = JSON.stringify({
            mainUrl: decodeUrl
        });

        return this._http.post(this.HTTPS_URL + "/website/decodeUrl", json, { headers: this.headers, responseType: 'text' }).map(res => res);
    }

    advertiseListForSiteShow(modelTaskId: string, countAdvertise: string, countMove: string, countUrls: string): Observable<TransferModel> {
        let json = JSON.stringify({
          taskId: modelTaskId,
          countOfAdvertise: countAdvertise,
          countOfMove: countMove,
          countOfUrls: countUrls
        });

        return this._http.post<TransferModel>(this.HTTPS_URL + "/website/advertiseListForSiteShow", json, {headers: this.headers});
    }

    isLinkActive(url: string) {
        var json = JSON.stringify({
            mainUrl: url
        });

        return  this._http.post(this.HTTPS_URL + "/website/isLinkActive", json, {headers: this.headers, responseType: 'text'});
    }

    updateTask(modelTaskId: string, modelLastAdvertise: string) {
        var json = JSON.stringify({
          taskId: modelTaskId,
          lastAdvertise: modelLastAdvertise
        });

        return  this._http.post(this.HTTPS_URL + "/website/updateTask", json, {headers: this.headers}).map(res => {
          console.log("update result->", res);
        });
      }

    getGClid() {
        return this._http.get(this.HTTPS_URL + "/gclid/getGClid", {responseType: 'text'})
    }

    reGetGclid(gclidList: GclidCheckModel[], gclidTime: Date) {
        var json = JSON.stringify({
            gclidArray: gclidList,
            time: gclidTime.getTime()
        });

        return  this._http.post(this.HTTPS_URL + "/gclid/reGetGclid", json, {headers: this.headers, responseType: 'text'}).map(res => res);
    }

    isUseProxy(useProxy: string) {
        var json = JSON.stringify({
            flag: useProxy
        });

        return this._http.post(this.HTTPS_URL + "/website/setUseProxy", json, { headers: this.headers, responseType: 'text' }).map(res => res);
    }

    isUseSecondaryUrls(useUrls: string) {
        var json = JSON.stringify({
            flag: useUrls
        });

        return this._http.post(this.HTTPS_URL + "/website/setSecondaryUrl", json, { headers: this.headers, responseType: 'text' }).map(res => res);
    }
}
