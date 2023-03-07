<template>
  <v-navigation-drawer
    app
    dark
    v-model="drawerData"
    :disable-resize-watcher="false"
  >
    <v-list-item>
      <v-list-item-avatar v-if="user">
        <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title :class="user ? '' : 'text-center'">{{
          username
        }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        v-for="(item, i) in filteredItems"
        :key="i"
        :to="item.link"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title color="#FFFF">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
  
  <script>
import { mapState } from "vuex";

export default {
  props: ["drawer"],
  data: () => ({
    items: [
      { title: "Home", icon: "mdi-view-dashboard", link: "/" },
      { title: "About", icon: "mdi-forum", link: "/about" },
      { title: "Member", icon: "mdi-star ", link: "/member", memberOnly: true },
    ],
    NoUser: "Please Login First",
  }),
  computed: {
    ...mapState({
      drawerData: (state) => state.drawerData,
      user: (state) => state.user,
      isAuthenticated: (state) => state.isAuthenticated
    }),
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    drawerData: {
      get() {
        return this.$store.state.drawer;
      },
      set(value) {
        this.$store.commit("setDrawer", value);
      },
    },
    username() {
      if (this.user) {
        return this.user.displayName;
      } else {
        return this.NoUser;
      }
    },
    // filteredItems() {
      
    //   return this.items.filter((item) => !item.memberOnly || this.isAuthenticated);
    // },
    filteredItems() {
    if (this.user) {
      // User is signed in, show all routes
      return this.items;
    } else {
      // User is not signed in, show only non-member routes
      return this.items.filter(item => !item.memberOnly);
    }
  },
  },
  watch: {
    isMobile() {
      this.checkScreenSize();
    },
  },
  mounted() {
    this.checkScreenSize();
  },
  methods: {
    checkScreenSize() {
      if (this.isMobile) {
        this.$store.commit("updateDrawer", false);
      } else {
        this.$store.commit("updateDrawer", true);
      }
    },
  },
};
</script>
<style>
</style>