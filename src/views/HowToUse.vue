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
        <br/><br/><p>As you can see it is very similar to Android xml layouts, only difference is, we define our lua id's as <code>lua:id</code>. Processor parses this xml on all 
        platforms to generate native layouts.</p>
        <p>If processor cannot find any lua id's <code>android:id</code> will be used. It is advised to use <code>lua:id</code></p>
        <p>You can use normal layout tags like <code>LinearLayout</code> or defined by library ones like <code>LGLinearLayout</code></p>
		<LangSelector v-model="langos">
            <template v-slot:Lua>
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

function ListViewTest_AdapterView_ItemSelected(pGui, listView, detailView, position, data)
    local form = LuaForm.getActiveForm();
    if position == 0 then
        LuaForm.createWithUI(form:getContext(), "formTest", "form.xml");
    elseif position == 1 then
        LuaForm.createWithUI(form:getContext(), "hsvTest", "hsv.xml");
    elseif position == 2 then
        LuaForm.createWithUI(form:getContext(), "svTest", "sv.xml");
    elseif position == 3 then
        --Map
    elseif position == 4 then
        LuaDialog.messageBox(form:getContext(), "Title", "Message");
    elseif position == 5 then
    local datePicker = LuaDialog.create(form:getContext(), LuaDialog.DIALOG_TYPE_DATEPICKER);
        datePicker:setPositiveButton("Ok", LuaTranslator.register(datePicker, "DatePicker_PositiveButton"));
        datePicker:setNegativeButton("Cancel", LuaTranslator.register(datePicker, "DatePicker_NegativeButton"));
        datePicker:setTitle("Title");
        datePicker:setMessage("Message");
        datePicker:setDateManual(17, 7, 1985);
        datePicker:show();
    elseif position == 6 then
        local timePicker = LuaDialog.create(form:getContext(), LuaDialog.DIALOG_TYPE_TIMEPICKER);
        timePicker:setPositiveButton("Ok", LuaTranslator.register(timePicker, "TimePicker_PositiveButton"));
        timePicker:setNegativeButton("Cancel", LuaTranslator.register(timePicker, "TimePicker_NegativeButton"));
        timePicker:setTitle("Title");
        timePicker:setMessage("Message");
        timePicker:setTimeManual(17, 7);
        timePicker:show();
    else
        LuaToast.show(form:getContext(), "Toast test", 2000);
    end
end

function ListViewTest_Constructor(pGUI, luacontext)
    local pAdapter = LGRecyclerViewAdapter.create(luacontext, "ListAdapterTest");
    pAdapter:setOnItemSelected(function(adapter, parent, detail, index, object)
        local form = LuaForm.getActiveForm();
        if index == 0 then
            local to = LuaForm.createWithUI(form:GetContext(), LR.id.formTestLL, LR.layout.form);
            luacontext:startForm(to)
        elseif index == 1 then
            local to = LuaForm.createWithUI(form:GetContext(), LR.id.hsvTestLL, LR.layout.hsv);
            luacontext:startForm(to)
        elseif index == 2 then
            local to = LuaForm.createWithUI(form:GetContext(), LR.id.svTestLL, LR.layout.sv);
            luacontext:startForm(to)
        elseif index == 3 then
            --Map
        elseif index == 4 then
            LuaDialog.messageBox(form:getContext(), LR.string.teststring, LR.string.teststring);
        elseif index == 5 then
            local datePicker = LuaDialog.create(form:getContext(), LuaDialog.DIALOG_TYPE_DATEPICKER);
            datePicker:setPositiveButton(LR.string.ok, LuaTranslator.register(datePicker, "DatePicker_PositiveButton"));
            datePicker:setNegativeButton(LR.string.cancel, LuaTranslator.register(datePicker, "DatePicker_NegativeButton"));
            datePicker:setTitle(LR.string.title);
            datePicker:setMessage(LR.string.message);
            datePicker:setDateManual(17, 7, 1985);
            datePicker:show();
        elseif index == 6 then
            local timePicker = LuaDialog.create(form:getContext(), LuaDialog.DIALOG_TYPE_TIMEPICKER);
            timePicker:setPositiveButton(LR.string.ok, LuaTranslator.register(timePicker, "TimePicker_PositiveButton"));
            timePicker:setNegativeButton(LR.string.cancel, LuaTranslator.register(timePicker, "TimePicker_NegativeButton"));
            timePicker:setTitle(LR.string.title);
            timePicker:setMessage(LR.string.message);
            timePicker:setTimeManual(17, 7);
            timePicker:show();
        elseif index == 7 then
            LuaToast.show(form:getContext(), LR.string.toast_message, 2000);
        elseif index == 8 then
            local to = LuaForm.createWithUI(form:getContext(), LR.id.frameTest, LR.layout.frame);
            luacontext:startForm(to)
        elseif index == 9 then
            local to = LuaForm.createWithUI(form:getContext(), LR.id.constraintTest, LR.layout.constraint);
            luacontext:startForm(to)
        end
    end);
    pAdapter:setOnCreateViewHolder(function(adapter, parent, type, context)
        local inflator = LuaViewInflator.create(context);
        local viewToRet = inflator:inflate(LR.layout.testbedadapter, pGUI);
        return viewToRet;
    end);
    pAdapter:setOnBindViewHolder(function(adapter, view, index, object)
        local tvTitle = view:getViewById(LR.id.testBedTitle);
        tvTitle:setText(object);
        tvTitle:setTextColorRef(LR.color.colorAccent);
    end);
    pAdapter:setGetItemViewType(function(adapter, type)
        return 1;
    end);
    pAdapter:addValue("Form Ui");
    pAdapter:addValue("Horizontal Scroll View");
    pAdapter:addValue("Vertical Scroll View");
    pAdapter:addValue("Map");
    pAdapter:addValue("Message Box");
    pAdapter:addValue("Date Picker Dialog");
    pAdapter:addValue("Time Picker Dialog");
    pAdapter:addValue("Toast");
    pAdapter:addValue("FrameLayout");
    pAdapter:addValue("ConstraintLayout");
    pGUI:setAdapter(pAdapter);
    pAdapter:notify();
end

function Toolbar_Constructor(pToolbar, luacontext)
    pToolbar:setSubtitle("Test title");
end

function Main_Constructor(pForm, luacontext)
    local navController = pForm:getFragmentManager():findFragmentById(LR.id.nav_host_fragment):getNavController()
    local toolbar = pForm:getViewById(LR.id.ToolbarTest)
    LuaNavigationUI.setupWithNavController(toolbar, navController)
    LuaNavigationUI.setupWithNavController(toolbar, navController)
end

function Pager_Constructor(pViewPager, luacontext)
    local pagerAdapter = LGFragmentStateAdapter.createFromForm(luacontext:GetForm())
    pagerAdapter:cetCreateFragment(function(adapter, position)
        local args = {}
        args["position"] = position
        return LuaFragment.createWithArgs(luacontext, LR.id.formTestLL, args)
    end)
    pagerAdapter:setGetItemCount(function(adapter)
        return 4
    end)
    pViewPager:setAdapter(pagerAdapter)
    local tabLayout = luacontext:getForm():getViewById(LR.id.tab)
    pViewPager:setTabLayout(tabLayout, function(pager, pos)
        local tab = LuaTab.create()
        tab:setText(tostring(pos))
        return tab
    end)
end

function MenuFragment_Create_View(pFragment, luacontext, inflater, container, savedInstanceState)
    return inflater:inflate(LR.layout.form, container)
end

function ReceiveFragment_Create_View(pFragment, luacontext, inflater, container, savedInstanceState)
    return inflater:inflate(LR.layout.testbed, container)
end

function FormTest_Create_View(pFragment, luacontext, inflater, container, savedInstanceState)
    return inflater:inflate(LR.layout.form, container)
end

LuaEvent.registerUIEvent(LR.id.ListViewTest, LuaEvent.UI_EVENT_VIEW_CREATE, ListViewTest_Constructor);
LuaEvent.registerUIEvent(LR.id.ToolbarTest, LuaEvent.UI_EVENT_VIEW_CREATE, Toolbar_Constructor);
LuaEvent.registerUIEvent(LR.id.Main, LuaEvent.UI_EVENT_CREATE, Main_Constructor);
--LuaEvent.registerUIEvent(LR.id.pager, LuaEvent.UI_EVENT_VIEW_CREATE, Pager_Constructor);
LuaEvent.registerUIEvent(LR.id.menuFragment, LuaEvent.UI_EVENT_FRAGMENT_CREATE_VIEW, MenuFragment_Create_View);
LuaEvent.registerUIEvent(LR.id.receiveFragment, LuaEvent.UI_EVENT_FRAGMENT_CREATE_VIEW, ReceiveFragment_Create_View);
        		</span></pre>                
            </template>
            <template v-slot:Kotlin>
                <p>After setting our layout, we are going to look at <code>KTInit.kt</code> and <code>TestBed.kt</code> file to see how we connect business code with layouts.</p>
				<p>You can use <code>shared/src/commonMain/kotlin/yourpackage/</code> folder to create your shared source code in kotlin multiplatform</p>
				<p>First we look at <code>KTInit.kt</code>, this file is the entry point of the application. We will define form events here.</p>
				<pre v-highlightjs><span class="kotlin">
import dev.topping.kotlin.*
import dev.topping.kotlinsample.Form
import dev.topping.kotlinsample.MainForm
import dev.topping.kotlinsample.MenuFragment

class KTEntry {
    companion object {
        fun Init() {
            LuaEvent.registerUIEvent(
                LR.id.ListViewTest,
                LuaEvent.UI_EVENT_VIEW_CREATE,
                TestBed::ListViewTest_Constructor
            )
            LuaEvent.registerFragment("menuFragment", ::MenuFragment)
            LuaEvent.registerForm("Main", ::MainForm)
        }
    }
}
				</span></pre>
				<p>This will be explained later, let's look at your code created at, <code>TestBed.kt</code></p>
        		<pre v-highlightjs><span class="kotlin">
import dev.topping.kotlin.*
import kotlin.reflect.KCallable

class TestBed {
    companion object {
        private fun onItemSelected(adapter: LGRecyclerViewAdapter?, parent: LGView?, detail: LGView?, index: Int, data: Any?) {
            val form = LuaForm.getActiveForm()
            if(index == 0)
                LuaForm.createWithUI(form?.getContext()!!, LR.id.formTestLL, LR.layout.form)
            else if(index == 1)
                LuaForm.createWithUI(form?.getContext()!!, LR.id.hsvTestLL, LR.layout.hsv)
            else if(index == 2)
                LuaForm.createWithUI(form?.getContext()!!, LR.id.svTestLL, LR.layout.sv)
            else if(index == 3)
                LuaLog.d("asd", "asd")
            else if(index == 4)
                LuaDialog.messageBoxInternal(form?.getContext()!!, "Title", "Message")
            else if(index == 5) {
                val datePicker = LuaDialog.create(form?.getContext()!!, LuaDialog.DIALOG_TYPE_DATEPICKER)
                datePicker.setPositiveButtonInternal("Ok", null)
                datePicker.setNegativeButtonInternal("Cancel", null)
                datePicker.setTitle("Title")
                datePicker.setMessage("Message")
                datePicker.setDateManual(17, 7, 1985)
                datePicker.show()
            }
            else if(index == 6) {
                val timePicker = LuaDialog.create(form?.getContext()!!, LuaDialog.DIALOG_TYPE_TIMEPICKER)
                timePicker.setPositiveButtonInternal("Ok", null)
                timePicker.setNegativeButtonInternal("Cancel", null)
                timePicker.setTitle("Title")
                timePicker.setMessage("Message")
                timePicker.setTimeManual(17, 7)
                timePicker.show()
            }
            else
                LuaToast.show(form?.getContext()!!, "Toast test", 2000)
        }

        private fun onCreateViewHolder(adapter: LGRecyclerViewAdapter?, parent: LGView?, type: Int, context: LuaContext?) : LGView
        {
            val inflator = LuaViewInflator.create(context!!)
            val viewToRet = inflator.inflate(LR.layout.testbedadapter, parent)
            return viewToRet!!
        }

        private fun onBindViewHolder(adapter: LGRecyclerViewAdapter?, view: LGView?, index: Int, obj:Any?)
        {
            val tvTitle:LGTextView? = view?.getViewById(LR.id.testBedTitle) as LGTextView?
            tvTitle?.setTextInternal(obj as String)
        }

        private fun onGetItemViewType(adapter: LGRecyclerViewAdapter?, type: Int) : Int {
            return 1
        }

        fun ListViewTest_Constructor(pGUI: LGView, luacontext : LuaContext)
        {
            val pAdapter = LGRecyclerViewAdapter.create(luacontext, "ListAdapterTest")
            pAdapter.setOnItemSelected(Companion::onItemSelected)
            pAdapter.setOnCreateViewHolder(Companion::onCreateViewHolder)
            pAdapter.setOnBindViewHolder(Companion::onBindViewHolder)
            pAdapter.setGetItemViewType(Companion::onGetItemViewType)
            pAdapter.addValue("Form Ui")
            pAdapter.addValue("Horizontal Scroll View")
            pAdapter.addValue("Vertical Scroll View")
            pAdapter.addValue("Map")
            pAdapter.addValue("Message Box")
            pAdapter.addValue("Date Picker Dialog")
            pAdapter.addValue("Time Picker Dialog")
            pAdapter.addValue("Toast")
            (pGUI as LGRecyclerView).setAdapter(pAdapter)
            pAdapter.notifyData()
        }
    }
}
        		</span></pre>
                <p>Also lets look at MenuFragment.kt</p>
                <pre v-highlightjs><span class="kotlin">
import dev.topping.kotlin.*

class MenuFragment(fragment: Any) : ILuaFragment(fragment) {
    lateinit var binding: FormBinding
    var viewModel = LuaViewModelProvider.of(getFragment()).get("key", MenuViewModel())

    override fun onCreate(savedInstanceState: LuaBundle?) {
    }

    override fun onCreateView(
        luacontext: LuaContext,
        inflater: LuaViewInflator,
        container: LGView?,
        savedInstanceState: LuaBundle?
    ): LGView {
        binding = FormBinding.inflate(inflater)
        binding.formTestButton.setOnClickListener { lgView, luaContext ->
            LuaToast.show(luaContext, "Test button clicked", 1000)
            lgView.findNavController().navigate(LR.id.action_menuFragment_to_receiveFragment)
        }
        binding.formTestCheckBox.setOnCheckedChangedListener { lgCheckBox, luaContext, isChecked ->
            LuaToast.show(luaContext, "CheckBox value is $isChecked", 1000)
        }
        val combobox = binding.formTestComboBox
        combobox.addItem("Item 1", 1)
        combobox.addItem("Item 2", 2)
        combobox.addItem("Item 3", 3)
        combobox.addItem("Item 4", 4)
        combobox.setOnComboChangedListener(Form.Companion::TestComboBox_Changed)
        binding.formTestProgressBar.setMax(100)
        binding.formTestProgressBar.setProgress(15)
        return binding.getRoot()
    }

    override fun onViewCreated(view: LGView, savedInstanceState: LuaBundle?) {
    }

    override fun onResume() {
    }

    override fun onPause() {
    }

    override fun onDestroy() {
    }
}
        		</span></pre>
            </template>
        </LangSelector>
    <p>As you can see the method <code><router-link to="/doc/LuaEvent#registerUIEvent(LuaRef luaId, int event, LuaTranslator lt)">LuaEvent.registerUIEvent</router-link></code> is used to setup <code>RecyclerView</code>
     that we created on xml.</p>
    <p>First parameter is the <code>lua:id</code> that we defined on our xml.</p>
    <p>Second <code><router-link to="/doc/LuaEvent#UI_EVENT_VIEW_CREATE">LuaEvent.UI_EVENT_VIEW_CREATE</router-link></code> parameter is the which event will it fire.</p>
    <p>Third parameter is the which <code>method</code> will it fire (you can directly <code>inline method</code> here).</p>
    <p>When application launches, while it is creating <code>testbed.xml</code>,  it checkes if there is an <code>UI_EVENT_VIEW_CREATE</code> is set. If it is set, it calls the third parameter
     function.</p>
    <p>On <code>ListViewTest_Constructor</code> first parameter is <code>RecyclerView</code>. Second parameter is <code>LuaContext</code>,  which has similar purpose to Android's Context.</p>
    <p>You can find more info about methods and variables at <router-link to="/doc/LuaEvent">LuaEvent</router-link> documentation.</p>
    <p></p>
    <p>In kotlin you can override <router-link to="/doc/ILuaForm">ILuaForm</router-link> and <router-link to="/doc/ILuaFragment">ILuaFragment</router-link> to get more class-object like coding.</p>
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
		<p>Also dont forget to add <code>LuaForm</code> to <code>AndroidManifest.xml</code>, to move between activities.</p>
		<pre v-highlightjs><span class="java">
 &lt;activity android:name="dev.topping.android.LuaForm"&gt;
 &lt;/activity&gt;
		</span></pre><br />
        </template>
		<template v-slot:Lua-iOS>
		<p>On your <code>AppDelegate</code> and <code>SceneDelegate</code> import firmware header.</p>
		<pre v-highlightjs><span class="objectivec">
#import "AppDelegate.h"
#import &lt;Topping/Topping.h&gt;
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
            <p>If you are using <a href="https://github.com/topping-dev/topping-kotlin-sample">sample project</a> you don't need to set anything.</p>
			<p>Setup phase happens on <code>Platform.kt</code>, native code calls this kotlin class to init at androidApp project.</p>
        </template>
		<template v-slot:Kotlin-iOS>
            <p>If you are using <a href="https://github.com/topping-dev/topping-kotlin-sample">sample project</a> you don't need to set anything.</p>
			<p>Setup phase happens on <code>Platform.kt</code>, native code calls this kotlin class to init at iosApp project.</p>
        </template>
    </OSLangSelector>
	<p>Now you are set, no extra code required.</p>
    <p>With this setup, you have basic knowledge to move to your own project.</p>
	<NextPrevPage :prev="$t('installation')" prevRoute="installation" :next="$t('resource-system')" nextRoute="resourcesystem"></NextPrevPage>
    </v-container>
</template>

<script>
import OSLangSelector from '../components/OSLangSelector';
import LangSelector from '../components/LangSelector';
import NextPrevPage from '../components/NextPrevPage';
import Storage from './../storage';

export default {
    name: "HowToUse",
    components: {
		OSLangSelector,
		LangSelector,
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
