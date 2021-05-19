import { Meta } from '@storybook/react';
import React from 'react';
import '../../../styles/components/common/button.scss';
import '../../../styles/components/common/card/cardStyles.scss';
import '../../../styles/components/common/menu/menuStyles.scss';
import { Button } from '../Button';
import Card from './Card';

export const Basic = (): React.ReactElement => {
  return (
    <Card
      style={{
        width: 250,
      }}
      topRight={
        <Card.Menu
          title="Title"
          items={[{ text: 'Item', onClick: () => console.log('test success') }]}
        />
      }
    >
      <Card.Header>Welcome</Card.Header>
      <Card.Body>
        <p>
          some test text some test text some test text some test text some test
          text some test text some test text
        </p>
      </Card.Body>
      <Card.Footer right>
        <Button>Okay</Button>
      </Card.Footer>
    </Card>
  );
};

export const NoDividers = (): React.ReactElement => {
  return (
    <Card
      style={{
        width: 250,
      }}
      topRight={<Card.Menu title="Title" />}
    >
      <Card.Header hideDivider>Welcome</Card.Header>
      <Card.Body>
        <p>asdasdasd</p>
      </Card.Body>
      <Card.Footer right hideDivider>
        <Button>Okay</Button>
      </Card.Footer>
    </Card>
  );
};

export const NoHeader = (): React.ReactElement => {
  return (
    <Card
      style={{
        width: 250,
      }}
      topRight={<Card.Menu title="Title" />}
    >
      <Card.Body>
        <p>asdasdasd</p>
      </Card.Body>
      <Card.Footer hideDivider>
        <p>soiadasdas</p>
      </Card.Footer>
    </Card>
  );
};

export const JustHeader = (): React.ReactElement => {
  return (
    <Card
      style={{
        width: 250,
      }}
    >
      <Card.Header>Test Text</Card.Header>
    </Card>
  );
};
export const JustHeaderWithHiddenDivider = (): React.ReactElement => {
  return (
    <Card
      style={{
        width: 250,
      }}
    >
      <Card.Header hideDivider>Test Text</Card.Header>
    </Card>
  );
};

export const JustBody = (): React.ReactElement => {
  return (
    <Card
      style={{
        width: 250,
      }}
    >
      <Card.Body>
        <p>Test Text</p>
      </Card.Body>
    </Card>
  );
};

export const JustFooter = (): React.ReactElement => {
  return (
    <Card
      style={{
        width: 250,
      }}
    >
      <Card.Footer right>
        <Button>Okay</Button>
        <Button type="secondary">Cancel</Button>
      </Card.Footer>
    </Card>
  );
};

export const NoBody = (): React.ReactElement => {
  return (
    <Card
      style={{
        width: 250,
      }}
    >
      <Card.Header hideDivider>Header</Card.Header>
      <Card.Footer>Footer</Card.Footer>
    </Card>
  );
};

export default {
  title: 'Components/Compound/Card',
  component: Card,
} as Meta;
