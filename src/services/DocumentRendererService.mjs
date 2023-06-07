import { render } from '../libs/carbone.mjs';
import File from '../core/classes/File.mjs';
import mime from 'mime-types';

export default class DocumentRendererService {
  constructor({ templatesPath }) {
    this.templatesPath = templatesPath;
  }

  getExtension(templateName) {
    return templateName.substring(templateName.lastIndexOf('.') + 1);
  }

  async render(data, options) {
    const extension = this.getExtension(options.template);
    const templatePath = `${this.templatesPath}/${options.template}`;
    const content = await render(templatePath, data, options);

    return new File(content, mime.lookup(extension), options.filename);
  }
}
