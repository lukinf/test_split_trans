/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "sap/ui/model/json/JSONModel",
    "cz/fridl/lukas/test_split_trans/model/models"
],
    function (UIComponent, Device, JSONModel, models) {
        "use strict";

        return UIComponent.extend("cz.fridl.lukas.test_split_trans.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                UIComponent.prototype.init.apply(this, arguments);
                this.getRouter().initialize();
                this.setModel(models.createDeviceModel(), "device");
                this.setModel(sap.ui.getCore().getMessageManager().getMessageModel(), "message");
            }            
        });
    }
);