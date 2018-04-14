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

        const conversationsWithFilteredMsgCount = this.filterMessageCountByYears(conversations, yearFrom, yearTo)
        const messagesSortedByTotalMessageCount = _.sortBy(conversationsWithFilteredMsgCount, "totalMessageCount").reverse();

        const messageRankingItems = messagesSortedByTotalMessageCount.map(conversation => (
            <MessageRankingItem
                totalMessageCount={conversation.totalMessageCount}
                messagePartner={conversation.messagePartner}
            />
        ));

        return (
            <ListGroup className="messageRanking-background">
                {messageRankingItems}
            </ListGroup>
        );
    }
}
