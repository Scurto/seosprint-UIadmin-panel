import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SharedService } from "./SharedService";
import { Observable } from "rxjs/Observable";
import { SitesTask } from "../SitesTask";
import { BehaviorSubject } from "rxjs";

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
}