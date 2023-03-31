import api from './api';

componentDidMount() {
    api.get('/users/me')
      .then(response => {
        // handle response
        console.log(response.data.user_id);
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }
  