import React from "react";
import { render } from "react-dom";
// import "./styles.css";
import { Organizer } from "./organizer";
import _ from "lodash";
import axios from "axios";

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

        return <ul>{organizersComponents}</ul>;
    }
}

export default App;
