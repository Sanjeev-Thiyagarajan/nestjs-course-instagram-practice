fetch('URL_GOES_HERE', {
  method: 'post',
  headers: {
    Authorization: 'Bearer ' + 'insert jwt token here',
    'Content-Type': 'application/json',
  },
});
