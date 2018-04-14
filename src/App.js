import React from "react";
import {render} from "react-dom";

import axios from "axios";
import './App.css';
import Dropzone from 'react-dropzone'
import dropimg from './resources/drop_image.png'

import {MessageRanking} from "./MessageRanking"
import {MyNavbar} from "./MyNavbar"
import {Loader} from 'react-overlay-loader'

import 'react-overlay-loader/styles.css'


class App extends React.Component {
    state = {
        loadingMessage: 'Brace yourself! Your data is being processed!',
        messages: [],
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
                    this.setState({messages: response.data, isLoading: false});
                })
                .catch(error => {
                    console.log(error)
                })
        })
    }

    render() {
        const isLoading = this.state.isLoading
        const messages = this.state.messages
        const loadingMessage = this.state.loadingMessage

        return (
            <section>
                <MyNavbar/>

                <Dropzone onDrop={this.onDrop.bind(this)} className={'dropzone-styling'}>
                    <div className='dropzone--dropimg' borderStyle="none">
                        <img src={dropimg} height="50px"/>
                    </div>
                </Dropzone>

                <div>
                    <MessageRanking messages={messages}/>
                </div>
                <div>
                    <Loader fullPage loading={isLoading} text={loadingMessage}/>
                </div>
            </section>
        );

    }
}

export default App;
