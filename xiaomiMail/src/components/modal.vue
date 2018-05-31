<template>
	
	<div class="modal">
		<div class="msg">
			<slot name="message"></slot>
		</div>
		<div class="action">
			<slot name="btn1"></slot>
			<slot name="btn2"></slot>	

		</div>
	</div>
</template>

<style>
	.modal{
		position:fixed;
		background:white;
		z-index:1000; 
		left:50%;
		top:50%;
	 	width:300px;
		height:200px;
		margin:0 auto;
		border:1px solid red; 
		padding:10px 20px;
		transform:translate(-50%,-50%);
		transition: 0.5s all;
	}

	.modal .msg{
		padding:20px; 
		display:flex;
		justify-content:center;
		align-items: center;
		color:red;
		font-size:18px;
		text-align: center; 
	}
	.modal .action{
		margin-top:50px;
		display: flex;
		width:100%;
		justify-content:space-around;
	}
	.modal .action a{
		line-height:30px;
		width:40%;
		border:1px solid red;
		display:flex;
		justify-content: center;
		align-items: center;
		color:white;
		background:red;
	}
	
</style>


<script>
	
</script>