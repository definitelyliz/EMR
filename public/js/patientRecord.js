const deleteFile = document.getElementById("deleteFile");
const unconfirm = document.getElementById("unconfirm");
var fileDiv = document.getElementById('fileDiv');

deleteFile.addEventListener('click', showConfirmBox);
unconfirm.addEventListener('click', closeConfirmBox);

function showConfirmBox(consultID, fileID) {
    var confirmBox = document.createElement('form');

    consultID = consultID.toString();
    fileID = fileID.toString();
    confirmBox.setAttribute('action', `/delete_file/${consultID}/${fileID}?_method=delete`);
    confirmBox.setAttribute('style', "display: inline;");
    confirmBox.setAttribute('method', `post`);
    confirmBox.innerHTML =

        '<div class="confirm-box" id="confirm-box">' +
        '   <div onclick="closeConfirmBox()"' +
        'class="close">' +
        '&#10006;' +
        '</div>' +
        '<br>' +

        '<h2>CONFIRMATION</h2>' +

        '<p>Delete the uploaded file?</p>' +
        '<button id="yes">Yes</button>' +
        '<button type="button" id="unconfirm" onclick="closeConfirmBox()">No</button>' +
        '</div>' +
        '</div>'

    fileDiv.appendChild(confirmBox);
}
function closeConfirmBox() {
    var elem = document.getElementById("confirm-box");
    elem.remove();


}
      
                                                                    
                                            
                                                                
                                                            
                                                                
                                                            
                                                                       
                                                

