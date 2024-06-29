sap.ui.define([
    "cz/fridl/lukas/test_split_trans/controller/BaseController",    
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, MessageToast) {
        "use strict";

        return BaseController.extend("cz.fridl.lukas.test_split_trans.controller.Edit", {

            onInit: function () {
                this._oModel = this.getBackendModel();
                this._oItemsTable = this.byId("itemsT");
                this.getOwnerComponent().getRouter().getRoute("edit").attachPatternMatched(this._onRouteMatched, this, { inactive: true });
            },

            _onRouteMatched: function (oEvent) {
                this._oItemsBinding = this._oItemsTable.getBinding("items");
                this._sHeaderKey = oEvent.getParameter("arguments").HeaderKey;
                let sPath = this.getOwnerComponent().getModel().createKey("/HeaderSet", {
                    Key: this._sHeaderKey
                });
                this.getView().bindElement({
                    path: sPath
                });
            },

            onAddItemPress: function (oEvent) {
                if (sap.ushell.Container) { sap.ushell.Container.setDirtyFlag(true); }
                this._oItemContext = this._oItemsBinding.create({ Active: true }, true, { inactive: true });
                this.renumberingItems(this._oItemsTable);
            },

            onDeleteItemPress: function (oEvent) {
                if (sap.ushell.Container) { sap.ushell.Container.setDirtyFlag(true); }
                let oItem = oEvent.getParameter('listItem');
                let oItemContext = oItem.getBindingContext();
                this._setActiveStatus(oItem, false);
                this.renumberingItems(this._oItemsTable);
                oItemContext.delete();
            },

            _setActiveStatus: function (oItem, bActive) {
                let oItemContext = oItem.getBindingContext();
                let sPath = oItemContext.getPath();
                this._oModel.setProperty(sPath + "/Active", bActive);
            },

            onSavePress: function (oEvent) {
                this._oModel.submitChanges({
                    success: function () {
                        if (sap.ushell.Container) { sap.ushell.Container.setDirtyFlag(false); }
                        MessageToast.show("Data Saved...");
                        this._oModel.refresh(true);
                    }.bind(this)
                });
            },

            onItemsTableUpdateFinished: function (oEvent) {
                oEvent.getSource().getItems().forEach(function (oItem) {
                    let oDeleteControl = oItem.getDeleteControl();
                    oDeleteControl.setIcon("sap-icon://delete");
                    oDeleteControl.setType(sap.m.ButtonType.Reject);
                    oDeleteControl.setTooltip("Delete");
                });
            }
        });
    });
