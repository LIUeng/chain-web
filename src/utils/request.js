const qs = require('qs');
import { Message } from 'element-ui';

// request data
function request(url, { method = 'GET', header, data = {}, formData = false } = {}) {
  if (!url) {
    Message.warning('没有请求路径');
    return;
  }

  const params = {
    method: (method || 'GET').toUpperCase(),
    mode: 'cors',
  };

  // handle get
  if (params.method === 'GET' && data && Object.keys(data).length) {
    let getParams = qs.stringify(data);
    url = url + '?' + getParams;
  }

  if (params.method === 'POST') {
    params.headers['content-type'] = header || 'application/json';
    if (formData) {
      params.headers['content-type'] = 'application/x-www-form-urlencoded';
      params.body = data;
    } else {
      params.body = JSON.stringify(data);
    }
  }
  // use fetch window self obj
  return fetch(url, params)
    .then(res => {
      return res.json();
    })
    .catch((e) => {
      Message.error('服务器出错了');
      clearInterval(window.timerId);
      window.timerId = null;
      return e;
    });
}

export default request;
