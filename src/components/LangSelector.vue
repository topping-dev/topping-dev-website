<template>
    <div>
        <div style="font-size:medium; margin-bottom:40px; border-top:1px solid black;padding-top:0.7em;" class="nocontent">            
            <div style="float:right" v-if="showKotlin || showLua">
                <v-btn-toggle v-model="languageToggle" mandatory dense color="primary" rounded>
                    <v-btn value="Lua" v-if="showLua">
                        Lua
                    </v-btn>
                    <v-btn value="Kotlin" v-if="showKotlin">
                        Kotlin
                    </v-btn>
                </v-btn-toggle>
            </div>
        </div>

        <v-window v-model="langComputed" touchless>
            <v-window-item value="Lua" eager>
                <slot name="Lua"></slot>
            </v-window-item>
            <v-window-item value="Kotlin" eager>
                <slot name="Kotlin"></slot>
            </v-window-item>
        </v-window>
        <v-divider style="margin-bottom:1em;"></v-divider>
    </div>
</template>

<script>
import Storage from './../storage';

var vm;

export default {
    name: "LangSelector",
    model: {
        prop: 'lang',
        event: 'change'
    },
    props: {
        lang: String,
        showLua: {
            type: Boolean,
            default: true
        },
        showKotlin: {
            type: Boolean,
            default: true
        }
    },
    data: () => ({
        languageToggle: "Lua",
    }),
    mounted()
    {
        vm = this;
        Storage.getOs(function(osRes)
        {
            Storage.getLang(function(langRes)
            {
                vm.$data.lang = (langRes != undefined ? langRes : "Lua") + "-" + (osRes != undefined ? osRes : "Android");
            });
        });
    },
    computed:
    {
        langComputed: function () {
            var ret = this.$data.languageToggle;
            return ret;
        }
    },
    watch: {
        lang: function(val)
        {
            var arr = this.$props.langos.split('-');
            this.$data.languageToggle = arr[0];
        },
        languageToggle: function(val)
        {
            this.$emit('change', this.$data.languageToggle);
            Storage.setLang(this.$data.languageToggle, function(){});
        }
    }
}
</script>