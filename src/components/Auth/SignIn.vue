<template>
  <div class="pa-5">
    <v-card class="pa-5 mx-auto" max-width="500px">
      <v-form @submit.prevent="signInUser" v-model="valid" lazy-validation>
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
        <v-btn block type="submit">Sign In</v-btn>
      </v-form>
    </v-card>
  </div>
</template>
  
  <script>
import store from "@/store";
import { mapActions, mapState } from "vuex";

export default {
  data: () => ({
    valid: true,
    show: false,
    password: "",
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
    ...mapActions(["signIn"]),
    signInUser() {
      console.log(
        "Signing in with email",
        this.email,
        "and password",
        this.password
      );
      this.signIn({ email: this.email, password: this.password })
        .then(() => {})
        .catch((err) => {
          console.error(err);
        });
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>