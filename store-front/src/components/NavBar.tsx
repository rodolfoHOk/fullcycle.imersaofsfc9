import { FunctionComponent } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Store } from '@mui/icons-material';
import Link from 'next/link';

export const Navbar: FunctionComponent = () => {
  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Toolbar>
        <Link href={'/'} as={`/`} passHref>
          <Button color="inherit" startIcon={<Store />} component="a">
            <Typography variant="h6">Code Store</Typography>
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
