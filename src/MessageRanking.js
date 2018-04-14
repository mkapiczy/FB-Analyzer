import React from "react";
import { MessageRankingItem } from './MessageRankingItem'
import { ListGroup } from 'react-bootstrap'

import _ from 'lodash'

export class MessageRanking extends React.Component {
    render() {
        const messages = this.props.messages

        const messagesSortedByTotalMessageCount = _.sortBy(messages, "totalMessageCount").reverse();

        const messageRankingItems = messagesSortedByTotalMessageCount.map(conversation => (
            <MessageRankingItem
                totalMessageCount={conversation.totalMessageCount}
                messagePartner={conversation.messagePartner}
                messageCountByYears={conversation.messageCountByYears}
            />
        ));

        return (
            <ListGroup>
                {messageRankingItems}
            </ListGroup>
        );
    }
}
