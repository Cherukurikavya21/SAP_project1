sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (Controller, Fragment, MessageBox,MessageToast) {
    "use strict";

    return Controller.extend("second.sorted.controller.View1", {

        onInit: function () {},

        Oncreate: function () {
            var oModel = this.getView().getModel();

            if (!this.iProductID) {
                this.iProductID = 9;
            } else {
                this.iProductID += 1;
            }

            var oProduct = {
                ID: this.iProductID,
                Name: "Bread",
                Description: "Whole grain bread",
                ReleaseDate: "/Date(694224000000)/",
                DiscontinuedDate: null,
                Rating: 3,
                Price: "2.5"
            };

            oModel.create("/Products", oProduct, {
                success: function (oData) {
                    MessageBox.success("Product Created: " + oData.Name);
                },
                error: function (oError) {
                    MessageBox.error("Creation failed");
                }
            });
        },

        Oncreatepress: function () {
            var oModel = this.getView().getModel();

            this.oContext = oModel.createEntry("/Products");

            if (!this._oDialog) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "second.sorted.view.create",
                    controller: this
                }).then(function (oDialog) {
                    this._oDialog = oDialog;
                    this.getView().addDependent(oDialog);
                    oDialog.setBindingContext(this.oContext);
                    oDialog.open();
                }.bind(this));
            } else {
                this._oDialog.setBindingContext(this.oContext);
                this._oDialog.open();
            }
        },

        onSave: function () {
            var oModel = this.getView().getModel();

            oModel.submitChanges({
                success: function () {
                    MessageBox.success("Product created successfully");
                },
                error: function () {
                    MessageBox.error("Error while creating product");
                }
            });

            this._oDialog.close();
        },

        onCancel: function () {
            var oModel = this.getView().getModel();
            oModel.resetChanges();
            this._oDialog.close();
        },
    onDeletePress : function (oEvent) {
      var oTable = this.byId("idProducts");
      var aSelectedItems = oTable.getSelectedItems();
 
      if (aSelectedItems.length === 0) {
        MessageToast.show("Please select at least one row to delete");
        return;
      }
      var oModel = this.getView().getModel();
      aSelectedItems.forEach(function (oItem) {
        var sPath = oItem.getBindingContextPath();
        
        oModel.remove(sPath, {
          success: function () {
            MessageToast.show("Row deleted successfully");
          },
          error: function () {
            MessageToast.show("Error deleting row");
          }

        });

      });

    },
    onDelete: function (oEvent) {
    var oItem = oEvent.getSource().getParent();
    var oCtx = oItem.getBindingContext();

    var sPath = oCtx.getPath();
    

    var oModel = this.getView().getModel();

    oModel.remove(sPath, {
        success: function() {
            sap.m.MessageToast.show("Deleted successfully");
        },
        error: function() {
            sap.m.MessageToast.show("Delete failed");
        }
    });
},
onUpdatePress: function () {

      var oModel = this.getView().getModel();

      var sPath1 = '/Products(7)'

      var oData = {
        "Name": "juice",

        "Price": "60",

        "Rating":"7"

      };

      oModel.update(sPath1, oData, {

        merge: true,

        success: function () {

          MessageToast.show("Product Updated Successfully");

        },

        error: function (oError) {

          MessageBox.error("Error updating product: " + oError.responseText);

        }

      });

    },
 

    });
});


