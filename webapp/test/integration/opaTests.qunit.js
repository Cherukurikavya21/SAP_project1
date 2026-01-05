/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["second/sorted/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
