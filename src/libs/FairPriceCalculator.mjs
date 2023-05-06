
export default class FairPriceCalculator {
    
    constructor(documentRendererService, stockValuations, currentDate ) {
        this.renderOptions = {
            attachmentName: `${currentDate}`,
            format: 'xlsx',
            formatTemp: 'ods'
        };
    
        this.data = {};
        this.data.currentDate = currentDate;
        this.data.stockValuations = stockValuations.map(({ ticker, date, data }) => ({ 
            ticker, 
            date, 
            ...data, 
            active: data.active === 'ACTIVE' ? "ДА" : "НЕТ",
            adjustment: data.active === 'LOW_ACTIVE' ? "ДА" : "",
            fairPrice: data.fairPrice.toString().replace(".", ",") 
        }));
        this.render(documentRendererService);

    }

    async render (documentRendererService) {
        return await documentRendererService.render(
            'tickers',
            this.data,
            this.renderOptions
        );
    }

}