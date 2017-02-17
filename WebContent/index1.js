var app = new Vue({
	el:'#app',
	data:{
		productList:[],
		delFlag:false,
		curProduct:'',
		checked:false,
		checkAllFlag:false,
		totalPrice:0
		
	},
	filters:{
		forMartMoney:function(value){
			return "￥" +value.toFixed(2);
		}
	},
	mounted:function(){
		this.$nextTick(function(){
			this.getCartView();
		})
	},
	methods:{
		getCartView:function(){
			this.$http.get("data/cart.json").then(res=>{
				this.productList = res.body.result.productList;
			})
		},
		changeMoney:function(item,type){
			if(type > 0){
				item.productQuentity++;
			}else{
				item.productQuentity--;
				if(item.productQuentity < 1){
					item.productQuentity = 1;
				}
			}
			this.calculateTotal();
		},
		delItem:function(item){
			this.delFlag = true;
			this.curProduct = item;
		},
		delConfirm:function(){
			var index = this.productList.indexOf(this.curProduct);
			this.productList.splice(index,1);
			this.delFlag = false;
		},
		selectProduct:function(item){
			if(typeof item.checked == "undefined"){
				this.$set(item,"checked",true);
			}else{
				item.checked = !item.checked;
			}
			this.calculateTotal();
		},
		checkAll:function(type){
			this.checkAllFlag = type;
			var _this = this;
			this.productList.forEach(function(value,index){
				if(typeof value.checked == "undefined"){
					_this.$set(value,"chekced",_this.checkAllFlag);
				}else{
					value.checked = _this.checkAllFlag;
				}
			})
			this.calculateTotal();
		},
		calculateTotal:function(){
			this.totalPrice = 0;
			var _this = this;
			this.productList.forEach(function(value,index){
				if(value.checked){
					_this.totalPrice += value.productPrice * value.productQuentity;
				}
			})
		}
	}
})