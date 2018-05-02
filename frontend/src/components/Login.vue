<template>
  <v-container fluid>
    <div id="login-content">
        <v-slide-y-transition mode="out-in">
          <v-layout column align-center>
            <v-card id="loginForm" v-if="loginView">
              <v-card-title primary-title>
                <div>
                  <h3 class="heading">Login</h3>
                  <p class="caption">Please login to view the dashboard</p>
                </div>
              </v-card-title>
              <v-card-text>
                <v-form v-model="valid" ref="loginForm" lazy-validation @submit.prevent="authLogin">
                  <div>
                    <v-text-field label="Email" v-model="email" :rules="emailRules" required>
                    </v-text-field>
                  </div>
                  <div>
                    <v-text-field type="password" label="Password" v-model="password" :rules="passwordRules" :counter="8" required ></v-text-field>
                  </div>
                  <div>
                   <v-alert v-model="err" type="error">{{ err_msg }}</v-alert>
                 </div>
                 <div>
                   <p>New User? <a href="#" @click.prevent="loginView=!loginView">Register</a></p>
                 </div>
                 <v-btn color="success" type="submit" :disabled="!valid">Login</v-btn>
                 <v-btn color="default" @click="clear">Reset</v-btn>
               </v-form>
             </v-card-text>
           </v-card>
           <v-card v-else>
              <v-card-title primary-title>
                <div>
                  <h3 class="heading">Signup</h3>
                  <p class="caption">Please signup to login to dashboard</p>
                </div>
              </v-card-title>
              <v-card-text>
                <v-form v-model="valid" ref="signupForm" lazy-validation @submit.prevent="doSignup">
                  <div>
                    <v-text-field label="Email" v-model="signup.email" :rules="emailRules" required>
                    </v-text-field>
                  </div>
                  <div>
                    <v-text-field label="Phone" v-model="signup.phone">
                    </v-text-field>
                  </div>
                  <div>
                    <v-text-field type="password" label="Password" v-model="signup.passwd_digest" :rules="passwordRules" :counter="8" required ></v-text-field>
                  </div>
                  <div>
                   <v-alert v-model="signupErr" type="error">{{ signupErr_msg }}</v-alert>
                 </div>
                 <div>
                   <p>Existing User? <a href="#" @click.prevent="loginView=!loginView">Login</a></p>
                 </div>
                 <v-btn color="success" type="submit" :disabled="!valid">Signup</v-btn>
                 <v-btn color="default" @click="$refs.signupForm.reset(); signupErr =false">Reset</v-btn>
               </v-form>
             </v-card-text>
             
           </v-card>
         </v-layout>
       </v-slide-y-transition>
   </div>
 </v-container>
</template>
<script>
export default {
  data () {
    return {
      loginView: true,
      valid: false,
      title: 'Login',
      err: false,
      signupErr: false,
      signup: {
        email: '',
        phone: '',
        passwd_digest: ''
      },
      signupErr_msg: '',
      err_msg: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => v.length >= 8 || 'Password must be greater than 7 characters'
      ]

    }
  },
  methods: {
    authLogin () {
      var user = {
        email: this.email,
        password: this.password
      }

      if (this.$auth.isAuthenticated()) {
        this.$auth.logout()
      }

      var requestOptions = {
        method: 'POST',
        headers: {'Content-type': 'application/json'}
      }
      this.$auth.login(user, requestOptions).then((response) => {
        if (response.status === 200) {
          this.err = false
          this.$router.push('/')
        }
      }, (err) => {
        this.err = true
        if (err.response.status === 404) {
          this.err_msg = 'No user found in that email'
        }

        if (err.response.status === 400) {
          this.err_msg = err.response.data.msg
        }
      })
    },
    doSignup () {
      this.$http.post('/auth/signup', this.signup).then(
        (response) => {
          if (response.status === 200) {
            this.loginView = !this.loginView
            this.$refs.loginForm.reset()
          }
        },
        (err) => {
          console.log(err.response)
          this.signupErr_msg = err.response.data.msg
          this.signupErr = true
        })
    },
    clear () {
      this.$refs.loginForm.reset()
    }
  }
}
</script>
<style>
</style>
