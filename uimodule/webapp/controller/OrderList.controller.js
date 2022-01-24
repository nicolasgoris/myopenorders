sap.ui.define([
    "com/atlascopco/pt/portal/myopenorders/controller/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
], function (BaseController, Filter, FilterOperator) {
    "use strict";
    return BaseController.extend("com.atlascopco.pt.portal.myopenorders.controller.OrderList", {
        // **************************************************************************
        // Lifecycle functions
        // **************************************************************************
        onInit: function () {

        },
        onBeforeRendering: function () {
            const oRegEx = /SoldTo=([0-9]+)/;
            if (this.getRouter().getHashChanger()) {
                if (this.getRouter().getHashChanger().parent) {
                    if (this.getRouter().getHashChanger().parent._oNavigationState) {
                        if (this.getRouter().getHashChanger().parent._oNavigationState.newHash) {
                            if (oRegEx.exec(this.getRouter().getHashChanger().parent._oNavigationState.newHash)) {
                                const sSoldTo = oRegEx.exec(this.getRouter().getHashChanger().parent._oNavigationState.newHash)[1];
                                this.getView().byId("ordersTable").getBinding("items").filter([new Filter({ path: "SoldTo", operator: FilterOperator.EQ, value1: sSoldTo })]);
                                this.getView().byId("soldTo").addSelectedKeys([sSoldTo]);
                            }
                        }
                    }
                }
            }
        },
        // **************************************************************************
        // event handlers
        // **************************************************************************
        onOrderPress: function (oEvent) {
            const oOrder = oEvent.getSource().getBindingContext().getObject();
            this.getRouter().navTo("OrderDetail", {
                orderNr: oOrder.OrderNr
            });
        },
        onSearchOrders: function (oEvent) {
            let aFilters = [];
            const aFilterGroupItems = oEvent.getSource().getFilterGroupItems ? oEvent.getSource().getFilterGroupItems() : oEvent.getSource().getParent().getParent().getParent().getFilterGroupItems();
            aFilterGroupItems.forEach(fi => {
                if (fi.getName() === "Search") {
                    const oSearchValue = fi.getControl().getValue().length === 0 ? undefined : fi.getControl().getValue();
                    this.getView().byId("ordersTable").getBinding("items").changeParameters({ $search: oSearchValue });
                } else if (fi.getName() === "OrderDate") {
                    const oStart = fi.getControl().getDateValue(), oEnd = fi.getControl().getSecondDateValue();
                    if (oStart && oEnd) {
                        aFilters.push(new Filter({ filters: [new Filter({ path: fi.getName(), operator: FilterOperator.GE, value1: oStart.toJSON() }), new Filter({ path: fi.getName(), operator: FilterOperator.LE, value1: oEnd.toJSON() })], and: true }));
                    }
                } else {
                    const aKeys = fi.getControl().getSelectedKeys();
                    if (aKeys.length > 0) {
                        aKeys.forEach(sKey => {
                            aFilters.push(new Filter({ path: fi.getName(), operator: FilterOperator.EQ, value1: sKey }));
                        });
                    }
                }
            });
            this.getView().byId("ordersTable").getBinding("items").filter(aFilters);
        },
        onClearFilters: function (oEvent) {
            oEvent.getSource().getFilterGroupItems().forEach(fi => {
                if (fi.getName() === "Search") {
                    fi.getControl().setValue();
                } else if (fi.getName() === "OrderDate") {
                    fi.getControl().setDateValue();
                    fi.getControl().setSecondDateValue();
                } else {
                    fi.getControl().setSelectedKeys();
                }
            });
        },
        // **************************************************************************
        // Helper functions
        // **************************************************************************
    });
});