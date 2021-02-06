import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import HowItWorks from './views/HowItWorks.vue';
import Roadmap from './views/Roadmap.vue';
import WhyLua from './views/WhyLua.vue';
import WhyKotlin from './views/WhyKotlin.vue';
import FAQ from './views/FAQ.vue';
import Installation from './views/Installation.vue';
import HowToUse from './views/HowToUse.vue';
import ResourceSystem from './views/ResourceSystem.vue';
import Debugging from './views/Debugging.vue';
import Releases from './views/Releases.vue';
import Contribution from './views/Contribution.vue';
import Plugins from './views/Plugins.vue';
import ModuleDocument from './views/ModuleDocument.vue';

Vue.use(VueRouter);

//(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))

export default new VueRouter({
  base: process.env.BASE_URL,
  mode: 'hash',
  routes: [,
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/howitworks',
      name: 'howitworks',
      component: HowItWorks
    },
    {
      path: '/roadmap',
      name: 'roadmap',
      component: Roadmap
    },
    {
      path: '/whylua',
      name: 'whylua',
      component: WhyLua
    },
    {
      path: '/whykotlin',
      name: 'whykotlin',
      component: WhyKotlin
    },
    {
      path: '/faq',
      name: 'faq',
      component: FAQ
    },
    {
      path: '/installation',
      name: 'installation',
      component: Installation
    },
    {
      path: '/howtouse',
      name: 'howtouse',
      component: HowToUse
    },
    {
      path: '/resourcesystem',
      name: 'resourcesystem',
      component: ResourceSystem
    },
    {
      path: '/debugging',
      name: 'debugging',
      component: Debugging
    },
    {
      path: '/releases',
      name: 'releases',
      component: Releases
    },
    {
      path: '/contribution',
      name: 'contribution',
      component: Contribution
    },
    {
      path: '/plugins',
      name: 'plugins',
      component: Plugins
    },
    { 
      path: '/doc/:id', 
      name: 'doc',
      component: ModuleDocument 
    }
    /*,
    {
      path: '/departmentselection',
      name: 'departmentselection',
      component: DepartmentSelection
    }*/
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }  
});