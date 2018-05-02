<template>
  <v-container fluid>
    <div id="login-content">
      <div class="row">
        <v-slide-y-transition mode="out-in">
          <v-layout column align-center>
            <v-card>
              <v-card-title primary-title>
                <div>
                  <h3 class="title">Login</h3>
                  <p class="category">Please login to view the dashboard</p>
                </div>
              </v-card-title>
              <v-card-text>
                <v-form v-model="valid" ref="form" lazy-validation @submit.prevent="authLogin">
                  <div>
                    <v-text-field label="Email" v-model="email" :rules="emailRules" required>
                    </v-text-field>
                  </div>
                  <div>
                    <v-text-field type="password" label="Password" v-model="password" :rules="passwordRules" :counter="8" required >
                    </v-text-field>
                </div>
                <div>
                 <v-alert v-model="err" type="error">{{ err_msg }}</v-alert>
               </div>
               <v-btn color="success" type="submit" :disabled="!valid">Login</v-btn>
               <v-btn color="default" @click="clear">Reset</v-btn>
             </v-form>
           </v-card-text>
         </v-card>
       </v-layout>
     </v-slide-y-transition>
   </div>
 </div>
</v-container>
</template>
<script>
export default {
  data () {
    return {
      valid: false,
      title: 'Login',
      err: false,
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
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
<style>
</style>
