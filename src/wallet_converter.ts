import bs58 from 'bs58';
import * as prompt from 'prompt-sync';

export function walletToBase58(): void {
    const wallet = Uint8Array.from([]);
    const base58 = bs58.encode(wallet);
    console.log("Encoded base58 string:", base58);
}