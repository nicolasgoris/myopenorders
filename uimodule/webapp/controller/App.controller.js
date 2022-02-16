sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (Controller, MessageBox) {
	"use strict";
	return Controller.extend("com.atlascopco.pt.portal.myopenorders.controller.App", {
		onInit: function () {
			const oMessageModel = sap.ui.getCore().getMessageManager().getMessageModel(),
				oMessageModelBinding = oMessageModel.bindList("/", undefined, [], new sap.ui.model.Filter("technical", sap.ui.model.FilterOperator.EQ, true));
			this.getView().setModel(oMessageModel, "message");
			oMessageModelBinding.attachChange(this.onMessageBindingChange, this);
			this._bTechnicalErrors = false;
		},
		onMessageBindingChange: function (oEvent) {
			const aContexts = oEvent.getSource().getContexts();
			let aMessages = [],
				bMessageOpen = false;
			if (bMessageOpen || !aContexts.length) {
				return;
			}
			// Extract and remove the technical messages
			aMessages = aContexts.map(function (oContext) {
				return oContext.getObject();
			});
			sap.ui.getCore().getMessageManager().removeMessages(aMessages);
			this._bTechnicalErrors = true;
			let message = aMessages[0].message;
			MessageBox.error(message, {
				onClose: function () {
					bMessageOpen = false;
				}
			});
			bMessageOpen = true;
		}
	});
});
