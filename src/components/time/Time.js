import React from "react";
import styles from "./Time.module.css";
import Utils from "../../Utils";

/*
* Time Logic
*   This module is responsible for displaying the nearest prayer and also a plate with a warning about the remaining time.
*   The time is calculated when the state of the 'App' changes and if the schedule is already set in the state by the 'Schedule' module.
*
* */
class Time extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nearestPrayer: null,
            lessFiveMinLeft: false,
            lessTenMinLeft: false,
            lessMin: 0
        };
    }

    setNearestPrayer() {
        const filterKeywords = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

        let currentDate = new Date();
        let currentTime = `${Utils.zeroNumber(currentDate.getHours())}:${Utils.zeroNumber(currentDate.getMinutes())}`;

        // [['Maghrib', '17:31'], ['Isha', '19:01']]
        let nearestPrayer = Object.entries(this.props.state.schedule)
            .filter(array => filterKeywords.includes(array[0])) // We leave only prayers from the filterKeywords list
            .sort((a, b) => {
                return a[1] > b[1] ? 1 : -1; // Sorted in ascending order
            })
            .filter(prayer => prayer[1] > currentTime) // We remove the prayers that have already passed

        // If there are no upcoming prayers left, then display the last one until the schedule is updated
        if (!nearestPrayer.length) {
            nearestPrayer = this.props.state.schedule.Isha;
        } else {
            nearestPrayer = nearestPrayer[0][1]
        }

        const difference = Utils.dateDifference(Utils.parseTime(currentTime), Utils.parseTime(nearestPrayer));

        this.setState({
            nearestPrayer: nearestPrayer,
            lessMin: difference,
            lessFiveMinLeft: difference <= 5 && difference > 0,
            lessTenMinLeft: difference <= 10 && difference > 5
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.state.schedule && !this.state.nearestPrayer) {
            this.setNearestPrayer();
        }
    }

    render() {
        return (
            <div>
                <div className={styles.time}>
                    {this.state.nearestPrayer ? Utils.formatTime(this.state.nearestPrayer) : '00:00'}
                </div>

                {(this.state.lessFiveMinLeft || this.state.lessTenMinLeft) && (
                    <div className={`${styles.warning} ${this.state.lessFiveMinLeft ? styles.warningRed : styles.warningYellow}`}>
                        {chrome.i18n.getMessage('timeLeft', [this.state.lessMin, Utils.declOfNum(this.state.lessMin)])}
                    </div>
                )}
            </div>
        )
    }
}

export default Time;