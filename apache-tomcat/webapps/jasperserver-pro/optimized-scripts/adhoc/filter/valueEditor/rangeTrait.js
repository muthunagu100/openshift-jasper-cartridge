define(["require","jquery","underscore","adhoc/filter/validation/ValidationError"],function(e){var r=e("jquery"),i=e("underscore"),t=e("adhoc/filter/validation/ValidationError");return{onChange:function(){var e=this.$(this.inputSelector),i=e.map(function(){return r(this).val()}).get(),t=this.convert(i);this.setValue(t)},convert:function(e){var r=this;return i.map(e,function(e){return r.valueConverter?r.valueConverter(e):e})},getValue:function(e){var r=this.model.get("value");return i.isNumber(e)?r[e]:r},validCallback:function(e,r,i){e.markAllFieldsAsValid(r,i)},invalidCallback:function(e,r,n,a){e.markAllFieldsAsValid(r,a),i.isArray(n)||(n=[n]),i.each(n,function(i){e.markSingleFieldAsInvalid(i instanceof t?i.getAttr():r,i,a)})},markAllFieldsAsValid:function(e,r){this.$("["+r+"]").text("").parent().removeClass("error")}}});