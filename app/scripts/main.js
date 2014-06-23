'use strict';

function displayFiles(files) {
    var result = '';
    var file;
    for (var i = 0; file = files[i]; i++) {
        // if the file is not an image, continue
        if (!file.type.match('image.*')) {
            continue;
        }

        var reader = new FileReader();
        reader.onload = function(e) {
            // return function(evt) {
            //     // var div = document.createElement('div');
            //     $('#filesInfo').html('<img style="width: 300px;" src="' + tFile.result+ '" />');
            //     // $('#filesInfo').html('<img style="width: 300px;" src="' + evt.target.result + '" />');
            //     $('#upload_image').hide();
            //     // document.getElementById('filesInfo').innerHTML(div);
            // };


            // Create a new image.
            var img = new Image();
            // Set the img src property using the data URL.
            img.src = reader.result;
            img.style = "width:300px";

            // Add the image to the page.
            $('#filesInfo').html(img);
            $('#upload_image').hide();


        };
        reader.readAsDataURL(file);
    }

}

function fileSelect(evt) {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var files = evt.target.files;
        displayFiles(files);

    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
}

function fileDropped(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var files = evt.dataTransfer.files;

        displayFiles(files);
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
$('#capture_btn').click(function() {
    $('#upload_image').hide();
    $('#capture').show();
    var streaming = false;
    var video = document.querySelector('video');
    var canvas = document.querySelector('canvas');
    var photo = document.querySelector('photo');
    var width = 860;
    var height = 0;

    var ctx = canvas.getContext('2d');
    var localMediaStream = null;

    function snapshot() {
        if (localMediaStream) {
            ctx.drawImage(video, 0, 0);
            // "image/webp" works in Chrome.
            // Other browsers will fall back to image/png.
            document.querySelector('img').src = canvas.toDataURL('image/webp');
        }
    }

    video.addEventListener('click', snapshot, false);

    // Not showing vendor prefixes or code that works cross-browser.
    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;



    navigator.getUserMedia({
            video: true,
            audio: false
        }, function(stream) {
            if (navigator.mozGetUserMedia) {
                video.mozSrcObject = stream;
            } else {
                var vendorURL = window.URL || window.webkitURL;
                video.src = vendorURL.createObjectURL(stream);
            }
            video.play();
        },
        function(err) {
            console.log("An error occured! " + err);
        }
    );

    video.addEventListener('canplay', function(ev) {
        if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width);
            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            streaming = true;
        }
    }, false);

    function takepicture() {
        // canvas.width = width;
        // canvas.height = height;
        canvas.getContext('2d').drawImage(video, 0, 0, width, height);
        var data = canvas.toDataURL('image/png');

        // Create a new image.
        var img = new Image();
        // Set the img src property using the data URL.
        img.src = data;
        img.style = "width:300px";

        // Add the image to the page.
        // $('#captured_image').html(img);
        $('#filesInfo').html(img);
        $('#capture').hide();

        // photo.setAttribute('src', data);
    }

    startbutton.addEventListener('click', function(ev) {
        takepicture();
        ev.preventDefault();
    }, false);


});
