sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (Controller, History, UIComponent, Fragment, MessageBox, MessageToast) {
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
        navTo: function (psTarget, pmParameters, pbReplace) {
            this.getRouter().navTo(psTarget, pmParameters, pbReplace);
        },
        getRouter: function () {
            return this.getOwnerComponent().getRouter();
        },
        onNavBack: function () {
            var sPreviousHash = History.getInstance().getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.back();
            } else {
                this.getRouter().navTo("appHome", {}, true /*no history*/);
            }
        },
        /**
         * Convenience method for opening a fragment based on name and optional parameters.
         * @public
         * @param {string} name fragment name
         * @param {object} oSource source object (openby)
         * @param {object} oPlacement placement of fragment (left,right..)
         * @returns {void} opens the fragment
         */
        openFragment: function (name, oSource, oPlacement) {
            return new Promise((resolve) => {
                if (!this.oFragments) {
                    this.oFragments = {};
                }
                var oFragment = this.getFragment(name);
                if (!oFragment) {
                    Fragment.load({
                        name: "com/atlascopco/pt/portal/usermgmt/fragment/" + name,
                        id: name,
                        controller: this
                    }).then(oFragment => {
                        this.oFragments[name] = oFragment;
                        this.getView().addDependent(oFragment);
                        if (oPlacement) {
                            oFragment.setPlacement(oPlacement);
                        }
                        if (oSource) {
                            oFragment.openBy(oSource);
                        } else if (oFragment.open) {
                            oFragment.open();
                        }
                        resolve(oFragment);
                    });
                } else {
                    if (oSource) {
                        oFragment.openBy(oSource);
                    } else if (oFragment.open) {
                        oFragment.open();
                    }
                    resolve(oFragment);
                }
            });
        },

        closeFragment: function (name) {
            var oFragment = this.getFragment(name);
            if (oFragment) oFragment.close();
        },

        getFragment: function (name) {
            if (!this.oFragments) {
                this.oFragments = {};
            }
            var found = false;
            var oFragment;
            for (const [key, value] of Object.entries(this.oFragments)) {
                if (key === name) {
                    found = true;
                    oFragment = value;
                }
            }
            return found ? oFragment : undefined;
        },

        showMessageBox: function (kind, errorTitle, errorMessage) {
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

        handleServiceError: function (oContext) {
            let message;
            if (oContext.getMessages().length) {
                message = oContext.getMessages()[0].message;
            } else if (oContext.getModel().mMessages[""] && oContext.getModel().mMessages[""].length) {
                message = oContext.getModel().mMessages[""][0].message;
            } else {
                message = "i18n>errorMessage";
            }
            this.showError(message);
            sap.ui.getCore().getMessageManager().removeAllMessages();
        },

        showMessageToast: function (text) {
            MessageToast.show(text);
        },

        navBack: function () {
			var sPreviousHash = History.getInstance().getPreviousHash();

			//The history contains a previous entry
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				// There is no history!
				// replace the current hash with page 1 (will not add an history entry)
				this.getOwnerComponent().getRouter().navTo("page1", null, true);
			}
		},

        confirmationPopUp: function (title, text, toast) {
            var i18n = this.getView().getModel("i18n").getResourceBundle();
            return new Promise((resolve, reject) => {
                MessageBox.confirm(i18n.getText(text), {
                    icon: MessageBox.Icon.WARNING,
                    title: i18n.getText(title),
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    onClose: function (oAction) {
                        if (oAction === "YES") {
                            if (toast) {
                                MessageToast.show(i18n.getText(toast), {
                                    duration: 3000,
                                    closeOnBrowserNavigation: false
                                });
                            }
                            resolve();
                        }
                        else {
                            reject();
                        }
                    }
                });
            });
        }
    });
});