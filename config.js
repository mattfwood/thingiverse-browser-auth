module.exports = {
  host:
    process.env.NODE_ENV === 'production'
      ? 'https://thingiverse-browser.now.sh/'
      : 'http://localhost:3000/',
  thingiverse_client_id: 'ac58b9e55dd80f6834f6',
};
