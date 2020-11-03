<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-spacer></v-spacer>
        <v-col>
            <v-img src="./../../public/icon.png" height="200" contain></v-img>
            <p style="text-align:center;" class="text-h4">Welcome to {{$t('app-name')}}</p>
            <p style="text-align:center;" class="text-h6">One layout one code.</p>
            <p style="text-align:center;">ToppingEngine is a library helps you create mobile applications using one type of layout code and one type of backend code.</p>
            <p style="text-align:center;">All you need to know is how Android layout XML works and basic Lua or Kotlin knowledge.</p>
            <p>If you know how to write Android code, learning curve of this engine is very simple. Layout is the same of Android. Backend functions are similar to Android functions too.</p>
            <p style="text-align:center;">Extending this engine makes you create web and desktop applications.</p>
            <p style="text-align:center;">This project started at 2012 to reduce time to develop applications on android and ios platforms by creating a topping on mobile operating systems. 
              After developing it time to time, decided to make it open source.</p>
        </v-col>
        <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-col align-self="center" cols="auto">
        <v-btn to="installation" style="margin-right:10px"><v-icon color="primary">mdi-moped-outline</v-icon>{{$t('quick-start')}}</v-btn>
        <v-btn to="whylua" style="margin-right:10px"><v-icon color="primary">mdi-book-open-variant</v-icon>{{$t('introduction')}}</v-btn>
        <v-btn href="https://github.com/topping-dev" target="_blank"><v-icon color="primary">mdi-github</v-icon> GitHub</v-btn>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <!--div class="text-h4">Supporting {{$t('app-name')}}</div-->    
  </v-container>
</template>

<script>
  export default {
    name: 'Home'
  }
</script>
