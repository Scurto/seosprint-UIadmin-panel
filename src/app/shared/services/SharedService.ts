import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class SharedService {

    HTTPS_URL: string = 'https://localhost:8443';

    constructor(private _http: HttpClient) {}

    _mockDataFlag: boolean;

    getMockDataFlag(): boolean {
        return this._mockDataFlag;
    }

    setMockDataFlag(dataFlag) {
        this._mockDataFlag = dataFlag;
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
}