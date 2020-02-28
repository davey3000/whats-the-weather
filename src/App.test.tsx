import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Check the search bar elements are present', () => {
  const { getByText, getByLabelText } = render(<App />);
  const locationElement = getByLabelText(/Location/);
  expect(locationElement).toBeInTheDocument();
  const searchBtnElement = getByText(/search/);
  expect(searchBtnElement).toBeInTheDocument();
});
