<template>
    <div>
        <v-divider></v-divider>
        <div style="font-size:medium; margin-bottom:40px; border-top:1px solid black;padding-top:0.7em;" class="nocontent">
            <div v-if="prev != ''" style="float:left;">← <router-link :to="prevRoute" style="text-decoration: none;">{{prev}}</router-link></div>
            <div v-if="next != ''" style="float:right;"><router-link :to="nextRoute" style="text-decoration: none;">{{next}}</router-link> →</div>
        </div>
        <v-divider></v-divider>
    </div>
</template>

<script>
export default {
    name: "NextPrevPage",
    props: [
        'prev',
        'next',
        'prevRoute',
        'nextRoute'
    ]
}
</script>