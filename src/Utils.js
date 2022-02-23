import settings from "./settings";


class Utils {

    /**
     * Resets the time of a date
     * @param {Date} date - date to reset
     * @return {Date} Returns the date with the reset time
     * */
    static getDateWithoutTime(date) {
        let dateWithoutTime = new Date(date.getTime());
        dateWithoutTime.setHours(0, 0, 0, 0);
        return dateWithoutTime;
    }

    /**
     * Decline certain words depending on the number of minutes
     * @param {number} minutes - number of minutes
     * @param {array} text_forms - word in different declensions
     * @return {string} Returns the correct declension form for the passed number of minutes
     * */
    static declOfNum(minutes, text_forms = ['minute', 'minutes', 'minutes']) {
        if (settings.locale.includes('ru')) {
            text_forms = ['минута', 'минуты', 'минут'];
        }
        minutes = Math.abs(minutes) % 100;
        let n1 = minutes % 10;
        if (minutes > 10 && minutes < 20) { return text_forms[2]; }
        if (n1 > 1 && n1 < 5) { return text_forms[1]; }
        if (n1 === 1) { return text_forms[0]; }
        return text_forms[2];
    }

    /**
     * Returns the formatted time based on the user's language
     * @param {string} time - time in the format '14:22'
     * @return {string} Formatted string in user's country format
     * */
    static formatTime (time) {
        return this.parseTime(time).toLocaleTimeString(settings.locale, { hour: '2-digit', minute: '2-digit' });
    }

    /**
     * Returns the formatted number than 01 if it is less than 10
     * @param {number} number - number to format
     * @return {string} Formatted number as a string
     * */
    static zeroNumber(number) {
        return number < 10 ? `0${number}` : `${number}`;
    }

    /**
     * Returns the difference between two dates in minutes
     * @param {Date} from - start of time range
     * @param {Date} to - end of time range
     * @return {number} Difference in minutes
     * */
    static dateDifference(from, to) {
        const fromTimeInMinutes = from.getTime() / 60_000;
        const toTimeInMinutes = to.getTime() / 60_000;

        return  toTimeInMinutes - fromTimeInMinutes;
    }

    /**
     * Parses time from a string
     * @param {string} time - time in the format '14:22'
     * @return {Date} Current date with time from 'time' string
     * */
    static parseTime(time) {
        const parsedTime = new Date();
        parsedTime.setHours(time.split(':')[0]);
        parsedTime.setMinutes(time.split(':')[1]);
        return parsedTime;
    }
}

export default Utils;