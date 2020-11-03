<template>
    <v-container>
        <div class="text-h3">{{$t('roadmap')}}</div>
        <div style="font-size:medium; margin-bottom:40px; border-top:1px solid black;" class="nocontent">
        </div>

    <v-checkbox v-model="checkbox" readonly label="Kotlin Native Android entegration"></v-checkbox>
    <v-checkbox readonly label="Kotlin Native iOS entegration"></v-checkbox>
		<v-checkbox readonly label="CoordinatorLayout"></v-checkbox>
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