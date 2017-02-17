var app1 = new Vue({
	el:'#app1',
	data:{
		addressList:[],
		limitNumber:3,
		curIndex:0,
		shipingMethod:1
	},
	filters:{
		
	},
	mounted:function(){
		this.$nextTick(function(){
			this.getAddress();
		})
	},
	computed:{
		filterAddress:function(){
			return this.addressList.slice(0,this.limitNumber);
		}
	},
	
	methods:{
		getAddress:function(){
			this.$http.get("data/address.json").then(res=>{
				this.addressList = res.data.result;
			})
		},
		loadMore:function(){
			return this.limitNumber = this.addressList.length;
		},
		setDefault:function(item){
			this.addressList.forEach(function(value,index){
				if(value.addressId == item.addressId){
					value.isDefault = true;
				}else{
					value.isDefault = false;
				}
			})
		}
	}
})