define(["require","underscore","common/component/list/model/ScalableListModel"],function(e){var t=e("underscore"),i=e("common/component/list/model/ScalableListModel"),n=i.extend({initialize:function(e){i.prototype.initialize.call(this,e),this.select(e.value,{silent:!0})},_addToSelection:function(){throw"Not implemented"},_removeFromSelection:function(){throw"Not implemented"},_clearSelection:function(){throw"Not implemented"},_selectionContains:function(){throw"Not implemented"},_getSelection:function(){throw"Not implemented"},_triggerSelectionChange:function(e){e&&e.silent||this.trigger("change"),this.trigger("selection:change")},_addRangeToSelection:function(e,t,i){for(var n=0;n<e.length;n++)this._addToSelection(e[n].value,n+t);this.trigger("selection:addRange",{start:t,end:i,selection:this.getSelection()})},_fetchAllDataAndModifySelection:function(e,t){return this.getData().done(function(i){for(var n=0;n<i.data.length;n++)e(i.data[n].value,n);t&&t()}).fail(this.fetchFailed),this},addValueToSelection:function(e,t){return this.selectionStartIndex=t,this._addToSelection(e,t),this.trigger("selection:add",{value:e,index:t})},addRangeToSelection:function(e,t){if("undefined"==typeof this.selectionStartIndex)return void this.addValueToSelection(e,t);if(this.selectionStartIndex!==t){var i=Math.min(this.selectionStartIndex,t),n=Math.max(this.selectionStartIndex,t);if(this.selectionStartIndex=t,i>=this.get("bufferStartIndex")&&n<=this.get("bufferEndIndex")){var o=Array.prototype.slice.call(this.get("items"),i-this.get("bufferStartIndex"),n-this.get("bufferStartIndex")+1);this._addRangeToSelection(o,i,n)}else{var l=this;this.getData({offset:i,limit:n-i+1}).done(function(e){l._addRangeToSelection(e.data,i,n)}).fail(this.fetchFailed)}}},removeValueFromSelection:function(e,t){this._removeFromSelection(e,t),this.trigger("selection:remove",{value:e,index:t})},toggleSelection:function(e,t){this.selectionContains(e,t)?this.removeValueFromSelection(e,t):this.addValueToSelection(e,t)},selectionContains:function(e,t){return this._selectionContains(e,t)},clearSelection:function(){return this._clearSelection(),this.trigger("selection:clear")},getSelection:function(){return this._getSelection()},select:function(){throw"Not implemented"},selectAll:function(){this._clearSelection();var e=this;this._fetchAllDataAndModifySelection(function(t,i){e._addToSelection(t,i)},t.bind(this._triggerSelectionChange,this))},invertSelection:function(){var e=this;this._fetchAllDataAndModifySelection(function(t,i){e._selectionContains(t,i)?e._removeFromSelection(t,i):e._addToSelection(t,i)},t.bind(this._triggerSelectionChange,this))}});return n});