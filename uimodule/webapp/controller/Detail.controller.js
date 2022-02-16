sap.ui.define([
    "com/atlascopco/pt/portal/myopenorders/controller/BaseController"
], function (BaseController) {
    "use strict";
    return BaseController.extend("com.atlascopco.pt.portal.myopenorders.controller.Detail", {
        // **************************************************************************
        // Lifecycle functions
        // **************************************************************************
        onInit: function () {
            this.getRouter().getRoute("Detail").attachPatternMatched(this._onDetailMatched, this);
        },
        onBeforeRendering: function () {

        },
        onDeliveryPress: function (oEvent) {
            const oDelivery = oEvent.getSource().getBindingContext().getObject();
            this.navTo("DetailDetail", {
                orderNr: oDelivery.Order_OrderNr,
                deliveryId: oDelivery.ID
            });
        },
        // **************************************************************************
        // event handlers
        // **************************************************************************
        handleFullScreen: function () {
            this.getModel("fcl").setProperty("/layout", sap.f.LayoutType.MidColumnFullScreen);
            this.getModel("fcl").setProperty("/fullScreen", true);
        },
        handleExitFullScreen: function () {
            this.getModel("fcl").setProperty("/layout", sap.f.LayoutType.TwoColumnsMidExpanded);
            this.getModel("fcl").setProperty("/fullScreen", false);
        },
        handleClose: function () {
            this.getModel("fcl").setProperty("/layout", sap.f.LayoutType.OneColumn);
            this.getModel("fcl").setProperty("/fullScreen", false);
            this.navTo("List");
        },
        onInvoicePress: function (oEvent) {
            const oInvoice = oEvent.getSource().getBindingContext().getObject();
            this._openInvoice(oInvoice);
            // sap.m.URLHelper.redirect(`${this.getModel().sServiceUrl}Invoices(Order_OrderNr='${oInvoice.Order_OrderNr}',InvoiceNr='${oInvoice.InvoiceUrl}')/Pdf`, true);
        },
        // **************************************************************************
        // Helper functions
        // **************************************************************************
        _onDetailMatched: function (oEvent) {
            this.updateRoute(oEvent);
            this.getModel("fcl").setProperty("/layout", sap.f.LayoutType.TwoColumnsMidExpanded);
            const sOrderNr = oEvent.getParameter("arguments").orderNr;
            this.setBusy(true);
            this.getView().bindElement({
                path: `/Order('${sOrderNr}')`,
                events: {
					dataReceived: function() {
						this.setBusy(false);
					}.bind(this)
				}
            });
        },
        _openInvoice: function (oInvoice) {
            if (!this._pdfViewer) {
                this._pdfViewer = new sap.m.PDFViewer();
            }
            const url = sap.ui.require.toUrl(`com/atlascopco/pt/portal/myopenorders/srv_api`);
            this._pdfViewer.setSource(`${url}/order/Invoices(Order_OrderNr='${oInvoice.Order_OrderNr}',InvoiceNr='${oInvoice.InvoiceUrl}')/Pdf`);
            this._pdfViewer.setTitle(`${this.getText("orderNr")}: ${oInvoice.Order_OrderNr} - ${this.getText("invoiceNr")}: ${oInvoice.InvoiceNr}`);
            this._pdfViewer.open();
        }
    });
});