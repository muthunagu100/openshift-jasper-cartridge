<%--
  ~ Copyright (C) 2005 - 2014 TIBCO Software Inc. All rights reserved.
  ~ http://www.jaspersoft.com.
  ~ Licensed under commercial Jaspersoft Subscription License Agreement
--%>

<%@ taglib prefix="t" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>

<c:set var="oDesc" value="${(oDesc == null || oDesc == '') ? oName : oDesc}"/>

<li class="leaf first">
    <t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
        <t:putAttribute name="containerClass" value="panel pane settings"/>
        <t:putAttribute name="containerTitle"><spring:message code="${oLabelCode}"/></t:putAttribute>
        <t:putAttribute name="bodyClass" value="twoColumn"/>
        <t:putAttribute name="bodyContent">
            <div class="column simple primary">
                <div class="control checkBox">
                    <label class="wrap" for="input_${oName}" title="<spring:message code='${oLabelCode}' />">
                        <spring:message code="${oDesc}"/>
                    </label>
                    <input ${oValue ? "checked=\"checked\"" : "" } id="input_${oName}" type="checkbox" value=""/>
                    <span class="message warning" id="error_${oName}">&nbsp;</span>
                </div>
            </div>
            <div class="column simple secondary">
                <fieldset class="actions">
                    <button id="save" name="${oName}" disabled="true" class="button action primary up"><span class="wrap"><spring:message code="button.change"/></span></button>
                    <button id="cancel" name="${oName}" value="${oValue}"  disabled="true" class="button action up"><span class="wrap"><spring:message code="button.cancel"/></span></button>
                </fieldset>
            </div>
        </t:putAttribute>
    </t:insertTemplate>
</li>
