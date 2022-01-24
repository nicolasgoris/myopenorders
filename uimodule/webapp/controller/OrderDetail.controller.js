sap.ui.define([
    "com/atlascopco/pt/portal/myopenorders/controller/BaseController"
], function (BaseController) {
    "use strict";
    return BaseController.extend("com.atlascopco.pt.portal.myopenorders.controller.OrderDetail", {
        // **************************************************************************
        // Lifecycle functions
        // **************************************************************************
        onInit: function () {
            this.getRouter().getRoute("OrderDetail").attachPatternMatched(this._onOrderDetailMatched, this);
        },
        onBeforeRendering: function () {

        },
        onDeliveryPress: function (oEvent) {
            const oDelivery = oEvent.getSource().getBindingContext().getObject();
            this.getRouter().navTo("DeliveryDetail", {
                orderNr: oDelivery.Order_OrderNr,
                deliveryId: oDelivery.ID
            });
        },
        // **************************************************************************
        // event handlers
        // **************************************************************************
        handleFullScreen: function() {
            this.getModel("fcl").setProperty("/layout", sap.f.LayoutType.MidColumnFullScreen);
            this.getModel("fcl").setProperty("/fullScreen", true);
        },
        handleExitFullScreen: function() {
            this.getModel("fcl").setProperty("/layout", sap.f.LayoutType.TwoColumnsMidExpanded);
            this.getModel("fcl").setProperty("/fullScreen", false);
        },
        handleClose: function() {
            this.getModel("fcl").setProperty("/layout", sap.f.LayoutType.OneColumn);
            this.getModel("fcl").setProperty("/fullScreen", false);
            this.navBack();
        },
        onInvoicePress: function(oEvent) {
            const oInvoice = oEvent.getSource().getBindingContext().getObject();
            // this._openInvoice(oInvoice);
            sap.m.URLHelper.redirect(`srv_api/order/Invoices(Order_OrderNr='${oInvoice.Order_OrderNr}',InvoiceNr='${oInvoice.InvoiceUrl}')/Pdf`, true);
            // this.getRouter().navTo("Invoice", {
            //     orderNr: oInvoice.Order_OrderNr,
            //     invoiceNr: oInvoice.InvoiceUrl
            // });
        },
        // **************************************************************************
        // Helper functions
        // **************************************************************************
        _onOrderDetailMatched: function (oEvent) {
            this.getModel("fcl").setProperty("/layout", sap.f.LayoutType.TwoColumnsMidExpanded);
            const sOrderNr = oEvent.getParameter("arguments").orderNr;
            this.getView().bindElement({
                path: `/Order('${sOrderNr}')`
            });
        },
        // _openInvoice: function (oInvoice) {
		// 	// create dialog lazily
		// 	if (!this.pDialog) {
		// 		this.pDialog = this.loadFragment({
		// 			name: "com.atlascopco.pt.portal.myopenorders.view.Invoice"
		// 		});
		// 	}

		// 	this.pDialog.then(function(oDialog) {
        //         oDialog.bindElement({
        //             path: `/Pdf(OrderNr='${oInvoice.Order_OrderNr}',InvoiceNr='${oInvoice.InvoiceNr}')`
        //         });
        //         oDialog.open();
		// 	});
		// },
    });
});