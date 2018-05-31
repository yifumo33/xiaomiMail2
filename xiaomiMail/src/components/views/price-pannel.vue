<template>
	<div class="price-pannel">
		<dt>PRICE</dt>
		<dd>All</dd>
		<dd v-for="item in priceFilter">
			{{item.startPrice}}-{{item.endPrice}}
		</dd>
		

	</div>	
</template>

<script>
	export default{
		props:[
		"priceFilter"
		]
	}
</script>