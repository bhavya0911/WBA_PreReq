import { Transaction, SystemProgram, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";
import wallet from "../wallets/dev-wallet.json";

const from = Keypair.fromSecretKey(new Uint8Array(wallet));
const to = new PublicKey("EyaWWNdnwbLLAvDmnJrdgPMfqRmw8UXhLcY21XTJhJ5m");
const connection = new Connection("https://api.devnet.solana.com");

(async () => {
    try {
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to,
                lamports: LAMPORTS_PER_SOL / 100,
            })
        );
        transaction.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
        transaction.feePayer = from.publicKey;
        const signature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [from]
        );
    
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    
        const balance = await connection.getBalance(from.publicKey);
        const transaction1 = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to,
                lamports: balance,
            })
        );
        transaction1.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
        transaction1.feePayer = from.publicKey;
        const fee = (await connection.getFeeForMessage(transaction1.compileMessage(), 'confirmed')).value || 0;
        transaction1.instructions.pop();
        transaction1.add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to,
                lamports: balance - fee,
            })
        );
        const signature1 = await sendAndConfirmTransaction(
            connection,
            transaction1,
            [from]
        );
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${signature1}?cluster=devnet`);
    } catch (error) {
        console.error(`Oops, something went wrong: ${error}`);
    }
}) ();