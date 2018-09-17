import {Headers, URLSearchParams, ResponseType, ResponseContentType} from "@angular/http";
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SharedService } from "./SharedService";
import { Observable } from "rxjs/Observable";

@Injectable()
export class StatisticsService {

    constructor(private _http: HttpClient, private sharedService: SharedService) {}

    headers: HttpHeaders = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});  
  
    HTTPS_URL: string = 'https://localhost:8443';
//   HTTPS_URL: string = 'http://localhost:8080';

advertiseListForSiteShow(modelTaskId: string, countAdvertise: string, countMove: string, countUrls: string): Observable<String[]> {
    let json = JSON.stringify({
    //   taskId: modelTaskId,
    //   countOfAdvertise: countAdvertise,
    //   countOfMove: countMove,
    //   countOfUrls: countUrls
    });

    return this._http.post<String[]>(this.HTTPS_URL + "/statistics/listWebsites", json, {headers: this.headers});
}
}