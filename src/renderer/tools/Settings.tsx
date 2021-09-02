import React from 'react';
import { Form, Header } from 'semantic-ui-react';
import * as constants from '../constants';

const menuSortOptions = [
  { key: 'default', value: 'default', text: 'Default' },
  { key: 'alpha', value: 'alpha', text: 'Alphabetical' },
];

export default function Settings() {
  const [menuSortBy, setMenuSortBy] = React.useState('');

  React.useEffect(() => {
    const menuOrder = window.store.get(
      constants.KEY_SETTINGS_UI_MENU_ORDER,
      'default'
    );
    setMenuSortBy(menuOrder);
  }, []);

  const onMenuSortBy = (value: string) => {
    window.store.set(constants.KEY_SETTINGS_UI_MENU_ORDER, value);
    setMenuSortBy(value);
  };

  return (
    <>
      <Header as="h3">General</Header>
      <Form>
        <Form.Group>
          <Form.Select
            label="Main menu sorted by"
            value={menuSortBy}
            onChange={(_e, { value }) =>
              value !== undefined && onMenuSortBy(value.toString())
            }
            options={menuSortOptions}
          />
        </Form.Group>
      </Form>
    </>
  );
}
