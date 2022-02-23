//@ui5-bundle tcs/fin/payroll/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"tcs/fin/payroll/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent"],function(t){"use strict";return t.extend("tcs.fin.payroll.Component",{metadata:{manifest:"json"},init:function(){sap.ui.core.UIComponent.prototype.init.apply(this);var t=this.getRouter();t.initialize()},destroy:function(){}})});
},
	"tcs/fin/payroll/controller/Add.controller.js":function(){sap.ui.define(["tcs/fin/payroll/controller/BaseController","sap/ui/model/json/JSONModel","sap/m/MessageToast","sap/m/MessageBox","sap/ui/core/Fragment"],function(e,t,o,r,s){"use strict";return e.extend("tcs.fin.payroll.controller.Add",{onInit:function(){this.oLocalData=new t;this.oLocalData.setData({productData:{PRODUCT_ID:"",TYPE_CODE:"PR",CATEGORY:"Notebooks",NAME:"",DESCRIPTION:"",SUPPLIER_ID:"0100000046",SUPPLIER_NAME:"SAP",PRICE:"",CURRENCY_CODE:"EUR",DIM_UNIT:"CM",PRODUCT_PIC_URL:"/sap/public/bc/NWDEMO_MODEL/IMAGES/PO-1000.jpg"}});this.getView().setModel(this.oLocalData,"local")},mode:"create",onEnter:function(e){var t=e.getParameter("value");var o=this.getView().getModel();var s=this;this.getView().setBusy(true);o.read("/ProductSet('"+t+"')",{success:function(e){s.oLocalData.setProperty("/productData",e);s.getView().setBusy(false);s.mode="update";s.getView().byId("idSave").setText("Update")},error:function(e){debugger;r.error(JSON.parse(e.responseText).error.innererror.errordetails[0].message);s.getView().setBusy(false);s.mode="create";s.getView().byId("idSave").setText("Save")}})},onClear:function(){this.oLocalData.setProperty("/productData",{PRODUCT_ID:"",TYPE_CODE:"PR",CATEGORY:"Notebooks",NAME:"",DESCRIPTION:"",SUPPLIER_ID:"0100000046",SUPPLIER_NAME:"SAP",PRICE:"",CURRENCY_CODE:"EUR",DIM_UNIT:"CM",PRODUCT_PIC_URL:"/sap/public/bc/NWDEMO_MODEL/IMAGES/PO-1000.jpg"});this.getView().byId("idSave").setText("Create");this.mode="create";this.getView().byId("idSuppname").setText("")},onDelete:function(e){r.confirm("Do you really want to do this to me :( ?",{onClose:this._deleteProduct.bind(this)})},onMostExpensive:function(){var e=this.getView().getModel();var t=this;t.getView().setBusy(true);e.callFunction("/GetMostExpensiveProduct",{urlParameters:{I_CATEGORY:"Notebooks"},success:function(e){t.oLocalData.setProperty("/productData",e);t.getView().setBusy(false);t.mode="update";t.getView().byId("idSave").setText("Update")}})},supplierPopup:null,oField:null,onConfirmPopup:function(e){var t=e.getSource().getId();var o=e.getParameter("selectedItem");var r=o.getLabel();this.oField.setValue(r);this.getView().byId("idSuppname").setText(o.getValue())},onSupplierF4:function(e){this.oField=e.getSource();var t=this;if(this.supplierPopup===null){s.load({id:"supplier",name:"tcs.fin.payroll.fragments.popup",controller:this}).then(function(e){t.supplierPopup=e;t.supplierPopup.setTitle("Select Supplier");t.getView().addDependent(t.supplierPopup);t.supplierPopup.setMultiSelect(false);t.supplierPopup.bindAggregation("items",{path:"/SupplierSet",template:new sap.m.DisplayListItem({label:"{BP_ID}",value:"{COMPANY_NAME}"})});t.supplierPopup.open()})}else{this.supplierPopup.open()}},_deleteProduct:function(e){if(e==="OK"){var t=this.getView().byId("PID").getValue();var r=this.getView().getModel();var s=this;r.remove("/ProductSet('"+t+"')",{success:function(){o.show("OMG You hurt me");s.onClear()},error:function(){o.show("I love you, you saved me");s.onClear()}})}},onSave:function(){var e=this.oLocalData.getProperty("/productData");var t=this.getView().getModel();if(this.mode==="update"){t.update("/ProductSet('"+e.PRODUCT_ID+"')",e,{success:function(){o.show("Wow!! Update was success Amigo")},error:function(e){r.error(JSON.parse(e.responseText).error.innererror.errordetails[0].message)}})}else{t.create("/ProductSet",e,{success:function(){o.show("Wow!! You made it Amigo")},error:function(e){r.error(JSON.parse(e.responseText).error.innererror.errordetails[0].message)}})}}})});
},
	"tcs/fin/payroll/controller/App.controller.js":function(){sap.ui.define(["tcs/fin/payroll/controller/BaseController"],function(n){"use strict";return n.extend("tcs.fin.payroll.controller.App",{onInit:function(){}})});
},
	"tcs/fin/payroll/controller/BaseController.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("tcs.fin.payroll.controller.BaseController",{})});
},
	"tcs/fin/payroll/controller/Empty.controller.js":function(){sap.ui.define(["tcs/fin/payroll/controller/BaseController"],function(n){"use strict";return n.extend("tcs.fin.payroll.controller.Empty",{onInit:function(){}})});
},
	"tcs/fin/payroll/controller/View1.controller.js":function(){sap.ui.define(["tcs/fin/payroll/controller/BaseController","tcs/fin/payroll/util/formatter","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(t,e,n,r){"use strict";return t.extend("tcs.fin.payroll.controller.View1",{formatter:e,onInit:function(){this.oRouter=this.getOwnerComponent().getRouter()},onDeleteItem:function(){var t=this.getView().byId("idList");var e=t.getSelectedItems();for(let n=0;n<e.length;n++){const r=e[n];t.removeItem(r)}},onAdd:function(){this.oRouter.navTo("addNew")},onSelectItem:function(t){var e=t.getParameter("listItem");var n=e.getBindingContextPath();var r=n.split("/")[n.split("/").length-1];this.onNext(r)},onDelete:function(t){var e=t.getParameter("listItem");var n=t.getSource();n.removeItem(e)},onSearch:function(t){var e=t.getParameter("query");var i=new n("CATEGORY",r.Contains,e);var o=new n("type",r.Contains,e);var a=new n({filters:[i,o],and:false});this.getView().byId("idList").getBinding("items").filter(i)},onNext:function(t){this.oRouter.navTo("detail",{fruitId:t})}})});
},
	"tcs/fin/payroll/controller/View2.controller.js":function(){sap.ui.define(["tcs/fin/payroll/controller/BaseController","sap/m/MessageBox","sap/m/MessageToast","sap/ui/core/Fragment","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t,i,o,n,l){"use strict";return e.extend("tcs.fin.payroll.controller.View2",{onInit:function(){this.oRouter=this.getOwnerComponent().getRouter();this.oRouter.getRoute("detail").attachMatched(this.herculis,this)},onItemPress:function(e){t.confirm("I confirm to ANubhav that i will implement the 3rd view"+"and navigate to the supplier details on weekend")},onConfirmPopup:function(e){var t=e.getSource().getId();if(t.indexOf("city")!==-1){var i=e.getParameter("selectedItem");var o=i.getLabel();this.oField.setValue(o)}else{var p=e.getParameter("selectedItems");var s=[];for(let e=0;e<p.length;e++){const t=p[e];var a=t.getLabel();var r=new n("name",l.EQ,a);s.push(r)}var u=new n({filters:s,and:false});this.getView().byId("idTable").getBinding("items").filter(u)}},cityPopup:null,oField:null,onF4Help:function(e){this.oField=e.getSource();var t=this;if(this.cityPopup===null){o.load({id:"city",name:"tcs.fin.payroll.fragments.popup",controller:this}).then(function(e){t.cityPopup=e;t.cityPopup.setTitle("Cities");t.getView().addDependent(t.cityPopup);t.cityPopup.setMultiSelect(false);t.cityPopup.bindAggregation("items",{path:"/cities",template:new sap.m.DisplayListItem({label:"{name}",value:"{famousFor}"})});t.cityPopup.open()})}else{this.cityPopup.open()}},oSupplierPopup:null,onFilter:function(e){var t=this;if(this.oSupplierPopup===null){o.load({id:"supplier",name:"tcs.fin.payroll.fragments.popup",controller:this}).then(function(e){t.oSupplierPopup=e;t.oSupplierPopup.setTitle("Supplier");t.getView().addDependent(t.oSupplierPopup);t.oSupplierPopup.bindAggregation("items",{path:"/suppliers",template:new sap.m.DisplayListItem({label:"{name}",value:"{sinceWhen}"})});t.oSupplierPopup.open()})}else{this.oSupplierPopup.open()}},herculis:function(e){var t=e.getParameter("arguments").fruitId;var i="/"+t;this.getView().bindElement(i)},onSave:function(){t.confirm("Would like to save?",{title:"Confirmation",onClose:this.onCloseMsg})},onCloseMsg:function(e){if(e==="OK"){i.show("The sales order XXXX has been created successfully!")}else{t.error("Action was cancelled")}},onBack:function(){this.getView().getParent().to("idView1")}})});
},
	"tcs/fin/payroll/fragments/cities.fragment.xml":'<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core" xmlns:f="sap.ui.layout.form"><Select items="{/cities}"><items><core:Item key="{name}" text="{name}"></core:Item></items></Select><ComboBox items="{/cities}"><items><core:Item key="{name}" text="{name}"></core:Item></items></ComboBox><MultiComboBox items="{/cities}"><items><core:Item key="{name}" text="{name}"></core:Item></items></MultiComboBox></core:FragmentDefinition>',
	"tcs/fin/payroll/fragments/moreInfo.fragment.xml":'<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core" xmlns:f="sap.ui.layout.form"><f:SimpleForm><Label text="Name"></Label><Text text="{NAME}"></Text><Label text="Color"></Label><Text text="{DESCRIPTION}"></Text><Label text="Price"></Label><Text text="{PRICE} {CURRENCY_CODE}"></Text></f:SimpleForm></core:FragmentDefinition>',
	"tcs/fin/payroll/fragments/popup.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core" xmlns="sap.m"><SelectDialog id="popup" confirm="onConfirmPopup" multiSelect="true"/></core:FragmentDefinition>',
	"tcs/fin/payroll/fragments/supplier.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core" xmlns="sap.m"><Table id="idTable" items="{/suppliers}" itemPress="onItemPress"><headerToolbar><Toolbar><ToolbarSpacer ></ToolbarSpacer><Button icon="sap-icon://filter" tooltip="Select Suppliers to filter" press="onFilter"></Button></Toolbar></headerToolbar><columns><Column><header><Text text="Supplier Name" /></header></Column><Column><header><Text text="City" /></header></Column><Column minScreenWidth="Tablet"><header><Text text="Since When" /></header></Column><Column minScreenWidth="Tablet" demandPopin="true"><header><Text text="Contact Person" /></header></Column></columns><items><ColumnListItem type="Navigation"><cells><Text text="{name}" /><Input value="{city}" showValueHelp="true" valueHelpRequest="onF4Help" /><Text text="{sinceWhen}" /><Text text="{contactPerson}" /></cells></ColumnListItem></items></Table></core:FragmentDefinition>',
	"tcs/fin/payroll/i18n/i18n.properties":'appTitle=My Fruits App\r\nappDescription=This is my First productive Fiori App for Store',
	"tcs/fin/payroll/manifest.json":'{"_version":"1.35.0","sap.app":{"id":"tcs.fin.payroll","applicationVersion":{"version":"1.0.0"},"type":"application","i18n":"i18n/i18n.properties","title":"{{appTitle}}","description":"{{appDescription}}","dataSources":{"anubhavService":{"uri":"/sap/opu/odata/sap/ZBK_XX_ODATA_SRV/","type":"OData","settings":{"odataVersion":"2.0"}}}},"sap.ui":{"deviceTypes":{"desktop":true,"tablet":true,"phone":true},"fullWidth":true,"supportedThemes":["sap_bluecrystal","sap_fiori_3","sap_fiori_3_dark"],"technology":"UI5"},"sap.ui5":{"contentDensities":{"compact":true,"cozy":true},"dependencies":{"minUI5Version":"1.90","libs":{"sap.m":{},"sap.ui.layout":{},"sap.ui.comp":{}}},"rootView":{"viewName":"tcs.fin.payroll.view.App","id":"idRootView","type":"XML"},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewPath":"tcs.fin.payroll.view","viewType":"XML","controlId":"AppCon"},"routes":[{"name":"master","pattern":"","target":["narendra","modi"]},{"name":"detail","pattern":"fruits/{fruitId}","target":["narendra","biden"]},{"name":"supplier","pattern":"supplier/{supplierId}","target":["narendra","putin"]},{"name":"addNew","pattern":"AddNewProduct","target":["narendra","add"]}],"targets":{"narendra":{"viewName":"View1","viewId":"idView1","controlAggregation":"masterPages"},"modi":{"viewName":"Empty","viewId":"idEmpty","controlAggregation":"detailPages"},"biden":{"viewName":"View2","viewId":"idView2","controlAggregation":"detailPages"},"putin":{"viewName":"Supplier","viewId":"idSupplier","controlAggregation":"detailPages"},"add":{"viewName":"Add","viewId":"idAdd","controlAggregation":"detailPages"}}},"models":{"":{"type":"sap.ui.model.odata.v2.ODataModel","dataSource":"anubhavService"},"spidy":{"type":"sap.ui.model.json.JSONModel","uri":"mockdata/fruits.json"},"i18n":{"type":"sap.ui.model.resource.ResourceModel","uri":"i18n/i18n.properties"}}}}',
	"tcs/fin/payroll/util/formatter.js":function(){sap.ui.define([],function(){"use strict";return{getStatus:function(e){switch(e){case"Available":return"Success";break;case"Discontinued":return"Error";break;case"Out of Stock":return"Warning";break;default:break}}}});
},
	"tcs/fin/payroll/view/Add.view.xml":'<mvc:View xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m" xmlns:f="sap.ui.layout.form"\r\nxmlns:l="sap.ui.layout" xmlns:core="sap.ui.core"\r\ncontrollerName="tcs.fin.payroll.controller.Add"><Page><VBox class="sapUiSmallMargin"><f:SimpleForm id="SimpleFormChange354"\r\n\t\t\teditable="true"\r\n\t\t\tlayout="ResponsiveGridLayout"\r\n\t\t\ttitle="Create New Product"\r\n\t\t\tlabelSpanXL="3"\r\n\t\t\tlabelSpanL="3"\r\n\t\t\tlabelSpanM="3"\r\n\t\t\tlabelSpanS="12"\r\n\t\t\tadjustLabelSpan="false"\r\n\t\t\temptySpanXL="4"\r\n\t\t\temptySpanL="4"\r\n\t\t\temptySpanM="4"\r\n\t\t\temptySpanS="0"\r\n\t\t\tcolumnsXL="1"\r\n\t\t\tcolumnsL="1"\r\n\t\t\tcolumnsM="1"\r\n\t\t\tsingleContainerFullSize="false" ><f:content><Label text="Product Id" /><Input id="PID" value="{local>/productData/PRODUCT_ID}" change="onEnter"/><Button icon="sap-icon://monitor-payments" tooltip="Load Most Expensive Product"\r\n                        press="onMostExpensive" /><Label text="Name" /><Input value="{local>/productData/NAME}"></Input><Input value="{local>/productData/DESCRIPTION}"><layoutData><l:GridData span="XL1 L2 M2 S4" /></layoutData></Input><Label text="Supplier ID" /><Input value="{local>/productData/SUPPLIER_ID}" ><layoutData><l:GridData span="XL1 L2 M2 S4" /></layoutData></Input><Label text="Price/Currency" /><Input value="{local>/productData/PRICE}"></Input><Input value="{local>/productData/CURRENCY_CODE}"><layoutData><l:GridData span="XL1 L2 M2 S4" /></layoutData></Input></f:content></f:SimpleForm></VBox><footer><Toolbar ><ToolbarSpacer ></ToolbarSpacer><Button id="idSave" text="Save" icon="sap-icon://save" press="onSave"></Button><Button id="idDelete" text="Delete" icon="sap-icon://delete" type="Reject" press="onDelete" /><Button id="idClear" text="Clear" press="onClear" type="Emphasized" /></Toolbar></footer></Page></mvc:View>',
	"tcs/fin/payroll/view/App.view.xml":'<mvc:View xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m"\r\n    controllerName="tcs.fin.payroll.controller.App"><SplitApp id="AppCon" /></mvc:View>',
	"tcs/fin/payroll/view/Empty.view.xml":'<mvc:View xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m"\r\n    controllerName="tcs.fin.payroll.controller.Empty"><Image width="100%" height="100%" src="https://www.tollywood.net/wp-content/uploads/2021/12/Allu-Arjun-Pushpa-trailer-launch-event-in-Chennai-tomorrow.jpg"></Image></mvc:View>',
	"tcs/fin/payroll/view/View1.view.xml":'<mvc:View xmlns:footerbar="sap.ushell.ui.footerbar" xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m"\r\ncontrollerName="tcs.fin.payroll.controller.View1"><Page title="View 1"><headerContent><Button icon="sap-icon://action" press="onNext"></Button></headerContent><content><SearchField id="idSearch" search="onSearch"/><List id="idList" items="{/ProductSet}" \r\n            growing="true" growingThreshold="10"\r\n            selectionChange="onSelectItem" delete="onDelete" mode="SingleSelectMaster"><headerToolbar><Toolbar ><ToolbarSpacer ></ToolbarSpacer><Button icon="sap-icon://delete" press="onDeleteItem"></Button></Toolbar></headerToolbar><items><ObjectListItem title="{PRODUCT_ID}" intro="{CATEGORY}" \r\n                    icon="{imageURL}"\r\n                                    number="{PRICE}" numberUnit="{CURRENCY_CODE}"><firstStatus><ObjectStatus text="{DIM_UNIT}"></ObjectStatus></firstStatus></ObjectListItem></items></List></content><footer><Toolbar ><ToolbarSpacer ></ToolbarSpacer><Button text="Add" icon="sap-icon://add" press="onAdd"></Button></Toolbar></footer></Page></mvc:View>',
	"tcs/fin/payroll/view/View2.view.xml":'<mvc:View xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m" xmlns:f="sap.ui.layout.form" xmlns:core="sap.ui.core"\r\ncontrollerName="tcs.fin.payroll.controller.View2"><Page title="View 2" showNavButton="true" navButtonPress="onBack"><content><ObjectHeader title="{NAME}" intro="{PRODUCT_ID}" number="{PRICE}" numberUnit="{CURRENCY_CODE}"\r\n            icon="{imageURL}"></ObjectHeader><IconTabBar><items><IconTabFilter icon="sap-icon://information" text="More Info"><core:Fragment fragmentName="tcs.fin.payroll.fragments.moreInfo" type="XML"></core:Fragment></IconTabFilter><IconTabFilter icon="sap-icon://supplier" text="Suppliers"><core:Fragment fragmentName="tcs.fin.payroll.fragments.supplier" type="XML"></core:Fragment></IconTabFilter><IconTabFilter icon="sap-icon://home" text="Cities"><core:Fragment fragmentName="tcs.fin.payroll.fragments.cities" type="XML"></core:Fragment></IconTabFilter></items></IconTabBar></content><footer><Toolbar><ToolbarSpacer ></ToolbarSpacer><Button text="Save" type="Accept" press="onSave"></Button><Button text="Cancel" type="Reject" press="onCancel"></Button></Toolbar></footer></Page></mvc:View>'
}});
