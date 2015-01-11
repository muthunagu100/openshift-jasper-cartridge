define(["require","dataSource/model/BaseDataSourceModel","dataSource/collection/SubDataSourceCollection","common/enum/repositoryResourceTypes","underscore","bundle!jasperserver_messages"],function(e){var t=e("dataSource/model/BaseDataSourceModel"),a=e("dataSource/collection/SubDataSourceCollection"),r=e("common/enum/repositoryResourceTypes"),o=e("underscore"),s=e("bundle!jasperserver_messages");return t.extend({type:r.VIRTUAL_DATA_SOURCE,defaults:function(){var e={};return o.extend(e,t.prototype.defaults,{subDataSources:[]}),e}(),validation:function(){var e={};return o.extend(e,t.prototype.validation,{subDataSources:[{arrayMinLength:1,msg:s["ReportDataSourceValidator.error.sub.datasources.needed"]},{fn:function(e){var t=o.map(e,function(e){return e.id.toLowerCase()}),a={},r=[];o.each(t,function(e){e in a?a[e]++:a[e]=1});for(var u in a)a[u]>1&&r.push(u);return r.length>0?s["ReportDataSourceValidator.error.sub.datasources.id.duplicates"].replace("{0}",r.join(", ")):void 0}},{fn:function(){for(var e=null,t=0;t<this.subDataSources.models.length;t++)this.subDataSources.models[t].isValid(!0)||(e=!0);return e}}]}),e}(),initialize:function(e,r){t.prototype.initialize.apply(this,arguments),this.subDataSources=new a(this.get("subDataSources")),this.listenTo(this.subDataSources,"change reset",this.updateSubDataSourcesArray),r.dependentResources&&r.dependentResources.length>0&&this.subDataSources.forEach(function(e){e.set("readOnly",!0)})},updateSubDataSourcesArray:function(){this.set("subDataSources",this.subDataSources.toJSON())}})});