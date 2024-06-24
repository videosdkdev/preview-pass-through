import uitoolkit from './@zoom/videosdk-ui-toolkit/index.js'

var sessionContainer = document.getElementById('sessionContainer')
var authEndpoint = 'https://or116ttpz8.execute-api.us-west-1.amazonaws.com/default/videosdk'
var config = {
    videoSDKJWT: '',
    sessionName: 'test',
    userName: 'JavaScript',
    sessionPasscode: '123',
    features: ['preview', 'video', 'audio', 'share', 'chat', 'users', 'settings'],
    options: { init: {}, audio: {}, video: {}, share: {}},
    virtualBackground: {
        allowVirtualBackground: true,
        allowVirtualBackgroundUpload: true,
        virtualBackgrounds: ['https://images.unsplash.com/photo-1715490187538-30a365fa05bd?q=80&w=1945&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D']
  }
};
var role = 1

window.getVideoSDKJWT = getVideoSDKJWT

function getVideoSDKJWT() {
    document.getElementById('join-flow').style.display = 'none'

    fetch(authEndpoint, {
        method: 'POST',
        body: JSON.stringify({
            sessionName:  config.sessionName,
            role: role,
        })
    }).then((response) => {
        return response.json()
    }).then((data) => {
        if(data.signature) {
            console.log(data.signature)
            config.videoSDKJWT = data.signature
            joinSession()
        } else {
            console.log(data)
        }
    }).catch((error) => {
        console.log(error)
    })
}

function joinSession() {
    uitoolkit.joinSession(sessionContainer, config)

    uitoolkit.onSessionClosed(sessionClosed)
}

var sessionClosed = (() => {
    console.log('session closed')
    uitoolkit.closeSession(sessionContainer)

    document.getElementById('join-flow').style.display = 'block'
})
