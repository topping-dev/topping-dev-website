<template>
    <v-container>
        <div class="text-h3">{{$t('contribution')}}</div>
        <div style="font-size:medium; margin-bottom:40px; border-top:1px solid black;" class="nocontent">
        </div>
        <OSLangSelector v-model="langos">
            <template v-slot:Lua-Android>
                <p>To enable debug first download files from <a href="https://www.github.com/topping-dev/topping-android-debug" target="__blank">here</a></p>
                <p>After that copy these files to your project folder.</p>
                <p>In <code>defines.lua</code> uncomment the debug code, and replace the ip address with your computers ip address.</p>
                <pre v-highlightjs><span class="objectivec">
package.cpath = package.cpath .. ';lib?.so'
local dbg = require('emmy_core')
dbg.tcpConnect('pc ip address', 9966)
dbg.waitIDE(5000)
                </span></pre><br/>
                <p>In Android Studio click Configuration selector and select Edit Configuration.</p>
                <p>On new screen click plus icon and add <code>EmmyDebugger</code>.</p>
                <p>Edit <code>host</code> field and set it to your computers ip address.</p>
                <p>Select <code>Allow parallel run</code>.</p>
                <p>Add your breakpoints to lua files.</p>
                <p>After <code>EmmyDebugger</code> configuration is defined first run this configuration, then run your app.</p>
            </template>
            <template v-slot:Lua-iOS>
                <p>Debugging is not supported on ios.</p>
            </template>
            <template v-slot:Kotlin-Android>
                <p>Use Android Studio's debugging.</p>
            </template>
            <template v-slot:Kotlin-iOS>
                <p>Use Android Studio's debugging.</p>
            </template>
        </OSLangSelector>
        <NextPrevPage :next="$t('releases')" :prev="$t('resource-system')" prevRoute="resourcesystem" nextRoute="releases"></NextPrevPage>
    </v-container>
</template>

<script>
import NextPrevPage from '../components/NextPrevPage';
import OSLangSelector from '../components/OSLangSelector';
import Storage from './../storage';

export default {
    name: "Debugging",
    components: {
        OSLangSelector,
        NextPrevPage
    },
    data: () => ({
        langos: "Lua-Android",
    }),
    mounted() {
        var vm = this;
		Storage.getLang(function(lang)
		{
			if(lang == undefined)
				lang = "Lua";
			Storage.getOs(function(os)
			{
				if(os == undefined)
					os = "Android";
				vm.$data.langos = lang + "-" + os;
			});
		});
    }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>