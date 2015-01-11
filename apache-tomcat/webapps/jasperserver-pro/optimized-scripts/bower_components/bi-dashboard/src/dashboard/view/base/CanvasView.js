define(["require","exports","module","backbone","jquery","underscore","../../factory/dashboardComponentViewFactory","dashboard/dashboardSettings","dashboard/enum/dashboardComponentTypes","text!dashboard/template/canvasTemplate.htm","logger","bundle!DashboardBundle","css!dashboard/canvas.css"],function(e,t,n){var o=e("backbone"),i=e("jquery"),s=e("underscore"),a=e("../../factory/dashboardComponentViewFactory"),r=e("dashboard/dashboardSettings"),d=e("dashboard/enum/dashboardComponentTypes"),h=e("text!dashboard/template/canvasTemplate.htm"),c=e("logger").register(n),m=e("bundle!DashboardBundle");return e("css!dashboard/canvas.css"),o.View.extend({template:s.template(h),el:function(){return this.template({i18n:m})},initialize:function(e){e||(e={});var t=this;this.ready=new i.Deferred,this.componentViews=[],this.dashboardId=e.dashboardId,this.$canvasBody=this.$(" > .content > .body"),this.listenTo(this.model.foundations,"addComponent",function(e,n){n===t.model.currentFoundation&&t.addComponentView(e)}),this.listenTo(this.model.foundations,"removeComponent",function(e,n){n===t.model.currentFoundation&&t.removeComponentView(e)})},render:function(){if(this.model.currentFoundation){var e=this.model.currentFoundation.components.toHTML(!0),t=this;this.removeAllComponentViews(),this.disableAutoRefresh(),this.$canvasBody.html(e),e&&(this.hideMessage&&this.hideMessage(),this.model.currentFoundation.components.forEach(s.bind(this.addComponentView,this)),this.componentViews.length&&i.when.apply(i,s.pluck(this.componentViews,"ready")).then(function(){t.ready.resolve()}),this.enableAutoRefresh())}return this},removeComponentView:function(e){var t=this.getComponentViewByComponentId(e.id),n=s.indexOf(this.componentViews,t);t&&t.remove(),n>-1&&this.componentViews.splice(n,1),this.$canvasBody.find("["+r.COMPONENT_ID_ATTRIBUTE+"='"+e.id+"']").remove(),c.debug("removed dashlet "+e.id)},addComponentView:function(e){if(e.isVisible()&&!this.getComponentViewByComponentId(e.id)){var t=a({model:e,dashboardProperties:this.model.currentFoundation.components.getDashboardPropertiesComponent(),dashboardId:this.dashboardId},this.isDesigner);if(e.get("type")!==d.INPUT_CONTROL){var n=this.$canvasBody.find("["+r.COMPONENT_ID_ATTRIBUTE+"='"+e.id+"']");this.hideMessage&&this.hideMessage(),n.length||(n=i(e.toHTML(!0)),this.$canvasBody.append(n)),this.componentViews.push(t),n.html(t.render().$el),this.listenTo(t,"maximize",s.bind(this.maximizeDashlet,this,t)),c.debug("added dashlet "+e.id)}else{var o=e.getParent(),h=this.getComponentViewByComponentId(o.id);h||(this.addComponentView(o),h=this.getComponentViewByComponentId(o.id)),h.component.componentViews=this.componentViews,this.componentViews.push(t);var m,l=e.get("position"),u=o.getChildren(),p=9999999;s.each(u,function(e){l>e.get("position")&&p>l-e.get("position")&&(p=l-e.get("position"),m=e)}),m?this.getComponentViewByComponentId(m.get("id")).$el.after(t.render().$el):h.$content.prepend(t.render().$el),h._resizeComponent(),h.refreshFilterGroup(),c.debug("added input control "+e.id)}}return t},removeAllComponentViews:function(e){s.invoke(this.componentViews,"remove",e),this.componentViews=[]},refresh:function(){var e=this.componentViews.filter(function(e){return s.isFunction(e.refresh)}),t=new i.Deferred;return this.ready.then(function(){i.when.apply(i,s.invoke(e||[],"refresh")).then(t.resolve,t.reject)},t.reject),t},cancel:function(){var e=this.componentViews.filter(function(e){return s.isFunction(e.refresh)&&s.isFunction(e.cancel)}),t=new i.Deferred;return this.ready.then(function(){i.when.apply(i,s.invoke(e||[],"cancel")).then(t.resolve,t.reject)},t.reject),t},remove:function(e){this.disableAutoRefresh(),this.removeAllComponentViews(e),o.View.prototype.remove.apply(this,arguments)},getComponentViewByComponentId:function(e){return s.find(this.componentViews,function(t){return t.model.id===e})},maximizeDashlet:function(e){var t,n="maximized",o=e.render().$el;if(this.isDashletMaximized){var a=this.$canvasBody.find("."+n);a.html(o).removeClass(n),this.$canvasBody.find(".canvasOverlay").remove(),this.isDashletMaximized=!1}else e.$el.parent().addClass(n),t=i("<div/>",{"class":"canvasOverlay"}),e.toolbar.getOptionView("maximize").$el.addClass(r.DASHLET_TOOLBAR_MINIMIZE_BUTTON_CLASS).prop("title",m["dashboard.canvas.dashlet.minimize"]),t.html(o),this.$canvasBody.append(t),this.isDashletMaximized=!0;s.delay(s.bind(e.resize,e),3)},enableAutoRefresh:function(){function e(e,t){var n=1e3;return"minute"===t&&(n*=60),e*n}function t(o,i){o.ready.done(function(){n._autoRefreshEnabled&&s.isFunction(o.refresh)&&i.get("autoRefresh")&&setTimeout(function(){n._autoRefreshEnabled&&s.isFunction(o.refresh)&&i.get("autoRefresh")&&o.refresh().always(function(){t.call(n,o,i)})},e(i.get("refreshInterval"),i.get("refreshIntervalUnit")))})}var n=this;this.model.currentFoundation.components.forEach(function(e){if(e.isAutoRefreshable()&&e.get("autoRefresh")){n._autoRefreshEnabled=!0;var o=e.get("type")===d.DASHBOARD_PROPERTIES?n:n.getComponentViewByComponentId(e.id);s.isFunction(o.refresh)&&t.call(n,o,e)}})},disableAutoRefresh:function(){this._autoRefreshEnabled=!1}})});