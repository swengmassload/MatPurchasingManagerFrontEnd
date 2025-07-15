
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import IsOffComponent from './IsOffComponent';



describe('IsOffComponent', () => {
  it('renders the OFF box correctly', () => {
    const { getByText } = render(<IsOffComponent />);

    const offBox = getByText('OFF');
     const onBox = getByText('ON');
console.log(onBox);
    expect(onBox).toBeInTheDocument();
    expect(offBox).toBeInTheDocument();
    
    // expect(onBox).toHaveStyle({
    //   backgroundColor: '#EB606B',
    //   fontSize: '14px',
    //   fontWeight: '400'
    // });
    // expect(offBox).toHaveStyle({
    //   backgroundColor: '#ADADAD66',
    //   fontSize: '14px',
    //   fontWeight: '400'
    // });



  });
});