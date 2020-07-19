import React from 'react';
import { Modal, Button, Input, Form } from 'semantic-ui-react';
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import _, { flowRight as compose } from 'lodash';

import { allTeamQuery } from '../graphql/team';

const AddChannelModal = ({
  open,
  onClose,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add Channel</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input
            fluid
            name="name"
            placeholder="Channel Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Field>
        <Form.Field>
          <Form.Group widths="equal">
            <Button fluid disabled={isSubmitting} onClick={onClose}>
              Cancel
            </Button>
            <Button
              fluid
              disabled={isSubmitting}
              onClick={handleSubmit}
              type="submit"
            >
              Create Channel
            </Button>
          </Form.Group>
        </Form.Field>
      </Form>
    </Modal.Content>
  </Modal>
);

const createChannelMuatation = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
      ok
      channel {
        id
        name
      }
    }
  }
`;

export default compose(
  graphql(createChannelMuatation),
  withFormik({
    mapPropsToValues: () => ({ name: '' }),
    handleSubmit: async (
      values,
      { props: { onClose, teamId, mutate }, setSubmitting }
    ) => {
      const response = await mutate({
        variables: { teamId, name: values.name },
        optimisticResponse: {
          createChannel: {
            __typename: 'Mutation',
            ok: true,
            channel: {
              __typename: 'Channel',
              id: -1,
              name: values.name,
            },
          },
        },
        update: (store, { data: { createChannel } }) => {
          const { ok, channel } = createChannel;
          if (!ok) {
            return;
          }
          const data = store.readQuery({ query: allTeamQuery });
          const teamIndex = _.findIndex(data.allTeams, ['id', teamId]);
          data.allTeams[teamIndex].channels.push(channel);
          store.writeQuery({ query: allTeamQuery, data });
        },
      });
      console.log('response :>> ', response);
      onClose();
      setSubmitting(false);
    },
  })
)(AddChannelModal);
