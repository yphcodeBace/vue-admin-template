import request from '@/utils/request'

export function userlogin(data) {
  return request({
    url: `${process.env.VUE_APP_LOGIN_API}/sso/login`,
    method: 'post',
    data
  })
}

export function message(data) {
  return request({
    url: '/sso/applyResetPassword',
    method: 'post',
    data
  })
}

export function resetPassword(data) {
  return request({
    url: '/sso/resetPassword',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}


