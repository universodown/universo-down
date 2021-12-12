
function encodeImgToBase64(file) {
    var selectedfile =file;
    if (selectedfile.length > 0) {
      var imageFile = selectedfile[0];
      var fileReader = new FileReader();
      fileReader.onload = function (fileLoadedEvent) {
        var srcData = fileLoadedEvent.target.result;
        var newImage = document.createElement("img");
        newImage.src = srcData;
        document.getElementById("txt").value = newImage.outerHTML;
      };
      fileReader.readAsDataURL(imageFile);
    }
  } 
  function previewImg() {
    photo.onchange = evt => {
      const [file] = photo.files
      if (file) {
        preview.src = URL.createObjectURL(file)
      }
    }
  }