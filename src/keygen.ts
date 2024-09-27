import { Keypair } from '@solana/web3.js';

let kp = Keypair.generate();

console.log(`You've genereated a new Solana wallet:${kp.publicKey.toBase58()}`);
console.log(`[${kp.secretKey}]`)