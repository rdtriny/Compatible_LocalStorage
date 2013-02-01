(function(window){
	
	var doc = window.document;
	
	function ls(){
		if(isSupport()){
			this.storage = window.localStorage;
		}
		else{
			if(components.cookie){
				this.storage = new components.cookie();
			}
		}
	}
	
	// flag to determine whether is native localStorage or localStorage defined by us.
	ls.prototype.isLS = true;
	
	var components = {};
	
	/*
	 *	Private Method
	 *	Determine whether the browser support localStorage API or not.
	 */
	var isSupport = function(){
		return !!window.localStorage;
	}
	
	/*
	 *	Private Method
	 *	log some information.
	 */
	var log = function(msg){
		if(window.console && window.console.log && typeof window.console.log === "function"){
			console.log(msg);
		}
	}
	
	/*
	 *	Public method
	 *	clear all the storage Data.
	 */
	ls.prototype.clear = function(){
		this.storage.clear();
	}
	
	/*
	 *	Public method
	 *	Get a storage data with key.
	 */	
	ls.prototype.getItem = function(key){
		return this.storage.getItem(key);
	}
	
	/*
	 *	Public method
	 *	set a storage data, you shall provide two arguments: key and value.
	 */
	ls.prototype.setItem = function(key, value){
		if(key in this.collectAll()){
			log("key exists, overrided it");
		}		
		this.storage.setItem(key, value);
		return true;
	}
	
	/*
	 *	Public method
	 *	Remove a specific storage data, you shall provide an arguments: key.
	 */
	ls.prototype.removeItem = function(key){
		if(key in this.collectAll()){
			this.storage.removeItem(key);
			return true;
		}
		else{
			log("Key: \'"+key+"\' doesn't exist.");
			return false;
		}
	}
	
	/*
	 *	Public method
	 *	Get storage data with index (0,1,2,3) not string keys any more.
	 */
	ls.prototype.key = function(index){
		var array = [];
		for( var key in this.collectAll()){
			array.push(key);
		}
		var sorted = array.sort(function(a, b){return a>b;});
		return this.getItem(sorted[index]);
	}
	
	/*
	 *	Public method. (mind: the result is "Read Only")
	 *	Collect all the storage data, modifing the return result doesn't affect 
	 *	storage datas.
	 */
	ls.prototype.collectAll = function(){
		var map = {};
		if(isSupport()){
			for(var i in this.storage){
				map[i] = this.storage[i];
			}
		}else{
			for(var i in this.storage.collectAll()){
				map[i] = this.storage.getItem(i);
			}
		}
		return map;
	}
	
	/*
	 *	Public method
	 *	Install other components, for now we have only one component: Cookie  (a global variable).
	 */
	// install new components , like cookie module.
	ls.install = function(name, module){
		components[name] = module;
	}
	ls.install("cookie", Cookie);
	window.LocalStorage = ls;
})(window, undefined);