sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/base/Log"
], function (MockServer, Log) {
    "use strict";

    return {
        /**
         * Initializes the mock server.
         * You can configure the delay with the URL parameter "serverDelay".
         * The local mock data in this folder is returned instead of the real data for test_split_transing.
         * @public
         */
        init: function () {
            // create
            var oMockServer = new MockServer({
                rootUri: "/"
            });

            // simulate against the metadata and mock data
            oMockServer.simulate("http://127.0.0.1:5500/test_split_trans/webapp/localService/metadata.xml", {
                sMockdataBaseUrl: "http://127.0.0.1:5500/test_split_trans/webapp/localService/mockdata",
                bGenerateMissingMockData: true
            });

            // start
            oMockServer.start();
            console.info("Running the app with mock data");
        }
    };
});