<template>
  <div class="pa-5">
    <v-card class="pa-5 mx-auto" max-width="500px">
      <v-form @submit.prevent="signUpUser" ref="form" v-model="valid">
        <v-text-field
          v-model="username"
          :counter="10"
          :rules="nameRules"
          label="Username"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show ? 'text' : 'password'"
          name="input-10-1"
          label="password"
          hint="At least 8 characters"
          counter
          @click:append="show = !show"
        ></v-text-field>
        <v-btn type="submit" block class="">Sign Up</v-btn>
      </v-form>
    </v-card>
  </div>
</template>
  
  <script>

import { mapActions } from "vuex";

export default {
  data: () => ({
    valid: true,
    username: "",
    show: false,
    password: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },
  }),

  methods: {
    ...mapActions(["signUp"]),
    signUpUser() {
        this.signUp({
          email: this.email,
          password: this.password,
          username: this.username

        }).then(()=>{
          this.$router.replace('/sign-in')
          alert('Register Success')
        }).catch((err)=>{
          console.error(err)
        })
        
      
    },
  },
};
</script>