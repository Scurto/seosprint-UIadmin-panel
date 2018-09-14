import { StatisticsPageModule } from './statistics-page.module';

describe('StatisticsPageModule', () => {
    let statisticsPageModule: StatisticsPageModule;

    beforeEach(() => {
        statisticsPageModule = new StatisticsPageModule();
    });

    it('should create an instance', () => {
        expect(statisticsPageModule).toBeTruthy();
    });
});
