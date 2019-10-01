import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'

const useCurrentUser = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get('thingiverse_access_token') !== undefined);

  useEffect(() => {
    const token = Cookies.get('thingiverse_access_token');

    if (token) {
      setIsLoggedIn(true);
    }
  }, [])

  return {
    isLoggedIn
  }
}

export default useCurrentUser;