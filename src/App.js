import React from "react";
import { render } from "react-dom";
import { Organizer } from "./organizer";
import _ from "lodash";
import axios from "axios";
import Dropzone from 'react-dropzone'

class App extends React.Component {
    state = {
        organizers: []
    };

    upvote = async organizer => {
        const response = await axios.post(
            "https://auhack18react.now.sh/upvote/" + organizer.name
        );
        this.setState({ organizers: response.data });
    };

    async componentDidMount() {
        const response = await axios.get("https://auhack18react.now.sh/organizers");

        this.setState({ organizers: response.data });
    }

    onDrop(files) {
        files.forEach(f => {
            var reader = new FileReader();
            reader.readAsText(f, "UTF-8");
            reader.onload = function (evt) {
                console.log(evt.target.result)
            }
            reader.onerror = function (evt) {
                console.log("error reading file")
            }
        })
    }

    render() {
        const organizers = this.state.organizers;
        const sortedOrganizers = _.sortBy(organizers, "votes").reverse();

        const organizersComponents = sortedOrganizers.map(organizer => (
            <Organizer
                votes={organizer.votes}
                name={organizer.name}
                clickHandler={() => this.upvote(organizer)}
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
                <ul>{organizersComponents}</ul>
                </div>
            </section>
        );
    }

}

export default App;
