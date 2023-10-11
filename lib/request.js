//请求地址：
//https://gitee.com/api/v5/orgs/leaf-cli/repos?
//请求参数
//access_token=25f18f091c54854e6569aac124308e84&
//type=all&
//page=1&
//per_page=10

import axios from 'axios'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

export const getReposList = async function(){
  //TODO 请求地址以及参数配置化
  // return axios.get('https://gitee.com/api/v5/orgs/leaf-cli/repos?access_token=49286d8c2f8e2a06b29b7a2ab93e6cc6&type=all&page=1&per_page=10')
  return axios.get('https://api.github.com/orgs/leaf-cli/repos')

}

export const getTagsList = async function(repo){
  //TODO 请求地址以及参数配置化
  // return axios.get(`https://gitee.com/api/v5/repos/leaf-cli/${repo}/tags?access_token=49286d8c2f8e2a06b29b7a2ab93e6cc6`)
  return axios.get(`https://api.github.com/repos/leaf-cli/${repo}/tags?`)

}

