import * as wccrypto from '@walletconnect/utils/dist/esm'

interface KeyPair {
    privateKey: string;
    publicKey: string;
}

export function generateKeyPair(): KeyPair {
    return wccrypto.generateKeyPair()
}

export function encrypt(message: string, symKey: string) {
    return wccrypto.encrypt({ message, symKey })
}

export function decrypt(encoded: string, symKey: string) {
    return wccrypto.decrypt({ encoded, symKey })
}
