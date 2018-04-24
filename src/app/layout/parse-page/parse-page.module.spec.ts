import { ParsePageModule } from './parse-page.module';

describe('ParsePageModule', () => {
    let parsePageModule: ParsePageModule;

    beforeEach(() => {
        parsePageModule = new ParsePageModule();
    });

    it('should create an instance', () => {
        expect(parsePageModule).toBeTruthy();
    });
});
