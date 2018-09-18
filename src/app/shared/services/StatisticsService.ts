import {Headers, URLSearchParams, ResponseType, ResponseContentType} from "@angular/http";
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SharedService } from "./SharedService";
import { Observable } from "rxjs/Observable";
import { WebsiteModel } from "../WebsiteModel";

@Injectable()
export class StatisticsService {

    constructor(private _http: HttpClient, private sharedService: SharedService) {}

    headers: HttpHeaders = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});  
  
    HTTPS_URL: string = 'https://localhost:8443';
//   HTTPS_URL: string = 'http://localhost:8080';

    advertiseListForSiteShow(strategy: string): Observable<WebsiteModel[]> {
        let json = JSON.stringify({
            topStrategy: strategy
        });

        return this._http.post<WebsiteModel[]>(this.HTTPS_URL + "/statistics/listWebsites", json, {headers: this.headers});
    }

    
}

