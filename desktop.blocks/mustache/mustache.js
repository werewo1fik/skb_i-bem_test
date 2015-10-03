modules.define('mustache',['loader_type_js'],function(provide,loader){
	function doProvide(){
		provide(Mustache);
	}
	loader('mustache.js', doProvide);
});

modules.require('mustache',function(mustache){});