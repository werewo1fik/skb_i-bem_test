modules.define('i-bem__dom',['BEMHTML','datasource','jquery','mustache'], function(provide, BEMHTML, datasource, jquery, mustache, DOM) {


DOM.decl('my-form',
    {
		//var formdata = null;
        onSetMod : {
			'js' :  {
				'inited' : function() {
					this.bindTo('click', function(e) {
						e.stopPropagation(); // останавливаем всплывание события
						this.buildForm();
					});
				}
			}
		},
		buildForm : function() {
			// форму строим только один раз
			if(this.params.opened) return false;
			if(!(this.params && this.params.order)) return false;
			var items = [];
			for(var order in this.params.order){
				var itemParams = this.params[this.params.order[order]];
				items.push(itemParams);
			}
			this._showFormByTemplate(this.domElem,items);
			this.params.opened = true;
		},
		_showFormByTemplate : function(domElem,items){
			jquery.get("templates/table_template.html").done(function(data,status,jqXHR){
				var template = "";
				if(jqXHR.statusText==="notmodified")
					template = jqXHR.responseText;
				else
					template = data;
				if(!template) return false;
				var TemplatesItems = [];
				for(var i in items){
					(function(i){
						var templateElement = {
							disable:items[i].editable?"":"disabled",
							inputType:items[i].inputtype,
							title:items[i].title,
							disabled:(items[i].editable?"":"disabled"),
							value:datasource.getData(items[i].datapath),
							checked:(items[i].checked?"checked":""),
							visible:items[i].visible,
							datapath:items[i].datapath,
							name:items[i].name,
							id:items[i].id
						};
						TemplatesItems.push(templateElement);
					})(i);
				}
				var html = mustache.to_html(template, {"rows":TemplatesItems});
				DOM.append(domElem,html);
			});
		},
	}
);

provide(DOM);

});