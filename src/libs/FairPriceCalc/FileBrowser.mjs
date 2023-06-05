import DateUtils from "./DateUtils.mjs";
import fs from 'fs'
import os from 'os'
import { globSync } from 'glob'
import fetch from 'node-fetch';

export default class FileBrowser {

  GLOBAL_VOLUME_URL = 'https://ilb.github.io/stockvaluation/securities.xhtml';
  GLOBAL_VOLUME_PATH = os.tmpdir() + '/stockvaluation/' + os.userInfo().username + '/volume.xhtml';
  BASE_FILE_NAME = '/moex_shares_';
  BASE_FILE_URL = 'https://mfd.ru/marketdata/endofday/5/';
  BASE_FILE_PATH = os.tmpdir() + '/stockvaluation/' + os.userInfo().username;
  EMPTY_FILE = -1;
  EMPTY_FILE_TTL = 3600;
  DAYS_DELTA = -45;

  constructor(dateStr) {
    const dateUtils = new DateUtils();
    this.dateRange = dateUtils.dateRange(dateStr, this.DAYS_DELTA);
  }

  async _getVolumeFile() {
    /**
     * Returns a global volume file
     */
    let file = await this._browseInternet(this.GLOBAL_VOLUME_URL, this.GLOBAL_VOLUME_PATH);
    if (file === null) {
      throw new Error('Global volume file not found');
    }
    return file;
  }

  async _getExchangeFiles() {
    let filesList = [];
    for (let date of this.dateRange) {
      let file = this._browseFilesystem(this._createFilesystemPath(date, true));

      if (file === this.EMPTY_FILE) {
        continue;
      }

      if (file !== null) {
        filesList.push(file);
        continue;
      }

      file = await this._browseInternet(this._create_internet_path(date), this._createFilesystemPath(date, true));
      if (file === this.EMPTY_FILE) {
        const path = this._createFilesystemPath(date, true)
        fs.writeFile(path, '', { flag: 'a' }, function (error) {
          if (error) {
            throw new Error('Ошибка при создании csv файля для empty', error)
          } else {
            fs.rename(path, path.replace('csv', 'empty'), function (error) {
              if (error) {
                throw new Error('Ошибка при переименовании .csv в .empty', error)
              }
            });
          }
        });
        continue;
      }
      filesList.push(file);
    }
    return filesList;
  }

  async getFiles() {
    /**
     * Returns a list of files in a date range
     * and a global volume file
     */
    return [await this._getVolumeFile(), await this._getExchangeFiles()];
  }

  async _browseInternet(url, savePath) {
    this._checkWorkDirExist();
    try {
      const response = await fetch(url, {
        method: 'GET',
        responseType: 'arrayBuffer'
      });

      if (response.status === 404) {
        return this.EMPTY_FILE;
      } else {
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer)
        fs.writeFileSync(savePath, buffer);
      }

    } catch (e) {
      throw new Error(`HTTP error: ${e.message}`);
    }
    return savePath;
  }
  _checkWorkDirExist() {
    if (!fs.existsSync(this.BASE_FILE_PATH)) {
      fs.mkdirSync(os.tmpdir() + '/stockvaluation', { recursive: true });
      fs.mkdirSync(this.BASE_FILE_PATH, { recursive: true });
    }
  }
  _create_internet_path(date) {
    // const date_iso = new Date(date).toISOString().slice(0, 10);
    const path = this.BASE_FILE_URL + this.BASE_FILE_NAME + date.replace(/-/g, '_') + '.csv';
    return path;
  }

  _createFilesystemPath(date, with_ext=false) {
    /* Returns filesystem path with date,
    * like this: stockvaluation/moex_shares_2019_04_12.csv
    * or this for empty files: stockvaluation/moex_shares_2019_04_12.
    */  
    // const date_iso = new Date(date).toISOString().substring(0,10).replace(/-/g, "_");
    let path = '';
    if (with_ext) {
      path = `${this.BASE_FILE_PATH}${this.BASE_FILE_NAME}${date}.csv`;
    } else {
      path = `${this.BASE_FILE_PATH}${this.BASE_FILE_NAME}${date}`;
    }
    return path;
  }
  _browseFilesystem(path) {
    /* Returns file searched in filesystem */
    const files = globSync(path);
    if (files.length === 0) return null; // return that file not found in filesystem
    const filename = files[0];
    const fileIsEmpty = filename.includes('empty');
    if (fileIsEmpty) {
      if (Date.now() - fs.statSync(filename).mtimeMs / 1000 < this.EMPTY_FILE_TTL) {
        return this.EMPTY_FILE; // return an empty file marker
      } else {
        fs.unlinkSync(filename);
        return null; // return that file not found in filesystem
      }
    } else {
      return filename; // return a valid path
    }
  }
}