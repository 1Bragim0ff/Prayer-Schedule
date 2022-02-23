import React from "react";
import styles from "./Schedule.module.css";
import Utils from "../../Utils";

/*
* Schedule Logic
*   An attempt to set prayer schedules occurs when the state of 'App' changes, and if prayers were not set before,
*   they are set using the 'setSchedule' method. If the prayers have already been set, but the prayers setting time
*   (scheduleValidityDate) does not match the current date, then the schedule is no longer relevant, and it is also
*   updated by calling the 'setSchedule' method.
*
* */
class Schedule extends React.Component {

    setSchedule() {
        const {cityOriginal, countryOriginal} = this.props.state;
        if (cityOriginal && countryOriginal) {
            // https://aladhan.com/prayer-times-api#GetTimingsByCity
            const URL = `https://api.aladhan.com/v1/timingsByCity?city=${cityOriginal}&country=${countryOriginal}&method=4`;
            fetch(URL)
                .then(response => response.json())
                .then(response => {
                    let prayerSchedule = response.data.timings;
                    this.props.setState({
                        ...this.props.state,
                        schedule: prayerSchedule,
                        scheduleValidityDate: Utils.getDateWithoutTime(new Date()).getTime()
                    })
                });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.state.schedule) {
            this.setSchedule();
        } else if (this.props.state.scheduleValidityDate !== Utils.getDateWithoutTime(new Date()).getTime()) {
            this.setSchedule();
        }
    }

    render() {
        const Fajr = this.props.state.schedule?.Fajr;
        const Dhuhr = this.props.state.schedule?.Dhuhr;
        const Asr = this.props.state.schedule?.Asr;
        const Maghrib = this.props.state.schedule?.Maghrib;
        const Isha = this.props.state.schedule?.Isha;

        return (
            <div className={styles.schedule}>
                <div className={styles.card}>
                    <span className={styles.cardName}>{chrome.i18n.getMessage('fajr')}</span>
                    <span className={styles.cardTime}>{Fajr ? Utils.formatTime(Fajr) : '-'}</span>
                </div>
                <div className={styles.card}>
                    <span className={styles.cardName}>{chrome.i18n.getMessage('dhuhr')}</span>
                    <span className={styles.cardTime}>{Dhuhr ? Utils.formatTime(Dhuhr) : '-'}</span>
                </div>
                <div className={styles.card}>
                    <span className={styles.cardName}>{chrome.i18n.getMessage('asr')}</span>
                    <span className={styles.cardTime}>{Asr ? Utils.formatTime(Asr) : '-'}</span>
                </div>
                <div className={styles.card}>
                    <span className={styles.cardName}>{chrome.i18n.getMessage('maghrib')}</span>
                    <span className={styles.cardTime}>{Maghrib ? Utils.formatTime(Maghrib) : '-'}</span>
                </div>
                <div className={`${styles.card} ${styles.cardBig}`}>
                    <span className={styles.cardName}>{chrome.i18n.getMessage('isha')}</span>
                    <span className={styles.cardTime}>{Isha ? Utils.formatTime(Isha) : '-'}</span>
                </div>
            </div>
        )
    }
}

export default Schedule;