
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect ,} from 'vitest';
import IsOnComponent from './IsOnComponent';

describe('IsOnComponent', () => {
  it('renders the ON and OFF boxes correctly', () => {
    const { getByText } = render(<IsOnComponent />);
   
    const onBox = getByText('ON');
    const offBox = getByText('OFF');

    expect(onBox).toBeInTheDocument();
    expect(offBox).toBeInTheDocument();

    expect(onBox).toHaveStyle({
      backgroundColor: '#84A98C',
      color: 'rgb(0, 0, 0)',
      fontSize: '14px',
      fontWeight: '400',
    });

    expect(offBox).toHaveStyle({
    backgroundColor: "#ADADAD66",

      color: 'rgb(0, 0, 0)',
      fontSize: '14px',
      fontWeight: '400',
    });
  });
});