# Stealth

**The first email protocol on the blockchain — built on Stellar.**

Stealth is a next-generation email protocol that replaces SMTP's trust-by-DNS model with cryptographic identities anchored on the Stellar network. Every message is signed by a Stellar keypair, addressed to a Stellar account, and settled on-ledger — making spam economically infeasible, phishing cryptographically detectable, and delivery provable.

## Why Stellar

- **Sub-second finality** — messages confirm in 3–5 seconds, fast enough to feel like email.
- **Negligible fees** — fractions of a cent per message enable micro-postage against spam without burdening real users.
- **Built-in identity** — Stellar accounts double as mail addresses (`alice*stealth.xyz` via federation), no separate PKI required.
- **Memo + soroban** — message hashes ride in transaction memos; richer payloads and policies execute in Soroban smart contracts.

## How it works

1. **Identity** — your Stealth address is a Stellar account. Federation resolves human-readable handles to public keys.
2. **Postage** — sending a message submits a tiny payment + memo (hash of the encrypted payload) to the recipient's account.
3. **Delivery** — the encrypted body is stored off-chain (IPFS / recipient inbox server) and fetched using the on-chain hash as proof of authenticity.
4. **Verification** — clients verify the Stellar signature, the on-chain memo, and the payload hash before rendering.

## Features

- End-to-end encryption (Curve25519) with Stellar-anchored key discovery
- Provable delivery and read receipts via Soroban contracts
- Spam-resistant by design — every message carries verifiable postage
- Compatible bridge to legacy SMTP for gradual adoption
- Open protocol, open client

## This repository

This repo contains the Stealth reference web client — a glassmorphic, dark-graphite UI inspired by Proton Mail, built with React, TanStack Start, Tailwind, and Framer Motion.

## Status

Protocol draft: v0.1 · Reference client: preview
