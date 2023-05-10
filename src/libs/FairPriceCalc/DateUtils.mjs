export default class DateUtils {
    getEndDate(date_str) {
        let date_end = new Date(date_str);
        if (date_end.toDateString() == new Date().toDateString()) {
            date_end.setDate(date_end.getDate() - 1);
        }
        return date_end.toISOString().substring(0, 10);
    }

    dateRange(dateStr, delta = -30) {
        const dateEnd = new Date(dateStr);
        const dateStart = new Date(dateEnd.getTime() + delta * 24 * 60 * 60 * 1000);
        const dateRange = [];
        for (let date = dateStart; date <= dateEnd; date.setDate(date.getDate() + 1)) {
            dateRange.push(new Date(date).toISOString().substring(0,10));
        }
        return dateRange
    }

}


