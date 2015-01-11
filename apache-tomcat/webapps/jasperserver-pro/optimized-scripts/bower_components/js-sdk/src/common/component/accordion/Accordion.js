define(["require","underscore","backbone","jquery"],function(e){function t(e,t){var i=this;n.indexOf(this.panels,t)<0||(("toggle"===e||"open"===e)&&(i.allowMultiplePanelsOpen||n.each(this.panels,function(e){e!==t&&e.close()})),"toggle"===e?t.collapsed?t.open():t.close():t[e](),this.fit())}function i(e){if(e||(e={}),!e.container||!l(e.container).length)throw new Error("Accordion should have specified container");this.container=e.container,this.panels=e.panels||[],this.allowMultiplePanelsOpen=e.allowMultiplePanelsOpen||!1,l(this.container).css("overflow","hidden"),n.each(this.panels,function(e){e.$resizableEl&&this.listenTo(e,"resizeStart",n.bind(this.calcMaxHeight,this,e))},this)}var n=e("underscore"),o=e("backbone"),l=e("jquery");return i.prototype.toggle=function(e){t.call(this,"toggle",e)},i.prototype.expand=function(e){t.call(this,"open",e)},i.prototype.collapse=function(e){t.call(this,"close",e)},i.prototype.fit=function(){var e=[],t=[];n.each(this.panels,function(i){i.collapsed?e.push(i):t.push(i)});var i=0,o=l(this.container).height(),s=0,a=0;n.each(e,function(e){i+=e.$el.outerHeight(!0)}),s=o-i,n.each(t,function(e){e.fixedHeight&&(s-=e.$el.outerHeight(!0),a++)}),n.each(t,function(e){e.setHeight(e.fixedHeight?e.$el.outerHeight(!0):Math.floor(s/(t.length-a)))}),this.trigger("fit",this)},i.prototype.calcMaxHeight=function(e){var t=l(this.container).height(),i=this.panels[this.panels.indexOf(e)+1];n.each(this.panels,function(o){n.isEqual(e,o)||(t-=o.$el.find(">.header").outerHeight(!0),t-=n.isEqual(i,o)?o.collapsed?0:parseInt(o.$el.find(">.subcontainer").css("minHeight")):o.$el.outerHeight(!0))},this),e.$resizableEl.resizable("option","maxHeight",t)},n.extend(i.prototype,o.Events),i});