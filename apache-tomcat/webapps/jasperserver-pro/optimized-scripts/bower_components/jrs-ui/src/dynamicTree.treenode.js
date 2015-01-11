dynamicTree.TreeNode=function(e){this.id=dynamicTree.getNextId(),this.treeId=null,this.name=null!=e.name?e.name:this.DEFAULT_NAME,this.param=null!=e.param?e.param:{},this.orderNumber=null!=e.orderNumber?e.orderNumber:null,this.childs=[],this.parent=null,this.Types={Folder:new dynamicTree.TreeNode.Type(this.FOLDER_TYPE_NAME)},this.isloaded=!1,this.delayedRendering=!0,this.haschilds=!1,this.editable=!1,this.isWaiting=!1,this.hidden=!1,this.isDropTarget=!1,dynamicTree.nodes[this.id]=this},dynamicTree.TreeNode.Type=function(e,t){this.name=e,t&&(this.cssClassName=t.cssClassName,this.templateDomId=t.templateDomId)},dynamicTree.TreeNode.State={OPEN:"open",CLOSED:"closed"},dynamicTree.TreeNode.addVar("FOLDER_TYPE_NAME","com.jaspersoft.jasperserver.api.metadata.common.domain.Folder"),dynamicTree.TreeNode.addVar("DEFAULT_NAME","unset name"),dynamicTree.TreeNode.addVar("NODE_ID_PREFIX","node"),dynamicTree.TreeNode.addVar("SUB_NODE_ID_SUFFIX","sub"),dynamicTree.TreeNode.addVar("HANDLER_ID_PREFIX","handler"),dynamicTree.TreeNode.addVar("NODE_CLASS_NAME","node").addVar("LEAF_CLASS_NAME","leaf").addVar("OPEN_CLASS_NAME","open").addVar("CLOSED_CLASS_NAME","closed").addVar("SELECTED_CLASS_NAME","selected").addVar("LOADING_CLASS_NAME","loading").addVar("ROOTS_CLASS_NAME","roots"),dynamicTree.TreeNode.addVar("nodeHeaderTemplateDomId","list_responsive_collapsible:leaf"),dynamicTree.TreeNode.addVar("nodeFooterTemplateDomId","list_responsive_collapsible"),dynamicTree.TreeNode.addVar("nodeInputTemplateDomId","list_responsive_collapsible:input"),dynamicTree.TreeNode.addVar("isSelectable",!1),dynamicTree.TreeNode.addMethod("getTreeId",function(){return this.treeId||this.parent&&this.parent.getTreeId()}),dynamicTree.TreeNode.addMethod("getState",function(){return dynamicTree.trees[this.getTreeId()].getState(this.id)}),dynamicTree.TreeNode.addMethod("isParent",function(){return this.param.type==this.Types.Folder.name}),dynamicTree.TreeNode.addMethod("addChild",function(e){if(this.isParent()){var t=this.childs[this.childs.length-1];t&&(t.nextSibling=e,e.prevSibling=t),this.childs.push(e),e.parent=this,this.resortChilds(),this.delayedRendering||(e.showNode(),e.render(this._getChildrenElement(),e.nextSibling))}}),dynamicTree.TreeNode.addMethod("removeChild",function(e){for(var t=0;t<this.childs.length;t++)if(this.childs[t]==e){this.childs.splice(t,1);break}if(e.deselect(),!this.delayedRendering){var d=e._getElement();d&&d.remove()}}),dynamicTree.TreeNode.addMethod("resortChilds",function(){var e=this.getTreeId(),t=dynamicTree.trees[e];if(t&&t.sortNodes&&isArray(this.childs)){this.childs.sort(function(e,d){return t.comparer(e,d)});for(var d=this.childs.length;d--;){var i=this.childs[d];i.prevSibling=this.childs[d-1],i.nextSibling=this.childs[d+1]}}}),dynamicTree.TreeNode.addMethod("resetChilds",function(){this.childs=[]}),dynamicTree.TreeNode.addMethod("setHasChilds",function(e){this.haschilds=e}),dynamicTree.TreeNode.addMethod("hasChilds",function(){return this.haschilds?!0:this.getChildCount()>0}),dynamicTree.TreeNode.addMethod("getChildCount",function(){return this.childs.length}),dynamicTree.TreeNode.addMethod("getFirstChild",function(){return this.hasChilds()?this.childs[0]:null}),dynamicTree.TreeNode.addMethod("getLastChild",function(){return this.hasChilds()?this.childs[this.childs.length-1]:null}),dynamicTree.TreeNode.addMethod("_getElement",function(){return this._element||(this._element=$(this.NODE_ID_PREFIX+this.id)),this._element}),dynamicTree.TreeNode.addMethod("_getTitle",function(){var e=this._getElement().childElements()[0];e.cleanWhitespace();var t=e.childNodes[e.childNodes.length-1];return"#text"!==t.nodeName&&(t=document.createTextNode(""),e.appendChild(t)),t}),dynamicTree.TreeNode.addMethod("_getTitleInputElement",function(){return $(this._getElement().getElementsByTagName("input")[0])}),dynamicTree.TreeNode.addMethod("_getChildrenElement",function(){return this._childrenElement||(this._childrenElement=$(this.NODE_ID_PREFIX+this.id+this.SUB_NODE_ID_SUFFIX)),this._childrenElement}),dynamicTree.TreeNode.addMethod("isOpen",function(){return this.getState()===dynamicTree.TreeNode.State.OPEN}),dynamicTree.TreeNode.addMethod("changeName",function(e){this.name=e,this._getTitle().data=this.name}),dynamicTree.TreeNode.addMethod("getType",function(){for(var e in this.Types)if(this.param.type===this.Types[e].name)return this.Types[e];return void 0}),dynamicTree.TreeNode.addMethod("refreshStyle",function(e){if(e=$(e)||this._getElement()){e.templateClassName&&(e.className=e.templateClassName),this.isParent()?(e.addClassName(this.NODE_CLASS_NAME).removeClassName(this.LEAF_CLASS_NAME),this.isWaiting||(this.isOpen()?e.addClassName(this.OPEN_CLASS_NAME).removeClassName(this.CLOSED_CLASS_NAME):e.addClassName(this.CLOSED_CLASS_NAME).removeClassName(this.OPEN_CLASS_NAME))):e.addClassName(this.LEAF_CLASS_NAME).removeClassName(this.NODE_CLASS_NAME),this.isWaiting?e.addClassName(this.LOADING_CLASS_NAME):e.removeClassName(this.LOADING_CLASS_NAME),this.isSelected()?e.addClassName(this.SELECTED_CLASS_NAME):e.removeClassName(this.SELECTED_CLASS_NAME),this.hidden?e.addClassName(layoutModule.HIDDEN_CLASS):e.removeClassName(layoutModule.HIDDEN_CLASS),this.param.cssClass&&e.addClassName(this.param.cssClass);var t=this.getType();t&&t.cssClassName&&e.addClassName(t.cssClassName);var d=e.down();this.isDropTarget&&d&&d.addClassName(layoutModule.DROP_TARGET_CLASS),!this.isDropTarget&&d&&d.removeClassName(layoutModule.DROP_TARGET_CLASS)}}),dynamicTree.TreeNode.addMethod("_createNode",function(){var e=this.id,t=dynamicTree.trees[this.getTreeId()],d=this._getHeaderTemplateElement();d.id=this.NODE_ID_PREFIX+e,d.tabIndex=-1,this.refreshStyle(d),this.treeId=t.id,d.treeNode=this;var i=d.childElements()[0];i.insert(this.name),null!=this.tooltip&&this.tooltip.length>0&&(i.title=this.tooltip),i.childElements().each(function(t,d){0===d&&(t.id=this.HANDLER_ID_PREFIX+e);var i=this.iconTooltip;i&&(t.title=isArray(i)?i[d]:i)}.bind(this)),this._element=d}),dynamicTree.TreeNode.addMethod("_createNodeChildren",function(){var e=this._getFooterTemplateElement();e.id=this.NODE_ID_PREFIX+this.id+this.SUB_NODE_ID_SUFFIX,this._childrenElement=e}),dynamicTree.TreeNode.addMethod("showNode",function(e){var t=dynamicTree.trees[this.getTreeId()];if(this._createNode(),this.isParent()){var d=this.isOpen()||t.showAllNodesOnStartup;if(d){this._createNodeChildren();for(var i=0;i<this.getChildCount();i++)this.childs[i].showNode(this._getChildrenElement());this.delayedRendering=!1,t.fireOpenEvent(this)}}this.render(e)}),dynamicTree.TreeNode.addMethod("render",function(e,t){if(!Object.isUndefined(e)){var d=$(e);d&&(this._getChildrenElement()&&this._getElement().insert(this._getChildrenElement()),t?d.insert(this._getElement(),{before:t._getElement()}):d.insert(this._getElement()))}}),dynamicTree.TreeNode.addMethod("_renderChildren",function(){var e=this._getElement();e&&this._getChildrenElement()&&e.insert(this._getChildrenElement())}),dynamicTree.TreeNode.addMethod("refreshNode",function(){if(this.refreshStyle(),this.isParent()&&this.isOpen()&&this.isloaded){this.delayedRendering?(this._createNodeChildren(),this._renderChildren()):this._getChildrenElement().update("");for(var e=0;e<this.getChildCount();e++)this.childs[e].showNode(this._getChildrenElement());this.delayedRendering=!1}var t=dynamicTree.trees[this.getTreeId()];t.refreshScroll()}),dynamicTree.TreeNode.addMethod("wait",function(){this.isWaiting=!0,this.refreshStyle()}),dynamicTree.TreeNode.addMethod("stopWaiting",function(){this.isWaiting=!1,this.refreshStyle()}),dynamicTree.TreeNode.addMethod("isHiddenRootNode",function(){var e=dynamicTree.trees[this.getTreeId()];return e.rootNode==this&&!e.bShowRoot}),dynamicTree.TreeNode.addMethod("deselect",function(e){var t=dynamicTree.trees[this.getTreeId()];return t&&this.isSelected()?(t.removeNodeFromSelected(this),this.refreshStyle(),e&&t.fireUnSelectEvent(this,e),!0):!1}),dynamicTree.TreeNode.addMethod("select",function(e,t){if(!t&&this.focus(),this.isSelected())return!1;var d=dynamicTree.trees[this.getTreeId()];return d.addNodeToSelected(this),this.refreshStyle(),d.fireSelectEvent(this,e),!0}),dynamicTree.TreeNode.addMethod("focus",function(){!isIPad()&&this._getElement()&&this._getElement().focus()}),dynamicTree.TreeNode.addMethod("isSelected",function(){var e=dynamicTree.trees[this.getTreeId()];return e&&e.isNodeSelected(this)}),dynamicTree.TreeNode.addMethod("_removeTitle",function(){var e=this._getTitle();e.data="",$(e.parentNode).cleanWhitespace()}),dynamicTree.TreeNode.addMethod("edit",function(e){if(this.editable){if(dynamicTree.treeNodeEdited==this)return;dynamicTree.treeNodeEdited=this;var t=this.name,d=$(this._getTitle().parentNode),i=this._getInputTemplateElement();this._getTitle().data="",d.cleanWhitespace(),d.insert(i),i.value=this.name,i.focus(),i.select(e),i.onclick=function(e){cancelEventBubbling(e)},i.ondblclick=function(e){cancelEventBubbling(e)},i.onmousedown=function(e){cancelEventBubbling(e)},i.onmouseup=function(e){cancelEventBubbling(e)},i.onkeydown=function(e){var d=window.event?window.event:e;13==d.keyCode?(i.onblur=null,this.doEndEdit(d)):27==d.keyCode&&(i.onblur=null,i.value=t,this.doEndEdit(d))}.bindAsEventListener(this),i.onblur=function(e){this.doEndEdit(e)}.bindAsEventListener(this),dynamicTree.trees[this.getTreeId()].fireStartEditEvent(this,i)}}),dynamicTree.TreeNode.addMethod("doEndEdit",function(){this.editEnded(),dynamicTree.trees[this.getTreeId()].fireEndEditEvent(this)}),dynamicTree.TreeNode.addMethod("editEnded",function(){var e=dynamicTree.trees[this.getTreeId()];if(null!=dynamicTree.treeNodeEdited){var t=this._getTitleInputElement(),d=($(t.parentNode),t.value);if(d==dynamicTree.treeNodeEdited.name)return t.remove(),this._getTitle().data=dynamicTree.treeNodeEdited.name,void(dynamicTree.treeNodeEdited=null);e.fireEditEvent(dynamicTree.treeNodeEdited,d),dynamicTree.editaborted||(dynamicTree.treeNodeEdited.name=d,t.remove(),this._getTitle().data=d),dynamicTree.treeNodeEdited=null}}),dynamicTree.TreeNode.addMethod("scroll",function(e){var t=dynamicTree.trees[this.getTreeId()].rootNode._getElement(),d=$(e?e:t.parentNode),i=this._getElement();if(d){var r=d.clientHeight,n=d.clientWidth,s=d.scrollTop,a=d.scrollLeft,h=i.cumulativeOffset().top-d.cumulativeOffset().top,o=i.offsetLeft,l=i.clientHeight,c=i.clientWidth;h>s+r?d.scrollTop=h-(r/2-l/2):s>h+l&&(d.scrollTop=h-(r/2-l/2)),o>a+n?d.scrollLeft=o-(n/2-c/2):a>o+c&&(d.scrollTop=o-(n/2-c/2))}}),dynamicTree.TreeNode.addMethod("handleNode",function(e){if(this.isParent()){var t=dynamicTree.trees[this.getTreeId()];this.isOpen()?t.writeStates(this.id,dynamicTree.TreeNode.State.CLOSED):(t.writeStates(this.id,dynamicTree.TreeNode.State.OPEN),t.fireOpenEvent(this,e)),this.refreshNode()}}),dynamicTree.TreeNode.addMethod("openNode",function(e){if(this.isParent()){var t=dynamicTree.trees[this.getTreeId()];this.isOpen()||(t.writeStates(this.id,dynamicTree.TreeNode.State.OPEN),t.fireOpenEvent(this,e)),this.refreshNode()}}),dynamicTree.TreeNode.addMethod("_getHeaderTemplateElement",function(){var e=this.getType(),t=e&&e.templateDomId?e.templateDomId:this.nodeHeaderTemplateDomId,d=$(t).cloneNode(!0);return d.templateId=t,d.templateClassName=d.className,d}),dynamicTree.TreeNode.addMethod("_getFooterTemplateElement",function(){var e=this.nodeFooterTemplateDomId,t=$(e).cloneNode(!0);return t.templateId=e,t.update(""),t}),dynamicTree.TreeNode.addMethod("_getInputTemplateElement",function(){var e=this.nodeInputTemplateDomId,t=$(e).cloneNode(!0);return t.templateId=e,t});