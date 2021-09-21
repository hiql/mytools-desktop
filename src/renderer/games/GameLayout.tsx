import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Icon } from 'semantic-ui-react';

type GameLayoutProps = {
  title: string;
  children: React.ReactNode;
};

const GameLayout = (props: GameLayoutProps) => {
  const history = useHistory();
  const { title, children } = props;

  const goGames = () => {
    history.push('/games');
  };

  return (
    <div>
      <div style={{ marginBottom: 25 }}>
        <Grid columns={3}>
          <Grid.Column>
            <Button icon circular basic size="small" onClick={goGames}>
              <Icon name="arrow left" />
            </Button>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <h1>{title}</h1>
          </Grid.Column>
          <Grid.Column textAlign="right" />
        </Grid>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default GameLayout;
