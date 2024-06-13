type TAuthorizationStep = 'wrong_network' | // network is not supported in current version
                          'initial' | // initial state
                          'connect' | // can be connected
                          'login' | // can be authorized
                          'store-key' | // can generate key
                          'no_injected_extension' | // no extension installed
                          'authorized' | // authorized
                          'wrong_device' // mobile device

export default TAuthorizationStep
