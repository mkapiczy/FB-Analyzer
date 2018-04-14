import React from "react";
import { ListGroupItem, Badge } from 'react-bootstrap'

export class MessageRankingItem extends React.Component {
    render() {
        const messagePartner = this.props.messagePartner;
        const totalMessageCount = this.props.totalMessageCount;
        const messageCountByYears = JSON.stringify(this.props.messageCountByYears)


        return (
            <ListGroupItem><h4>{messagePartner}</h4> <Badge pullRight={true}>{totalMessageCount}</Badge>
            </ListGroupItem>
        );
    }
}
