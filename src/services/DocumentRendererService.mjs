import { render } from '../libs/carbone.mjs';

import Service from '../core/Service.mjs';
import path from 'path';
import os from 'os';


export default class DocumentRendererService extends Service {
  constructor({templates}) {
    super();
    this.templatePath = templates;
  }

  OPTIONS = {
    lang: 'ru',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    renderPath: path.join(os.tmpdir(), `carbone_render_${process.env.USER}`),
    format: 'odt',
    formatTemplate: 'odt',
  }
  memeTypes = {
    pdf: 'application/pdf',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    xls: 'application/vnd.ms-excel',
    odt: 'application/vnd.oasis.opendocument.text',
    ods: 'application/vnd.oasis.opendocument.spreadsheet'
  }

  init (stockValuations, currentDate) {
    console.log(this.templatePath)

    const renderOptions = {
      attachmentName: currentDate, 
      format: 'xlsx', 
      formatTemplate: 'ods',
      template: 'tickers'
    };

    const data = {}
    data.date = currentDate;
    data.stockValuations = stockValuations.map(({ ticker, date, data }) => ({ 
        ticker, 
        date, 
        ...data, 
        active: data.active === 'ACTIVE' ? "ДА" : "НЕТ",
        adjustment: data.active === 'LOW_ACTIVE' ? "ДА" : "",
        fairPrice: data.fairPrice.toString().replace(".", ",") 
    }));

    return this._renderFile(data, renderOptions);
  }

  async _renderFile(data, renderOptions = {}) {

    const options = {
      ...this.OPTIONS,
      ...renderOptions
    }
    
    const contentType = this.memeTypes[options.format];

    // if (options.format != 'odt' || options.format != 'ods') options.convertTo = options.format;

    const templatePath = `${this.templatePath}/templates/${options.template}.${options.formatTemplate}`;
    const content = await render(templatePath, data, options);
    const attachmentName = `${options.attachmentName || options.template}.${options.format}`;
    return { content, contentType, attachmentName };
  }
}
