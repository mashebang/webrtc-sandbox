const CONFIG = {
    devices: {},
    videoDeviceId: 'default',
    videoGroupId: 'default',
    audioDeviceId: 'default',
    audioGroupId: 'default'
}

function getMedia() {
    console.log(CONFIG)
    const constraints = {
        video: {
            deviceId: CONFIG.videoDeviceId,
            groupId: CONFIG.videoGroupId
        },
        audio: {
            deviceId: CONFIG.audioDeviceId,
            groupId: CONFIG.audioGroupId
        }
    }

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        const video = document.getElementById('video');
        console.log(stream)

        if ('srcObject' in video) {
            video.srcObject = stream;
        } else {
            // Avoid using this in new browsers, as it is going away.
            video.src = URL.createObjectURL(stream);
        }

        createAudioAnalyser(stream)
    })
}

function generateOption(device) {
    const option = document.createElement('option')
    option.setAttribute('value', device.deviceId)
    option.append(device.label || device.deviceId)
    return option
}

async function updateDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    CONFIG.devices = devices.reduce((acc, device) => {
        acc[device.kind].push(device)
        return acc
    }, { audiooutput: [], audioinput: [], videoinput: [], })
    
    renderConfig()
}

function renderConfig() {
    CONFIG.devices.audioinput
        .map(generateOption)
        .forEach(o => document.querySelector('#audio-input-devices').append(o))

    CONFIG.devices?.audiooutput
        .map(generateOption)
        .forEach(o => document.querySelector('#audio-output-devices').append(o))
    // TODO@mashebang: make audiooutput work
    CONFIG.devices.videoinput
        .map(generateOption)
        .forEach(o => document.querySelector('#video-devices').append(o))

}
