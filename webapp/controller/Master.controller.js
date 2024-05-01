sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/Device",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Device, MessageToast) {
        "use strict";

        return Controller.extend("cz.fridl.lukas.test_split_trans.controller.Master", {

            onInit: function () {
                this.getOwnerComponent().getRouter().getRoute("master").attachPatternMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function (oEvent) {

            },

            onSelectionChange: function (oEvent) {
                var sHeaderKey = oEvent.getSource().getSelectedItem().getBindingContext().getProperty("Key");
                this.getOwnerComponent().getRouter().navTo("detail", {
                    HeaderKey: sHeaderKey
                },
                    !Device.system.phone
                );
            },

            onCreatePress: function (oEvent) {
                this.getOwnerComponent().getRouter().navTo("create");
            },

            onEditPress: function (oEvent) {
                let sHeaderKey = this.getView().byId("headers").getSelectedItem().getBindingContext().getObject().Key;
                this.getOwnerComponent().getRouter().navTo("edit", { HeaderKey: sHeaderKey });
            },

            onHeadersListUpdateFinished: function (oEvent) {
                // let aItems = this.getView().byId("headers").getItems();
                // if (aItems.length !== 0) {
                //     oEvent.getSource().setSelectedItem(aItems[0]);
                //     if (!Device.system.phone) {
                //         let sId = oEvent.getSource().getSelectedItem().getBindingContext().getObject().Id;
                //         this.getOwnerComponent().getRouter().navTo("detail", { HeaderId: sId }, true);
                //     }
                // }
            }
        });
    });
