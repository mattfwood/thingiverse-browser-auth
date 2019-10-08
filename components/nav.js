import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { thingiverse_client_id, host } from '../config';
import useCurrentUser from '../hooks/useCurrentUser';

const NavigationBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgb(236, 236, 236);
  width: 100%;
  height: 48px;
  font-size: 16px;
  padding: 0 24px;

  a {
    display: inline-block;
    padding: 5px;
    margin-left: -5px;
    -webkit-text-decoration: none;
    text-decoration: none;
    -webkit-transition: color 0.2s ease;
    transition: color 0.2s ease;
  }
`;

const thingiverseAuthLink = `https://www.thingiverse.com/login/oauth/authorize?client_id=${thingiverse_client_id}&response_type=token&redirect_uri=${host}auth`;

const Nav = () => {
  const { isLoggedIn } = useCurrentUser();

  console.log({ isLoggedIn });

  return (
    <NavigationBar>
      <Link href="/">
        <a>Thingiverse Browser</a>
      </Link>
      <div>
        {isLoggedIn ? (
          <Link href="/liked">
            <a>Liked Things</a>
          </Link>
        ) : (
          <a href={thingiverseAuthLink}>Sign In</a>
        )}
      </div>
    </NavigationBar>
  );
};

export default Nav;
