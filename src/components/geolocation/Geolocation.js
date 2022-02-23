import config from "../../config";
import styles from "./Geolocation.module.css";
import React from "react";
import settings from "../../settings";

/*
* Geolocation Logic
*   The geolocation module works in two stages:
*       1. Gets the user's geodata
*       2. Using the API, get the city and country from geodata
*
*   An attempt to set geolocation occurs every time the extension is opened, in the 'componentDidMount' method by calling
*   the 'setGeolocation' method, which in turn checks the user's current geodata and geodata from the 'App' state.
*   If the data matches, then the user has not changed their location since the extension was last opened and no action
*   is taken. But if the data differs, then the geodata in the 'App' state are updated with the current ones, and the
*   setCity method is also called, which uses the geodata to get the city and country of the user and also sets them to
*   the 'App' state.
*
* */
class Geolocation extends React.Component {

    setGeolocation() {
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords;
            let prevGeolocation = this.props.state.geolocation;
            let prevLanguage = this.props.state.locale;
            if (prevGeolocation.latitude !== latitude && prevGeolocation.longitude !== longitude) {
                this.props.setState({
                    ...this.props.state,
                    geolocation: {
                        latitude,
                        longitude
                    }
                }, () => {
                    this.setCity();
                });
            } else if (prevLanguage !== settings.locale) {
                // A second request is made so that the name of the city is displayed in the user's language
                this.props.setState({
                    ...this.props.state,
                    locale: settings.locale
                })
                this.setCity();
            }
        })
    }


    setCity() {
        let geolocation = this.props.state.geolocation;
        // https://opencagedata.com/api
        const URL = `https://api.opencagedata.com/geocode/v1/json?q=${geolocation.latitude}+${geolocation.longitude}&key=${config.API_KEY}`

        fetch(`${URL}&language=en`)
            .then(response => response.json())
            .then(response => {
                let cityOriginal = response.results[0].components.city;
                let countryOriginal = response.results[0].components.country;
                this.props.setState({
                    ...this.props.state,
                    cityOriginal,
                    countryOriginal
                })
            }); // Request to populate cityOriginal and countryOriginal for use in subsequent requests to other APIs.

        fetch(URL)
            .then(response => response.json())
            .then(response => {
                let city = response.results[0].components.city;
                let country = response.results[0].components.country;
                this.props.setState({
                    ...this.props.state,
                    city,
                    country
                })
            }); // The result will be in the user's language specified in the browser
    }

    componentDidMount() {
        this.setGeolocation();
    }

    render() {
        return (
            <div>
                {this.props.state.city && (
                    <div className={styles.geolocation}>
                        <svg className={styles.icon} width="18" height="18" viewBox="0 0 18 18" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 0C5.27737 0 2.25 3.02737 2.25 6.75C2.25 11.4289 8.343 17.5759 8.60175 17.8358C8.712 17.9449
                             8.856 18 9 18C9.144 18 9.288 17.9449 9.39825 17.8358C9.657 17.5759 15.75 11.4289 15.75 6.75C15.75 3.02737
                             12.7226 0 9 0ZM9 16.6241C7.65675 15.1864 3.375 10.3241 3.375 6.75C3.375 3.64838 5.89838 1.125 9 1.125C12.1016
                              1.125 14.625 3.64838 14.625 6.75C14.625 10.3208 10.3433 15.1864 9 16.6241Z" fill="white"/>
                            <path d="M9 3.375C7.13925 3.375 5.625 4.88925 5.625 6.75C5.625 8.61075 7.13925 10.125 9 10.125C10.8608
                            10.125 12.375 8.61075 12.375 6.75C12.375 4.88925 10.8608 3.375 9 3.375ZM9 9C7.75912 9 6.75 7.99088 6.75
                            6.75C6.75 5.50912 7.75912 4.5 9 4.5C10.2409 4.5 11.25 5.50912 11.25 6.75C11.25 7.99088 10.2409 9 9 9Z"
                                  fill="white"/>
                        </svg>

                        <div>{this.props.state.city}</div>
                    </div>
                )}

                {!this.props.state.city && (
                    <div className={styles.geolocation}>
                        <svg className={styles.icon} width="18" height="18" viewBox="0 0 18 18" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_3_107)">
                                <path d="M14.08 2.34581L15.6607 0.765086L14.9124 0.0168263L13.3317 1.59755C12.1658 0.602044
                                10.6543 0 9.00459 0C5.32513 0 2.3317 2.99346 2.3317 6.67292C2.30994 8.04591 2.85074 9.80921
                                3.64405 11.2852L2.34853 12.5807L3.09683 13.329L4.18454 12.2413C4.56999 12.8778 5.01298 13.527
                                5.51117 14.1837C7.45975 16.6764 8.36184 17.3901 9.00463 18C12.4857 14.8436 18.5657 7.58299
                                14.08 2.34581ZM3.38996 6.67292C3.38996 3.57699 5.90865 1.05826 9.00459 1.05826C10.3624
                                1.05826 11.6092 1.54284 12.5812 2.34807L10.9491 3.98008C9.65147 3.04193 7.82357 3.15626
                                6.65575 4.32408C5.48793 5.49187 5.3736 7.3198 6.31175 8.61744L4.42988 10.4993C3.81119
                                9.25155 3.38996 7.93765 3.38996 6.67292V6.67292ZM10.6051 8.27347C9.85145 9.02716 8.69435
                                9.13662 7.8228 8.60301L10.9347 5.49113C11.4683 6.36268 11.3588 7.51978 10.6051
                                8.27347V8.27347ZM7.40405 5.07238C7.8453 4.63112 8.42495 4.41047 9.00459 4.41047C9.41498
                                4.41047 9.8251 4.52162 10.1864 4.74284L7.0745 7.85472C6.54089 6.98313 6.65035 5.82607
                                7.40405 5.07238V5.07238ZM9.00442 16.5523C8.22487 15.7854 6.32942 13.8095 4.95608 11.4697L7.06004
                                9.36573C7.63813 9.78368 8.32124 9.9931 9.00459 9.9931C9.85522 9.9931 10.7058 9.66931 11.3534
                                9.02173C12.5213 7.85394 12.6356 6.02601 11.6974 4.72837L13.3294 3.09636C17.2667 7.66053
                                11.0804 14.5415 9.00442 16.5523Z" fill="white"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_3_107">
                                    <rect width="18" height="18" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>

                        <div>{chrome.i18n.getMessage('cityNotFound')}</div>
                    </div>
                )}
            </div>
        )
    }
}

export default Geolocation;