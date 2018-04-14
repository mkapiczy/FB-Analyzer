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
import Nouislider from 'react-nouislider';
import "./Nouislider.css";
import wNumb from 'wnumb';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import './Slider.css'
import Slider, {Range} from 'rc-slider';

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
        ticksLabels: []
    };

    onUpdate = (values) => {
        this.setState({
            fromYear: values.target.value[0],
            toYear: values.target.value[1],
            currentValue: values.target.value
        })
        this.updateTickLabels()
    }

    showLoadingPage() {
        this.setState({isLoading: true});
    }

    onDrop = (files) => {
        files.forEach(f => {
            this.showLoadingPage()
            let formData = new FormData();
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

    updateTickLabels = () => {
        let ticksLabels = []
        for (let i = this.state.min; i <= this.state.max; i++) {
            if (i === this.state.fromYear || i === this.state.toYear) {
                ticksLabels.push(i.toString())
            } else {
                ticksLabels.push("")
            }
        }
        this.setState({ticksLabels: ticksLabels})
        return ticksLabels
    }

    render() {
        const isLoading = this.state.isLoading
        const messages = this.state.messages
        const loadingMessage = this.state.loadingMessage
        const ticksLabels = this.state.ticksLabels
        console.log('ticks', ticksLabels)

        return (
            <section>
                <MyNavbar/>

                <InfoBoard/>

                <MyDropzone onDrop={this.onDrop}/>

                <div class="mySlider">
                    <div class="slider-tooltip">{this.state.currentValue[0]} - {this.state.currentValue[1]}</div>
                    <ReactBootstrapSlider
                        value={this.state.currentValue}
                        change={this.onUpdate}
                        step={1}
                        min={this.state.min}
                        max={this.state.max}
                        range={true}
                        tooltip={'show'}
                        tooltip_split={true}/>
                </div>

                <MessageRanking messages={messages} yearFrom={this.state.fromYear}
                                yearTo={this.state.toYear}/>


                <MessageRanking messages={messages} yearFrom={2018} yearTo={3000}/>

                <Loader fullPage loading={isLoading} text={loadingMessage}/>
            </section>
        );

    }
}

export default App;
