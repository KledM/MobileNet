var firebaseConfig = {
    apiKey: "AIzaSyBZ6ow6AoFocsp7WMU0ML5j8wBAZgywl00",
    authDomain: "mobilenet-project-4036c.firebaseapp.com",
    databaseURL: "https://mobilenet-project-4036c.firebaseio.com",
    projectId: "mobilenet-project-4036c",
    storageBucket: "mobilenet-project-4036c.appspot.com",
    messagingSenderId: "821345828347",
    appId: "1:821345828347:web:f360d8053fd210c77c1f5e",
    measurementId: "G-DG9T7TRY3K"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log(firebase)
  console.log(firebaseConfig);

Webcam.set({
width:310,
height:300,
image_format:'png',
png_quailty:90,
constraints:{
    facingMode: "environment"
}
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_picture(){
    camera = document.getElementById("camera").src;
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src ="'+data_uri+'">';
    });
    img = document.getElementById("captured_image");
    var ref = firebase.storage().ref();
    ref.child('Photos/'+new Date() + '-' + 'base64').putString(img.src,'data_url').then(function() {
        console.log("ml5-version : " + ml5.version)
});
}

classifier = ml5.imageClassifier('MobileNet',modelloaded)
function modelloaded(){
    console.log("Ml5 Model Loaded");
}
function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img , gotResult)
}
function gotResult(error,result){
if(error){
    console.error("The Error Is : " + error);
}else{
    console.log(result);
    document.getElementById("object_name").innerHTML=result[0].label;
}
}
  