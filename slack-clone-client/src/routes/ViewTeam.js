import React from 'react';

import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';
import Sidebar from '../containers/Sdiebar';

const ViewTeam = ({ match: { params } }) => {
  return (
    <AppLayout>
      <Sidebar currentTeamId={params.teamId} />
      <Header channelName="General" />
      <Messages>
        <ul className="message-list">
          <li></li>
          <li></li>
        </ul>
      </Messages>
      <SendMessage channelName="General" />
    </AppLayout>
  );
};

export default ViewTeam;
