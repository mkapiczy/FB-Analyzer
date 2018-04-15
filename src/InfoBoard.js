import React from "react";
import "./InfoBoard.css";

export class InfoBoard extends React.Component {

    render() {
        return (

            <ol classNmae="info-list">
                <div className="header">How to Use FBDA</div>
                <li>Download your data from <a href="wwww.facebook.com">facebook</a>:
                    once logged in, go to settings and click "Download a copy of your facebook data".
                    You'll retrieve your data via email (may take quite a while, depending on the
                    size of your data).
                </li>
                <li>Once you have received the zip file with your data via email, unzip it, and remove every file that
                    does not have an .htm/.html extension (videos, photos, audio, gifs, stickers etc.). Remember to remove
                    them also from subdirectories!
                </li>
                <li>Zip the remaining files, and now you are ready to upload the created zip archive for the data analysis!</li>
                <li>Upload the data by either dragging and dropping your zipfile into dropzone area below or by clicking on it and selecting the file from the window.</li>
                <li>View your analysis results.</li>
                <li>Filter your results using a slider and a search box!</li>
            </ol>
        )
    }
}
