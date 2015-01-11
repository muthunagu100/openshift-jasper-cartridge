JRS.Import.ExtendedFormView=function(e,t,i,a,r,s,o){return a.View.extend({events:{"change #importOptions input[type='checkbox']":"setValue","change #importDataFile input[type='file']":"validateFile","click #importDataFile .checkBox label":"clickOnCheckbox","click #importButton":"performImport"},initialize:function(){i.bindAll(this),this.mainTemplateId="importMainTemplate",this.footerTemplateId="importFooterTemplate"},render:function(i){var a=s.createTemplate(this.mainTemplateId),r=s.createTemplate(this.footerTemplateId),n=a(this.model.attributes),l=r();return i&&i.container?(this.undelegateEvents(),this.$el=t(i.container),this.el=this.$el[0],this.$el.find(".body").append(n),this.$el.find(".footer").prepend(l),this.delegateEvents()):t(this.el).html(n+l),this.form=this.$el.find("form")[0],this.uploader=new o(this.form,this.setResponseData,e.configs.TIMEOUT),this},changeEnabledState:function(e,t){var i=e.parents(".checkBox").next();i.length&&i.first().find('input[type="checkbox"]').attr("disabled",t)},clickOnCheckbox:function(e){var i=t(e.target).next();i[0].disabled||(i[0].checked=!i[0].checked,i.trigger("change"))},setValue:function(e){var i=t(e.target),a=i[0].checked;this.model.set(i[0].id,a),this.changeEnabledState(i,!a)},validateFile:function(e){var i=t(e.target);/\.zip$/.test(i.val())?(this.$el.find("#importButton").attr("disabled",!1),this.valid=!0,i.parent().removeClass("error")):(this.$el.find("#importButton").attr("disabled",!0),i.parent().addClass("error"),this.valid=!1)},performImport:function(){this.isValid()&&(new(a.Model.extend({url:"rest_v2/import"}))).fetch({success:i.bind(function(){this.model.get("state").reset(),this.model.get("state").set({phase:r.INPROGRESS}),this.form.submit(),this.uploader.startTimeoutLookup(this.setResponseData)},this),error:this.model.defaultErrorDelegator})},setResponseData:function(t){t.errorCode&&(t.phase=r.FAILED,e.i18n[t.errorCode]&&(t.message=e.i18n[t.errorCode]));var i=this.model.get("state");i.reset(),i.set(t)},isValid:function(){return this.valid}})}(JRS.Import,jQuery,_,Backbone,jaspersoft.components.State,jaspersoft.components.templateEngine,jaspersoft.components.AjaxUploader);