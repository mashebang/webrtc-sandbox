addEventListener("DOMContentLoaded", () => {
    getMedia()
    updateDevices()
})

function changeInput(el) {
    const attrName = el.id === 'audio-devices' ? 'audioDeviceId' : 'videoDeviceId';
    CONFIG[attrName] = el.value
    getMedia()
}