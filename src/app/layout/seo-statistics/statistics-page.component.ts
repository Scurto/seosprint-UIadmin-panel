import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { StatisticsService } from '../../shared/services/StatisticsService';
import { SharedService } from '../../shared/services/SharedService';

@Component({
    selector: 'app-statistics-page',
    templateUrl: './statistics-page.component.html',
    styleUrls: ['./statistics-page.component.scss'],
    providers: [StatisticsService],
    animations: [routerTransition()]
})
export class StatisticsPageComponent implements OnInit {
    // bar chart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[];
    
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public barChartData: any[] = [
        { data: [0, 0, 0], label: 'Series A' }
        // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ];

    // CHART COLOR.
    colors = [
        { // 1st Year.
        backgroundColor: 'rgba(77,83,96,0.2)'
        },
        { // 2nd Year.
        backgroundColor: 'rgba(30, 169, 224, 0.8)'
        }
    ]

    // events
    public chartClicked(e: any): void {
        console.log('chartClicked',e);
    }

    public chartHovered(e: any): void {
        console.log('chartHovered',e);
    }

    public randomize(): void {
        // Only Change 3 values
        const data = [
            Math.round(Math.random() * 100),
            59,
            80,
            Math.random() * 100,
            56,
            Math.random() * 100,
            40
        ];
        const clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
        /**
         * (My guess), for Angular to recognize the change in the dataset
         * it has to change the dataset variable directly,
         * so one way around it, is to clone the data, change it and then
         * assign it;
         */
    }

    constructor(private service: StatisticsService, private sharedService: SharedService) {
        this.service.advertiseListForSiteShow(TopStrategy.TOP_5).subscribe(
            result => {                
                let taskList: Array<string> = [];
                let valueList: Array<number> = [];
                for (let task of result) {
                    taskList.push(task.taskId);
                    valueList.push(task.executionCount)
                }
                this.barChartData[0].data = valueList
                this.barChartLabels = taskList;
            },
            error => {

            }
        );       
    }

    

    ngOnInit() {}
}

enum TopStrategy {
    TOP_5 = 'top5', 
    TOP_10 = 'top10'
}

// http://blogs.kansiris.org/2018/04/how-to-create-bar-chart-in-angular-4.html
