import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ChannelsWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
  color: #958993;
`;

const TeamNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`;

const SidebarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0px;
`;

const paddingLeft = 'padding-left: 10px';

const SidebarListItem = styled.li`
  padding: 2px;
  ${paddingLeft};
  &:hover {
    background: #3e313c;
  }
`;

const SidebarListHeader = styled.li`
  ${paddingLeft};
`;

const PushLeft = styled.div`
  ${paddingLeft};
`;

const GreenDot = styled.span`
  color: #38978d;
`;

const Dot = ({ on = true }) => (on ? <GreenDot>●</GreenDot> : '○');

const channel = ({ id, name }, teamId) => (
  <Link to={`/view-team/${teamId}/${id}`} key={`channel-${id}`}>
    <SidebarListItem># {name}</SidebarListItem>
  </Link>
);

const user = ({ id, name }) => (
  <SidebarListItem key={`user-${id}`}>
    <Dot /> {name}
  </SidebarListItem>
);

export default ({
  teamName,
  userName,
  channels,
  users,
  onAddChannelClick,
  teamId,
}) => (
  <ChannelsWrapper>
    <PushLeft>
      <TeamNameHeader>{teamName}</TeamNameHeader>
      {userName}
    </PushLeft>
    <div>
      <SidebarList>
        <SidebarListHeader>
          Channels <Icon name="add circle" onClick={onAddChannelClick} />
        </SidebarListHeader>
        {channels.map((c) => channel(c, teamId))}
      </SidebarList>
    </div>
    <div>
      <SidebarList>
        <SidebarListHeader>Direct Messages</SidebarListHeader>
        {users.map(user)}
      </SidebarList>
    </div>
  </ChannelsWrapper>
);
