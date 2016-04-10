/// <reference path="../App.js" />

(function () {
    "use strict";

    // The initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();

            $('#insertimage').click(toDataUrl);
        });
    };

    function insertPictureAtSelection(base64EncodedImageStr) {

        Office.context.document.setSelectedDataAsync(base64EncodedImageStr, {
            coercionType: Office.CoercionType.Image,
            imageLeft: 50,
            imageTop: 50,
            imageWidth: 200,
            imageHeight: 200
        },
           function (asyncResult) {
               if (asyncResult.status === Office.AsyncResultStatus.Failed) {
                   console.log("Action failed with error: " + asyncResult.error.message);
               }
           });
    }

    function toDataUrl() {
        var xhr = new XMLHttpRequest();
        var url = "https://localhost:44300/api/test/GetImage"
        xhr.open('GET', url, true);

        //xhr.responseType = 'blob';

        xhr.onload = function (e) {
            if (this.status == 200) {
                insertPictureAtSelection(this.response);
            }
        };

        xhr.onerror = function (e) {
            alert("Error " + e.target.status + " occurred while receiving the document.");
        };

        xhr.send();
    }
    
})();