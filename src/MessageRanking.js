import React from "react";
import { MessageRankingItem } from './MessageRankingItem'
import { ListGroup } from 'react-bootstrap'
import "./MessageRanking.css"

import _ from 'lodash'

export class MessageRanking extends React.Component {

    filterMessageCountByYears = (conversations, yearFrom, yearTo) => {
        return conversations.map(c => {
            const filteredMessageCounts = _.filter(c.messageCountByYears, msgCount => msgCount.year >= yearFrom && msgCount.year <= yearTo)
            let totalMessageCount = 0
            filteredMessageCounts.forEach(msgCount => {
                totalMessageCount += msgCount.count
            })
            return { ...c, totalMessageCount: totalMessageCount}
        })
    }

    render() {
        const conversations = this.props.messages
        const yearFrom = this.props.yearFrom
        const yearTo = this.props.yearTo
        const searchTerm = this.props.searchTerm

        const conversationsFilteredByMessagePartner = _.filter(conversations, (c) => c.messagePartner.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
        const conversationsWithFilteredMsgCount = this.filterMessageCountByYears(conversationsFilteredByMessagePartner, yearFrom, yearTo)
        const messagesSortedByTotalMessageCount = _.sortBy(conversationsWithFilteredMsgCount, "totalMessageCount").reverse();

        const messageRankingItems = messagesSortedByTotalMessageCount.map(conversation => (
            <MessageRankingItem
                totalMessageCount={conversation.totalMessageCount}
                messagePartner={conversation.messagePartner}
            />
        ));

        return (
            <ListGroup className="messageRanking-background">
                <MessageRankingItem
                totalMessageCount={"no. of msgs"}
                messagePartner={"Message Partner"}
            />
                {messageRankingItems}
            </ListGroup>
        );
    }
}
