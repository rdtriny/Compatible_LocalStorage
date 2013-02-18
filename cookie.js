/*
 *	Cookie Module.
 *	We can use it sparately, or we can install it to LocalStorage Module.
 */
(function(window){
	var doc = window.document;
	var cookie = function(){
		this.init();
	};
	
	// cache keys and values, don't search document.cookie everytime where call getItem();
	cookie.prototype.maps = {};
	
	cookie.prototype.init = function(){
		var cookieArr = doc.cookie.split(";");
		var map;
		for(var i=0,len=cookieArr.length; i<len; i++){
			map = cookieArr[i].split("=");
			this.maps[map[0]] = map[1];
		}
	};	
	cookie.prototype.setItem = function(key, value, options){
		var ret = false;
		try{
			var k = encodeURIComponent(key);
			var v = encodeURIComponent(value);
			var expires = new Date();
			var obj = {};
			for(var i in options){
				obj[i] = options[i];
			}
			options = obj;
			if(options.expires && typeof options.expires === "number"){
				expires.setDate(expires.getDate() + options.expires);
			}else{
				// keep cookie in 30 days under default configuration.
				expires.setDate(expires.getDate() + 30);
			}
			var path = options.path ? options.path : "";
			var domain = options.domain  ? options.domain : '';
			var secure = options.secure  ? 'secure' : '';
			
			doc.cookie = [
					k, '=', v,
					'; expires=' + expires.toUTCString(),
					path    ? '; path=' + path : '',
					domain  ? '; domain=' + domain : '',
					secure  ? '; secure' : ''
				].join('');
			this.maps[key] = value;
			ret = true;
		}
		catch(e){
			throw e;
			ret = false;
		}
		return ret;
	};
	cookie.prototype.getItem = function(key){
		return this.maps[key];
	};
	cookie.prototype.removeItem = function(key){
		if(key in this.maps){
			var time = new Date(0);
			doc.cookie = encodeURIComponent(key)+"=null; expires="+ time.toUTCString();			
			delete this.maps[key];
		}
	};
	cookie.prototype.clear = function(){
		for(var key in this.maps){
			this.removeItem(key);
		}
	};
	cookie.prototype.collectAll = function(){
		return this.maps;
	};
	
	window.Cookie = cookie;
})(window, undefined);
