function SelectedFormula(){this.reset()}function SelectionCategory(){this.area="",this.reset=function(){this.area=""}}function showMessageDialog(e,a){alert(e+"\n"+a)}function getSessionExpireTime(){return function(){var e,a=new Date,t=a.getHours()%12;0==t&&(t=12);var r=a.getMinutes()+(MILL_PER_MIN>delayBeforeSessionTimeoutWarning?1:MIN_WARN_BEFORE_TIMEOUT);return e=10>r||r>59?"0"+r%60:r," "+t+":"+e}()}var theBody,fieldsTable,savePanel,canRunAndSave,nullStateValue="_null",multiSelect=!1,saveOldLabel="",saveOldFolder="",flowExecutionKey,notificationButton,notification,saveAsTree,editor,windowPopUp,controllerMap={ta:"/adhoc/table.html",cr:"/adhoc/crosstab.html",ch:"/adhoc/chart.html",ich:"/adhoc/intelligentChart.html",da:"/dashboard/dashboard.html",st:"/adhoc/status.html",co:"/adhoc/table.html","":"/adhoc/table.html?"},clientKey,cancelQueryTimer;SelectedFormula.prototype.reset=function(){this.formulaId=null,this.constant=null,this.isEdited=!1,this.isSwapped=!1,this.isChanged=!1};var selectedFormula=new SelectedFormula,selectionCategory=new SelectionCategory,selObjects=[],timeoutValue=null,TIMEOUT_INTERVAL=null,delayBeforeSessionTimeoutWarning,MILL_PER_MIN=6e4,MIN_WARN_BEFORE_TIMEOUT=2,ADHOC_SESSION_TIMEOUT_MESSAGE=null,ADHOC_EXIT_MESSAGE=null,DASHBOARD_SESSION_TIMEOUT_MESSAGE=null,DASHBOARD_EXIT_MESSAGE=null,designerBase={AVAILABLE_FIELDS_AREA:"af",DASHBOARD_SPECIAL_CONTENT_TREE_AREA:"dsc",DASHBOARD_REPO_TREE_AREA:"drp",CROSSTAB_SELECT_AREA:"cr",TABLE_SELECT_AREA:"tb",CHART_SELECT_AREA:"ch",TITLE_SELECT_AREA:"co",CHART_LEGEND_AREA:"clg",REPORT_MENU_LEVEL:"reportLevel",FIELD_MENU_LEVEL:"fieldLevel",FIELDSET_MENU_LEVEL:"fieldSetLevel",COLUMN_LEVEL:"columnLevel",GROUP_LEVEL:"groupLevel",CHART_LEVEL:"chartLevel",SUMMARY_LEVEL:"summaryLevel",COLUMN_GROUP_MENU_LEVEL:"columnGroupLevel",ROW_GROUP_MENU_LEVEL:"rowGroupLevel",MEASURE_MENU_LEVEL:"measureLevel",LEGEND_MENU_LEVEL:"legendItemLevel",MEMBER_GROUP_MENU_LEVEL:"memberGroupCell",GRID_SELECTOR_MENU:".selector.mutton",DASHBOARD_SPECIAL_CONTENT_TREE_LEVEL:"dashboardSpecialContentTreeLeafLevel",DASHBOARD_REPO_TREE_LEVEL:"dashboardRepoTreeLeafLevel",DASHBOARD_CONTENT_FRAME_MENU_LEVEL:"dashboardContentFrameLevel",DASHBOARD_TEXT_FRAME_MENU_LEVEL:"dashboardTextFrameLevel",DASHBOARD_CLICKABLE_FRAME_MENU_LEVEL:"dashboardClickableFrameLevel",DASHBOARD_CONTROL_FRAME_MENU_LEVEL:"dashboardControlFrameLevel",SPACER_NAME:"_spacer",ARTIFICIAL_NAME:"_artificial",DEFAULT_THEME_ID:"default",TABLE:"table",CHART:"chart",ICHART:"ichart",OLAP_ICHART:"olap_ichart",CROSSTAB:"crosstab",OLAP_CROSSTAB:"olap_crosstab",DASHBOARD:"dashboard",DASHBOARD_RUNTIME:"dashboardRuntime",SAVE_AS_TREE_DOM_ID:"saveAsFoldersTree",UNDEFINED_STRING:"undefined",CLOBBER:"clobber",LABEL_MAX_LEN:94,DESC_MAX_LEN:249,DRAGGABLE_GHOST_HEIGHT:"20px",DRAGGABLE_GHOST_WIDTH:"150px",superInitAll:function(){theBody=document.body,localContext.initAll(),localContext.getMode()!==designerBase.DASHBOARD&&adhocDesigner&&adhocDesigner.initExplorerObjectListeners(),restoreDefaultCursor()},updateFlowKey:function(){var e=$("flowId");e&&(flowExecutionKey=e.getAttribute("value"))},setState:function(){var stateSnapshotScript=$("stateSnapshotScript");null!=stateSnapshotScript&&(window.eval(stateSnapshotScript.text),state=eval("("+stateSnapshot+")"),stateSnapshotScript.parentNode.removeChild(stateSnapshotScript))},getCanRunAndSave:function(){return canRunAndSave},getControllerPrefix:function(){return localContext.controller?localContext.controller:"co"},handleSave:function(){saveLabel?designerBase.save(saveFolder,saveLabel,saveDesc,!0):designerBase.launchSaveDialog()},handleSaveAs:function(){designerBase.launchSaveDialog()},handleSaveAndGenerate:function(){saveLabel?designerBase.checkSave(saveFolder,saveLabel,saveDesc,!1,{reportName:saveLabel+" "+defaultReportSuffix}).then(function(){designerBase.launchSaveDialog({forDataView:!1,forReport:!0,reportGenerators:localContext.state.reportGenerators})}):designerBase.launchSaveDialog({forDataView:!0,forReport:!0,reportGenerators:localContext.state.reportGenerators})},getSelectedObject:function(e){return e&&!isNaN(e)&&e<selObjects.length?selObjects[e]:selObjects[0]},getSelectedObjects:function(){return selObjects},getLastSelectedObject:function(){return selObjects[selObjects.length-1]},isSelectedNodeAFolder:function(){if(1!=selObjects.length)return!0;if(selectionCategory.area===designerBase.AVAILABLE_FIELDS_AREA){var e=this.getSelectedObject();return e?e.isParent():!1}return!1},unSelectAll:function(){selObjects.clear()},addToSelected:function(e){var a=this.isInSelection(e);a||selObjects.push(e)},shouldClearSelections:function(e,a){var t=isMetaHeld(e),r=isShiftHeld(e);return a=selectionCategory.area==a,!(a&&(t||r))},unSelectGiven:function(e){selObjects=selObjects.without(e)},isInSelection:function(e){for(var a=0;a<selObjects.length;a++)if(selectionCategory.area===this.COLUMN_LEVEL){if(e.header&&selObjects[a].header&&e.header.getAttribute("data-fieldName")==selObjects[a].header.getAttribute("data-fieldName"))return selObjects[a].index==e.index}else if(selectionCategory.area===this.GROUP_LEVEL){if(e.fieldName===selObjects[a].fieldName)return!0}else if(selectionCategory.area===this.ROW_GROUP_MENU_LEVEL||selectionCategory.area===this.COLUMN_GROUP_MENU_LEVEL||selectionCategory.area===this.LEGEND_MENU_LEVEL||selectionCategory.area===this.MEASURE_MENU_LEVEL){if(e.id===selObjects[a].id)return!0}else if(e==selObjects[a])return!0;return!1},isObjectInSelection:function(e,a){for(var t=0;t<selObjects.length;t++)if(a){if(e[a]==selObjects[t][a])return!0}else if(e==selObjects[t])return!0;return!1},clearOverlaySet:function(e){e&&(_.each(e,function(e){var a=$(e).identify();$(a)&&$(a).remove()}),e={})},deselectOverlaySet:function(e,a){_.each(e,function(e){$(e).removeClassName(a)})},enableSelection:function(){localContext.getMode()!==designerBase.DASHBOARD&&adhocDesigner&&adhocDesigner.initEnableBrowserSelection($("designer"))},disableSelection:function(){localContext.getMode()!==designerBase.DASHBOARD&&adhocDesigner&&adhocDesigner.initPreventBrowserSelection($("designer"))},getLastSavedReportFolder:function(){var e=null;return window.localStorage&&(e=window.localStorage.getItem("lastSavedReportFolder")),e?e:saveFolder},setLastSavedReportFolder:function(e){if(window.localStorage)try{window.localStorage.setItem("lastSavedReportFolder",e)}catch(a){window.console&&console.log(a)}},createAdhocSaveDialog:function(){var e=this;savePanel=new JRS.SaveAsDialog({templateMatcher:"#saveDataViewAndReport",inputMatchers:{dataViewName:".dataViewName",dataViewDescription:".dataViewDescription",reportName:".reportName",reportDescription:".reportDescription"},organizationId:organizationId,publicFolderUri:publicFolderUri,prepareState:function(e){savePanel.generatorSelect&&"TEMPLATE"===savePanel.generatorSelect.state&&(e.params.reportTemplate=savePanel.generatorSelect.val())},validator:function(a){var t=!0;return a.params.forDataView&&(t=t&&e.validateSaveNamePresent(a.dataViewName,"dataView")&&e.validateDescription(a.dataViewDescription,"dataView"),t=t&&e.validateSaveFolder(a,"dataView")),a.params.forReport&&(t=t&&e.validateSaveNamePresent(a.reportName,"report")&&e.validateDescription(a.reportDescription,"report"),a.reportName!=a.dataViewName||!a.params.forDataView&&a.folder!=saveFolder||(alert(designerMessages.datasourceOverwrite),t=!1),t=t&&e.validateSaveReportFolder(a,"report")),savePanel.generatorSelect&&"TEMPLATE"===savePanel.generatorSelect.state&&(t=t&&e.validateTemplate(a,"templateNotSelected")),t},saveHandler:function(a){var t=!a.params.forDataView||saveLabel===a.dataViewName&&saveFolder===a.folder,r={dataViewOverwriteOk:t};if(a.params.forReport&&(r.reportName=a.reportName,r.reportDescription=a.reportDescription,r.dataViewFolder=a.folder,r.reportFolder=a.reportFolder,designerBase.setLastSavedReportFolder(a.reportFolder),savePanel.generatorSelect)){var o=savePanel.generatorSelect.val();"TEMPLATE"===savePanel.generatorSelect.state&&(r.reportTemplate=o,e.generatorConfig({template:o})),"GENERATOR"===savePanel.generatorSelect.state&&(r.reportGenerator={id:o},e.generatorConfig({generator:o}))}var n;return n=a.params.forDataView?e.saveAdHoc(a.folder,a.dataViewName,a.dataViewDescription,!1,r):e.saveAdHoc(null,null,null,!1,r),a.params.forDataView?n.then(function(){saveLabel=a.dataViewName,saveDesc=a.dataViewDescription,saveFolder=a.folder}):n}}),savePanel.generatorSelect=new JRS.generatorSelect({id:"adHocGeneratorSelect",parent:savePanel.dialogElement.get(0),reportGenerators:localContext.state.reportGenerators})},createDashboardSaveDialog:function(){var e=this;savePanel=new JRS.SaveAsDialog({templateMatcher:"#saveAs",foldersTreeMatcher:"#saveAsFoldersTree",okButtonMatcher:"#saveAsBtnSave",cancelButtonMatcher:"#saveAsBtnCancel",inputMatchers:{resourceName:"#saveAsInputName",resourceDescription:"#saveAsInputDescription"},organizationId:organizationId,publicFolderUri:publicFolderUri,validator:function(a){var t=e.validateSaveNamePresent(a.resourceName,"dashboard")&&e.validateDescription(a.resourceDescription,"dashboard")&&e.validateSaveFolder(a,"dashboard");return t},saveHandler:function(a){var t=saveLabel===a.resourceName&&saveFolder===a.folder;return e.save(a.folder,a.resourceName,a.resourceDescription,t).then(function(){saveLabel=a.resourceName,saveDesc=a.resourceDescription,saveFolder=a.folder})}})},_showAdhocSavePanel:function(e){var a=this,t=saveLabel||defaultSaveName,r={dataViewName:t,dataViewDescription:saveDesc,reportName:t+" "+defaultReportSuffix,reportTemplate:e.reportTemplate,reportGenerators:e.reportGenerators,reportDescription:"",params:e};e.forDataView&&(r.folder=_.isEmpty(saveFolder)?"/":saveFolder),e.forReport&&(r.reportFolder=designerBase.getLastSavedReportFolder()||"/"),savePanel.open(r).then(function(){void 0!==adhocDesigner&&adhocDesigner.initPreventBrowserSelection(savePanel.foldersTree[0]);var t=a.generatorConfig();t&&(t.template?savePanel.generatorSelect.val(t.template,"TEMPLATE"):t.generator&&savePanel.generatorSelect.val(t.generator,"GENERATOR")),e.forDataView?savePanel.dialogElement.find(".dataViewName").focus().select():e.forReport&&savePanel.dialogElement.find(".reportName").focus().select()})},launchSaveAdhocDialog:function(e){function a(e,a){a.forDataView?(e.dialogElement.addClass("forDataView"),e.dialogElement.find(".forDataView").removeClass("hidden")):(e.dialogElement.removeClass("forDataView"),e.dialogElement.find(".forDataView").addClass("hidden")),a.forReport?(e.dialogElement.addClass("forReport"),e.dialogElement.find(".forReport").removeClass("hidden")):(e.dialogElement.removeClass("forReport"),e.dialogElement.find(".forReport").addClass("hidden")),a.forDataView&&!a.forReport?(e.dialogElement.find(".forDataViewOnly").removeClass("hidden"),savePanel.generatorSelect.hide()):(e.dialogElement.find(".forDataViewOnly").addClass("hidden"),savePanel.generatorSelect.show()),0==localContext.state.reportGenerators.length&&e.dialogElement.addClass(layoutModule.NO_GENERATORS_CLASS)}void 0===e&&(e={forDataView:!0,forReport:!1}),savePanel||this.createAdhocSaveDialog(),a(savePanel,e),adhocDesigner.filtersController.hasNotAppliedFilters()?adhocDesigner.showSaveConfirmationDialog(function(){designerBase._showAdhocSavePanel(e)}):designerBase._showAdhocSavePanel(e)},launchSaveDashboardDialog:function(){savePanel||this.createDashboardSaveDialog();var e={resourceName:saveLabel||defaultSaveName,resourceDescription:saveDesc,folder:saveFolder&&saveFolder.length>0?saveFolder:"/"};savePanel.open(e).then(function(){savePanel.dialogElement.find("#saveAsInputName").focus().select()})},launchSaveDialog:function(e){localContext.getMode()==designerBase.DASHBOARD?this.launchSaveDashboardDialog():this.launchSaveAdhocDialog(e),designerBase.enableSelection()},launchDependenciesDialog:function(e,a){var t=jQuery.Deferred();return dialogs.dependentResources.show(e.dependentResources,{dependenciesBtnSave:function(){t.resolve()},dependenciesBtnSaveAs:function(){t.reject();var e=null!=a.addOns&&null!=a.addOns.reportName;designerBase.launchSaveDialog({forDataView:!0,forReport:e})},dependenciesBtnCancel:function(){t.reject()}},{canSave:!0,okOnly:"FORBID"==e.result||"WARN"==e.result,topMessage:e.topMessage,bottomMessage:e.bottomMessage}),t},selectSaveDirectory:function(){saveAsTree.openAndSelectNode(saveFolder)},okSaveDialog:function(){saveOldLabel="",saveOldFolder="",designerBase.hideSaveDialog(),this._saveConfirmMessage()},validateSaveNamePresent:function(e,a){return!e||e.blank()?(alert(designerMessages.emptyName[a]),!1):e.length>this.LABEL_MAX_LEN?(alert(designerMessages.saveLabelError[a].replace("{0}",this.LABEL_MAX_LEN)),!1):!0},validateDescription:function(e,a){return!e||e.blank()?!0:e.length>this.DESC_MAX_LEN?(alert(designerMessages.saveDescriptionError[a].replace("{0}",this.DESC_MAX_LEN)),!1):!0},validateSaveFolder:function(e,a){if(null==e.folder)return alert(designerMessages.nonSelectedFolder[a]),!1;if(!e.isFolderWritable){var t=designerMessages.selectedFolderIsNotWritable[a];return alert(t.replace("{0}",e.folder)),!1}return!0},validateSaveReportFolder:function(e,a){if(null==e.reportFolder)return alert(designerMessages.nonSelectedFolder[a]),!1;if(!e.isReportFolderWritable){var t=designerMessages.selectedFolderIsNotWritable[a];return alert(t.replace("{0}",e.folder)),!1}return!0},validateTemplate:function(e,a){return _.isEmpty(e.params.reportTemplate)?(alert(designerMessages[a]),!1):!0},launchJSOverwriteConfirm:function(e){confirm(e)?this.overwriteConfirmed():saveLabel=null},overwriteConfirmed:function(){this.save(saveFolder,saveLabel,saveDesc,!0)},updateSessionWarning:function(){if(TIMEOUT_INTERVAL>0&&!delayBeforeSessionTimeoutWarning){var e=TIMEOUT_INTERVAL-MILL_PER_MIN*MIN_WARN_BEFORE_TIMEOUT;delayBeforeSessionTimeoutWarning=e>0?e:MILL_PER_MIN/2}delayBeforeSessionTimeoutWarning&&(window.clearTimeout(timeoutValue),timeoutValue=window.setTimeout(function(){return designerBase.showExpirationDialog()},delayBeforeSessionTimeoutWarning))},showExpirationDialog:function(){var e=!1;e=confirm(localContext.getMode()!==this.DASHBOARD?ADHOC_SESSION_TIMEOUT_MESSAGE+getSessionExpireTime():DASHBOARD_SESSION_TIMEOUT_MESSAGE+getSessionExpireTime()),e&&(localContext.getMode()!==designerBase.DASHBOARD?adhocDesigner.tryToKeepServerAlive():localContext.tryToKeepServerAlive())},initAdhocSpecificDesignerBaseVar:function(){TIMEOUT_INTERVAL=1e3*serverTimeoutInterval,ADHOC_SESSION_TIMEOUT_MESSAGE=adHocSessionExpireCode,ADHOC_EXIT_MESSAGE=adHocExitConfirmation},confirmAndLeave:function(){return localContext.getMode()===designerBase.DASHBOARD?confirm(DASHBOARD_EXIT_MESSAGE):localContext.state.canUndo&&localContext.state.isWritable?confirm(ADHOC_EXIT_MESSAGE):!0},generatorConfig:function(e){var a=window.localStorage;if(a&&a.getItem("reportGenerator")){var t=JSON.parse(a.reportGenerator);if(!e)return t;var r=t.sourceURI?{sourceURI:t.sourceURI}:{};t=jQuery.extend({},r,e),a.setItem("reportGenerator",JSON.stringify(t))}return null},sendAjaxActionRequest:function(e,a,t){var r=this.getFilterDialogFlowURL(e,t);ajaxTargettedUpdate(r,{fillLocation:"ajaxbuffer",callback:a,errorHandler:errorHandler,postData:t})},sendSelectiveAjaxActionRequest:function(e,a,t){var r=this.getFilterDialogFlowURL(e,t);ajaxTargettedUpdate(r,{fillLocation:"ajaxbuffer",callback:a,errorHandler:errorHandler,postData:t,mode:AjaxRequester.prototype.CUMULATIVE_UPDATE})},getFilterDialogFlowURL:function(e){var a=urlContext+"/flow.html?_flowId=adhocAjaxFilterDialogFlow";if(null!=e)for(var t=0;t<e.length;t++)a+="&"+e[t];return a=a+"&clientKey="+clientKey},sendRequestToAjaxBuffer:function(e,a,t){this.sendRequest(e,a,t,{target:"ajaxbuffer",mode:AjaxRequester.prototype.TARGETTED_REPLACE_UPDATE})},sendRequest:function(action,otherParams,postFillAction,options,customErrorHandler){var bPost=options&&options.bPost,target=options&&options.target;target=target||(isSupportsTouch()?$("mainTableContainer").down().identify():"mainTableContainer");var mode=options&&options.mode||AjaxRequester.prototype.EVAL_JSON,container=options&&options.container,hideLoader=options&&options.hideLoader,actionPrefix=getTextBeforeUnderscore(action),javaAction=getTextAfterUnderscore(action),thisURL=urlContext+controllerMap[actionPrefix],params="action="+javaAction;if(_.isArray(otherParams))params+="&"+_.compact(otherParams).join("&");else if(_.isObject(otherParams)){var cleanedParams=_.reduce(otherParams,function(e,a,t){return isNotNullORUndefined(a)&&(e[t]=a),e},{});params+="&"+jQuery.param(cleanedParams)}params+="&clientKey="+clientKey,bPost||(thisURL+="?"+params,params=null),localContext.getMode()!==this.DASHBOARD&&null==postFillAction&&(postFillAction=adhocDesigner.render);var internalErrorHandler=function(e){var a=errorHandler(e);return a&&customErrorHandler&&customErrorHandler(e),a};isIPad()&&"ta_fetchMoreRows"!=action&&designerBase.updateMainOverlay(""),"undefined"!=typeof adhocDesigner&&(actionModel&&actionModel.hideMenu(),adhocDesigner&&adhocDesigner.unSelectAvailableTreeNodes());var delayedFn=function(updateURL,ajaxResponseTarget,postResponseCallback,params){return function(){var callbackWrapper=function(){clearTimeout(cancelQueryTimer),cancelQueryTimer=null,designerBase.updateMainOverlay("hidden"),postResponseCallback&&("string"==typeof postResponseCallback?eval(postResponseCallback):postResponseCallback.apply(null,arguments)),JRS.reportExecutionCounter.check()};return target==designerBase.CLOBBER?ajaxClobberredUpdate(updateURL,{callback:callbackWrapper,errorHandler:internalErrorHandler,postData:params}):ajaxTargettedUpdate(updateURL,{fillLocation:ajaxResponseTarget,fromLocation:container,callback:callbackWrapper,errorHandler:internalErrorHandler,postData:params,mode:mode,hideLoader:hideLoader})}}(thisURL,target,postFillAction,params);setTimeout(delayedFn,0)},sendNonReturningRequest:function(e,a,t){var r=getTextBeforeUnderscore(e),o=getTextAfterUnderscore(e),n=urlContext+controllerMap[r]+"?action="+o;if(a)for(var i=0;i<a.length;i++)n+="&"+a[i];n+="&clientKey="+clientKey,ajaxNonReturningUpdate(n,{callback:t,errorHandler:errorHandler})},redirectToHomePage:function(){document.location="flow.html?_flowId=homeFlow"},save:function(e,a,t,r,o){return localContext.getMode()===designerBase.DASHBOARD?localContext.saveDashboard(e,a,t,r):designerBase.saveAdHocWithNotAppliedFiltersCheck(e,a,t,r,o)},saveAdHocWithNotAppliedFiltersCheck:function(e,a,t,r,o){return adhocDesigner.filtersController.hasNotAppliedFilters()?void adhocDesigner.showSaveConfirmationDialog(_.bind(function(){return this.saveAdHoc(e,a,t,r,o)},this)):this.saveAdHoc(e,a,t,r,o)},saveAdHoc:function(e,a,t,r,o){return this.checkSave(e,a,t,r,o).then(function(){return designerBase.doSave(e,a,t,r,o)})},createOverwriteHanlder:function(e,a){var t=this;return function(r){var o=r.getResponseHeader("fileExistsException");return o?(o=decodeURIComponent(o),void(confirm(o.replace(/@@/g," "))?t.doSave.apply(t,a).then(function(){e.resolve()},function(a){e.reject(a)}):e.reject())):void e.reject(r)}},doSave:function(e,a,t,r,o){var n=jQuery.Deferred();adhocDesigner&&jQuery("#designer").trigger("report_name_update",[a]);var i=function(e){localContext.standardOpCallback&&localContext.standardOpCallback(e),this._saveConfirmMessage(),n.resolve()}.bind(designerBase),l=designerBase.createOverwriteHanlder(n,[e,a,t,!0,o]),s=new Array("allOverwrite="+r);if(null!=a&&(s.push("aruLabel="+encodeText(a)),s.push("aruDesc="+encodeText(t)),s.push("aruFolder="+encodeText(e))),void 0!=o&&(s.push("aruOverwrite="+o.dataViewOverwriteOk),void 0!=o.reportName&&(s.push("reportLabel="+encodeText(o.reportName)),s.push("reportDesc="+encodeText(o.reportDescription)),s.push("reportFolder="+encodeText(o.reportFolder)),o.reportTemplate&&s.push("reportTemplate="+encodeText(o.reportTemplate)),o.reportGenerator))){var d=Object.toJSON(o.reportGenerator);s.push("reportGenerator="+encodeText(d))}return this.sendRequest(designerBase.getControllerPrefix()+"_save",s,i,null,l),n},checkSave:function(e,a,t,r,o){var n=this,i=jQuery.Deferred(),l=function(l){l.topMessage?n.launchDependenciesDialog(l,{folder:e,name:a,desc:t,overwrite:r,addOns:o}).then(function(){i.resolve()},function(){i.reject()}):i.resolve()}.bind(designerBase),s=new Array("aruFolder="+encodeText(e),"aruLabel="+encodeText(a));return o&&o.reportName&&(s.push("reportFolder="+encodeText(o.reportFolder)),s.push("reportLabel="+encodeText(o.reportName))),this.sendRequest("co_checkSave",s,l,null),i},_saveConfirmMessage:function(){dialogs.systemConfirm.show(saveConfirmation,5e3)},createDomObject:function(e,a){if(e)return Builder.node(e,{className:a});throw"Please provide a valid tag"},getContentDimensions:function(e){var e=$A(e),a=e.collect(function(e){var a=e.getDimensions(),t=e.positionedOffset();return{width:a.width+t[0],height:a.height+t[1]}}),t=a.collect(function(e){return e.width}).max(),r=a.collect(function(e){return e.height}).max();return{width:t,height:r}},updateIFrameScrolls:function(){},updateMainOverlay:function(e){var a=document.getElementById("mainTableContainerOverlay");a&&(a.className=e)}},errorHandler=function(e){clearTimeout(cancelQueryTimer),cancelQueryTimer=null;var a=e.getResponseHeader("LoginRequested");if(a)return document.location=urlContext,!0;var t=e.getResponseHeader("fileExistsException");if(t)return t=decodeURIComponent(t),!0;var r=e.getResponseHeader("multipleFileExistException");if(r)return r=decodeURIComponent(r),alert(r.replace(/@@/g," ")),$("saveAsBtnSave")&&($("saveAsBtnSave").disabled=!1),!0;var o=e.getResponseHeader("adhocException");return o?(showErrorPopup(o),!0):baseErrorHandler(e)};