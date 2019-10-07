import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const AuthPage = () => {
  const router = useRouter();

  useEffect(() => {
    const { hash } = window.location;
    const queryItems = hash.split('&');
    const query = queryItems.reduce((result, item) => {
      const [key, value] = item.split('=');
      result[key] = value;
      return result;
    }, {});

    const { access_token } = query;
    Cookies.set('thingiverse_access_token', access_token);
    router.push('/');
  }, [router]);

  return <div>Authorizing...</div>;
};

export default AuthPage;
