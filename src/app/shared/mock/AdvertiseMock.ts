import { TransferReklamaModel } from "../TransferReklamaModel";

export class AdvertiseMock {
    getListMockAdvertise() {
        return this.listAdveriseMock;
    }

    listAdveriseMock: TransferReklamaModel[] = [
        {
            gclidLine: 'string',
            textLine: []
        },
        {
            gclidLine: 'string',
            textLine: []
        }
    ] 
}