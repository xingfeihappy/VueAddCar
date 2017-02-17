var vm = new Vue({
	el:'#app1',
	data:{
		limitNumber:3,
		addressList:[],
		currentIndex:0,
		shippingMethod:1
	},
	filters:{
		//对数据进行格式化，全局和局部,一下是局部
	},
	//以下两个函数类似于jq里面的window.onload
	/*ready:function(){
	},*/
	mounted:function(){
		//保证实例插入文档，使用nextTick()
		this.$nextTick(function(){
			this.getAddressList();
		});
		/**/
	},
	//这个方法用于实时计算，显示3条
	computed:{
		filterAddress:function(){
			return this.addressList.slice(0,this.limitNumber);
		}
	},
	methods:{
		getAddressList:function(){
			var _this = this;
			this.$http.get("data/address.json").then(response=>{
				var res = response.data;
				if(res.status == "1"){
					_this.addressList = res.result;
				}
			})
		},
		loadMore:function(){
			this.limitNumber = this.addressList.length;
		},
		setDefault:function(itemId){
			this.addressList.forEach(function(value,index){
				if(value.addressId==itemId){
					value.isDefault = true;
				}else{
					value.isDefault = false;
				}
			})
		}
	}
})
