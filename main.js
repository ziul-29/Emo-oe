previsao1 = ""
previsao2 = ""

Webcam.set({
    width: 350,
    height: 300,
    imageFormat: "png",
    pngQuality: 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function tirarfoto() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';

    });
}
console.log(ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/J2Ip11PDF/model.json", modelLoaded);

function modelLoaded() {
    console.log("modelLoaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speakData1 = "Eu acho que você está: " + previsao1;
    speakData2 = "Eu também acho que você está: " + previsao2;
    utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult)
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results)
        document.getElementById("resultEmotionName").innerHTML = results[0].label
        document.getElementById("resultEmotionName2").innerHTML = results[1].label
        previsao1 = results[0].label
        previsao2 = results[1].label
        speak()
        if (results[0].label == "feliz") {
            document.getElementById("updateEmoji").innerHTML = "😁"
        }
        if (results[0].label == "triste") {
            document.getElementById("updateEmoji").innerHTML = "😔"
        }
        if (results[0].label == "irritado") {
            document.getElementById("updateEmoji").innerHTML = "😡"
        }

        if (results[1].label == "feliz") {
            document.getElementById("updateEmoji2").innerHTML = "😁"
        }
        if (results[1].label == "triste") {
            document.getElementById("updateEmoji2").innerHTML = "😔"
        }
        if (results[1].label == "irritado") {
            document.getElementById("updateEmoji2").innerHTML = "😡"
        }
    }
}