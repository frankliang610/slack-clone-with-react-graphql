import React from 'react';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';

const ViewTeam = () => {
  return (
    <AppLayout>
      <Teams teams={[{ id: 1, letter: 'A' }, { id: 2, letter: 'B' }]}>Teams</Teams>
      <Channels
        teamName="Team Name"
        userName=" User Name"
        channels={[
          {
            id: 1,
            name: 'general'
          },
          {
            id: 2,
            name: 'random'
          }
        ]}
        users={[
          {
            id: 1,
            name: 'slackbot'
          },
          {
            id: 2,
            name: 'user1'
          }
        ]}
      />
      <Header channelName="General" />
      <Messages>
        <ul className="message-list">
          <li></li>
          <li></li>
        </ul>
      </Messages>
      <SendMessage channelName="General" />
    </AppLayout>
  )
}

export default ViewTeam;
