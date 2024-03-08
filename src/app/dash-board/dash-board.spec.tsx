import { render } from '@testing-library/react';

import DashBoard from './dash-board';

describe('DashBoard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashBoard />);
    expect(baseElement).toBeTruthy();
  });
});
