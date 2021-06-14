function createAudioAnalyser(stream) {
    const audioContext = new AudioContext()
    const source = audioContext.createMediaStreamSource(stream)
    const analyser = new AnalyserNode(audioContext, {
        fftSize: 2048,
        maxDecibels: -15,
        minDecibels: -60,
        smoothingTimeConstant: 0.5,
    })


    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);

    // Connect the source to be analysed
    source.connect(analyser);

    // Get a canvas defined with ID "oscilloscope"
    var canvas = document.getElementById("oscilloscope");
    var canvasCtx = canvas.getContext("2d");

    // draw an oscilloscope of the current audio source

    function draw() {

    requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "rgb(0, 255, 0)";

    canvasCtx.beginPath();

    var sliceWidth = canvas.width * 1.0 / bufferLength;
    var x = 0;

    for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 64;
        var y = v * canvas.height / 4;
        
        if (i === 0) {
        canvasCtx.moveTo(x, y);
        } else {
        canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
    }

    draw();

}