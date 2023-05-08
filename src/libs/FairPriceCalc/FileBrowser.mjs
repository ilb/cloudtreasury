import DateUtils from "./DateUtils.mjs";
import fs from 'fs'
import os from 'os'
import glob from 'glob'

export default class FileBrowser {

    constructor(date_str) {
        const dateUtils = new DateUtils();
        this.dateRange = dateUtils.dateRange(date_str, this.DAYS_DELTA);

        this.GLOBAL_VOLUME_URL = 'https://ilb.github.io/stockvaluation/securities.xhtml';
        this.GLOBAL_VOLUME_PATH = os.tmpdir() + '/stockvaluation/' + os.userInfo().username + '/volume.xhtml';
        this.BASE_FILE_NAME = '/moex_shares_';
        this.BASE_FILE_URL = 'https://mfd.ru/marketdata/endofday/5/';
        this.BASE_FILE_PATH = os.tmpdir() + '/stockvaluation/' + os.userInfo().username;
        //const BASE_FILE_PATH = '/var/apps/stockvaluation';
        this.EMPTY_FILE = -1;
        this.EMPTY_FILE_TTL = 3600;
        this.DAYS_DELTA = -45;
    }

    _getVolumeFile() {
        /**
         * Returns a global volume file
         */
        let file = this._browseInternet(this.GLOBAL_VOLUME_URL, this.GLOBAL_VOLUME_PATH);
        if (file === null) {
            throw new Error('Global volume file not found');
        }
        return file;
    }

    _getExchangeFiles() {
        let filesList = [];
        for (let date of this.dateRange) {
            let file = this._browseFilesystem(this._createFilesystemPath(date));
            if (file === this.EMPTY_FILE) {
                continue;
            }
            if (file !== null) {
                filesList.push(file);
                continue;
            }
            file = this._browseInternet(this._create_internet_path(date), this._createFilesystemPath(date, true));
            if (file === this.EMPTY_FILE) {
                open(this._createFilesystemPath(date, true).replace('csv', 'empty'), 'a').close();
                continue;
            }
            filesList.push(file);
        }
        return filesList;
    }

    getFiles() {
        /**
         * Returns a list of files in a date range
         * and a global volume file
         */
        return [this._getVolumeFile(), this._getExchangeFiles()];
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
        const date_iso = new Date(date).toISOString().slice(0, 10);
        const path = this.BASE_FILE_URL + this.BASE_FILE_NAME + date_iso.replace(/-/g, '_') + '.csv';
        return path;
    }

    _createFilesystemPath(date, with_ext=false) {
        /* Returns filesystem path with date,
         * like this: stockvaluation/moex_shares_2019_04_12.csv
         * or this for empty files: stockvaluation/moex_shares_2019_04_12.
         */
        const date_iso = new Date(date).toISOString().substring(0,10).replace(/-/g, "");
        let path = '';
        if (with_ext) {
            path = `${this.BASE_FILE_PATH}${this.BASE_FILE_NAME}${date_iso}.csv`;
        } else {
            path = `${this.BASE_FILE_PATH}${this.BASE_FILE_NAME}${date_iso}`;
        }
        return path;
    }
    _browseFilesystem(path) {
        /* Returns file searched in filesystem */
        const files = glob.sync(path);
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