<template>
    <v-container>
        <div class="text-h3">{{$t('roadmap')}}</div>
        <div style="font-size:medium; margin-bottom:40px; border-top:1px solid black;" class="nocontent">
        </div>

    <v-checkbox v-model="checkbox" readonly label="Kotlin Native Android integration"></v-checkbox>
    <v-checkbox v-model="checkbox" readonly label="Kotlin Native iOS integration"></v-checkbox>
		<v-checkbox v-model="checkbox" readonly label="ConstraintLayout"></v-checkbox>
    <v-checkbox readonly label="Lua proguard"></v-checkbox>
    <v-checkbox readonly label="RelativeLayout"></v-checkbox>
    <v-checkbox readonly label="Permissions"></v-checkbox>
        
    </v-container>
</template>

<script>
export default {
    name: "Roadmap",
    data: () => ({
        checkbox: true
    })
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>