JRS.Import.FormModel=function(e,t,n,s,i){return n.Model.extend(s).extend({defaults:{update:!0,skipUserUpdate:!1,includeAccessEvents:!0,includeAuditEvents:!0,includeMonitoringEvents:!0,state:i.instance({urlTemplate:"rest_v2/import/{id}/state"})},initialize:function(){t.bindAll(this)}})}(jQuery,_,Backbone,jaspersoft.components.ServerErrorsBackboneTrait,jaspersoft.components.State);