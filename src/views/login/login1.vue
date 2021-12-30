<template>
  <div class="contain">
    <div class="header">
      <div class="img-div" />
      <div class="y-tabs">
        <div v-for="(item,index) in tabs" :key="index" :class="item.name===activeTab?'active':''" @click="changeTab(item)">{{
          item.name
        }}
        </div>
      </div>
    </div>
    <div class="content">
      <div class="title" />
      <div class="sm-bg" />
      <div class="login">
        <el-tabs v-model="activeName" stretch>
          <el-tab-pane label="账号密码登录" name="first">
            <el-form ref="ruleForm" status-icon label-width="60px" class="demo-ruleForm">
              <el-form-item label="账号">
                <el-input
                  v-model="accountParams.username"
                  size="medium"
                  type="text"
                  autocomplete="off"
                  placeholder="请输入账号"
                  @keyup.enter.native="submitForm('account')"
                />
              </el-form-item>
              <el-form-item label="密码">
                <el-input
                  v-model="accountParams.password"
                  size="medium"
                  type="password"
                  autocomplete="off"
                  placeholder="请输入密码"
                  @keyup.enter.native="submitForm('account')"
                />
              </el-form-item>
              <el-button size="medium" type="primary" style="width:100%" @click="submitForm('account')">登 录</el-button>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="手机号登录" name="second">
            <el-form
              ref="ruleForm1"
              status-icon
              label-width="80px"
              class="demo-ruleForm"
              @keyup.enter.native="submitForm('mobile')"
            >
              <el-form-item label="手机号">
                <el-input
                  v-model="phoneParams.phone"
                  size="medium"
                  type="tel"
                  pattern="[0-9]*"
                  autocomplete="off"
                  maxlength="11"
                  placeholder="请输入手机号"
                />
              </el-form-item>
              <el-form-item label="验证码">
                <el-input
                  v-model="phoneParams.captcha"
                  size="medium"
                  type="text"
                  autocomplete="off"
                  maxlength="6"
                  style="float:left; width:150px;"
                  placeholder="请输入验证码"
                />
                <a href="javascript:void(0);" class="getVecodeBtn">
                  <el-button v-show="show" style="margin: 0" size="medium" type="primary" @click="setSmsCode">获取验证码</el-button>
                  <!-- <p v-show="show" @click="setSmsCode">获取验证码</p> -->
                  <p v-show="!show">{{ count }}s后重新获取</p>
                </a>
              </el-form-item>
              <el-button size="medium" type="primary" style="width:100%" @click="submitForm('mobile')">登 录</el-button>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <div class="forgot" @click="forgetPswd">忘记密码？</div>
      </div>
    </div>
    <div class="footer">
      <div>联系电话：0371-55183228</div>
      <div>地址：河南省郑州市经济技术开发区第八大街160号附79号01号楼一层</div>
      <div>Copyright © 2019-2020 蚂蚁商联（CAA）. All Rights Reserved 豫ICP备18037183号-1</div>
    </div>
  </div>
</template>

<script>
import { setToken } from '@/utils/auth'
import {
  userlogin,
  message
} from '@/api/user'

export default {
  name: 'Login',
  data: function() {
    return {
      tabs: [
        { name: '首页', path: 'http://www.mayishanglian.com' },
        { name: '联合自有品牌', path: 'http://www.mayishanglian.com/index.php/Index/newsList/cate2/-1/tp/3.html' },
        { name: '蚂蚁商学院', path: 'http://www.mayishanglian.com/index.php/Index/newsList/cate2/4/tp/4.html' },
        { name: '蚂力大数据', path: 'http://www.mayishanglian.com/index.php/Index/newsList/cate2/17/tp/4.html' },
        { name: '商联动态', path: 'http://www.mayishanglian.com/index.php/Index/newsList/cate2/12/tp/4.html' },
        { name: '商联成员', path: 'http://www.mayishanglian.com/index.php/Index/newsList/cate2/9/tp/9.html' },
        { name: '商联系统', path: 'http://www.mayishanglian.com/index.php/Index/newsList/cate2/10/tp/2.html' },
        { name: '关于商联', path: 'http://www.mayishanglian.com/index.php/Index/newsDetail/id/110.html' },
        { name: '加入商联', path: 'http://www.mayishanglian.com/index.php/Index/newsDetail/cate2/15/tp/4.html' }
      ],
      activeTab: '首页',
      activeName: 'first',
      show: true,
      count: '',
      timer: null,
      accountParams: {
        appId: '0001',
        loginType: 'default',
        username: '',
        password: ''
      },
      phoneParams: {
        'loginType': 'sms',
        'phone': '',
        'captcha': '',
        'appId': '0001'
      }
    }
  },

  methods: {
    forgetPswd() {
      this.$router.push('forgetpswd')
    },
    async submitForm(event) {
      if (event === 'account') {
        if (!this.accountParams.username || !this.accountParams.password) {
          this.$message.warning('账号密码不能为空')
          return false
        }
        const json = await userlogin(this.accountParams)
        console.log(json)
        if (json.code === 200) {
          if (json.data.success) {
            this.$message.success(json.data.message)
            setTimeout(() => {
              localStorage.setItem('dqtoken', json.data.token)
              localStorage.setItem('userinfo', JSON.stringify(json.data.user))
              localStorage.setItem('authorities', JSON.stringify(json.data.authorities))
              localStorage.setItem('isLogin', true)
              setToken(json.data.token)
              this.$router.push({ path: this.redirect || '/' })
            }, 1000)
          } else {
            this.$message.error(json.data.message)
          }
        } else {
          this.$message.error(json.data.message)
        }
      } else {
        if (!this.phoneParams.phone) {
          this.$message.warning('手机号不能为空')
          return
        }
        if (!this.phoneParams.captcha) {
          this.$message.warning('验证码不能为空')
          return
        }
        const json = await userlogin(this.phoneParams)
        if (json.code === 200) {
          if (json.data.success) {
            this.$message.success(json.data.message)
            setTimeout(() => {
              localStorage.setItem('dqtoken', json.data.token)
              localStorage.setItem('userinfo', JSON.stringify(json.data.user))
              localStorage.setItem('authorities', JSON.stringify(json.data.authorities))
              localStorage.setItem('isLogin', true)
              window.location.href = '/'
            }, 1000)
          } else {
            this.$message.error(json.data.message)
          }
        } else {
          this.$message.error(json.data.message)
        }
      }
    },
    async setSmsCode() {
      const json = await message({ phone: this.phoneParams.phone })
      if (json.code === 200) {
        this.$message.warning('验证码发送成功')
        this.getCode()
      } else {
        this.$message.warning(json.msg)
      }
    },
    getCode() {
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    // =======
    changeTab(item) {
      this.activeTab = item.name
      window.open(item.path)
    }
  }
}
</script>
<style scoped lang="scss">
.el-tabs__nav {
  width: 100% !important;
}

.contain {
  //width: 100%;
  width: 1920px;
  //height: 100vh;
  //height: 1080px;
  //background: url('../../assets/img/loginbg.png') top center no-repeat;
  background-size: 100% 100%;

  .header {
    //border: 1px solid red;
    background: #FFFFFF;
    box-sizing: border-box;
    padding: 0 0 26px 140px;
    height: 195px;
    display: flex;
    align-items: end;

    .img-div {
      //border: 1px solid red;
      width: 327px;
      height: 117px;
      background-image: url("../../assets/img/logo.png");
      background-size: 100% 100%;
    }

    .y-tabs {
      box-sizing: border-box;
      //border: 1px solid green;
      height: 50px;
      flex: 1;
      display: flex;
      align-items: center;

      div {
        cursor: pointer;
        font-size: 18px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #1E2086;
        margin-left: 45px;
      }

      div:hover {
        box-sizing: border-box;
        padding: 10px 20px;
        background: #1E2086;
        border-radius: 20px;
        font-size: 18px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #FFFFFF;
      }

      .active {
        box-sizing: border-box;
        padding: 10px 20px;
        background: #1E2086;
        border-radius: 20px;
        font-size: 18px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #FFFFFF;
      }
    }

  }

  .content {
    position: relative;
    height: 720px;
    width: 100%;
    background-image: url("../../assets/img/bg.png");
    background-size: 100% 100%;

    .title {
      position: absolute;
      left: 376px;
      top: 90px;
      width: 417px;
      height: 45px;
      background-image: url("../../assets/img/title.png");
      background-size: 100% 100%;
    }

    .sm-bg {
      position: absolute;
      left: 186px;
      top: 194px;
      width: 795px;
      height: 406px;
      background-image: url("../../assets/img/sm_bg.png");
      background-size: 100% 100%;
    }
  }

  .footer {
    //border: 1px solid red;
    box-sizing: border-box;
    padding: 44px 0 0 242px;
    height: 164px;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #1D1D1D;

    div {
      margin-bottom: 10px;
    }
  }

  .login {
    ::v-deep{
      .el-tabs__item,.el-form-item__label{
        font-size: 18px;
      }
      .el-input--medium .el-input__inner{
        height: 48px;
        font-size: 16px;
      }
      .el-form-item{
        margin-bottom: 38px;
      }
      .el-button--medium{
        height: 50px;
        margin-top: 34px;
        font-size: 18px;
      }
    }
    position: absolute;
    //right: 25%;
    left: 1100px;
    top: 94px;
    width: 500px;
    height: 480px;
    padding: 20px;
    background: #fff;
    box-sizing: border-box;
    border-radius: 12px;
    .demo-ruleForm {
      padding-top: 15px;
    }

    .forgot {
      position: absolute;
      right: 12px;
      bottom: 65px;
      font-size: 18px;
      color: #409EFF;
      cursor: pointer;
    }

    .getVecodeBtn {
      position: absolute;
      width: auto;
      height: 100%;
      top: 0;
      right: 0;
      text-align: center;
      color: #409EFF;
      line-height: 2.6em;
      font-size: 0.8em;
      bottom: 0;

      p {
        height: 2em;
        line-height: 2em;
        margin-top: 0.8em;
      }
    }

    h2 {
      text-align: center;
      padding: 0 0 15px 0;
    }

    .uuid {
      float: left;
      width: 130px;
      height: 40px;
      margin-left: 20px;
      cursor: pointer;
    }
  }
}
</style>
