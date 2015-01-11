define(["require","bundle!adhoc_messages","adhoc/designer"],function(e){var a=e("bundle!adhoc_messages"),t=e("adhoc/designer");return t.addFieldToCanvas=function(){localContext.getMode()===designerBase.TABLE?AdHocTable.addFieldAsColumn():localContext.getMode()===designerBase.CROSSTAB?localContext.addFieldAsLastMeasure():localContext.getMode()===designerBase.CHART&&localContext.addFieldAsMeasure()},t.checkIfFieldIsNumeric=function(e){var a=t.findFieldByName(e);return null!=a&&"Numeric"==a.type},t.checkIfAllSelectedAreNumeric=function(){for(var e=null,a=null,l=0;l<selObjects.length;l++)if(a=selObjects[l],a&&(selectionCategory.area===designerBase.AVAILABLE_FIELDS_AREA?e=a.param.id:selectionCategory.area===designerBase.COLUMN_LEVEL&&(e=a.header.getAttribute("data-fieldName")),!t.checkIfFieldIsNumeric(e)))return!1;return!0},t.collectFields=function(e,a,t){for(var l=[],n=0;n<e.length;n++){var s=e[n];s.isParent()&&a?l=l.concat(this.collectFields(s.childs,a,t)):t?t(s.param.id)&&l.push(s.param.id):l.push(s.param.id)}return l},t.getAllFields=function(){return isNotNullORUndefined(localContext.state.allColumns)?localContext.state.allColumns:[]},t.findFieldByName=function(e){var a=null;return localContext.state.allColumns&&localContext.state.allColumns.each(function(t){if(t.name&&t.name==e)throw a=t,$break}),a},t.getNameForSelected=function(e){return selectionCategory.area===designerBase.AVAILABLE_FIELDS_AREA?e?e.param.id:"":e.chartMeasureId?e.chartMeasureId:selectionCategory.area===designerBase.COLUMN_LEVEL?e.header.getAttribute("data-fieldName"):selectionCategory.area===designerBase.GROUP_LEVEL?e.fieldName:selectionCategory.area===designerBase.ROW_GROUP_MENU_LEVEL||selectionCategory.area===designerBase.COLUMN_GROUP_MENU_LEVEL?e.name:selectionCategory.area===designerBase.SUMMARY_LEVEL?e.model.name:selectionCategory.area===designerBase.LEGEND_MENU_LEVEL?e.legendName:void 0},t.getFieldName=function(){var e=designerBase.getSelectedObject();return e?this.getNameForSelected(e):""},t.getFieldIndexByName=function(e){if(isNotNullORUndefined(localContext.state.allColumns))for(var a=localContext.state.allColumns.length,t=0;a>t;t++){var l=localContext.state.allColumns[t];if(l.name==e)return t}return-1},t.moveToDimensions=function(){if(selObjects.first()){var e=selObjects.clone();t.moveToMeasuresOrAttributes(e);var a=e.collect(function(e){return e.param.id}).join(",");t.changeFieldAttributeOrMeasure(a,"attribute")}},t.moveToMeasures=function(){if(selObjects.first()){var e=selObjects.clone();t.moveToMeasuresOrAttributes(e);var a=e.collect(function(e){return e.param.id}).join(",");t.changeFieldAttributeOrMeasure(a,"measures")}},t.selectFromAvailableFields=function(e,a){e||this.addSelectedObject(e,a,!1,!0);var t=this.isMultiSelect(e,designerBase.AVAILABLE_FIELDS_AREA);selectionCategory.area=designerBase.AVAILABLE_FIELDS_AREA;var l=this.isAlreadySelected(a);this.addSelectedObject(e,a,t,l),actionModel.setSelected(_.map(dynamicTree.trees[a.getTreeId()].selectedNodes,function(e){return e.param.extra}))},t.updateFieldsInUse=function(e){[].push.apply(localContext.state.fieldsInUse,e)},t.removeFromFieldsInUse=function(e){localContext.state.fieldsInUse&&(localContext.state.fieldsInUse=_.difference(localContext.state.fieldsInUse,e))},t.isInUse=function(e){var a=_.find(localContext.state.fieldsInUse,function(a){return a===e});return a||t.hasDependencyOnIt(e)},t.createCalculatedField=function(){adhocCalculatedFields.createField("DIMENSION")},t.createCalculatedMeasure=function(){adhocCalculatedFields.createField("MEASURE")},t.editCalculatedField=function(){adhocCalculatedFields.updateField()},t.deleteCalculatedField=function(){var e=designerBase.getSelectedObject(),t=new jaspersoft.components.ConfirmDialog;t.show({ok:adhocCalculatedFields.deleteField.bind(adhocCalculatedFields),messages:a.ADH_436_CALCULATED_FIELD_REMOVE_CONFIRM+" "+e.name.unescapeHTML()})},t.isPercentOfParentCalcSelected=function(e){return t.isAggregateSelected(e)},t.isAggregateSelected=function(e){if(e||(e=designerBase.getSelectedObject()),e){var a=t.getNameForSelected(e),l=t.findFieldByName(a);return l&&l.aggregateField}return!1},t.isPercentOfParentCalc=function(e){var a=t.findFieldByName(e);return a&&a.aggregateField},t.hasDependencyOnIt=function(e){var a=t.findFieldByName(e);return a&&a.isUsed},t.updateAllFieldLabels=function(){if(isDesignView){var e=t,a=[e.dimensionsTree,e.measuresTree];_.each(a,function(a){_.each(e.getAllLeaves(null,a),function(a){var t=e.findFieldByName(a.param.id);t&&t.isCustomField&&(a.name=t.defaultDisplayName.replace(/\\'/g,"'").escapeHTML(),a.param.label=t.defaultDisplayName.replace(/\\'/g,"'").escapeHTML(),a.param.cssClass=e.isInUse(a.param.id)?"calculatedField dependency":"calculatedField",a.refreshStyle())}),a.renderTree()})}},t});