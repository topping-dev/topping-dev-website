<template>
  <v-container>
        <div class="text-h3">{{module.name}}</div>
        <div style="font-size:medium; margin-bottom:40px; border-top:1px solid black;" class="nocontent">
            <!--div style="float:right">
            <a href="/reference/kotlin/android/widget/AdapterView" data-title="View this page in Kotlin">Kotlin</a>
            <span style="color: #ddd; padding: 0em .5em;">|</span><span style="color: black; font-weight:bold">Java</span>
            </div-->
        </div>
        <table v-if="module.baseArr != undefined && module.baseArr.length > 0">
          <tbody>
            <tr v-for="(item, index) in baseArrReverse" :key="`base-${index}`">
                <td v-for="indexSpace in index" :key="`baseIndexSpace-${indexSpace}`" style="width:2em;">
                  <span v-if="indexSpace == index">   ↳</span>
                  <span v-else> </span>
                </td>
                <td :colspan="module.baseArr.length - index">
                  <router-link v-if="index != 0 && index != (module.baseArr.length - 1)" :to="'/doc/' + item" target="_blank">{{item}}</router-link>
                  <span v-else>{{item}}</span>
                </td>
            </tr>
          </tbody>
        </table>
        <p>{{module.description}}</p>

        <v-row>
          <v-col class="primary rounded"><span class="white--text">{{$t('methods')}}</span></v-col>
        </v-row>
        <v-divider></v-divider>
        <div
          v-for="(item, index) in module.functions" 
          :key="`function-${index}`" 
          @click="$router.replace(`/doc/${item}`)">
          <v-row>
            <v-col cols="4" md="2">
              <span v-if="item.static"><code class="blue-grey lighten-4 blue-grey--text">static</code>{{' '}}</span>
              <code v-if="luamodules.includes(item.returnOrg)" class="blue-grey lighten-4 blue-grey--text font-weight-bold" ><router-link :to="'/doc/' + item.returnOrg"  target="_blank">{{item.returnOrg}}</router-link></code>
              <span v-else><code class="blue-grey lighten-4 blue-grey--text">{{item.returnOrg}}</code><span v-if="item.return !=''"><br/><code class="grey lighten-4 grey--text">{{item.return}}</code></span></span>
            </v-col>
            <v-col>
              <a :href="`#${item.name}${item.argsstring}`" style="outline:0; text-decoration:none;"><code>{{item.name}}{{item.argsstring}}</code></a>
              <span v-if="item.description != ''" class="text-body-2"><br/><br/>{{item.description}}</span>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </div>
        <v-row v-if="module.variables != undefined && module.variables.length > 0">
          <v-col class="primary rounded"><span class="white--text">{{$t('variables')}}</span></v-col>
        </v-row>
        <div
          v-for="(item, index) in module.variables" 
          :key="`variable-${index}`" 
          @click="$router.replace(`/doc/${item}`)">
          <v-row>
            <v-col cols="4" md="2">
              <code v-if="luamodules.includes(item.typeOrg)" class="blue-grey lighten-4 blue-grey--text font-weight-bold" ><router-link :to="'/doc/' + item.typeOrg"  target="_blank">{{item.typeOrg}}</router-link></code>
              <div v-else><code class="blue-grey lighten-4 blue-grey--text">{{item.typeOrg}}</code><br/><code class="grey lighten-4 grey--text">{{item.type}}</code></div>
            </v-col>
            <v-col>
              <code :id="item.name">{{item.name}} {{item.default}}</code>
              <span v-if="item.description != ''" class="text-body-2"><br/><br/>{{item.description}}</span>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </div>
        <br/>
        <br/>
        <div class="text-h4">{{$t('methods')}}</div>
        <div style="font-size:medium; margin-bottom:40px; border-top:1px solid black;" class="nocontent">
        </div>
        <div
          v-for="(item, index) in module.functions" 
            :key="`functionDetail-${index}`" 
            @click="$router.replace(`/doc/${item}`)">
            <v-row>
              <v-col :id="`${item.name}${item.argsstring}`" class="font-weight-bold">{{item.name}}</v-col>
            </v-row>
            <v-row>
              <v-col>
                <code>
                    <span v-if="item.static">static </span>
                    <span v-if="luamodules.includes(item.returnOrg)"><router-link :to="'/doc/' + item.returnOrg" target="_blank">{{item.returnOrg}}</router-link></span>
                    <span v-else>{{item.returnOrg}}</span>
                    <span> {{item.name}}{{'('}}</span>
                    <span v-for="(itemParam, indexParam) in item.parameters" :key="`param-${indexParam}`">
                    <span v-if="luamodules.includes(itemParam.typeOrg)"><router-link :to="'/doc/' + itemParam.typeOrg" target="_blank">{{itemParam.typeOrg}}</router-link></span>
                    <span v-else>{{itemParam.typeOrg}}</span>
                    <span> {{itemParam.name}}</span>
                    <span v-if="indexParam != item.parameters.length - 1">, </span>
                    </span>
                    <span>{{')'}}</span>
                </code>
              </v-col>
            </v-row>
            <v-row v-if="item.description != ''">
              <v-col class="text-body-2">{{item.description}}</v-col>
            </v-row>
            <div v-if="item.parameters.length > 0">
              <v-row>
                  <v-col ><div class="rounded primary text-h6 white--text" style="padding-left:10px;">{{$t('parameters')}}</div></v-col>
              </v-row>
              <div v-for="(itemParam, indexParam) in item.parameters" :key="`paramDetail-${indexParam}`">
                  <v-row>
                    <v-col cols="3">
                        <code>{{ itemParam.name }}</code>
                    </v-col>
                    <v-col cols="3" class="hidden-sm-and-down">
                        <code class="blue-grey lighten-4 blue-grey--text">{{ itemParam.typeOrg }}</code>
                    </v-col>
                    <v-col>
                        <div v-for="(cleanedItem, indexCleanedItem) in cleanupParameterType(itemParam.type)" :key="`cleanedParamItem-${indexCleanedItem}`">
                          <code v-if="cleanedItem.size == 2" class="grey lighten-4 grey--text"><a :href="`#${cleanedItem.obj}`">{{cleanedItem.obj}}</a></code>
                          <code v-else class="grey lighten-4 grey--text">{{cleanedItem.obj}}</code>
                        </div>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
              </div>
            </div>
            <div style="font-size:medium; border-top:1px solid black;" class="nocontent"></div>
            <br/>
        </div>
  </v-container>
</template>

<script>
  import axios from 'axios';
  import luamodules from '../assets/doc/modules.json';

  var vm;

  function setData(id)
  {
      axios.get('./doc/' + id + '.json')
      .then(function(result)
      {
          vm.$data.module = result.data;
          vm.$data.baseArrReverse = vm.$data.module.baseArr.reverse();
      })
      .catch();
  }

  export default {
    name: 'ModuleDocument',

    data: () => ({
        module: {},
        tab: {},
        luamodules: luamodules.modules,
        baseArrReverse: []
    }),
    mounted() {
      vm = this;
      setData(this.$route.params.id);
    },
    methods: {
      cleanupParameterType(param)
      {
        var replaced = param.replace(/\"/g, '');
        var arr = replaced.split('|');
        var ret = [];
        if(arr.length == 1)
        {
          var obj = {};
          obj.size = 1;
          obj.obj = arr[0];
          ret.push(obj);
          return ret;
        }
        for(var i = 0; i < arr.length; i++)
        {
            var obj = {};
            obj.size = 2;
            var split = arr[i].split('.');
            if(split.length  > 0)
              obj.obj = split[split.length - 1].trim();
            else
              obj.obj = arr[i].trim();
            ret.push(obj);
        }
        return ret;
      }
    },
    watch: {
      $route(to, from) {
        setData(this.$route.params.id);
      }
    }
  }
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
