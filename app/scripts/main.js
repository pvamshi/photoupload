'use strict';

function displayFiles(files, evt) {
    var result = '';
    var file;
    for (var i = 0; file = files[i]; i++) {
        // if the file is not an image, continue
        if (!file.type.match('image.*')) {
            continue;
        }

        var reader = new FileReader();
        reader.onload = (function(tFile) {
            return function(evt) {
                // var div = document.createElement('div');
                $('#filesInfo').html('<img style="width: 300px;" src="' + evt.target.result + '" />');
                $('#upload_image').hide();
                // document.getElementById('filesInfo').innerHTML(div);
            };
        }(file));
        reader.readAsDataURL(file);
    }

}

function fileSelect(evt) {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var files = evt.target.files;
        displayFiles(files, evt);

    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
}

function fileDropped(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var files = evt.dataTransfer.files;

        displayFiles(files, evt);
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
}


function dragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
}

var dropTarget = document.getElementById('dropTarget');
dropTarget.addEventListener('dragover', dragOver, false);
dropTarget.addEventListener('drop', fileDropped, false);

document.getElementById('filesToUpload').addEventListener('change', fileSelect, false);
