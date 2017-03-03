var allPermissions = [];

function onDeviceReady() {
    window.plugins.uniqueDeviceID.get(success, fail);
    function success(uuid)
    {
        $("body").append("UniqueID: " + uuid + "<br>UUID Devide: "+ device.uuid);
    }
    function fail(error)
    {
        alert(JSON.stringify(error));
    }
}

$(document).on("deviceready", onDeviceReady);
