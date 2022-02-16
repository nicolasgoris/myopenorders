sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "sap/ui/core/Fragment",
    "sap/ui/core/BusyIndicator",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (Controller, History, UIComponent, Fragment, BusyIndicator, MessageBox, MessageToast) {
    "use strict";
    return Controller.extend("com.atlascopco.pt.portal.myopenorders.controller.BaseController", {
        getModel: function (sName) {
            return this.getView().getModel(sName);
        },
        setModel: function (oModel, sName) {
            return this.getView().setModel(oModel, sName);
        },
        getResourceBundle: function () {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },
        getText: function (text, parameters) {
            return this.getResourceBundle().getText(text, parameters);
        },
        navTo: function (sTarget, mParameters, bReplace) {
            this.getRouter().navTo(sTarget, mParameters, bReplace);
        },
        updateRoute: function(oEvent) {
            this.getModel("fcl").setProperty("/route", oEvent.getParameter("name"));
        },
        getRouter: function () {
            return this.getOwnerComponent().getRouter();
        },
        navBack: function () {
			const sPreviousHash = History.getInstance().getPreviousHash();
			//The history contains a previous entry
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.navTo("OrderList", null, true);
			}
		},
        setBusy: function (bBusy) {
            if (bBusy) {
                BusyIndicator.show(0);
            } else {
                BusyIndicator.hide();
            }
        },
        showMessageBox: function (kind, errorMessage, errorTitle) {
            var icon = MessageBox.Icon.INFORMATION;
            switch (kind) {
                case "ERROR":
                    icon = MessageBox.Icon.ERROR;
                    break;
                case "INFORMATION":
                    icon = MessageBox.Icon.INFORMATION;
                    break;
                case "WARNING":
                    icon = MessageBox.Icon.WARNING;
                    break;
                case "SUCCESS":
                    icon = MessageBox.Icon.SUCCESS;
                    break;
                default:
                    break;
            }
            MessageBox.show(
                errorMessage,
                {
                    icon: icon,
                    title: errorTitle,
                }
            );
        },
    });
});