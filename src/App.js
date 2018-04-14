import React from "react";
import {render} from "react-dom";
import {MessageRanking} from "./MessageRanking";
import {Loader} from "./Loader";
import _ from "lodash";
import axios from "axios";
import Dropzone from 'react-dropzone'
import { Button } from 'reactstrap';
import './styles.css';

class App extends React.Component {
    state = {
        messageRanking: [],
        isLoading: false
    };

    setTimeoutOnLoader() {
        this.setState({ isLoading: true});
        setTimeout(() => this.setState({ isLoading: false }), 1500);
    }

    onDrop(files) {
        files.forEach(f => {
            this.showLoadingPage()
            var formData = new FormData();
            formData.append("file", f);
            axios.post('http://localhost:3001/upload', formData, {headers: {'Content-Type': 'multipart/form-data'}})
                .then(response => {
                    console.log(response.data)
                    this.setState({messageRanking: response.data, isLoading: false});
                })
                .catch(error => {
                    console.log(error)
                })
        })
    }

    render() {
        const isLoading = this.state.isLoading;

        const messageRanking = this.state.messageRanking;
        const sortedMessageRanking = _.sortBy(messageRanking, "messageCount").reverse();

        const messageRankingComponent = sortedMessageRanking.map(rankingEntry => (
            <MessageRanking
                messageCount={rankingEntry.messageCount}
                name={rankingEntry.name}
            />
        ));

        if (!isLoading) {
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
                    <Button color="primary" className="test-btn" onClick={() => this.setTimeoutOnLoader()}>test</Button>
                </section>
            );
        } else {
            return <Loader/>;
        }
    }
}

export default App;
