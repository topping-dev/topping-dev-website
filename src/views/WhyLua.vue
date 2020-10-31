<template>
    <v-container>
        <div class="text-h3">{{$t('why-lua')}}</div>
        <div style="font-size:medium; margin-bottom:40px; border-top:1px solid black;" class="nocontent">
        </div>

		<p>Lua is a powerful, efficient, lightweight, embeddable scripting language. It supports
			 procedural programming, object-oriented programming, functional programming, data-driven programming, and data description.</p>

		<p>Lua combines simple procedural syntax with powerful data description constructs based on associative arrays and extensible 
			semantics. Lua is dynamically typed, runs by interpreting bytecode with a register-based virtual machine, and has automatic 
			memory management with incremental garbage collection, making it ideal for configuration, scripting, and rapid prototyping.</p>

		<p>This properties of Lua makes it very easy to port it on different operating systems. Also it has very light footprint, so it
			 is fast and reliable.</p>

		<p>You can read more about lua at their site <a target="_blank" rel="noopener noreferrer" href="https://www.lua.org">lua.org</a>.</p>
        
    </v-container>
</template>

<script>
export default {
    name: "WhyLua"
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>