import React, {useEffect,useState} from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { styled } from '@mui/system';
import Link from 'next/link';


const BlackAppBar = styled(AppBar)({
    backgroundColor: 'black',
    height: 65,
    position: 'fixed',
  });

const WhiteButton = styled(Button)({
  color: 'black',
  backgroundColor: 'white',
  margin: 7,
  '&:hover': {
    backgroundColor: 'red',
    color: 'white',
  },
  
});

const CenteredToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const NavBar: React.FC = () => {

    

  return (
    <BlackAppBar>
        <CenteredToolbar>

            <Link href="/map" passHref>
            <WhiteButton>
                Mapa
            </WhiteButton>
            </Link>

            <Link href="/spis_krasnali" passHref>
            <WhiteButton>
                Spis Krasnali
            </WhiteButton>
            </Link>
      
            <Link href="/osiagniecia" passHref>
            <WhiteButton>
                Osiągnięcia
            </WhiteButton>
            </Link>
            
        </CenteredToolbar>
    </BlackAppBar>
  );
};

export default NavBar;
