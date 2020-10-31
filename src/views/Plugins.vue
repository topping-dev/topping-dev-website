<template>
    <v-container>
        <div class="text-h3">{{$t('plugins')}}</div>
        <OSLangSelector v-model="langos">
            <template v-slot:Lua-Android>
              <p>To add plugins, you have to add library with gradle or directly. After library added, before loading LuaEngine at native, call <code>AddLuaPlugin</code> method.</p>
              <p>This will register the lua functions annotated from that class.</p>
              <pre v-highlightjs><span class="java">
LuaEngine.AddPluginClass(XPluginView.class);
final LuaEngine luaEngine = LuaEngine.getInstance();
final HandlerThread ht = new HandlerThread("Lua Loader Thread", Process.THREAD_PRIORITY_URGENT_DISPLAY);
              </span></pre>
              <br/>
              <div class="text-h4">Developing plugins</div><br/>
              <p>On Android development of plugins are mostly done through <code>annotations</code>.</p>
              <p>To add custom lua class first we have to create a Java class. After that we annotate it with <code>@LuaClass</code>. 
              This annotation has one parameter <code>className</code> which corresponds to class name that will be defined in lua. 
              Also you have to implement <code>LuaInterface</code></p>
              <p>If you are going to create a custom view you have to extend <code>LGView/LGViewGroup</code></p>
              <pre v-highlightjs><span class="java">
@LuaClass(className = "XPluginView")
public class XPluginView extends LGView implements LuaInterface
              </span></pre><br/>
              <p>To add lua functions to this class you have to use <code>@LuaFunction</code> annotation. For example let's add static create function and an instance 
              get/set function to XPluginView class.</p>
              <pre v-highlightjs><span class="java">
@LuaClass(className = "XPluginView")
public class XPluginView extends LGView implements LuaInterface
{
	@LuaFunction(manual = false, methodName = "Create", arguments = { LuaContext.class, String.class }, self = XPluginView.class)
	public static XPluginView Create(LuaContext lc, String luaId)
	{
		XPluginView pv = new XPluginView(lc.GetContext());
		pv.view.setTag(pv);
		pv.luaId = luaId;
		return pv;
	}    
}
              </span></pre><br/>
              <p>At the example you see that there is an <code>@LuaFunction</code> annotation on top of <code>Create</code>. This helps LuaEngine 
              to parse function for lua vm. Let's look at <code>@LuaFunction</code> parameters.</p>
              <v-row>
                  <v-col cols="4" md="2">
                      <code class="blue-grey lighten-4 blue-grey--text">manual</code>
                  </v-col>
                  <v-col>
                      If you want to use lua functions to parse, parameters and return object. You can use <code>manual = true</code>. If you want 
                      LuaEngine to parse it you leave it false
                  </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                  <v-col cols="4" md="2">
                      <code class="blue-grey lighten-4 blue-grey--text">methodName</code>
                  </v-col>
                  <v-col>
                      This is the LuaEngine method name of the function
                  </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                  <v-col cols="4" md="2">
                      <code class="blue-grey lighten-4 blue-grey--text">arguments</code>
                  </v-col>
                  <v-col>
                      Arguments of the function, you can use primitive types, String and exposed objects to lua.
                  </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                  <v-col cols="4" md="2">
                      <code class="blue-grey lighten-4 blue-grey--text">self</code>
                  </v-col>
                  <v-col>
                      If your function is static, you have to define this value as the class of the function.
                  </v-col>
              </v-row>
              <v-divider></v-divider><br/>
              <p>Now lets add get/set instance functions.</p>
              <pre v-highlightjs><span class="java">
@LuaClass(className = "XPluginView")
public class XPluginView extends LGView implements LuaInterface
{
  private String x;
	@LuaFunction(manual = false, methodName = "Create", arguments = { LuaContext.class, String.class }, self = XPluginView.class)
	public static XPluginView Create(LuaContext lc, String luaId)
	{
		XPluginView pv = new XPluginView(lc.GetContext());
		pv.view.setTag(pv);
		pv.luaId = luaId;
		return pv;
	}

	@LuaFunction(manual = false, methodName = "GetX", arguments = { })
	public String GetX()
	{
		return x;
	}

	@LuaFunction(manual = false, methodName = "SetX", arguments = { String.class })
	public void SetText(String val)
	{
		x = val;
	}
}
              </span></pre><br/>
              <p>As you can see it is easy to add functions that will expose to LuaEngine on instance functions only difference is there is no <code>self</code> argument.</p>
              <p>If you are extending from an exposed class like <code>LGView</code>, its exposed functions also will be added to your plugin class.</p>
              <p>If your class will have custom view there are some functions you have to override from LGView</p>
              <p>First override is Setup functions. In this function you will create your native view and set it to view object of <code>LGView</code>.</p>
              <pre v-highlightjs><span class="java">
@LuaClass(className = "XPluginView")
public class XPluginView extends LGView implements LuaInterface
{
	private String x;
	
	public void Setup(Context context)
	{
		view = new XNativeView(context);
	}

	public void Setup(Context context, AttributeSet attrs)
	{
		view = new XNativeView(context, attrs);
	}

	public void Setup(Context context, AttributeSet attrs, int defStyle)
	{
		view = new XNativeView(context, attrs, defStyle);
	}
	
	@LuaFunction(manual = false, methodName = "Create", arguments = { LuaContext.class, String.class }, self = XPluginView.class)
	public static XPluginView Create(LuaContext lc, String luaId)
	{
		XPluginView pv = new XPluginView(lc.GetContext());
		pv.view.setTag(pv);
		pv.luaId = luaId;
		return pv;
	}

	@LuaFunction(manual = false, methodName = "GetX", arguments = { })
	public String GetX()
	{
		return x;
	}

	@LuaFunction(manual = false, methodName = "SetX", arguments = { String.class })
	public void SetText(String val)
	{
		x = val;
	}
}
                </span></pre><br/>
                <p>For example you want to add an event listener from LuaEngine that will set to an function. For this you will use <code>LuaTranslator</code> class.</p>
                <p>This is an special class that converts lua functions to java functions. Now lets add an x changed listener.</p>
                <pre v-highlightjs><span class="java">
	@LuaFunction(manual = false, methodName = "SetX", arguments = { String.class })
	public void SetText(String val)
	{
		x = val;
		//We add call to here
		if(ltXChanged != null)
		{
			ltXChanged.CallIn(XPluginView.this, x);
		}
	}
	
	@LuaFunction(manual = false, methodName = "SetXChangedListener", arguments = { LuaTranslator.class })
	public void SetXChangedListener(LuaTranslator lt)
	{
		ltXChanged = lt;
	}                
                </span></pre><br/>
                <p>When you set <code>SetXChangedListener</code> a function from lua, it will be converted to <code>LuaTranslator</code> on native side.</p>
                <p>To add static variable to class you can use <code>@LuaStaticVariable</code> on variables. You can access this variable from lua code 
                <code>ClassName.VariableName</code>. For example to create variable <code>XPluginView.XStatic</code> you have to use this code.</p>
                <pre v-highlightjs><span class="java">
@LuaClass(className = "XPluginView")
public class XPluginView extends LGView implements LuaInterface
{
	private String x;

    @LuaStaticVariable
    public static final int XStatic = 0;
	
	public void Setup(Context context)
                </span></pre><br/>
            </template>
            <template v-slot:Lua-iOS>
                <p>To add plugins, you have to add library with gradle or directly. After library added, before loading LuaEngine at native, call <code>AddLuaPlugin</code> method.</p>
                <p>This will register the lua functions annotated from that class.</p>
                <pre v-highlightjs><span class="objectivec">
[LuaEngine AddPluginClass:[XPluginView class]];
[[CommonDelegate GetInstance] InitMain:self.window :nil];
                </span></pre>
                <br/>
                <div class="text-h4">Developing plugins</div><br/>
                <p>To add custom lua class first we have to create a Objective-C class. After that we add <code>LuaClass</code> and <code>LuaInterface></code> protocols to that class. 
                <code>LuaClass</code> protocol has two required two optional functions. <code>className</code> functions returns class name that will be defined in lua. <code>luaMethods</code> is 
                to define methods of the class. <code>luaStaticVars</code> function defines static variables and <code>luaGlobals</code> defines global variables. <code>LuaInterface</code> has 
                one required function which is <code>GetId</code> that defines lua id of class.</p>
                <p>If you are going to create a custom view you have to extend from <code>LGView/LGViewGroup</code></p>
                <pre v-highlightjs><span class="objectivec">
@interface XPluginView : NSObject &lt;LuaClass, LuaInterface&gt;
{
    +(XPluginView*)Create:(LuaContext *)context :(NSString *)idV;
}
                </span></pre><br/>
                <p>To add lua functions to this class you have to use <code>@LuaFunction</code> annotation. For example let's add static create function and an instance 
                get/set function to XPluginView class.</p>
                <pre v-highlightjs><span class="objectivec">
+(NSMutableDictionary*)luaMethods
{
	NSMutableDictionary* dict = [[NSMutableDictionary alloc] init];
    //Enable this if you are overriding from LGView
	//ADDDICTTODICT(dict, [LGView luaMethods]);
	[dict setObject:[LuaFunction CreateC:class_getClassMethod([self class], @selector(Create::)) 
										:@selector(Create::) 
										:[XPluginView class]
										:[NSArray arrayWithObjects:[LuaContext class], [NSString class], nil] 
										:[XPluginView class]] 
			 forKey:@"Create"];
    return dict;
}
                </span></pre><br/>
                <p><code>LuaFunction</code> class is used to define methods class. It has two static methods <code>CreateC</code> and <code>Create</code>. <code>CreateC</code> is used to create static 
                methods. <code>Create</code> is used to create instance methods. Lets look at <code>LuaFunction</code> variables.</p>
                <v-row>
                  <v-col cols="4" md="2">
                      <code class="blue-grey lighten-4 blue-grey--text">boolean manual</code>
                  </v-col>
                  <v-col>
                      If you want to use lua functions to parse, parameters and return object. You can use <code>manual = true</code>. If you want 
                      LuaEngine to parse it you leave it false
                  </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                  <v-col cols="4" md="2">
                      <code class="blue-grey lighten-4 blue-grey--text">Method *m</code>
                  </v-col>
                  <v-col>
                      This is the LuaEngine method name of the function
                  </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                  <v-col cols="4" md="2">
                      <code class="blue-grey lighten-4 blue-grey--text">SEL selector</code>
                  </v-col>
                  <v-col>
                      selector of the function
                  </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                  <v-col cols="4" md="2">
                      <code class="blue-grey lighten-4 blue-grey--text">NSString *luaName</code>
                  </v-col>
                  <v-col>
                      This defines the lua name of the function
                  </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                  <v-col cols="4" md="2">
                      <code class="blue-grey lighten-4 blue-grey--text">Class *returns</code>
                  </v-col>
                  <v-col>
                      This defines what will function return.
                  </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                  <v-col cols="4" md="2">
                      <code class="blue-grey lighten-4 blue-grey--text">NSMutableArray *argumentArray</code>
                  </v-col>
                  <v-col>
                      This defines the array of arguments. You have to use Lua defines of the primitives here.
                      LuaBool, LuaChar, LuaDouble, LuaFloat, LuaInt, LuaLong, LuaShort, NSString and Objects that exposed to lua.
                  </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                  <v-col cols="4" md="2">
                      <code class="blue-grey lighten-4 blue-grey--text">Class *classOfMethod</code>
                  </v-col>
                  <v-col>
                      This defines static class of the method.
                  </v-col>
              </v-row>
              <v-divider></v-divider><br/>
                <p>You have to use predefined static functions to create <code>LuaFunction</code></p>
                <pre v-highlightjs><span class="objectivec">
+(LuaFunction*) CreateC:(bool)manP :(Method)methodP :(SEL)selP :(Class)returnsP :(NSArray*)argArrayP :(Class)classOfMethodP;
+(LuaFunction*) Create:(bool)manP :(Method) methodP :(SEL)selP :(Class)returnsP :(NSArray*)argArrayP;
+(LuaFunction*) CreateC:(Method)methodP :(SEL)selP :(Class)returnsP :(NSArray*)argArrayP :(Class)classOfMethodP;
+(LuaFunction*) Create:(Method)methodP :(SEL)selP :(Class)returnsP :(NSArray*)argArrayP;
+(LuaFunction*) CreateC:(Method)methodP :(SEL)selP :(Class)returnsP :(Class)classOfMethodP;
+(LuaFunction*) Create:(Method)methodP :(SEL)selP :(Class)returnsP;
                </span></pre><br/>
                <p>Now let's look at <code>Create</code> function in XPluginView</p>
                <pre v-highlightjs><span class="objectivec">
+(XPluginView*)Create:(LuaContext *)context :(NSString *)idV
{
	XPluginView *pv = [[XPluginView alloc] init];
	pv.lua_id = idV;
    //Enable this to init xml properties if you are overriding from LGView or LGViewGroup
	//[pv InitProperties];
	return pv;
}
                </span></pre>
                <p>This function will be accessable from lua as <code>XPluginView.Create</code></p>
                <p>Now let's add some instance functions. First we create our instance methods.</p>
                <pre v-highlightjs><span class="objectivec">
-(NSString*)GetX
{
	return X;
}

-(NSString*)SetX:(NSString*) X
{
	self.X = X;
}
                </span></pre>
                <p>To expose this functions to lua engine you will add these functions to <code>luaMethods</code> function</p>
                <pre v-highlightjs><span class="objectivec">
+(NSMutableDictionary*)luaMethods
{
	NSMutableDictionary* dict = [[NSMutableDictionary alloc] init];
    //Enable this if you are overriding from LGView
	//ADDDICTTODICT(dict, [LGView luaMethods]);
	[dict setObject:[LuaFunction CreateC:class_getClassMethod([self class], @selector(Create::)) 
										:@selector(Create::) 
										:[XPluginView class]
										:[NSArray arrayWithObjects:[LuaContext class], [NSString class], nil] 
										:[XPluginView class]] 
			 forKey:@"Create"];
	[dict setObject:[LuaFunction Create:class_getInstanceMethod([self class], @selector(GetX)) 
									   :@selector(GetX)
									   :[NSString class]
									   :MakeArray(nil)]
			 forKey:@"GetX"];
	[dict setObject:[LuaFunction Create:class_getInstanceMethod([self class], @selector(SetX:)) 
									   :@selector(SetX:)
									   :nil
									   :MakeArray([NSString class]C nil)]
			 forKey:@"SetX"];                       
    return dict;
}
                </span></pre><br/>
                <p>As you can see we used <code>Create</code> function of the <code>LuaFunction</code> class.</p>
                <p>If you are extending from an exposed class like <code>LGView</code>, you have to add its functions with calling super class.</p>
                <p>If your class will have custom view there are some functions you have to override from LGView</p>
                <p>Below there are the list of functions you can override.</p>
                <v-row>
                    <v-col cols="8" md="4">
                        <code class="blue-grey lighten-4 blue-grey--text">-(void)InitProperties</code>
                    </v-col>
                    <v-col>
                        (Optional)
                        Override this to load custom attributes given from XML layout. You can use this function to initialize your own properties.
                    </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                    <v-col cols="8" md="4">
                        <code class="blue-grey lighten-4 blue-grey--text">-(UIView*)CreateComponent</code>
                    </v-col>
                    <v-col>
                        (Required)
                        This function is where you will create your native view and return it to luaengine.
                    </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                    <v-col cols="8" md="4">
                        <code class="blue-grey lighten-4 blue-grey--text">-(void)InitComponent:(UIView *)view :(LuaContext *)lc</code>
                    </v-col>
                    <v-col>
                        (Optional)
                        This function will be called after initialising your component.
                    </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                    <v-col cols="8" md="4">
                        <code class="blue-grey lighten-4 blue-grey--text">-(void)SetupComponent:(UIView *)view</code>
                    </v-col>
                    <v-col>
                        (Optional)
                        When this function is called all of the layout calculations will be ready for your native class. You can setup your view 
                        (for example setting text of an textview) here.
                    </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                    <v-col cols="8" md="4">
                        <code class="blue-grey lighten-4 blue-grey--text">-(void)ComponentAddMethod:(UIView*)par :(UIView *)me</code>
                    </v-col>
                    <v-col>
                        (Optional)
                        This function is used to how to add your native component to parent view. If you have multiple views but using only one of it 
                        you can use this function.
                    </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                    <v-col cols="8" md="4">
                        <code class="blue-grey lighten-4 blue-grey--text">-(int)GetContentW</code>
                    </v-col>
                    <v-col>
                        (Optional)
                        This functions define how <code>wrap_content</code> on xml layout will be calculated.
                    </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                    <v-col cols="8" md="4">
                        <code class="blue-grey lighten-4 blue-grey--text">-(int)GetContentH</code>
                    </v-col>
                    <v-col>
                        (Optional)
                        This functions define how <code>wrap_content</code> on xml layout will be calculated.
                    </v-col>
                </v-row>
                <v-divider></v-divider><br/>
                <p>You can check properties within LGView</p>
                <p>Now lets think our XPluginView is a label, add some text in it and add width height calculation functions. Also get text from <code>android_text</code> 
                attribute.</p>
                <pre v-highlightjs><span class="objectivec">
//This funcion is used 
-(CGSize)GetStringSize
{
    if(!CGSizeEqualToSize(self.stringSize, CGSizeZero))
        return self.stringSize;
    
    NSString *text = self.android_text;
    if(text == nil || COMPARE(text, @""))
        text = @"R";

    return [text boundingRectWithSize:CGSizeMake(MAXFLOAT, MAXFLOAT) options:NSStringDrawingUsesLineFragmentOrigin attributes:@{NSFontAttributeName:font} context:nil].size;
}

-(int)GetContentW
{
    int l = [self GetStringSize].width + self.dPaddingLeft + self.dPaddingRight + self.insets.left + self.insets.right;
	if (l > [DisplayMetrics GetMasterView].frame.size.width)
		l = [DisplayMetrics GetMasterView].frame.size.width - self.dX;
	return l;
}

-(int)GetContentH
{
    CGSize textSize = [self GetStringSize];
    int th = textSize.height;
	NSMutableArray *texts = [self BuildLineBreaks:self.android_text];
    NSUInteger mult = texts.count;
    if(mult == 0)
        mult = 1;
    if(self.android_minLines != nil && [self.android_minLines intValue] > 0 && mult < [self.android_minLines intValue])
        mult = [self.android_minLines intValue];
        
	int h = (mult * th) + self.dPaddingTop + self.dPaddingBottom + self.insets.top + self.insets.bottom;
	return h;
}

-(UIView*)CreateComponent
{
	UILabelPadding *lab = [UILabelPadding new];
    lab.insets = self.insets;
	lab.frame = CGRectMake(self.dX, self.dY, self.dWidth, self.dHeight);
	return lab;
}

-(void) SetupComponent:(UIView *)view
{
    if([self._view isKindOfClass:[UILabelPadding class]])
    {
        UILabelPadding *lab = (UILabelPadding*)self._view;
        lab.lineBreakMode = NSLineBreakByTruncatingTail;
        lab.text = [[LGStringParser GetInstance] GetString:self.android_text];
        if(self.colorAccent != nil)
            lab.textColor = [[LGColorParser GetInstance] ParseColor:self.colorAccent];
        if(self.android_textColor != nil)
            lab.textColor = [[LGColorParser GetInstance] ParseColor:self.android_textColor];
        
        if(self.android_textColorHighlight != nil)
            lab.highlightedTextColor = [[LGColorParser GetInstance] ParseColor:self.android_textColorHighlight];
        
        if(self.android_textSize != nil)
            lab.font = [lab.font fontWithSize:[[LGDimensionParser GetInstance] GetDimension:self.android_textSize]];
        
        if(self.dGravity & GRAVITY_START)
            [lab setTextAlignment:NSTextAlignmentLeft];
        else if(self.dGravity & GRAVITY_END)
            [lab setTextAlignment:NSTextAlignmentRight];
        else if(self.dGravity & GRAVITY_CENTER)
            [lab setTextAlignment:NSTextAlignmentCenter];
        
        lab.insets = UIEdgeInsetsMake(lab.insets.left + self.dPaddingLeft, lab.insets.top + self.dPaddingTop, self.insets.bottom + self.dPaddingBottom, self.insets.right + self.dPaddingRight);
    }
    
    [super SetupComponent:view];
}
            </span></pre><br/>
            <p>All the variables that start with <code>d</code> like <code>dWidth</code> are calculated at <code>CreateComponent</code>. You will use this calculated view parameters to create 
            your view. After that on <code>SetupComponent</code> function, you setup your view with the attributes that fetched from layout xml. Native views that returned from <code>CreateComponent</code> 
            are stored in <code>self._view</code>. You can directly access to that variable to modify your native view.</p>
            <p>To parse xml attribute values or xml resources on iOS, there are some classes. You can see what classes are available from <router-link to="resourcesystem">Resource System</router-link>.</p>
            </template>
        </OSLangSelector>
        <NextPrevPage :prev="$t('contribution')" prevRoute="contribution" next=""></NextPrevPage>
    </v-container>
</template>

<script>
import OSLangSelector from '../components/OSLangSelector';
import NextPrevPage from '../components/NextPrevPage';

export default {
    name: "Plugins",
    components: {
        OSLangSelector,
        NextPrevPage
    },
    data: () => ({
        langos: "Lua-Android"
    })
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>