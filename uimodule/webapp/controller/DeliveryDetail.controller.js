sap.ui.define([
    "com/atlascopco/pt/portal/myopenorders/controller/BaseController"
], function (BaseController) {
    "use strict";
    return BaseController.extend("com.atlascopco.pt.portal.myopenorders.controller.DeliveryDetail", {
        // **************************************************************************
        // Lifecycle functions
        // **************************************************************************
        onInit: function () {
            this.getRouter().getRoute("DeliveryDetail").attachPatternMatched(this._onOrderDetailMatched, this);
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
            this.getModel("fcl").setProperty("/layout", sap.f.LayoutType.EndColumnFullScreen);
            this.getModel("fcl").setProperty("/fullScreen", true);
        },
        handleExitFullScreen: function() {
            this.getModel("fcl").setProperty("/layout", sap.f.LayoutType.ThreeColumnsMidExpanded);
            this.getModel("fcl").setProperty("/fullScreen", false);
        },
        handleClose: function() {
            this.getModel("fcl").setProperty("/layout", sap.f.LayoutType.TwoColumnsMidExpanded);
            this.getModel("fcl").setProperty("/fullScreen", false);
            this.navBack();
        },
        // **************************************************************************
        // Helper functions
        // **************************************************************************
        _onOrderDetailMatched: function (oEvent) {
            this.getModel("fcl").setProperty("/layout", sap.f.LayoutType.ThreeColumnsMidExpanded);
            const sOrderNr = oEvent.getParameter("arguments").orderNr,
                sDeliveryId = oEvent.getParameter("arguments").deliveryId;
            this.getView().bindElement({
                path: `/Deliveries(Order_OrderNr='${sOrderNr}',ID=${sDeliveryId})`
            });
        },
    });
});