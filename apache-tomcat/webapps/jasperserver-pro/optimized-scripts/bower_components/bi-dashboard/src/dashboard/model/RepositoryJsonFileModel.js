define(["require","dashboard/model/RepositoryFileModel","dashboard/enum/repositoryFileTypes","base64","json3","underscore"],function(e){var o=e("dashboard/model/RepositoryFileModel"),r=e("dashboard/enum/repositoryFileTypes"),d=(e("base64"),e("json3"),e("underscore"));return o.extend({stringifyContent:!0,defaults:function(){return d.extend({},o.prototype.defaults,{type:r.JSON})}()})});