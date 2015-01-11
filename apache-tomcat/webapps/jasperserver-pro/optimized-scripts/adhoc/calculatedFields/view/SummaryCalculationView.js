define(["require","underscore","jquery","backbone","bundle!adhoc_messages","adhoc/calculatedFields/view/ExpressionEditorView","adhoc/calculatedFields/view/SimpleSelectListView","text!adhoc/calculatedFields/template/SummaryTabTemplate.htm"],function(e){var t=e("underscore"),a=e("jquery"),i=e("backbone"),s=e("bundle!adhoc_messages"),n=e("adhoc/calculatedFields/view/ExpressionEditorView"),r=e("adhoc/calculatedFields/view/SimpleSelectListView"),l=e("text!adhoc/calculatedFields/template/SummaryTabTemplate.htm");return i.View.extend({template:t.template(l),events:{"change .availableSummaries":"summaryFunctionsChange"},initialize:function(){this.customSummaryEditor=new n({assignedAttribute:"summaryExpression",model:this.model}),this.listenTo(this.model,"change:availableFields",this.renderWeightedOnFields),this.listenTo(this.model,"change:availableSummaryFunctions",this.renderAvailableSummaries),this.listenTo(this.model,"change:summaryFunction",this.updateSummaryFunction),this.listenTo(this.model,"change:summaryParameter",this.updateSummaryParameter),this.listenTo(this.model,"change:availableFields",this.updateSummaryParameter),this.listenTo(this.model,"invalid:summaryParameter",this.showSummaryParameterError)},summaryFunctionsChange:function(e){this.model.set("summaryFunction",a(e.target).val()),this.updateLayout()},render:function(){return this.$el.empty(),this.$el.html(this.template({i18n:s})),this.customSummaryEditor.setElement(".customSummaryEditor").render(),this},renderWeightedOnFields:function(){var e=new r({el:this.$el.find(".weightedOnFieldsList ul")}),a=this;this.listenTo(e,"item:click",function(e){a.model.set("summaryParameter",e)});var i=this.model.get("availableFields");if(i.length>0){var s=t.filter(i,function(e){return t.contains(["java.lang.Double","java.math.BigDecimal","java.lang.Long","java.lang.Integer","java.lang.Short","java.lang.Byte"],e.type)});e.render(t.map(s,function(e){return{name:e.id,label:e.label,tooltip:e.tooltip,nodeClass:e.expression?"calculated":"",iconClass:"DIMENSION"===e.kind?"field":"measure"}}).sortBy(function(e){return e.label}))}},renderAvailableSummaries:function(){var e=t.sortBy(this.model.get("availableSummaryFunctions"),function(e){return"None"===e?"AAA":e}),a=this.$(".availableSummaries").empty();t.each(e,function(e){a.append("<option value='"+e+"'>"+e+"</option>")}),a.val(this.model.get("summaryFunction")),this.updateLayout()},updateSummaryFunction:function(){this.renderAvailableSummaries()},updateSummaryParameter:function(){this.$("label.weightedOnInput.control").removeClass("error");var e=this.model.get("summaryParameter"),a=t.find(this.model.get("availableFields"),function(t){return t.id===e});a&&this.$(".weightedOnInput input").val(a.label)},showSummaryParameterError:function(e){var t=this.$(".weightedOnInput .message.warning"),a=e.errorCode?s[e.errorCode]:e.errorMessage;t.text(a?a:""),t.parent().addClass("error")},updateLayout:function(){var e=this.model.get("summaryFunction");"WeightedAverage"===e?(this.$(".weightedOnFieldsList").removeClass("hidden"),this.$(".customSummaryEditor").addClass("hidden")):"Custom"===e?(this.$(".weightedOnFieldsList").addClass("hidden"),this.$(".customSummaryEditor").removeClass("hidden")):(this.$(".weightedOnFieldsList").addClass("hidden"),this.$(".customSummaryEditor").addClass("hidden"))}})});