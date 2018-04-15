import React from "react";
import {render} from "react-dom";

import axios from "axios";
import './App.css';

import {MessageRanking} from "./MessageRanking"
import {MyNavbar} from "./MyNavbar"
import {Loader} from 'react-overlay-loader'
import {InfoBoard} from "./InfoBoard";
import {MyDropzone} from "./MyDropzone";

import 'react-overlay-loader/styles.css'
import "./Nouislider.css";
import ReactBootstrapSlider from 'react-bootstrap-slider';
import './Slider.css'
import Autosuggest from 'react-bootstrap-autosuggest'

class App extends React.Component {
    state = {
        loadingMessage: 'Brace yourself! Your data is being processed!',
        messages: [],
        isLoading: false,
        fromYear: 2000,
        toYear: 2020,
        currentValue: [2000, 2018],
        min: 2000,
        max: 2018,
        searchTerm: ''
    };

    onUpdate = (values) => {
        this.setState({
            fromYear: values.target.value[0],
            toYear: values.target.value[1],
            currentValue: values.target.value
        })
    }

    onUpdateSearch = (value) => {
        this.setState({searchTerm: value});
    }

    showLoadingPage() {
        this.setState({isLoading: true});
    }

    onDrop = (files) => {
        files.forEach(f => {
            this.showLoadingPage()
            let formData = new FormData();
            formData.append("file", f);
            axios.post('https://fb-analyzer-server.herokuapp.com/upload', formData, {headers: {'Content-Type': 'multipart/form-data'}})
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
        const messagePartners = Array.from(new Set(messages.map(m => m.messagePartner)))
        console.log('Partners', messagePartners)
        return (
            <section>
                <MyNavbar/>

                <InfoBoard/>

                <MyDropzone onDrop={this.onDrop} isLoading={isLoading}/>

                <div class="mySlider">
                    <div class="slider-tooltip">{this.state.currentValue[0]} - {this.state.currentValue[1]}</div>
                    <ReactBootstrapSlider
                        value={this.state.currentValue}
                        change={this.onUpdate}
                        step={1}
                        min={this.state.min}
                        max={this.state.max}
                        range={true}/>
                </div>

                <Autosuggest className="searchbox"
                    datalist={messagePartners}
                    placeholder={"Filter by name"}
                    onChange={this.onUpdateSearch}/>

                <MessageRanking messages={messages} yearFrom={this.state.fromYear} yearTo={this.state.toYear}
                                searchTerm={this.state.searchTerm}/>

                <Loader fullPage loading={isLoading} text={loadingMessage}/>
            </section>
        );

    }
}

export default App;
