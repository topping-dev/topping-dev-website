<template>
    <v-container>
        <div class="text-h3">{{$t('resource-system')}}</div>
        <div style="font-size:medium; margin-bottom:40px; border-top:1px solid black;" class="nocontent">
        </div>
        <p>Resources are provided via <code>LR</code> class in lua or kotlin files. ToppingEngine automatically generates resource documentation on first build.</p>
        <p>On kotlin you have to build androidApp first.</p>
        <p>After that you can set values from resource directly using <code>LR</code> class.</p>
        <p><code>LR</code> resources are converted to <code>LuaRef</code> at background.</p>
        <p>Android app might have more resources than ios app that comes from android libraries because of that some resources might not available to ios app.</p>
        <p>Use the resources created by yourself.</p>

        <v-img src="./../../public/img/resource_system_image.png"></v-img>

        <br/><div class="text-h4">Accessing resources from native code</div><br/>
        <OSLangSelector v-model="langos">
            <template v-slot:Lua-Android>
                <p>Resource system uses <code>Android</code> default resource system.</p>
            </template>
            <template v-slot:Lua-iOS>
                <p>Resource system is mostly same with android. Only difference is there are limited number of predefined base styles</p>
                <p>Resources are put under <code>ui</code> directory, naming scheme is same as android resource system</p>
                <p>To fetch xml resource values there are some classes available to use. You can access them from <code>LGParser</code> properties.</p>
                <pre v-highlightjs><span class="objectivec">
@property (nonatomic, retain) LGLayoutParser *pLayout;
@property (nonatomic, retain) LGDrawableParser *pDrawable;
@property (nonatomic, retain) LGDimensionParser *pDimen;
@property (nonatomic, retain) LGColorParser *pColor;
@property (nonatomic, retain) LGStringParser *pString;
@property (nonatomic, retain) LGValueParser *pValue;
@property (nonatomic, retain) LGStyleParser *pStyle;
                </span></pre><br/>
                <p>These classes are Singleton so you can directy access them with their <code>GetInstance</code> method. For example <code>[LGStyleParser GetInstance]</code>.</p>
                <p>For example to parse a color that defined in xml, let's say it is <code>colorGray</code>, you can use.</p>
                <pre v-highlightjs><span class="objectivec">
[[LGColorParser GetInstance] ParseColor:@"colorGray"];
                </span></pre><br/>
                <p>This function will return native color value of <code>colorGray</code></p>
                <p>For <code>bool</code>, <code>integer-array</code>, <code>array</code> and other undefined resources you can use <code>LGValueParser</code> to get data.</p>
                <p>Predefined base styles are below.</p>
                <pre v-highlightjs><span class="xml">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;resources&gt;
    &lt;style name=&quot;Theme.AppCompat.Empty&quot; parent=&quot;&quot; /&gt;
    &lt;style name=&quot;Theme.AppCompat&quot; parent=&quot;&quot;&gt;
        &lt;item name=&quot;android:windowBackground&quot;&gt;#111111&lt;/item&gt;
        &lt;item name=&quot;android:textColor&quot;&gt;#FFFFFF&lt;/item&gt;
        &lt;item name=&quot;ios:toolbarTextColor&quot;&gt;#FFFFFF&lt;/item&gt;
        &lt;item name=&quot;ios:theme&quot;&gt;0&lt;/item&gt;
    &lt;/style&gt;
    &lt;style name=&quot;Theme.AppCompat.Light&quot; parent=&quot;&quot;&gt;
        &lt;item name=&quot;android:windowBackground&quot;&gt;#FFFFFF&lt;/item&gt;
        &lt;item name=&quot;android:textColor&quot;&gt;#000000&lt;/item&gt;
        &lt;item name=&quot;ios:toolbarTextColor&quot;&gt;#000000&lt;/item&gt;
        &lt;item name=&quot;ios:theme&quot;&gt;1&lt;/item&gt;
    &lt;/style&gt;
    &lt;style name=&quot;Theme.AppCompat.Light.DarkActionBar&quot; parent=&quot;&quot;&gt;
        &lt;item name=&quot;android:windowBackground&quot;&gt;#FFFFFF&lt;/item&gt;
        &lt;item name=&quot;android:textColor&quot;&gt;#000000&lt;/item&gt;
        &lt;item name=&quot;ios:toolbarTextColor&quot;&gt;#FFFFFF&lt;/item&gt;
        &lt;item name=&quot;ios:theme&quot;&gt;1&lt;/item&gt;
    &lt;/style&gt;
    &lt;style name=&quot;Theme.AppCompat.NoActionBar&quot; parent=&quot;Theme.AppCompat&quot;&gt;
        &lt;item name=&quot;windowActionBar&quot;&gt;false&lt;/item&gt;
        &lt;item name=&quot;windowNoTitle&quot;&gt;true&lt;/item&gt;
    &lt;/style&gt;
    &lt;style name=&quot;Theme.AppCompat.Light.NoActionBar&quot; parent=&quot;Theme.AppCompat.Light&quot;&gt;
        &lt;item name=&quot;windowActionBar&quot;&gt;false&lt;/item&gt;
        &lt;item name=&quot;windowNoTitle&quot;&gt;true&lt;/item&gt;
    &lt;/style&gt;
    &lt;style name=&quot;Theme.AppCompat.DialogWhenLarge&quot;
           parent=&quot;Base.Theme.AppCompat.DialogWhenLarge&quot;&gt;
    &lt;/style&gt;
    &lt;style name=&quot;Theme.AppCompat.Light.DialogWhenLarge&quot;
           parent=&quot;Base.Theme.AppCompat.Light.DialogWhenLarge&quot;&gt;
    &lt;/style&gt;
    &lt;style name=&quot;Theme.AppCompat.Dialog&quot; parent=&quot;Base.Theme.AppCompat.Dialog&quot; /&gt;
    &lt;style name=&quot;Theme.AppCompat.Light.Dialog&quot; parent=&quot;Base.Theme.AppCompat.Light.Dialog&quot; /&gt;
    
    
    
    &lt;style name=&quot;Theme.AppCompat.DayNight&quot; parent=&quot;Theme.AppCompat.Light&quot;&gt;
        &lt;item name=&quot;ios:theme&quot;&gt;-1&lt;/item&gt;
    &lt;/style&gt;

    &lt;style name=&quot;Theme.AppCompat.DayNight.DarkActionBar&quot; parent=&quot;Theme.AppCompat.Light.DarkActionBar&quot;&gt;
        &lt;item name=&quot;ios:theme&quot;&gt;-1&lt;/item&gt;
    &lt;/style&gt;

    &lt;style name=&quot;Theme.AppCompat.DayNight.NoActionBar&quot; parent=&quot;Theme.AppCompat.Light.NoActionBar&quot;&gt;
        &lt;item name=&quot;ios:theme&quot;&gt;-1&lt;/item&gt;
    &lt;/style&gt;

    &lt;style name=&quot;Theme.AppCompat.DayNight.Dialog&quot; parent=&quot;Theme.AppCompat.Light.Dialog&quot;&gt;
        &lt;item name=&quot;ios:theme&quot;&gt;-1&lt;/item&gt;
    &lt;/style&gt;

    &lt;style name=&quot;Theme.AppCompat.DayNight.Dialog.MinWidth&quot; parent=&quot;Theme.AppCompat.Light.Dialog.MinWidth&quot;&gt;
        &lt;item name=&quot;ios:theme&quot;&gt;-1&lt;/item&gt;
    &lt;/style&gt;

    &lt;style name=&quot;Theme.AppCompat.DayNight.DialogWhenLarge&quot; parent=&quot;Theme.AppCompat.Light.DialogWhenLarge&quot;&gt;
        &lt;item name=&quot;ios:theme&quot;&gt;-1&lt;/item&gt;
    &lt;/style&gt;

    &lt;style name=&quot;Theme.AppCompat.DayNight.Dialog.Alert&quot; parent=&quot;Theme.AppCompat.Light.Dialog.Alert&quot;&gt;
        &lt;item name=&quot;ios:theme&quot;&gt;-1&lt;/item&gt;
    &lt;/style&gt;

    &lt;style name=&quot;ThemeOverlay.AppCompat.DayNight&quot; parent=&quot;ThemeOverlay.AppCompat.Light&quot;&gt;
        &lt;item name=&quot;ios:theme&quot;&gt;-1&lt;/item&gt;
    &lt;/style&gt;

    &lt;style name=&quot;ThemeOverlay.AppCompat.DayNight.ActionBar&quot;&gt;
        &lt;item name=&quot;colorControlNormal&quot;&gt;?android:attr/textColorPrimary&lt;/item&gt;
        &lt;item name=&quot;searchViewStyle&quot;&gt;@style/Widget.AppCompat.SearchView.ActionBar&lt;/item&gt;
        &lt;item name=&quot;ios:theme&quot;&gt;-1&lt;/item&gt;
    &lt;/style&gt;
&lt;/resources&gt;
                </span></pre>
            </template>
        </OSLangSelector>
        <NextPrevPage :prev="$t('how-to-use')" prevRoute="howtouse" :next="$t('debugging')" nextRoute="debugging"></NextPrevPage>
    </v-container>
</template>

<script>
import OSLangSelector from '../components/OSLangSelector';
import NextPrevPage from '../components/NextPrevPage';
import Storage from './../storage';

export default {
    name: "ResourceSystem",
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