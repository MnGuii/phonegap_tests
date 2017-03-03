var allPermissions = [];

function onDeviceReady() {
    window.plugins.uniqueDeviceID.get(success, fail);
    function success(uuid)
    {
        alert("UniqueID: " + uuid + "\nUUID Devide: "+ device.uuid);
    }
    function fail(error)
    {
        alert(JSON.stringify(error));
    }
}

function init(){
    var $permissions = $('#permissions');
    for(var permission in cordova.plugins.diagnostic.runtimePermission){
        var $permission = $('#template .permission').clone();
        $permission.addClass(permission);
        $permission.find('.name').text(underscoreToSpace(permission));
        $permissions.append($permission);
        $permission.find('button').on("click", requestPermission);
        allPermissions.push(permission);
    }
    checkPermissions();
}

function showAlert(title, text){
    navigator.notification.alert(text, null, title);
}

function underscoreToSpace(value){
    return value.replace(/_/g," ");
}

function spaceToUnderscore(value){
    return value.replace(/ /g,"_");
}

function checkPermissions(){
    cordova.plugins.diagnostic.getPermissionsAuthorizationStatus(onCheckPermissions, onCheckPermissionsError, allPermissions);
}

function onCheckPermissions(statuses){
    for(var permission in statuses){
        var $permission = $('#permissions .'+permission),
            status = statuses[permission];
        $permission.find('.status').text(underscoreToSpace(status));
        if(status == "GRANTED" || status == "DENIED_ALWAYS"){
            $permission.find('button').hide();
        }
    }
}

function onCheckPermissionsError(error){
    showAlert("Error checking permissions", "An error occurred while checking permissions: "+error);
}

function requestPermission(){
    var permission = spaceToUnderscore($(this).parents('tr').find('.name').text());
    $('#requesting').show();
    cordova.plugins.diagnostic.requestRuntimePermission(onRequestPermission.bind(this, permission), onRequestPermissionError.bind(this, permission), permission);
}

function onRequestPermission(permission, status){
    $('#requesting').hide();
    console.log(permission+" is "+status);
    checkPermissions();
}

function onRequestPermissionError(permission, error){
    $('#requesting').hide();
    showAlert("Error requesting permission", "Ane error occurred while request permission '"+permission+"': "+error);
}

$(document).on("deviceready", onDeviceReady);
