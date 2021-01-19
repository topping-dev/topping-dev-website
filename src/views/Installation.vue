<template>
    <v-container>
        <div class="text-h3">{{$t('installation')}}</div>
        <OSLangSelector v-model="langos">
            <template v-slot:Lua-Android>
                <div class="text-h4">Setting up environment</div><br/>
                <p>For now developing applications with lua middleware is recommended on Android Studio. To ready your development environment you need to install <a href="https://github.com/EmmyLua/IntelliJ-EmmyLua">EmmyLua</a> plugin.</p>
                <p>If you want you can download sample project <a href="https://www.github.com/topping-dev/topping-dev-android-sample">here</a>.</p>
                <p>After Android Studio is ready, download <a :href='"https://github.com/topping-dev/topping-android/releases/download/v" + version + "/parser.jar"'>parser.jar</a>, <a :href='"https://github.com/topping-dev/topping-android/releases/download/v" + version + "/doclua.zip"'>doclua.zip</a> and <a :href='"https://github.com/topping-dev/topping-android/releases/download/v" + version + "/luaprocessor.gradle"'>luaprocessor.gradle</a> under project directory.</p>
                <p>Add <code>apply from: 'luaprocessor.gradle'</code> under <code>apply plugin: 'com.android.application'</code></p>
                <pre v-highlightjs><span class="gradle">
apply plugin: 'com.android.application'
apply from: 'luaprocessor.gradle'

android {
                </span></pre>
                <br/>
                <div class="text-h4">Directory Structure</div><br/>
                <p>On <code>Android</code> ToppingEngine uses Android's own resource system to load ui components. For example you will use layout folder to add your layout xml's.
                For lua code you will use <code>assets</code> folder.</p>
            </template>
            <template v-slot:Lua-iOS>
                <div class="text-h4">Setting up environment</div><br/>
                <p>For now developing applications with lua middleware is recommended on Android Studio. You can check <code>Android</code> part.</p>
                <div class="text-h4">Directory Structure</div><br/>
                <p>On <code>iOS</code> ToppingEngine uses <code>Resources</code> folder to load layout and lua code.</p>
                <p>It supports most of the resource extensions that exist on Android resource system. For example, you can use <code>value-port</code> and <code>value-land</code>.
                It also supports base styles.</p>                
            </template>
            <template v-slot:Kotlin-Android>
                <div class="text-h4">Setting up environment</div><br/>
                <p>For now developing applications with kotlin you have to install android studio and kotlin multiplatform plugin<br/>
                <div class="text-h4">Directory Structure</div><br/>
                <p>On <code>Android</code> ToppingEngine uses Android's own resource system to load ui components in androidApp folder. For example you will use layout folder to add your layout xml's.</p>              
            </template>
            <template v-slot:Kotlin-iOS>
                <div class="text-h4">Setting up environment</div><br/>
                <p>For now developing applications with kotlin you have to install android studio and kotlin multiplatform plugin<br/>
                <div class="text-h4">Directory Structure</div><br/>
                <p>On <code>iOS</code> ToppingEngine uses <code>Resources</code> folder to load layout code, in iosApp project</p>
                <p>It supports most of the resource extensions that exist on Android resource system. For example, you can use <code>value-port</code> and <code>value-land</code>.
                It also supports base styles.</p>                
            </template>
        </OSLangSelector>        
        <p>Entry point is <code>defines.lua</code>. This lua file helps you to set startup configuration of some parameters.</p>
        <p>Example and parameters are defined below.</p>
        <div class="text-h5">defines.lua</div><br/>
        <pre v-highlightjs><span class="lua">
-- Root folder of scripts
ScriptsRoot = "scripts";

-- 1 External SD
-- 2 Internal
-- 3 Assets
PrimaryLoad = 1;

-- Force load of external or internal scripts
ForceLoad = 1;

-- Root folder of user interface files
UIRoot = "ui";

-- Startup XML 
-- Leaving this "", will create empty view for tab system
-- if you want to use tab system, overload the create event of the
-- MainForm(LuaForm) and add tab using LuaTabForm.
-- MainUI = "main.xml"
MainUI = "testbed.xml";

-- Main style used on iOS
AppStyle = "AppTheme";

-- Startup Form
MainForm = "Main";
        </span></pre>
        <v-divider></v-divider>
        <v-row>
            <v-col cols="4" md="2">
                <code class="blue-grey lighten-4 blue-grey--text">ScriptsRoot</code>
            </v-col>
            <v-col cols="2" class="hidden-sm-and-down">
                <code class="blue-grey lighten-4 blue-grey--text">string</code>
            </v-col>
            <v-col>
                Root of the lua scripts folder that will be loaded
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
            <v-col cols="4" md="2">
                <code class="blue-grey lighten-4 blue-grey--text">PrimaryLoad</code>
            </v-col>
            <v-col cols="2" class="hidden-sm-and-down">
                <code class="blue-grey lighten-4 blue-grey--text">number</code>
            </v-col>
            <v-col>
                Where to load scripts from.<br/>
                <code class="blue-grey lighten-4 blue-grey--text">1</code> is for loading from sd card if available<br/>
                <code class="blue-grey lighten-4 blue-grey--text">2</code> is for loading from copying to internal data folder and load from there<br/>
                <code class="blue-grey lighten-4 blue-grey--text">3</code> is for loading loading directly from assets folder
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
            <v-col cols="4" md="2">
                <code class="blue-grey lighten-4 blue-grey--text">ForceLoad</code>
            </v-col>
            <v-col cols="2" class="hidden-sm-and-down">
                <code class="blue-grey lighten-4 blue-grey--text">number</code>
            </v-col>
            <v-col>
                Force loading of scripts if not exists at copied folder.<br/>
                <code class="blue-grey lighten-4 blue-grey--text">1</code> is true<br/>
                <code class="blue-grey lighten-4 blue-grey--text">0</code> is false<br/>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
            <v-col cols="4" md="2">
                <code class="blue-grey lighten-4 blue-grey--text">UIRoot</code>
            </v-col>
            <v-col cols="2" class="hidden-sm-and-down">
                <code class="blue-grey lighten-4 blue-grey--text">string</code>
            </v-col>
            <v-col>
                Used to set iOS ui root directory not used in Android.
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
            <v-col cols="4" md="2">
                <code class="blue-grey lighten-4 blue-grey--text">MainUI</code>
            </v-col>
            <v-col cols="2" class="hidden-sm-and-down">
                <code class="blue-grey lighten-4 blue-grey--text">string</code>
            </v-col>
            <v-col>
                Used to set style property of iOS.
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
            <v-col cols="4" md="2">
                <code class="blue-grey lighten-4 blue-grey--text">AppStyle</code>
            </v-col>
            <v-col cols="2" class="hidden-sm-and-down">
                <code class="blue-grey lighten-4 blue-grey--text">string</code>
            </v-col>
            <v-col>
                Used to set Main ui xml to be loaded.
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
            <v-col cols="4" md="2">
                <code class="blue-grey lighten-4 blue-grey--text">MainForm</code>
            </v-col>
            <v-col cols="2" class="hidden-sm-and-down">
                <code class="blue-grey lighten-4 blue-grey--text">string</code>
            </v-col>
            <v-col>
                Used to set which <code class="blue-grey lighten-4 blue-grey--text">luaid</code> form to be loaded if <code class="blue-grey lighten-4 blue-grey--text">MainUI</code> is not set.
            </v-col>
        </v-row>
        <v-divider></v-divider><br/>
        <OSSelector v-model="langos">
            <template v-slot:Android>
                <div class="text-h5">Sample directory structure</div><br/>
                <v-treeview
                    v-model="scriptTreeAndroid"
                    :open="open"
                    :items="scriptItemsAndroid"
                    item-key="name"
                    open-on-click
                >
                    <template v-slot:prepend="{ item, open }">
                    <v-icon v-if="!item.file">
                        {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                    </v-icon>
                    <v-icon v-else>
                        {{ files[item.file] }}
                    </v-icon>
                    </template>
                </v-treeview>
            </template>
            <template v-slot:iOS>
                <div class="text-h5">Sample directory structure</div><br/>
                <v-treeview
                    v-model="scriptTreeIOS"
                    :open="open"
                    :items="scriptItemsIOS"
                    item-key="name"
                    open-on-click
                >
                    <template v-slot:prepend="{ item, open }">
                    <v-icon v-if="!item.file">
                        {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                    </v-icon>
                    <v-icon v-else>
                        {{ files[item.file] }}
                    </v-icon>
                    </template>
                </v-treeview>
            </template>
        </OSSelector>
        <NextPrevPage prev="" :next="$t('how-to-use')" nextRoute="howtouse"></NextPrevPage>
    </v-container>
</template>

<script>
import OSLangSelector from '../components/OSLangSelector';
import OSSelector from '../components/OSSelector';
import NextPrevPage from '../components/NextPrevPage';
import Storage from './../storage';

export default {
    name: "Installation",
    components: {
        OSLangSelector,
        OSSelector,
        NextPrevPage
    },
    data: () => ({
        langos: "Lua-Android",
        open: ['Resources', 'assets', 'scripts', 'ui', 'layout'],
        files: 
        {
            html: 'mdi-language-html5',
            js: 'mdi-nodejs',
            json: 'mdi-code-json',
            md: 'mdi-language-markdown',
            pdf: 'mdi-file-pdf',
            png: 'mdi-file-image',
            txt: 'mdi-file-document-outline',
            xls: 'mdi-file-excel',
            lua: 'mdi-file-document-outline',
            xml: 'mdi-file-document-outline',
        },
        scriptTreeAndroid: [],
        scriptItemsAndroid: 
        [
            {
            name: 'assets',
            children: 
                [
                    {
                        name: 'scripts',
                        children: [{
                            name: 'testbed.lua',
                            file: 'lua',
                        }],
                    },
                    {
                        name: 'defines.lua',
                        file: 'lua',
                    },
                    {
                        name: 'moddebug.lua',
                        file: 'lua',
                    }
                ],
            },
        ],
        scriptTreeIOS: [],
        scriptItemsIOS: 
        [
            {
            name: 'Resources',
            children: 
                [
                    {
                        name: 'scripts',
                        children: [{
                            name: 'testbed.lua',
                            file: 'lua',
                        }],
                    },
                    {
                        name: 'ui',
                        children: 
                        [
                            {
                                name: 'drawable',
                                children: []
                            },
                            {
                                name: 'layout',
                                children: [{
                                    name: 'testbed.xml',
                                    file: 'xml',
                                }]
                            },
                            {
                                name: 'values',
                                children: []
                            },
                        ],
                    },
                    {
                        name: 'defines.lua',
                        file: 'lua',
                    },
                    {
                        name: 'moddebug.lua',
                        file: 'lua',
                    }
                ],
            },
        ]
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
    },
    computed: {
        version: function () {
            /*var locationArr = location.href.split('/');
            return locationArr[3];*/
            return "0.1.1"
        }
    },
    watch: {
        osToggle: function(val)
        {
            this.$data.os = this.$data.languageToggle + "-" + this.$data.osToggle;
        },
        languageToggle: function(val)
        {
            this.$data.os = this.$data.languageToggle + "-" + this.$data.osToggle;
        }
    }

}
</script>