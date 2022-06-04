export declare namespace CryptoTypes {
    export interface Participant {
        publicKey: string;
    }

    export interface KeyPair {
        privateKey: string;
        publicKey: string;
    }

    export interface EncryptParams {
        message: string;
        symKey: string;
        iv?: string;
    }

    export interface DecryptParams {
        symKey: string;
        encoded: string;
    }

    export interface EncodingParams {
        sealed: Uint8Array;
        iv: Uint8Array;
    }
}
