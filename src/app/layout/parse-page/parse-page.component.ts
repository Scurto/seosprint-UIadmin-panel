import { Component, OnInit } from '@angular/core';
import { SitesService } from '../../shared/services/SitesService';
import { SharedService } from '../../shared/services/SharedService';

@Component({
    selector: 'app-parse-page',
    templateUrl: './parse-page.component.html',
    styleUrls: ['./parse-page.component.scss'],
    providers: [SitesService]
})
export class ParsePageComponent implements OnInit {
    constructor(private service: SitesService, private sharedService: SharedService) { }

    ngOnInit() { }

    mainUrl: string;
    decodeUrl: string;
    secondaryUrls = [];

    parse() {
        let option = {
            useProxy: false,
            useUrls: false
        }
        this.service.getSiteUrls(this.mainUrl, null, option).subscribe(data => {
            this.secondaryUrls = data;
        });
    }

    decode() {
        this.service.decodeUrl(this.decodeUrl).subscribe(data => {
            this.secondaryUrls.push(data);
        });
    }
}
