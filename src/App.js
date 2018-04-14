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

class App extends React.Component {
    state = {
        loadingMessage: 'Brace yourself! Your data is being processed!',
        messages: [],
        isLoading: false,
        fromYear: 2000,
        toYear: 2018
    };

    onUpdate = (values, handle) => {
        this.setState({fromYear: values[0], toYear: values[1]})
       
        console.log('fromYear:  ', values[0])
        console.log('toYear: ', values[1])
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

    // isLoadingToPass = (boolean) => {
    //     let loadingToPass = boolean;
    // }


    render() {
        const isLoading = this.state.isLoading
        const messages = this.state.messages
        const loadingMessage = this.state.loadingMessage

        return (
            <section>
                <MyNavbar/>

                <InfoBoard/>

                <MyDropzone onDrop={this.onDrop} isLoading={isLoading}/>

               
                <Nouislider
                onSlide = { this.onUpdate }
                    range={{min: 2004, max: 2018}}
                    step = {1}
                    start={[2004, 2018]}
                    format = {wNumb({
                     deimals: 0
                    })}
                     connect = {true}
                     tooltips
                     />
               
              
                    <MessageRanking messages={messages} yearFrom={this.state.fromYear} 
                    yearTo = {this.state.toYear}/>
              
              
                <MessageRanking messages={messages} yearFrom={2018} yearTo={3000}/>

                <Loader fullPage loading={isLoading} text={loadingMessage}/>
            </section>
        );

    }
}

export default App;
