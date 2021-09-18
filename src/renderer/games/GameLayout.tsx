import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

type GameLayoutProps = {
  title: string;
  children: React.ReactElement;
};

const GameLayout = (props: GameLayoutProps) => {
  const { title, children } = props;
  return (
    <div>
      <div style={{ marginBottom: 50 }}>
        <Grid columns={3}>
          <Grid.Column>
            <Link to="/games">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                />
              </svg>
            </Link>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <h1>{title}</h1>
          </Grid.Column>
          <Grid.Column />
        </Grid>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default GameLayout;
