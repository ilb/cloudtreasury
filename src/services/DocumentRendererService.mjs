import { render } from '../libs/carbone.mjs';

import Service from '../core/Service.mjs';
import path from 'path';
import os from 'os';


export default class DocumentRendererService extends Service {
  init (stockValuations, currentDate) {
    this.renderOptions = {
      attachmentName: `${currentDate}`, format: 'xlsx', formatTemp: 'ods'};
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

    const mimeTypes = new Map();
    mimeTypes.set('pdf', 'application/pdf');
    mimeTypes.set('xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    mimeTypes.set('xls', 'application/vnd.ms-excel');
    mimeTypes.set('odt', 'application/vnd.oasis.opendocument.text');
    mimeTypes.set('ods', 'application/vnd.oasis.opendocument.spreadsheet');

    this.mimeTypes = mimeTypes;
    this.defaultOptions = {
      lang: 'ru',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      renderPath: path.join(os.tmpdir(), `carbone_render_${process.env.USER}`)
    };
    this.defautFormat = 'odt';
    this.defautTemplateFormat = 'odt';
    this.templateBase = process.env['TEMPLATES'];

    return this._renderFile(
      'tickers',
      this.data,
      this.renderOptions
    );

  }

  async _renderFile(templateCode, data, renderOptions = {}) {
    const format = renderOptions.format || this.defautFormat;
    const formatTemp = renderOptions.formatTemp || this.defautTemplateFormat;
    const options = { ...this.defaultOptions };
    const contentType = this.mimeTypes.get(format);
    const basePath = this.templateBase.startsWith('file://')
      ? this.templateBase.substring(7)
      : this.templateBase;

    if (format != 'odt' || format != 'ods') {
      options.convertTo = format;
    }
    const templatePath = `${basePath}/templates/${templateCode}.${formatTemp}`;
    const content = await render(templatePath, data, options);
    const attachmentName = `${renderOptions.attachmentName || templateCode}.${format}`;
    return { content, contentType, attachmentName };
  }
}
