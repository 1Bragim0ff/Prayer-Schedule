import React from "react";
import styles from "./Settings.module.css";
import settings from "../../settings";

class Settings extends React.Component {
    render() {
        return (
            <div className={styles.settingsRoot}>
                {settings.show_settings && (
                    <a href="#" className={styles.settings}>
                        {chrome.i18n.getMessage('openSettings')}
                    </a>
                )}
                <div className={styles.spacer}/>
            </div>
        )

    }
}

export default Settings;