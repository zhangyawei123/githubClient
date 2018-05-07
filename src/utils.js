import {httpUrl} from "./http_url";

export function LogIn(account, password) {                   //登录功能，记录cid和秘钥
  this.axios.post(httpUrl + 'api/login/check', this.qs.stringify({
    account: account,
    password: password
  }))
    .then(response => {
      // console.log(response.data);
      this.$cookie.set('cid', response.data.cid, { expires: '1d' });
      this.$cookie.set('secret', response.data.secret, { expires: '1d' });
      this.GetAccessToken();
      this.$router.push({path: '/'})
    })
    .catch(err => {
      console.log(err);
    });
}

export function GetAccessToken() {                             //获取令牌
  this.axios.post(httpUrl + 'api/authority/token?cid='+this.$cookie.get('cid')+'&secret=' + this.$cookie.get('secret'), this.qs.stringify({
  }))
    .then(response => {
      // console.log(response.data);
      this.$cookie.set('accessToken', response.data.access_token);
    })
    .catch(err => {
      console.log(err);
    });
}

export function checkLogIn() {                                  //判断登录状态
  if (!this.$cookie.get('accessToken')) {                       //如果令牌过期，就从新获取
    if (!this.$cookie.get('cid') || !this.$cookie.get('secret')) {  //没有秘钥就到登录页面去
      this.$router.push({ path: '/login'})
    }else {
      this.GetAccessToken();
    }
  }else {
    return
  }
}






