import React from 'react';
import _ from 'lodash';
import { graphql } from 'react-apollo';

import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';
import Sidebar from '../containers/Sdiebar';
import { allTeamQuery } from '../graphql/team';

const ViewTeam = ({
  data: { loading, allTeams },
  match: {
    params: { teamId, channelId },
  },
}) => {
  if (loading) {
    return null;
  }

  const teamIndex = teamId
    ? _.findIndex(allTeams, ['id', parseInt(teamId, 10)])
    : 0;
  const team = allTeams[teamIndex];
  const channelIndex = channelId
    ? _.findIndex(team.channels, ['id', parseInt(channelId, 10)])
    : 0;
  const channel = team.channels[channelIndex];

  return (
    <AppLayout>
      <Sidebar
        teams={allTeams.map((t) => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase(),
        }))}
      />
      <Header channelName={channel.name} />
      <Messages channelId={channel.id}>
        <ul className="message-list">
          <li></li>
          <li></li>
        </ul>
      </Messages>
      <SendMessage channelName={channel.name} />
    </AppLayout>
  );
};

export default graphql(allTeamQuery)(ViewTeam);
