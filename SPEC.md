# Proof-of-Intelligence Explorer Spec

## 1. Product Identity

- Product name: Proof-of-Intelligence Explorer
- One-line pitch: Verify that a 0G iNFT agent actually contains encrypted intelligence, persistent memory, compute-backed runs, and replayable behavior, or whether it is just metadata.
- Primary sponsor target: 0G
- Public product category: verification, certification, and badge platform for 0G iNFT agents

## 2. Core Problem

Many iNFTs can be metadata pointers with no verifiable embedded intelligence. Buyers, builders, judges, marketplaces, frameworks, and developers need a public way to check whether an agent has encrypted intelligence, persistent memory, compute history, and replayable behavior. Proof-of-Intelligence Explorer is the verification layer for those claims.

## 3. Core Users

- iNFT buyers and users
- 0G agent builders
- hackathon judges
- marketplaces
- agent frameworks
- developers using the SDK, CLI, API, and badge

## 4. Core Product Flows

- Verify any iNFT/token by chain ID, contract, and token ID.
- Create a Proof-of-Intelligence Passport.
- View a public Passport page.
- Replay an agent run.
- Export or view a certificate.
- Use a public badge and API.
- Integrate through SDK and CLI.
- Compare seeded CodeGuardian and FakeAgent demos.

## 5. Architecture

- `apps/explorer`: hosted Next.js App Router product, public pages, APIs, admin UI, badge endpoint.
- `packages/sdk`: manifest schemas, canonical hashing, adapters, verifier, passport builder, recorder helpers.
- `packages/cli`: builder CLI for verification, passport creation, replay, proof export, live scripts.
- `packages/agent-runtime`: CodeGuardian runtime, trace generation, replay.
- `contracts`: demo iNFT and Proof-of-Intelligence registry contracts.
- `examples/codeguardian`: deterministic fixture target.
- `docs`: product, proof model, API, SDK, create-passport, security, 0G integration, demo script.
- `scripts`: guarded live deployment, storage, compute, seed, and Vercel sync helpers.
- Vercel: production hosting.
- 0G adapters: Chain, Storage, Compute, optional DA, optional ENS.

## 6. Proof Model

The proof model is anchored by an iNFT token and a Proof-of-Intelligence manifest. The manifest points to an encrypted intelligence bundle, memory/current-state evidence, immutable run trace, compute run history, certificate, optional DA bundle, and optional ENS metadata.

## 7. Verification Tiers

- Tier 0: unsupported / not an iNFT
- Tier 1: token exists and ownership readable
- Tier 2: valid Proof-of-Intelligence manifest
- Tier 3: intelligence bundle exists and root matches
- Tier 4: memory/current state verified
- Tier 5: compute history and executable behavior trace verified
- Tier 6: replayable certified agent

## 8. Source Labels

- `live`: fetched from live 0G chain, storage, compute, or registry evidence.
- `hybrid`: live chain plus deterministic hosted evidence, or partially live evidence.
- `mock`: deterministic local/demo fixture only.

Labels must be shown honestly in UI, API, CLI, docs, and certificates.

## 9. Hard Invariants

- Certificate token contract and token ID must match the verified iNFT.
- `manifestRoot` is `hashManifestForRoot(manifest)`, the canonical SHA-256 hash of the manifest with `storage.manifestRoot` omitted before hashing.
- Intelligence root must match the encrypted intelligence bundle.
- Memory root must match memory/current-state evidence.
- Run root must match the canonical run trace.
- Compute run IDs in the manifest must exist in compute evidence.
- FakeAgent never reaches a high tier.
- Arbitrary token with no manifest returns a low-tier or unsupported report, never CodeGuardian fixture data.
- Browser code never receives private keys, admin tokens, bearer tokens, encryption keys, mnemonics, or generated wallet secrets.

## 10. Hosted Product Requirements

- Vercel production site works without local setup.
- Public verification pages and API work for seeded demos and arbitrary inputs.
- Public badge route works.
- Create Passport flow exists and can compute/generate proof artifacts in hybrid/testnet mode.
- Admin writes are guarded and disabled unless configured.
- Live/hybrid/mock labels are explicit.

## 11. Security Invariants

- `.env` and secret-bearing local files are never committed.
- No secret uses a `NEXT_PUBLIC_` prefix.
- Private keys are server-only.
- Admin routes require `POI_ADMIN_TOKEN`.
- No arbitrary calldata or raw transaction signing is accepted from the browser.
- Writes are 0G testnet only.
- The product never hides mock evidence as live evidence.

## 12. Non-Goals

- No generic NFT marketplace.
- No generic chatbot.
- No finance or trading features.
- No Uniswap, Gensyn, or KeeperHub scope unless intentionally added later.
- No overclaiming hybrid or mock evidence as live.

## 13. Acceptance Criteria

- Public hosted product works.
- Dynamic token verification works.
- CodeGuardian verifies high-tier.
- FakeAgent verifies low-tier.
- Create Passport flow works at least in hybrid/testnet mode.
- Public API works.
- Badge works.
- Replay works.
- Certificate works.
- SDK and CLI work.
- Tests and build pass.
- No secrets are tracked.
- README, SUBMISSION, and docs are accurate.
