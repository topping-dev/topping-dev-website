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
        </div>

        <v-window v-model="osComputed" touchless>
            <v-window-item value="Android" eager>
                <slot name="Android"></slot>
            </v-window-item>
            <v-window-item value="iOS" eager>
                <slot name="iOS"></slot>
            </v-window-item>
        </v-window>
        <v-divider style="margin-bottom:1em;"></v-divider>
    </div>
</template>

<script>
import Storage from './../storage';

var vm;

export default {
    name: "OSSelector",
    model: {
        prop: 'os',
        event: 'change'
    },
    props: {
        os: String
    },
    data: () => ({
        osToggle: "Android",
    }),
    mounted()
    {
        vm = this;
        Storage.getOs(function(osRes)
        {
            Storage.getLang(function(langRes)
            {
                vm.$data.os = (langRes != undefined ? langRes : "Lua") + "-" + (osRes != undefined ? osRes : "Android");
            });
        });
    },
    computed:
    {
        osComputed: function () {
            var ret = this.$data.osToggle;
            return ret;
        }
    },
    watch: {
        os: function(val)
        {
            var arr = this.$props.langos.split('-');
            this.$data.osToggle = arr[1];
        },
        osToggle: function(val)
        {
            this.$emit('change', this.$data.osToggle);
            Storage.setOs(this.$data.osToggle, function(){});
        }
    }
}
</script>