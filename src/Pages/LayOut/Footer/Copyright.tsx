import React from 'react';
import { Typography, Link } from '@mui/material';
import { Fixedvalues } from '../../../Constants/FixValues';

const currentYear = new Date().getFullYear();

export function Copyright(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      <Link color="inherit" href="https://www.massload.com/">
        {Fixedvalues.CopyRight}
      </Link>
      {currentYear}.
    </Typography>
  );
}