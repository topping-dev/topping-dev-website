<template>
    <div>
        <div style="font-size:medium; margin-bottom:40px; border-top:1px solid black;padding-top:0.7em;" class="nocontent">
            <v-btn-toggle v-model="osToggle" mandatory dense color="primary" rounded>
                <v-btn value="Android">
                    Android
                </v-btn>
                <v-btn value="iOS">
                    iOS
                </v-btn>
            </v-btn-toggle>
            
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

        <v-window v-model="langOsComputed" touchless>
            <v-window-item value="Lua-Android" eager>
                <slot name="Lua-Android"></slot>
            </v-window-item>
            <v-window-item value="Lua-iOS" eager>
                <slot name="Lua-iOS"></slot>
            </v-window-item>
            <v-window-item value="Kotlin-Android" eager>
                <slot name="Kotlin-Android"></slot>
            </v-window-item>
            <v-window-item value="Kotlin-iOS" eager>
                <slot name="Kotlin-iOS"></slot>
            </v-window-item>
        </v-window>
        <v-divider style="margin-bottom:1em;"></v-divider>
    </div>
</template>

<script>
import Storage from './../storage';

var vm;

export default {
    name: "OSLangSelector",
    model: {
        prop: 'langos',
        event: 'change'
    },
    props: {
        langos: String,
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
        osToggle: "Android",
        languageToggle: "Lua",
    }),
    mounted()
    {
        vm = this;
        Storage.getOs(function(osRes)
        {
            Storage.getLang(function(langRes)
            {
                vm.$data.langos = (langRes != undefined ? langRes : "Lua") + "-" + (osRes != undefined ? osRes : "Android");
            });
        });
        /*var arr = this.$props.langos.split('-');
        this.$data.languageToggle = arr[0];
        this.$data.osToggle = arr[1];*/
    },
    computed:
    {
        langOsComputed: function () {
            var ret = this.$data.languageToggle + "-" + this.$data.osToggle;
            return ret;
        }
    },
    watch: {
        langos: function(val)
        {
            var arr = this.$props.langos.split('-');
            this.$data.languageToggle = arr[0];
            this.$data.osToggle = arr[1];
        },
        osToggle: function(val)
        {
            this.$emit('change', this.$data.languageToggle + "-" + this.$data.osToggle);
            Storage.setOs(this.$data.osToggle, function(){});
        },
        languageToggle: function(val)
        {
            this.$emit('change', this.$data.languageToggle + "-" + this.$data.osToggle);
            Storage.setOs(this.$data.languageToggle, function(){});
        }
    }
}
</script>