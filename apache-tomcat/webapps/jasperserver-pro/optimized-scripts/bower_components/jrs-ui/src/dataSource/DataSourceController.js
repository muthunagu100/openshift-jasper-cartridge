define(["require","backbone","underscore","jquery","bundle!all","dataSource/model/BaseDataSourceModel","touchcontroller","common/util/featureDetection","common/util/historyHelper","dataSource/factory/dataSourceViewFactory","dataSource/enum/dataSourceResourceTypes","dataSource/factory/saveDialogViewFactory","text!dataSource/template/dataSourceMainTemplate.htm","jrs.configs","dataSource/collection/CustomDataSourceCollection","settings!awsSettings","dataSource/util/settingsUtility"],function(e){var t=e("backbone"),o=e("underscore"),a=e("jquery"),r=e("bundle!all"),i=e("dataSource/model/BaseDataSourceModel"),s=e("touchcontroller"),n=e("common/util/featureDetection"),c=e("common/util/historyHelper"),d=e("dataSource/factory/dataSourceViewFactory"),u=e("dataSource/enum/dataSourceResourceTypes"),l=e("dataSource/factory/saveDialogViewFactory"),h=e("text!dataSource/template/dataSourceMainTemplate.htm"),S=e("jrs.configs"),p=e("dataSource/collection/CustomDataSourceCollection"),f=e("settings!awsSettings"),v=e("dataSource/util/settingsUtility");return t.View.extend({dataSourceType:!1,dataSourceView:!1,saveDialog:!1,events:{"change select[name='dataSourceType']":"onDataSourceTypeChange","click #saveBtn":"onSaveClick","click #cancelBtn":"onCancelClick"},historyBackToken:"DataSourceControllerHistory",constructor:function(e){e=a.extend(!0,{},e),arguments[0]=e,this.isEditMode=e.isEditMode,t.View.apply(this,arguments)},initialize:function(e){this.options=e,this.dataSourceType=void 0,n.supportsTouch&&this.initSwipeScroll(),c.saveReferrer(this.historyBackToken),this.fetchingCustomDataSourcesDeferred=a.Deferred(),this.fetchingTheModelDeferred=a.Deferred(),this.customDataSourceCollection=new p,this.customDataSourceCollection.fetch().done(o.bind(function(){this.renderDataSourceContainer()},this));var t=v.deepDefaults(e,{awsSettings:f});if(this.options.resourceUri){var r=this,s=new i({uri:this.options.resourceUri});s.fetch().then(function(e,t,o){r.dataSource=s.attributes,r.dataSourceType=d.getViewType(o.getResponseHeader("Content-Type"),r.dataSource),r.fetchingTheModelDeferred.resolve()})}else this.options.dataSource&&this.options.dataSourceClientType?(this.dataSource=this.options.dataSource,this.dataSourceType=d.getViewType(this.options.dataSourceClientType,this.options.dataSource),this.fetchingTheModelDeferred.resolve()):(t.awsSettings.productTypeIsEc2&&(this.dataSourceType=d.getViewType(u.AWS,null)),this.fetchingTheModelDeferred.resolve())},renderDataSourceContainer:function(){var e={AWS:"Aws",BEAN:"Bean",JDBC:"JDBC",JNDI:"JNDI",VIRTUAL:"Virtual"},t=o.chain(e).map(function(e,t){return{value:u[t].toLowerCase(),label:r["resource.dataSource.dstype"+e]}}).value();this.customDataSourceCollection.forEach(function(e){var o=e.get("id");o in{xlsDataSource:1,xlsxDataSource:1,textDataSource:1}||t.push({value:o,label:r[o+".name"]?r[o+".name"]:o})}),t=o.sortBy(t,function(e){return e.label.toLowerCase()}),this.$el.append(o.template(h,{dataSourceTypeOptions:t,i18n:r,supportsTouch:n.supportsTouch,isEditMode:this.isEditMode})),this.fetchingCustomDataSourcesDeferred.resolve()},initSwipeScroll:function(){var e=this.$("#stepDisplay");e.length&&new s(e.parent()[0],e.parent().parent()[0],{})},render:function(){a.when(this.fetchingCustomDataSourcesDeferred,this.fetchingTheModelDeferred).done(o.bind(function(){this._render()},this))},_render:function(){var e={};return this.dataSourceView&&(e={label:this.dataSourceView.model.get("label"),name:this.dataSourceView.model.get("name"),description:this.dataSourceView.model.get("description")}),this.dataSourceView&&this.dataSourceView.remove(),delete this.dataSourceView,0===this.$(".row.inputs .body:eq(0)").length&&this.$(".row.inputs > .column > .content").append("<div class='body dataSourceBody'></div>"),this.dataSourceType||(this.dataSourceType=u.JDBC.toLowerCase()),this.dataSourceView=d.getView(o.extend(this.options,{dataSourceType:this.dataSourceType,dataSource:o.extend({},this.dataSource,e),el:this.$(".row.inputs .body:eq(0)")})),this.$(".dataSourceBody").attr("dstype",this.dataSourceType.toLowerCase()),this.$("select[name='dataSourceType']").val(this.dataSourceType),this},onDataSourceTypeChange:function(e){var t=a(e.target).val();this.dataSourceType!=t&&(this.dataSourceType=t,this.render())},_prepareSaveDialog:function(){this.saveDialog&&this.saveDialog.remove();var e=l.getView(this.dataSourceType);this.saveDialog=new e(o.extend({},this.options,{model:this.dataSourceView.model,saveFn:this.options.saveFn,success:o.bind(this._onSaveDone,this),error:o.bind(this._onSaveFail,this)}))},onSaveClick:function(){if(this.dataSourceView.model.isValid(!0)){var e=this,t=function(){e._prepareSaveDialog(),e.saveDialog.startSaveDialog()};return o.isUndefined(this.dataSourceView.model.validationMethodOnSaveClick)?void t():void this.dataSourceView.model.validationMethodOnSaveClick(t)}},_onSaveDone:function(){redirectToUrl(S.contextPath+"/flow.html?_flowId=repositoryConfirmFlow&resourceType=dataSource")},_onSaveFail:function(e,t){var o,a=!1;try{a=JSON.parse(t.responseText)}catch(i){}return"version.not.match"===a.errorCode?void this.dataSourceView.fieldIsInvalid(this.dataSourceView,"name",r["resource.dataSource.resource.exists"],"name"):"folder.not.found"===a.errorCode?void this.dataSourceView.fieldIsInvalid(this.dataSourceView,"parentFolderUri",r["ReportDataSourceValidator.error.folder.not.found"].replace("{0}",a.parameters[0]),"name"):"access.denied"===a.errorCode?void this.dataSourceView.fieldIsInvalid(this.dataSourceView,"parentFolderUri",r["jsp.accessDenied.errorMsg"],"name"):(o="Failed to save data source.",a[0]&&a[0].errorCode?o+="<br/>The reason is: "+a[0].errorCode:a.message&&(o+="<br/>The reason is: "+a.message),o+="<br/><br/>The full response from the server is: "+t.responseText,void dialogs.errorPopup.show(o))},onCancelClick:function(){this.options.cancelFn?this.options.cancelFn():c.restore(this.historyBackToken)}})});