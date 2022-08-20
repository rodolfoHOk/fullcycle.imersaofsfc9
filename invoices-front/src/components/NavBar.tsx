import { FunctionComponent } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Description } from '@mui/icons-material';
import Link from 'next/link';

export const Navbar: FunctionComponent = () => {
  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Toolbar>
        <Link href={'/'} as={`/`} passHref>
          <Button color="inherit" startIcon={<Description />} component="a">
            <Typography variant="h6">Code Invoice</Typography>
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
