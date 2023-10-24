import { render } from '@testing-library/react';
import React from 'react';
import MyApp from './MyApp';

test('render app', async () => {
  render(<MyApp />);
});
