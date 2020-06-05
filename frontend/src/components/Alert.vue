<template>
  <v-snackbar v-model="show">
    {{message}}
    <v-btn flat color="accent" @click.native="show = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      message: ''
    }
  }
}
</script>