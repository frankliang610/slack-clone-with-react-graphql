import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import decode from 'jwt-decode';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';
import { allTeamQuery } from '../graphql/team';

const Sdiebar = ({ data: { loading, allTeams }, currentTeamId }) => {
  const [openAddChannelModal, setOpenAddChannelModal] = useState(false);

  const handleOpenAddChannelModal = () => setOpenAddChannelModal(true);
  const handleCloseAddChannelModal = () => setOpenAddChannelModal(false);

  if (loading) {
    return null;
  }

  const teamIndex = currentTeamId
    ? _.findIndex(allTeams, ['id', parseInt(currentTeamId, 10)])
    : 0;

  const team = allTeams[teamIndex];
  let username = '';
  try {
    const token = localStorage.getItem('token');
    const { user } = decode(token);
    username = user.username;
  } catch (error) {}

  return [
    <Teams
      key="team-sidebar"
      teams={allTeams.map((t) => ({
        id: t.id,
        letter: t.name.charAt(0).toUpperCase(),
      }))}
    />,
    <Channels
      key="channels-sidebar"
      teamName={team.name}
      teamId={team.id}
      userName={username}
      channels={team.channels}
      users={[
        { id: 1, name: 'slackbot' },
        { id: 2, name: 'user1' },
      ]}
      onAddChannelClick={handleOpenAddChannelModal}
    />,
    <AddChannelModal
      key="sidebar-add-channel-modal"
      teamId={team.id}
      open={openAddChannelModal}
      onClose={handleCloseAddChannelModal}
    />,
  ];
};

export default graphql(allTeamQuery)(Sdiebar);
