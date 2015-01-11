define(["require","exports","module","./DashboardComponentModel","common/validation/ValidationErrorMessage","../../collection/ReportsParametersCollection","bundle!DashboardBundle","jquery","underscore"],function(e){function t(e,t){var n={signals:[e.getOwnerParameterName()],slots:{}};return u.each(t,function(t){n.slots[t]=function(t){return function(n,r){e.trigger("signal",{name:t,value:n},r)}}(t)}),n}function n(e){return e.isValue?[e.get("value")]:e.options.reduce(function(e,t){return t.get("selected")&&e.push(t.get("value")),e},[])}function r(e){return e.options?u.reduce(e.options,function(e,t){return t.selected&&e.push(t.value),e},[]):[e.value]}var i=e("./DashboardComponentModel"),o=e("common/validation/ValidationErrorMessage"),a=e("../../collection/ReportsParametersCollection").instance,s=e("bundle!DashboardBundle"),l=e("jquery"),u=e("underscore");return i.extend({componentName:s["dashboard.component.input.control.component.name"],defaults:u.extend({},i.prototype.defaults,{label:void 0}),validation:u.extend({},i.prototype.validation,{label:[{required:!0,msg:new o("dashboard.component.error.filter.label.required")}]}),initialize:function(){i.prototype.initialize.apply(this,arguments),this.on("change:value",this.notify,this),this.componentInitializedDfd=new l.Deferred},isVisible:function(){return this.resource.resource.get("visible")},getOwnerUri:function(){return this.collection.findWhere({resource:this.get("ownerResourceId")}).resource.resource.get("uri")},getOwnerParameterName:function(){return this.get("ownerResourceParameterName")},notify:function(e){this.trigger(this.getOwnerParameterName(),e instanceof i?this.get("value"):n(e)),this.get("parentId")&&this.collection.get(this.get("parentId")).notify()},acceptWiringVisitor:function(e){var n=this;e.register(this,t(this,this.get("masterDependencies"))),u.isUndefined(this.get("value"))?a.getInputControlAsParameter(this.getOwnerUri(),this.getOwnerParameterName(),{full:this.get("fullCollectionRequired")}).done(function(e){n.trigger(n.getOwnerParameterName(),r(e.state)),n.componentInitializedDfd.resolve()}):(this.trigger(this.getOwnerParameterName(),this.get("value")),this.componentInitializedDfd.resolve())}})});