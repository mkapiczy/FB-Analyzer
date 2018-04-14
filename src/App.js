import React from "react";
import {render} from "react-dom";
import {MessageRanking} from "./MessageRanking";
import {Loader} from "./Loader";
import _ from "lodash";
import axios from "axios";
import './App.css';
import Dropzone from 'react-dropzone'
import dropimg from './resources/drop_image.png'

class App extends React.Component {
    state = {
        messageRanking: [],
        isLoading: false
    };

    showLoadingPage() {
        this.setState({isLoading: true});
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
        const sortedMessageRanking = _.sortBy(messageRanking, "totalMessageCount").reverse();

        const messageRankingComponent = sortedMessageRanking.map(rankingEntry => (
            <MessageRanking
                totalMessageCount={rankingEntry.totalMessageCount}
                messagePartner={rankingEntry.messagePartner}
                messageCountByYears={rankingEntry.messageCountByYears}
            />
        ));

        if (!isLoading) {
            return (
                <section>

                        
                        <Dropzone onDrop={this.onDrop.bind(this)} className={'dropzone-styling'}>
                            <div className='dropzone--dropimg' borderStyle="none">
                        <img src={dropimg} height="50px"/>
                        </div>
                        </Dropzone>

                    <div>
                        <ul>{messageRankingComponent}</ul>
                    </div>
                </section>
            );
        } else {
            return <Loader/>;
        }
    }
}

export default App;
