sap.ui.define([
    "cz/fridl/lukas/test_split_trans/controller/BaseController",
    "sap/ui/core/message/MessageType",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, MessageType, MessageToast) {
        "use strict";

        return BaseController.extend("cz.fridl.lukas.test_split_trans.controller.Create", {

            onInit: function () {
                this.init();
                this.getRouter().getRoute("create").attachPatternMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function (oEvent) {
                this._oModel = this.getOwnerComponent().getModel();
                this._oHeaderContext = this._oModel.createEntry("/HeaderSet");
                this.getView().setBindingContext(this._oHeaderContext);
                this._oItemsTable = this.byId("itemsT");
                this._oItemsBinding = this._oItemsTable.getBinding("items");
                this._oItemsTable.setBindingContext(this._oHeaderContext);
            },

            onAddItemPress: function (oEvent) {
                if (sap.ushell.Container) {
                    sap.ushell.Container.setDirtyFlag(true);
                }
                this._oItemContext = this._oItemsBinding.create({ Id: "0", Active: true }, true);
                this._renumberingItems();
            },

            onDeleteItemPress: function (oEvent) {
                if (sap.ushell.Container) {
                    sap.ushell.Container.setDirtyFlag(true);
                }
                let oListItemContext = oEvent.getParameter('listItem').getBindingContext();
                oListItemContext.delete();
                this._renumberingItems();
            },

            _renumberingItems: function () {
                let iItmNo = 10;
                let aItems = this._oItemsTable.getItems();
                aItems.forEach(function (oItem) {
                    if (oItem.getBindingContext().getObject().Active === true) {
                        let sPath = oItem.getBindingContext().getPath();
                        this._oModel.setProperty(sPath + "/Id", iItmNo.toString(), oItem.getBindingContext());
                        iItmNo = iItmNo + 10;
                    }
                }.bind(this));
            },

            onSavePress: function (oEvent) {
                this.getView().byId("headerSF").check().then(function (data) {
                    let aMessages = this.getMessageManager().getMessageModel().getData();
                    if (this.getMessagesArraySeverity(aMessages) === MessageType.Accept) {
                        this._oModel.submitChanges({
                            success: function () {
                                MessageToast.show("Data Saved...");
                                if (sap.ushell.Container) {
                                    sap.ushell.Container.setDirtyFlag(true);
                                }
                            }.bind(this)
                        });
                    };
                }.bind(this));
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
