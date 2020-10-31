<template>
    <v-container>
        <div class="text-h3">{{$t('releases')}}</div>
        <div style="font-size:medium; margin-bottom:40px; border-top:1px solid black;" class="nocontent">
        </div>
        <p>All release notes can be found through the Github and can be viewed below for your convenience.</p>
        <OSLangSelector v-model="langos" :showKotlin="false" :showLua="false">
            <template v-slot:Lua-Android>
                <a href="http://github.com/topping-dev/topping-android" target="_blank">ToppingEngine Android</a>
                <p>Release 0.1.0</p>
            </template>
            <template v-slot:Lua-iOS>
                <a href="http://github.com/topping-dev/topping-ios" target="_blank">ToppingEngine iOS</a>
                <p>Release 0.1.0</p>
            </template>
        </OSLangSelector>
        <NextPrevPage :next="$t('contribution')" :prev="$t('resource-system')" prevRoute="resourcesystem" nextRoute="contribution"></NextPrevPage>
    </v-container>
</template>

<script>
import OSLangSelector from '../components/OSLangSelector';
import NextPrevPage from '../components/NextPrevPage';

export default {
    name: "Releases",
    components: {
        OSLangSelector,
        NextPrevPage
    },
    data: () => ({
        langos: "Lua-Android"
    })
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>