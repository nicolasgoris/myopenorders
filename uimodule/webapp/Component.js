sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/f/FlexibleColumnLayoutSemanticHelper",
    "sap/f/library",
],
    function (UIComponent, FCLSemanticHelper, library) {
        "use strict";
        const LayoutType = library.LayoutType;

        return UIComponent.extend("com.atlascopco.pt.portal.myopenorders.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();
                this.getModel("fcl").setData({
                    layout: LayoutType.OneColumn,
                    fullScreen: false,
                    today: new Date()
                });
            },

            getHelper: function () {
                var oFCL = this.getRootControl().byId("fcl"),
                    oSettings = {
                        defaultTwoColumnLayoutType: LayoutType.TwoColumnsMidExpanded,
                        defaultThreeColumnLayoutType: LayoutType.ThreeColumnsMidExpanded
                    };
                return FCLSemanticHelper.getInstanceFor(oFCL, oSettings);
                // return this._getFcl().then(function (oFCL) {
                //     const oSettings = {
                //         defaultTwoColumnLayoutType: LayoutType.TwoColumnsMidExpanded,
                //         defaultThreeColumnLayoutType: LayoutType.ThreeColumnsEndExpanded
                //     };
                //     return FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFCL, oSettings);
                // });
            },

            // _getFcl: function () {
            //     return new Promise(
            //         function (resolve, reject) {
            //             var oFCL = this.getRootControl().byId("flexibleColumnLayout");
            //             if (!oFCL) {
            //                 this.getRootControl().attachAfterInit(function (oEvent) {
            //                     resolve(oEvent.getSource().byId("flexibleColumnLayout"));
            //                 }, this);
            //                 return;
            //             }
            //             resolve(oFCL);
            //         }.bind(this)
            //     );
            // },
        });
    }
);