const axios = require('axios').default;

axios.defaults.baseURL = 'https://api.vk.com/method/';

axios.interceptors.request.use(
   (config) => {
      config.params['access_token'] = process.env.VK_API_ACCESS_TOKEN;
      config.params['v'] = '5.131';

      return config;
   },
   (error) => Promise.reject(error)
)

axios.interceptors.response.use(
   (response) => {
      return response.data.response;
   },
   (error) => Promise.reject(error)
);

const getUsers = async (userIds) => {
   const fields = [
      'can_write_private_message'
   ];

   const nameCase = 'Nom';

   return await axios.get('users.get', {
      params: {
         user_ids: userIds.join(),
         fields: fields.join(),
         name_case: nameCase,
      }
   })
}

module.exports = {
   getUsers
};