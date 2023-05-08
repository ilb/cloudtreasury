export default class DateUtils {


    get_end_date(date_str) {
        let date_end = new Date(date_str);
        if (date_end.toDateString() == new Date().toDateString()) {
            date_end.setDate(date_end.getDate() - 1);
        }
        return date_end.toISOString().substring(0, 10);
    }

    dateRange(dateStr, delta = -30) {
        const dateEnd = this.getIsoFormat(dateStr);
        const dateStart = new Date(dateEnd);
        dateStart.setDate(dateStart.getDate() + delta);
        const range = [];
        for (let d = new Date(dateStart); d <= new Date(dateEnd); d.setDate(d.getDate() + 1)) {
            range.push(`${d.getFullYear()}-${this.pad(d.getMonth() + 1, 2)}-${this.pad(d.getDate(), 2)}`);
        }
        return range;
    }
    pad(num, size) {
        return ('000000000' + num).substr(-size);
    }
    getIsoFormat(date_str) {
        return new Date(date_str);
    }
}


