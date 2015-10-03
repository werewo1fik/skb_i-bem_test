modules.define('datasource', function(provide) {
	var dataSource = {
		supports_storage : function(){
			try {
				return 'localStorage' in window && window['localStorage'] !== null;
			} catch (e) {
				return false;
			}
		},
		getData : function (dataPath){
			if(!this.supports_storage()) return null;
			return localStorage.getItem(dataPath);
		},
		setData : function (dataPath,newValue){
			if(!supports_storage()) return false;
			localStorage.setItem(dataPath,newValue);
		}
	};
	provide(dataSource);
});