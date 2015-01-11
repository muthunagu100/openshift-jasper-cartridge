define(["require","underscore","jquery","backbone","common/bi/component/BiComponent","common/bi/component/util/biComponentUtil","common/bi/error/biComponentErrorFactory","common/transport/request","json3","text!./schema/ResourcesSearch.json"],function(e){function r(e,r){var t=this.validate(),n=this;t?e.reject(c.validationError(t)):s({dataType:"json",url:o(r)}).done(function(o){r.data=o?o.resourceLookup:[],e.resolve(n.data())}).fail(function(r){e.reject(c.requestError(r))})}function o(e){var r=e.properties.server,o=r+("/"===r.charAt(r.length-1)?"rest_v2/resources?":"/rest_v2/resources?");return o+t(e.properties).keys().reduce(function(r,o){var n=b[o];return n&&(t.isArray(e.properties[o])?r=r.concat(t.reduce(e.properties[o],function(e,r){return e.push(n+"="+r),e},[])):r.push(n+"="+e.properties[o])),r},[]).join("&")}var t=e("underscore"),n=(e("jquery"),e("backbone")),a=e("common/bi/component/BiComponent"),i=e("common/bi/component/util/biComponentUtil"),c=e("common/bi/error/biComponentErrorFactory"),s=e("common/transport/request"),u=e("json3"),p=u.parse(e("text!./schema/ResourcesSearch.json")),d=t.keys(p.properties),m=["properties"],l=["data"],b=function(){var e=t.reduce(d,function(e,r){return e[r]=r,e},{});return e.server=!1,e.types="type",e}(),y=function(e){var o={properties:t.extend({},e),data:[]},a=new n.Model;i.createInstancePropertiesAndFields(this,o,d,m,l,a),t.extend(this,{validate:i.createValidateAction(o,p,a),run:i.createDeferredAction(r,a,o)})};return y.prototype=new a,t.extend(y,{types:["folder","dataType","jdbcDataSource","awsDataSource","jndiJdbcDataSource","virtualDataSource","customDataSource","beanDataSource","xmlaConnection","listOfValues","file","reportOptions","dashboard","adhocDataView","query","olapUnit","reportUnit","domainTopic","semanticLayerDataSource","secureMondrianConnection","mondrianXmlaDefinition","mondrianConnection","inputControl"],sortBy:["uri","label","description","type","creationDate","updateDate","accessTime","popularity"],accessTypes:["viewed","modified"]}),y});