import './App.css';
import Settings from "./components/settings/Settings";
import Geolocation from "./components/geolocation/Geolocation";
import React from "react";
import config from "./config";
import Time from "./components/time/Time";
import Schedule from "./components/schedule/Schedule";
import Preloader from "./components/preloader/Preloader";
import settings from "./settings";

/*
* Application Logic
*
*   (1) Storage Logic
*       First, storage.local is checked for the presence of data in it in 'componentDidMount' method, if the data is present,
*       then they are loaded into the state 'App'. Any changes to the state 'App' also update storage.local
*       in 'componentDidUpdate' method.
*
*   (2) Preloader Logic
*       The Preloader component is present on the page as long as the state 'App' contains at least one null value (readyForShow = false),
*       that is, the Preloader considers that the application has not loaded all the data. The readiness of the application for
*       work is checked in the 'componentDidUpdate' method, and if it is ready, then set the 'readyForShow' value to true.
*
*   (3) Settings Logic
*       Under development...
*
*   (4) Geolocation Logic
*       Look in the component itself...
*
*   (5) Time Logic
*       Look in the component itself...
*
*   (6) Schedule Logic
*       Look in the component itself...
*
* */
class App extends React.Component {
    constructor(props) {
        super(props);
        this._wasRequestToStorage = false;
        this.state = {
            geolocation: {
                latitude: null,
                longitude: null,
            },
            city: null,
            country: null,
            cityOriginal: null,
            countryOriginal: null,
            schedule: null,
            scheduleValidityDate: null,
            readyForShow: false,
            locale: settings.locale
        };
        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        chrome.storage.local.get(config.DEFAULT_STORAGE_NAME, (result) => {
            this.setState(result[config.DEFAULT_STORAGE_NAME]);
            this._wasRequestToStorage = true; // Prevent re-assignment in storage.local in componentDidUpdate method when state changes
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ( JSON.stringify(prevState) !== JSON.stringify(this.state)
            && !Object.values(this.state).includes(null) && this._wasRequestToStorage) {
            chrome.storage.local.set({[config.DEFAULT_STORAGE_NAME]: this.state})
        }

        if (!Object.values(this.state).includes(null) && !this.state.readyForShow) {
            this.setState({
                ...this.state,
                readyForShow: true
            })
        }
    }

    render() {
        return (
            <div className="App">
                <Settings/>
                <Geolocation state={this.state} setState={this.setState}/>
                <Time state={this.state} setState={this.setState}/>
                <Schedule state={this.state} setState={this.setState}/>

                {!this.state.readyForShow && (<Preloader/>)}
            </div>
        )
    }
}

export default App;
