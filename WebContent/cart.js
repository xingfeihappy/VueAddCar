var vm = new Vue({
	el:'#app',
	data:{
		productList : [],
		totalMoney:0,
		checkAllFlag:false,
		totalPrice:0,
		delFlag:false,
		curProduct:''
	},
	filters:{
		//对数据进行格式化，全局和局部,一下是局部
		formatMoney:function(value){
			return "$"+value.toFixed(2);
		}
		
	},
	//以下两个函数类似于jq里面的window.onload
	/*ready:function(){

	},*/
	mounted:function(){
		//保证实例插入文档，使用nextTick()
		this.$nextTick(function(){
			this.cartView();
		})
		/**/
	},
	methods:{
		cartView:function(){
			var _this = this;
			//箭头函数
			//let _this = this;
			/*.then(res=>{
				这里面就可以直接使用this，不会存在作用域的问题，chrome可以支持es6
			})*/
			this.$http.get("data/cart.json",{"id":123}).then(function(res){
				_this.productList = res.body.result.productList;
				_this.totalMoney = res.body.result.totalMoney;
			})
		},
		//好处，不直接操作dom，而是操作对象
		changeMoney:function(product,way){
			if(way>0){
				product.productQuentity++;
			}else{
				product.productQuentity--;
				if(product.productQuentity < 1){
					product.productQuentity = 1;
				}
			}
			this.calculateTotalPrice();
		},
		//如果一个变量里面的对象不存在的话，该怎么办,单选
		selectedProduct:function(item){
			if(typeof item.checked == "undefined"){
				//判断是否存在，不存在的话，需要进行1.全局注册；2.局部注册：set  好让vue实例去监听
				//Vue.set(item,"checked",true);//全局注册
				this.$set(item,"checked",true);//局部注册
			}else{
				item.checked = !item.checked;
			}
			this.calculateTotalPrice();
		},
		//全选
		checkAll:function(flag){
			this.checkAllFlag = flag;
			var _this = this;
			this.productList.forEach(function(value,index){
				if(typeof value.checked == "undefined"){
					_this.$set(value,"checked",_this.checkAllFlag);//局部注册
				}else{
					value.checked = _this.checkAllFlag;
				}
			})
			this.calculateTotalPrice();
		},
		calculateTotalPrice:function(){
			this.totalPrice = 0;
			var _this = this;
			this.productList.forEach(function(value,index){
				if(value.checked){
					_this.totalPrice += value.productPrice * value.productQuentity;
				}
			})
		},
		delConfirm:function(item){
			this.delFlag = true;
			this.curProduct = item;
		},
		delProduct:function(){
			var index = this.productList.indexOf(this.curProduct);
			this.productList.splice(index,1);
			this.delFlag = false;
			//本应该使用this.http来删除的
		}
	}
})

//全局过滤器,提取到一个filter.js供全局使用
Vue.filter("money",function(value,type){
	return "$"+value.toFixed(2)+type
})