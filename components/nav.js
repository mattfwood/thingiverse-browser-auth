import React from 'react'
import Link from 'next/link'
import { Link as StyledLink } from '@chakra-ui/core';
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
  padding: 0 24px;

  a {
    display: inline-block;
    padding: 5px;
    margin-left: -5px;
    margin-right: 2rem;
    -webkit-text-decoration: none;
    text-decoration: none;
    -webkit-transition: color 0.2s ease;
    transition: color 0.2s ease;
  }
`;

const links = [
  { href: 'https://zeit.co/now', label: 'ZEIT' },
  { href: 'https://github.com/zeit/next.js', label: 'GitHub' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const thingiverseAuthLink = `https://www.thingiverse.com/login/oauth/authorize?client_id=${thingiverse_client_id}&response_type=token&redirect_uri=${host}auth`

const Nav = () => {
  const { isLoggedIn } = useCurrentUser();

  console.log({ isLoggedIn })

  return (
    <NavigationBar>
      <Link href="/">
        <StyledLink>Thingiverse Browser</StyledLink>
      </Link>
      <div>
        {isLoggedIn ? (
          <Link href="/Liked">
            <StyledLink>Liked Things</StyledLink>
          </Link>
        ): (
          <StyledLink href={thingiverseAuthLink}>
              Sign In
          </StyledLink>
        )}
      </div>
    </NavigationBar>
  )
}

export default Nav
