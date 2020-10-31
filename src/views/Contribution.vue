<template>
    <v-container>
        <div class="text-h3">{{$t('contribution')}}</div>
        <div style="font-size:medium; margin-bottom:40px; border-top:1px solid black;" class="nocontent">
        </div>

		    <p>Currently under construction</p>
        <NextPrevPage :next="$t('plugins')" :prev="$t('releases')" prevRoute="releases" nextRoute="plugins"></NextPrevPage>
    </v-container>
</template>

<script>
import NextPrevPage from '../components/NextPrevPage';

export default {
    name: "Contribution",
    components: {
        NextPrevPage
    },
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>