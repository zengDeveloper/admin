import axios from 'axios'
let base = '/shirospring'
export const login = params =>{return axios.post(`%base/loginWeb`,params).then(res => { res.data })}
export const getRoleList = () => {return axios.get(`${base}/resource/role/listTopRole`).then(res => res.data)}
export const getRoleListByParent = (id) => {return axios.get(`${base}/resource/role/listByParent/${id}`).then(res => res.data)}
export const saveRole = params => {return axios.post(`${base}/resource/role/save`,params, {headers: {"Content-Type": "application/json"}}).then(res => res.data) }