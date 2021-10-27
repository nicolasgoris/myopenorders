sap.ui.define(["sap/ui/test/Opa5"], function (Opa5) {
    "use strict";

    return Opa5.extend("com.flexso.portal.myorders.test.integration.arrangements.Startup", {
        iStartMyApp: function () {
            this.iStartMyUIComponent({
                componentConfig: {
                    name: "com.flexso.portal.myorders",
                    async: true,
                    manifest: true
                }
            });
        }
    });
});
