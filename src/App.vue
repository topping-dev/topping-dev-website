<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      short
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{title}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="white"
            dark
            outlined
            v-bind="attrs"
            v-on="on"
          >
            {{ "v" + versions[0].title }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in versions"
            :key="index"
            @click="handleVersionClick(item)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
        >

          <v-list-group no-action>
            <v-icon slot="prependIcon" color="primary">mdi-book-open-variant</v-icon>
            <template v-slot:activator>
              <v-list-item-title>{{$t('introduction')}}</v-list-item-title>
            </template>
            <v-list-item @click="$router.replace(`/`)">
              <v-list-item-title>Topping Engine</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.replace(`/howitworks`)">
              <v-list-item-title>{{$t('how-it-works')}}</v-list-item-title>
            </v-list-item>
            <!--v-list-item @click="$router.replace(`/roadmap`)">
              <v-list-item-title>{{$t('roadmap')}}</v-list-item-title>
            </v-list-item-->
            <v-list-item @click="$router.replace(`/whylua`)">
              <v-list-item-title>{{$t('why-lua')}}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.replace(`/whykotlin`)">
              <v-list-item-title>{{$t('why-kotlin')}}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.replace(`/faq`)">
              <v-list-item-title>{{$t('faq')}}</v-list-item-title>
            </v-list-item>
          </v-list-group>

          <v-list-group no-action>
            <v-icon slot="prependIcon" color="primary">mdi-moped-outline</v-icon>
            <template v-slot:activator>
              <v-list-item-title>{{$t('quick-start')}}</v-list-item-title>
            </template>
            <v-list-item @click="$router.replace(`/compose`)">
              <v-list-item-title>{{$t('jetpack-compose')}}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.replace(`/installation`)">
              <v-list-item-title>{{$t('installation')}}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.replace(`/howtouse`)">
              <v-list-item-title>{{$t('how-to-use')}}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.replace(`/resourcesystem`)">
              <v-list-item-title>{{$t('resource-system')}}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.replace(`/debugging`)">
              <v-list-item-title>{{$t('debugging')}}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.replace(`/releases`)">
              <v-list-item-title>{{$t('releases')}}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.replace(`/contribution`)">
              <v-list-item-title>{{$t('contribution')}}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.replace(`/plugins`)">
              <v-list-item-title>{{$t('plugins')}}</v-list-item-title>
            </v-list-item>
          </v-list-group>

          <v-list-group no-action>
            <v-icon slot="prependIcon" color="primary">mdi-image-frame</v-icon>
            <template v-slot:activator>
              <v-list-item-title>{{$t('components')}}</v-list-item-title>
            </template>
            <v-list-item
            v-for="(item, index) in items" :key="`item-${index}`" @click="$router.replace(`/doc/${item}`)">
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list-group>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import luamodules from './assets/doc/modules.json';
import { EventBus } from './event-bus'

var vm;

export default {
  name: 'App',

  data: () => ({
      drawer: false,
      items: luamodules.modules.sort(),
      title: "",
      versions: [
        { title: "0.6.x" },
        { title: "0.5.x" },
        { title: "0.1.x" }
      ]
  }),
  mounted() {
    vm = this;
    vm.$data.title = vm.$t('app-name');
  },
  methods: {
    handleVersionClick(version)
    {
        window.location.href = "/" + version.title;
    }
  }
};

EventBus.$on('setGlobalTitle', title => {
    if(vm !== undefined)
    {
        vm.$data.title = title;
    }
});

</script>
