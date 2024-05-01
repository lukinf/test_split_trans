sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("cz.fridl.lukas.test_split_trans.controller.Detail", {

            onInit: function () {
                this.getOwnerComponent().getRouter().getRoute("detail").attachPatternMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function (oEvent) {
                this._sHeaderKey = oEvent.getParameter("arguments").HeaderKey;
                let sPath = this.getOwnerComponent().getModel().createKey("/HeaderSet", {
                    Key: this._sHeaderKey
                });

                this.getView().bindElement({
                    path: sPath,
                    events: {
                        dataReceived: function () {                          
                        }.bind(this)
                    }
                });                
            }
        });
    });
