define(["require","exports","module","../BaseInputControlView","../../util/resizer","jquery","underscore","logger","mustache","bundle!all","../../util/inputControlHelpers","text!../../template/checkboxInputItemTemplate.htm","text!../../template/multiSelectCheckboxTemplate.htm"],function(e,t,i){var n=e("../BaseInputControlView"),l=e("../../util/resizer"),s=e("jquery"),o=e("underscore"),c=(e("logger").register(i),e("mustache")),a=e("bundle!all"),h=e("../../util/inputControlHelpers"),u=e("text!../../template/checkboxInputItemTemplate.htm"),r=e("text!../../template/multiSelectCheckboxTemplate.htm");return n.extend({template:r,renderStructure:function(){return this.$el=s(c.to_html(this.template||"",o.extend({selectAllMsg:a["button.select.all"],selectNoneMsg:a["button.select.none"],selectInverseMsg:a["button.select.inverse"]},this.model.toJSON()))),this.makeResizable(),this.updateOptionsSelection(),this},updateOptionsSelection:function(){var e=o.map(this.model.state.options.toJSON(),function(e){var t=o.clone(e);return t.readOnly=this.model.get("readOnly"),t.uuid=o.uniqueId(this.model.get("id")),t},this),t=this.$el.find("ul")[0];h.setInnerHtml(t,function(e){return c.to_html(u,e)},{data:e}),s(t).find("li").length<5&&this.$el[0].clientHeight<125?(this.$el.find(".sizer").addClass("hidden"),this.$el.find(".inputSet").removeClass("sizable").attr("style",!1)):this.resizable&&(this.$el.find(".sizer").removeClass("hidden"),this.$el.find(".inputSet").addClass("sizable"))},getSelection:function(){var e=this.$el.find(":checkbox").filter(":checked");return o.map(e,function(e){return s(e).val()})},bindCustomEventListeners:function(){var e=this;this.$el.on("change","input",o.bind(function(){var t=this.getSelection();setTimeout(function(){e.model.changeState(t)})},this)),this.$el.on("click","a",o.bind(function(e){e.preventDefault();var t=this.$el.find("input"),i=s(e.target)[0].name;"multiSelectAll"===i||"multiSelectNone"===i?o.each(t,function(e){e.checked="multiSelectAll"===i}):"multiSelectInverse"===i&&o.each(t,function(e){e.checked=!e.checked}),this.$el.find("input").change()},this)),this.model.state.options.on("reset",this.updateOptionsSelection,this),this.model.state.options.on("change:selected",this.updateOptionsSelection,this)},makeResizable:function(){this.resizable=!0;var e=this.$el.find("ul"),t=this.$el.find(".sizer");l.createSizer(e,t,{axis:"s"})},remove:function(){this.$el.off("change","input"),this.$el.off("click","a"),this.multiSelect&&this.multiSelect.remove(),this.model.state.options.off("reset",this.updateOptionsSelection,this),this.model.state.options.off("change:selected",this.updateOptionsSelection,this),n.prototype.remove.call(this)}})});