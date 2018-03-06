import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class SharedService {

    constructor(private _http: HttpClient) {}

    _mockDataFlag: boolean;

    getMockDataFlag(): boolean {
        return this._mockDataFlag;
    }

    setMockDataFlag(dataFlag) {
        this._mockDataFlag = dataFlag;
    }
}