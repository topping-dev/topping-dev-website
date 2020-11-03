<template>
    <v-container>
        <div class="text-h3">{{$t('how-it-works')}}</div>
        <div style="font-size:medium; margin-bottom:40px; border-top:1px solid black;" class="nocontent">
        </div>

		    <v-img src="./../../public/img/howitworks.svg" height="400" contain></v-img>

        <br/>
        <br/>
        <p>After initalizing engine, ToppingEngine reads the mandatory folders, loads scripts and creates ui's.</p>
        <p>All wrapper classes overloads native components and bridges native code to Topping Engine.</p>
        
    </v-container>
</template>

<script>
export default {
    name: "HowItWorks"
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>