<template>
    <v-container>
        <div class="text-h3">{{$t('how-to-use')}}</div>
        <div style="font-size:medium; margin-bottom:40px; border-top:1px solid black;" class="nocontent">
        </div>

        <p>Since we ready up our development environment, we can continue with how to use.</p>
        <p>On our example we defined our entry point in <code>defines.lua</code> as <code>testbed.xml</code>.</p>
        <p>We have this xml in <code>layout</code> folder of android resources in <code>Android</code>, and <code>ui/layout</code> folder in <code>iOS</code></p>

        <pre v-highlightjs><span class="xml">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;LinearLayout android:id=&quot;@+id/mainrootlayout&quot;
    xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:lua=&quot;http://schemas.android.com/apk/res-auto&quot;
    android:layout_width=&quot;fill_parent&quot;
    android:layout_height=&quot;fill_parent&quot;
    android:orientation=&quot;vertical&quot;
    android:background=&quot;#7993AB&quot;&gt;
    &lt;LGToolbar
        android:layout_width=&quot;match_parent&quot;
        android:layout_height=&quot;50dp&quot;
        android:title=&quot;test&quot;/&gt;
    &lt;LGRecyclerView
        android:layout_width=&quot;match_parent&quot;
        android:layout_height=&quot;match_parent&quot;
        lua:id=&quot;ListViewTest&quot;
        android:background=&quot;#ffffff&quot;/&gt;
&lt;/LinearLayout&gt;
        </span></pre>
        <br/><p>As you can see it is very similar to Android xml layouts, only difference is, we define our lua id's as <code>lua:id</code>. Processor parses this xml on all 
        platforms to generate native layouts.</p>
        <p>If processor cannot find any lua id's <code>android:id</code> will be used. It is advised to use <code>lua:id</code></p>
        <p>You can use normal layout tags like <code>LinearLayout</code> or defined by library ones like <code>LGLinearLayout</code></p>
        <p>After setting our layout, we are going to look at <code>testbed.lua</code> file to see how we connect business code with layouts.</p>
        <pre v-highlightjs><span class="lua">
function DatePicker_PositiveButton(pGui)

end

function DatePicker_NegativeButton(pGui)

end

function TimePicker_PositiveButton(pGui)

end

function TimePicker_NegativeButton(pGui)

end

function ListViewTest_Constructor(pGUI, luacontext)
	local pAdapter = LGRecyclerViewAdapter.Create(luacontext, "ListAdapterTest");
	pAdapter:SetOnItemSelected(function(adapter, parent, detail, index, object)
		local form = LuaForm.GetActiveForm();
		if index == 0 then
			LuaForm.CreateWithUI(form:GetContext(), "formTest", "form.xml");
		elseif index == 1 then
			LuaForm.CreateWithUI(form:GetContext(), "hsvTest", "hsv.xml");
		elseif index == 2 then
			LuaForm.CreateWithUI(form:GetContext(), "svTest", "sv.xml");
		elseif index == 3 then
			--Map
		elseif index == 4 then
			LuaDialog.MessageBox(form:GetContext(), "Title", "Message");
		elseif index == 5 then
			local datePicker = LuaDialog.Create(form:GetContext(), LuaDialog.DIALOG_TYPE_DATEPICKER);
			datePicker:SetPositiveButton("Ok", LuaTranslator.Register(datePicker, "DatePicker_PositiveButton"));
			datePicker:SetNegativeButton("Cancel", LuaTranslator.Register(datePicker, "DatePicker_NegativeButton"));
			datePicker:SetTitle("Title");
			datePicker:SetMessage("Message");
			datePicker:SetDateManual(17, 7, 1985);
			datePicker:Show();
		elseif index == 6 then
			local timePicker = LuaDialog.Create(form:GetContext(), LuaDialog.DIALOG_TYPE_TIMEPICKER);
			timePicker:SetPositiveButton("Ok", LuaTranslator.Register(timePicker, "TimePicker_PositiveButton"));
			timePicker:SetNegativeButton("Cancel", LuaTranslator.Register(timePicker, "TimePicker_NegativeButton"));
			timePicker:SetTitle("Title");
			timePicker:SetMessage("Message");
			timePicker:SetTimeManual(17, 7);
			timePicker:Show();
		else
			LuaToast.Show(form:GetContext(), "Toast test", 2000);
		end
	end);
	pAdapter:SetOnCreateViewHolder(function(adapter, parent, type, context)
		local inflator = LuaViewInflator.Create(context);
		local viewToRet = inflator:ParseFile("testbedAdapter.xml", pGUI);
		return viewToRet;
	end);
	pAdapter:SetOnBindViewHolder(function(adapter, view, index, object)
		local tvTitle = view:GetViewById("testBedTitle");
		tvTitle:SetText(object);
	end);
	pAdapter:SetGetItemViewType(function(adapter, type)
		return 1;
	end);
	pAdapter:AddValue(0, "Form Ui");
	pAdapter:AddValue(1, "Horizontal Scroll View");
	pAdapter:AddValue(2, "Vertical Scroll View");
	pAdapter:AddValue(3, "Map");
	pAdapter:AddValue(4, "Message Box");
	pAdapter:AddValue(5, "Date Picker Dialog");
	pAdapter:AddValue(6, "Time Picker Dialog");
	pAdapter:AddValue(7, "Toast");
	pGUI:SetAdapter(pAdapter);
	pAdapter:Notify();
end

LuaForm.RegisterFormEvent("ListViewTest", LuaForm.FORM_EVENT_CREATE, ListViewTest_Constructor);
        </span></pre>

    <p>As you can see the method <code><router-link to="/doc/LuaForm#RegisterFormEvent(String luaId, int event, LuaTranslator lt)">LuaForm.RegisterFormEvent</router-link></code> is used to setup <code>RecyclerView</code>
     that we created on xml.</p>
    <p>First parameter is the <code>lua:id</code> that we defined on our xml.</p>
    <p>Second <code><router-link to="/doc/LuaForm#FORM_EVENT_CREATE">LuaForm.FORM_EVENT_CREATE</router-link></code> parameter is the which event will it fire.</p>
    <p>Third parameter is the which <code>method</code> will it fire (you can directly <code>inline method</code> here).</p>
    <p>When application launches, while it is creating <code>testbed.xml</code>,  it checkes if there is an <code>FORM_EVENT_CREATE</code> is set. If it is set, it calls the third parameter
     function.</p>
    <p>On <code>ListViewTest_Constructor</code> first parameter is <code>RecyclerView</code>. Second parameter is <code>LuaContext</code>,  which has similar purpose to Android's Context.</p>
    <p>You can find more info about methods and variables at <router-link to="/doc/LuaForm">LuaForm</router-link> documentation.</p>
    <p></p>
    <p>Now we need to set on is the entry point of the ToppingEngine on the native application.</p>

    <OSLangSelector v-model="langos">
        <template v-slot:Lua-Android>
			<p>On your launcher activity, extend the activity with <code>LuaForm</code> and implement <code>LuaInterface</code></p>
			<pre v-highlightjs><span class="java">
public class MainActivity extends LuaForm implements LuaInterface
			</span></pre><br/>
            <p>Add this code to <code>onCreate</code> method.</p>
			<pre v-highlightjs><span class="java">
//Creates context to use in ToppingEngine
luaContext = LuaContext.CreateLuaContext(this);

final ToppingEngine toppingEngine = ToppingEngine.getInstance();
//Creates multithreaded class loader for ToppingEngine
final HandlerThread ht = new HandlerThread("Lua Loader Thread", Process.THREAD_PRIORITY_URGENT_DISPLAY);
ht.start();

LuaLoadHandler handler = new LuaLoadHandler(this, ht.getLooper())
{
	@Override
	public void OnFinished()
	{
		//Sets the main form lua id
		luaId = toppingEngine.GetMainForm();
		//Gets the main ui xml
		String initUI = toppingEngine.GetMainUI();
		if(initUI.compareTo("") != 0)
		{
			//If main ui xml exists loads it
			LuaViewInflator inflater = new LuaViewInflator(luaContext);
			MainActivity.this.view = inflater.ParseFile(initUI, null);
			setContentView(view.view);
		}
		else
		{
			//If main ui does not exists, tries to load it dynamically
			LuaForm.OnFormEvent(MainActivity.this, LuaForm.FORM_EVENT_CREATE, luaContext);
		}
		ht.quit();
	}
};
//Starts the loader thread.
handler.sendEmptyMessage(LuaLoadHandler.INIT_MESSAGE);
		</span></pre><br/>
        </template>
		<template v-slot:Lua-iOS>
		<p>On your <code>AppDelegate</code> and <code>SceneDelegate</code> import firmware header.</p>
		<pre v-highlightjs><span class="objectivec">
#import "AppDelegate.h"
#import &lt;luaios/luaios.h&gt;
		</span></pre><br/>
		<p>Then set your <code>AppDelegate</code> delegates with <code>CommonDelegate</code></p>
		<pre v-highlightjs><span class="objectivec">
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    if(@available(iOS 13.0, *))
    {
		// iOS 13 does not use AppDelegate
    }
    else
    {
        CGRect frame = [[UIScreen mainScreen] bounds];
        self.window = [[UIWindow alloc] initWithFrame:frame];
        [[CommonDelegate GetInstance] InitMain:self.window :nil];
    }
    return YES;
}

- (void)applicationWillResignActive:(UIApplication *)application {
    [[CommonDelegate GetInstance] applicationWillResignActive:application];
}


- (void)applicationDidEnterBackground:(UIApplication *)application {
    [[CommonDelegate GetInstance] applicationDidEnterBackground:application];
}


- (void)applicationWillEnterForeground:(UIApplication *)application {
    [[CommonDelegate GetInstance] applicationWillEnterForeground:application];
}


- (void)applicationDidBecomeActive:(UIApplication *)application {
    [[CommonDelegate GetInstance] applicationDidBecomeActive:application];
}


- (void)applicationWillTerminate:(UIApplication *)application {
    [[CommonDelegate GetInstance] applicationWillTerminate:application];
}		
		</span></pre><br/>
		<p>For iOS 13 and later override <code>SceneDelegate</code></p>
		<pre v-highlightjs><span class="objectivec">
- (void)scene:(UIScene *)scene willConnectToSession:(UISceneSession *)session options:(UISceneConnectionOptions *)connectionOptions {
    self.window = [[UIWindow alloc] initWithWindowScene:scene];
    [[CommonDelegate GetInstance] InitMain:self.window :scene];
}
		</span></pre><br/>
        </template>
		<template v-slot:Kotlin-Android>
            Working on this miracle :D
        </template>
		<template v-slot:Kotlin-iOS>
            Working on this miracle :D
        </template>
    </OSLangSelector>
	<p>Now you are set, no extra code required.</p>
    <p>With this setup, you have basic knowledge to move to your own project.</p>
	<NextPrevPage :prev="$t('installation')" prevRoute="installation" :next="$t('resource-system')" nextRoute="resourcesystem"></NextPrevPage>
    </v-container>
</template>

<script>
import OSLangSelector from '../components/OSLangSelector';
import NextPrevPage from '../components/NextPrevPage';
import Storage from './../storage';

export default {
    name: "HowToUse",
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