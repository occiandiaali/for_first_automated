// src/boot/axios.ts
import { boot } from 'quasar/wrappers';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.withCredentials = true; // ✅ Send cookies with every request

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
});

export { axios };
