<template>
    <v-container>
        <div class="text-h3">{{$t('releases')}}</div>
        <div style="font-size:medium; margin-bottom:40px; border-top:1px solid black;" class="nocontent">
        </div>
        <p>All release notes can be found through the Github and can be viewed below for your convenience.</p>
        <a href="http://github.com/topping-dev/topping-kotlin" target="_blank">ToppingEngine Kotlin Multiplatform</a><br/>
            <p><a :href="releasesKotlin[0].html_url" target="__blank"></a></p>
        <vue-markdown-plus>{{readmeKotlin}}</vue-markdown-plus>
        <OSLangSelector v-model="langos" :showKotlin="false" :showLua="false">
            <template v-slot:Lua-Android>
                <a href="http://github.com/topping-dev/topping-android" target="_blank">ToppingEngine Android</a><br/>
                <p><a :href="releasesAndroid[0].html_url" target="__blank"></a></p>
                <vue-markdown-plus>{{readmeAndroid}}</vue-markdown-plus>
            </template>
            <template v-slot:Lua-iOS>
                <a href="http://github.com/topping-dev/topping-ios" target="_blank">ToppingEngine iOS</a><br/>
                <p><a :href="releasesIos[0].html_url" target="__blank"></a></p>
                <vue-markdown-plus>{{readmeIos}}</vue-markdown-plus>
            </template>
        </OSLangSelector>
        <NextPrevPage :next="$t('contribution')" :prev="$t('debugging')" prevRoute="debugging" nextRoute="contribution"></NextPrevPage>
    </v-container>
</template>

<script>
import OSLangSelector from '../components/OSLangSelector';
import NextPrevPage from '../components/NextPrevPage';
import VueMarkdownPlus from 'vue-markdown-plus';

var vm;

export default {
    name: "Releases",
    components: {
        OSLangSelector,
        NextPrevPage,
        VueMarkdownPlus
    },
    data: () => ({
        langos: "Lua-Android",
        releasesKotlin: {},
        readmeKotlin: "",
        releasesIos: {},
        readmeIos: "",
        releasesAndroid: {},
        readmeAndroid: ""
    }),
    mounted() {
        vm = this;

        var xhrkotlin = new XMLHttpRequest();
        xhrkotlin.onreadystatechange = function() {
            if (xhrkotlin.readyState === 4) {
                var responseObject = JSON.parse(xhrkotlin.responseText);
                vm.$data.releasesKotlin = responseObject;
            }
        };
        xhrkotlin.open('GET', 'https://api.github.com/repos/topping-dev/topping-kotlin/releases');
        xhrkotlin.send()

        var xhrkotlinreadme = new XMLHttpRequest();
        xhrkotlinreadme.onreadystatechange = function() {
            if (xhrkotlinreadme.readyState === 4) {
                vm.$data.readmeKotlin = xhrkotlinreadme.responseText;
            }
        };
        xhrkotlinreadme.open('GET', 'https://raw.githubusercontent.com/topping-dev/topping-kotlin/master/README.md');
        xhrkotlinreadme.send()

        var xhrios = new XMLHttpRequest();
        xhrios.onreadystatechange = function() {
            if (xhrios.readyState === 4) {
                var responseObject = JSON.parse(xhrios.responseText);
                vm.$data.releasesIos = responseObject;
            }
        };
        xhrios.open('GET', 'https://api.github.com/repos/topping-dev/topping-ios/releases');
        xhrios.send()

        var xhriosreadme = new XMLHttpRequest();
        xhriosreadme.onreadystatechange = function() {
            if (xhriosreadme.readyState === 4) {
                vm.$data.readmeIos = xhriosreadme.responseText;
            }
        };
        xhriosreadme.open('GET', 'https://raw.githubusercontent.com/topping-dev/topping-ios/master/README.md');
        xhriosreadme.send()

        var xhrandroid = new XMLHttpRequest();
        xhrandroid.onreadystatechange = function() {
            if (xhrandroid.readyState === 4) {
                var responseObject = JSON.parse(xhrandroid.responseText);
                vm.$data.releasesAndroid = responseObject;
            }
        };
        xhrandroid.open('GET', 'https://api.github.com/repos/topping-dev/topping-android/releases');
        xhrandroid.send()

        var xhrandroidreadme = new XMLHttpRequest();
        xhrandroidreadme.onreadystatechange = function() {
            if (xhrandroidreadme.readyState === 4) {
                vm.$data.readmeAndroid = xhrandroidreadme.responseText;
            }
        };
        xhrandroidreadme.open('GET', 'https://raw.githubusercontent.com/topping-dev/topping-android/master/README.md');
        xhrandroidreadme.send()
    }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>