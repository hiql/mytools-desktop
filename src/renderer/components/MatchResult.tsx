import React from 'react';
import { Segment } from 'semantic-ui-react';

export default function MatchResult(props: {
  value: string;
  successMessage: string;
  errorMessage: string;
  defaultMessage: string;
}) {
  const getColor = () => {
    if (props.value === 'yes') {
      return 'green';
    }
    if (props.value === 'no') {
      return 'red';
    }
    return undefined;
  };

  const getMessage = () => {
    if (props.value === 'yes') {
      return props.successMessage;
    }
    if (props.value === 'no') {
      return props.errorMessage;
    }
    return props.defaultMessage;
  };

  const isInverted = () => {
    if (props.value === 'yes' || props.value === 'no') {
      return true;
    }

    return false;
  };

  return (
    <Segment textAlign="center" inverted={isInverted()} color={getColor()}>
      {getMessage()}
    </Segment>
  );
}
