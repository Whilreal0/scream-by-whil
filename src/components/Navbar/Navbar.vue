<template>
  <nav>
    <v-app-bar color="blue" app dense>
      <v-app-bar-nav-icon
        class="pl-0"
        @click="toggleDrawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="h6 pa-0" link>
        <v-btn to="/" class="pa-0" plain text small><h1>Scream</h1></v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="!isAuthenticated">
        <v-btn class="mr-2" to="/sign-in" small text>Sign In</v-btn>
        <v-btn to="/sign-up" small text>Sign Up</v-btn>
      </div>
    </v-app-bar>

    <NavDrawer :value="drawerData" @update:value="updateDrawer" />
  </nav>
</template>
  
  <script>
import { mapState, mapMutations } from "vuex";
import NavDrawer from "@/components/Navbar/NavDrawer";
export default {
  components: { NavDrawer },
  data: () => ({
    drawer: true,
  }),
  computed: {
    ...mapState({
      drawerData: (state) => state.drawerData,
    }),
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },

  methods: {
    ...mapMutations({
      updateDrawer: "updateDrawer",
    }),
    checkScreenSize() {
      if (window.innerWidth < 600) {
        this.updateDrawer(false);
      }
    },
    toggleDrawer() {
      this.$store.commit("setDrawer", !this.$store.state.drawer);
    },
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
};
</script>
  
  
  