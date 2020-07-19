import React from 'react';
import { Modal, Button, Input, Form } from 'semantic-ui-react';
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

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
    createChannel(teamId: $teamId, name: $name)
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
      });
      console.log('response :>> ', response);
      onClose();
      setSubmitting(false);
    },
  })
)(AddChannelModal);
