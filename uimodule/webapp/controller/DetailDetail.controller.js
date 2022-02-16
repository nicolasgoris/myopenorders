sap.ui.define([
    "com/atlascopco/pt/portal/myopenorders/controller/BaseController"
], function (BaseController) {
    "use strict";
    return BaseController.extend("com.atlascopco.pt.portal.myopenorders.controller.DetailDetail", {
        // **************************************************************************
        // Lifecycle functions
        // **************************************************************************
        onInit: function () {
            this.getRouter().getRoute("DetailDetail").attachPatternMatched(this._onDetailDetailMatched, this);
        },
        // **************************************************************************
        // event handlers
        // **************************************************************************
        handleFullScreen: function () {
            this.getModel("fcl").setProperty("/layout", sap.f.LayoutType.EndColumnFullScreen);
            this.getModel("fcl").setProperty("/fullScreen", true);
        },
        handleExitFullScreen: function () {
            this.getModel("fcl").setProperty("/layout", sap.f.LayoutType.ThreeColumnsMidExpanded);
            this.getModel("fcl").setProperty("/fullScreen", false);
        },
        handleClose: function () {
            this.getModel("fcl").setProperty("/layout", sap.f.LayoutType.TwoColumnsMidExpanded);
            this.getModel("fcl").setProperty("/fullScreen", false);
            this.navTo("Detail", {
                orderNr: this.getView().getBindingContext().getObject().Order_OrderNr
            }, true);
        },
        // **************************************************************************
        // Helper functions
        // **************************************************************************
        _onDetailDetailMatched: function (oEvent) {
            this.getModel("fcl").setProperty("/layout", sap.f.LayoutType.ThreeColumnsMidExpanded);
            const sOrderNr = oEvent.getParameter("arguments").orderNr,
                sDeliveryId = oEvent.getParameter("arguments").deliveryId;
            this.setBusy(true);
            this.getView().bindElement({
                path: `/Deliveries(Order_OrderNr='${sOrderNr}',ID=${sDeliveryId})`,
                events: {
                    dataReceived: function () {
                        this.setBusy(false);
                    }.bind(this)
                }
            });
        },
    });
});