<template>
  <v-container>
    This is member page
    {{ user.displayName }}
  </v-container>
</template>

<script>
export default {
    computed:{
        user(){
            return this.$store.state.user
        }
    },
    
}
</script>

<style>

</style>