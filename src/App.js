import React from "react";
import {render} from "react-dom";
import {MessageRanking} from "./MessageRanking";
import _ from "lodash";
import axios from "axios";
import Dropzone from 'react-dropzone'

class App extends React.Component {
    state = {
        messageRanking: []
    };

    onDrop(files) {
        files.forEach(f => {
            var formData = new FormData();
            formData.append("file", f);
            axios.post('http://localhost:3001/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data'}
            }).then(response => {
                console.log(response.data)
                this.setState({messageRanking: response.data});
            })
            .then(error => {
                console.log(error)
            })
        })
    }

    render() {
        const messageRanking = this.state.messageRanking;
        const sortedMessageRanking = _.sortBy(messageRanking, "messageCount").reverse();

        const messageRankingComponent = sortedMessageRanking.map(rankingEntry => (
            <MessageRanking
                messageCount={rankingEntry.messageCount}
                name={rankingEntry.name}
            />
        ));


        return (
            <section>
                <div className="dropzone">
                    <Dropzone onDrop={this.onDrop.bind(this)}>
                        <p>Try dropping some files here, or click to select files to upload.</p>
                    </Dropzone>
                </div>
                <div>
                    <ul>{messageRankingComponent}</ul>
                </div>
            </section>
        );
    }
}

export default App;
