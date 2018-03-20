import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SharedService } from "./SharedService";
import { Observable } from "rxjs/Observable";
import { SitesTask } from "../SitesTask";
import { BehaviorSubject } from "rxjs";
import { TransferModel } from "../TransferModel";

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

    getSiteUrls(url: string): Observable<String[]> {        
        var json = JSON.stringify({
            websiteUrl: url
        });
        return  this._http.post<String[]>(this.HTTPS_URL + "/website/getListSiteUrls", url)
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
}