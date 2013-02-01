Compatibility_LocalStorage
==========================

## Brief Introduce ##
1.	Make localStorage support almost all browsers, including low version IE.

## Main Functions ##
1.	`getItem(key)`
	* fetch a storage data with a specific key.
2.  `setItem(key, value)`
	* Persist a storage . 
3.	`removeItem(key)`
	* Remove a storage whose key is the argument.
4.	`clear()`
	* Remove all the storages.
5.	`collectAll()`
	* Collect All the storage data, and wrap them with a javascript object.
	* note: the return object is read only. Changes made on it may not affect the storage datas.
6.	`install(module)`
	* An API should be private, but maybe it will be used sometime later as public, so I left it public.
	
## Another Notice ##
1.	cookie.js is a seperately module, which you can fork and use it without my storage data idea. It's independent from localStorage.js, like:
	
		Cookie.setItem(key, value);
		Cookie.getItem(key);
		Cookie.removeItem(key);
		Cookie.clear();
		Cookie.collectAll(); // collect all the cookie datas.
		
	