sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/message/MessageType",
    'sap/m/MessagePopover'
], function (Controller, MessageType, MessagePopover) {
    "use strict";

    var _oMessagePopover;

    return Controller.extend("cz.fridl.lukas.test_split_trans.controller.BaseController", {

        init: function () {
            _oMessagePopover = new MessagePopover({
                items: {
                    path: "message>/",
                    template: this._getMessgeItemTemplate()
                }
            });
            this.byId("messageManagerB").addDependent(_oMessagePopover);
        },

        getBackendModel: function () {
            return this.getOwnerComponent().getModel();
        },

        getI18nModel: function () {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();;
        },

        getMessageManager: function () {
            return sap.ui.getCore().getMessageManager();
        },

        getRouter: function () {
            return this.getOwnerComponent().getRouter();
        },

        onMessagePopoverPress: function (oEvent) {
            _oMessagePopover.toggle(oEvent.getSource());
        },

        renumberingItems: function (oItemsTable) {
            let iItmNo = 10;
            let aItems = oItemsTable.getItems();
            aItems.forEach(function (oItem) {
                if (oItem.getBindingContext().getObject().Active === true) {
                    let sPath = oItem.getBindingContext().getPath();
                    this._oModel.setProperty(sPath + "/Id", iItmNo.toString(), oItem.getBindingContext());
                    iItmNo = iItmNo + 10;
                }
            }.bind(this));
        },

        _getMessgeItemTemplate() {
            let oMessage = new sap.m.MessageItem({
                type: "{message>type}",
                title: "{message>message}",
                description: "{message>code}"
            });
            return oMessage;
        },
        
        getMessagesArraySeverity: function (aMessages) {
			let sHighestSeverity,
				oMessageSeverity = MessageType.Accept;
			aMessages.forEach(function (sMessage) {
				switch (sMessage.type) {
					case MessageType.Error:
						sHighestSeverity = MessageType.Error;
						oMessageSeverity = MessageType.Error;
						break;
					case MessageType.Warning:
						if (sHighestSeverity !== MessageType.Error) {
							oMessageSeverity = MessageType.Warning;
						}
						break;
					case MessageType.Success:
						if (sHighestSeverity !== MessageType.Error && sHighestSeverity !== MessageType.Warning) {
							oMessageSeverity = MessageType.Accept;
						}
						break;
				}
			});
			return oMessageSeverity;
		},

        // getAppModel: function () {
        //     return this.getOwnerComponent().getModel("app");
        // },
    })
})