# ETHGlobal Submission

## Project

**CodeGuardian iNFT**

CodeGuardian iNFT is an autonomous 0G Agentic ID / ERC-7857-style code-review agent with embedded encrypted intelligence, evolving persistent memory, compute-backed self-critique, replayable behavior traces, dynamic skill/policy upgrades, authorized execution semantics, and a Proof-of-Intelligence certificate.

Supporting product/proof layer: **AgentProof — Proof-of-Intelligence Explorer for 0G iNFT agents**.

Winning frame: **CodeGuardian is the autonomous iNFT agent. AgentProof is how judges verify it is real.**

## Links

- Live demo URL: https://proof-of-intelligence-explorer.vercel.app
- Judge Mode: https://proof-of-intelligence-explorer.vercel.app/judge
- Agent Console: https://proof-of-intelligence-explorer.vercel.app/agent/codeguardian/console
- Safe diff review: https://proof-of-intelligence-explorer.vercel.app/agent/codeguardian/review
- Public GitHub: https://github.com/fefe102/CodeGuardian-iNFT
- Demo video: added in ETHGlobal dashboard
- Minted iNFT explorer link: https://chainscan-galileo.0g.ai/address/0xa390c79f21a3b4f62f4797308f50f8ff9ea4f4c9
- CodeGuardian Passport: https://proof-of-intelligence-explorer.vercel.app/passport/16602/0xa390c79f21a3b4f62f4797308f50f8ff9ea4f4c9/1
- Certificate: https://proof-of-intelligence-explorer.vercel.app/certificate/poi-cert-codeguardian-001
- Badge SVG: https://proof-of-intelligence-explorer.vercel.app/badge/16602/0xa390c79f21a3b4f62f4797308f50f8ff9ea4f4c9/1.svg

## Agentic ID / iNFT Deployment

- Chain: 0G Galileo
- Chain ID: `16602`
- CodeGuardian iNFT contract: `0xa390c79f21a3b4f62f4797308f50f8ff9ea4f4c9`
- CodeGuardian token ID: `1`
- Owner: `0x053B860f329C9e4549D23dc8Aadf1116b99F1233`
- Proof registry: `0x90d7f68cbf2a860f7b2c54548095fcb72d61b9af`
- Certificate registry record: `4`
- FakeAgent control token ID: `2`

ChainScan links to the contract page; token ID `1` is the CodeGuardian iNFT. Token-specific proof is available in the AgentProof passport page.

## Proof That Intelligence And Memory Are Embedded

- Manifest root: `sha256:228dab69761d19637632d73801a34d899064ce51f3ffd82d6fc182bb2432aee4`
- Encrypted intelligence bundle root: `sha256:6289903e00f2e42448eb3cad30d322fcd4e1b3e3af54dd37f35a863a864f0bcd`
- Latest memory root: `sha256:a2398bbb0b7b561c7fa891cf7a808f81991996cc1bce29b01dc0d6010ac11c72`
- Latest run root: `sha256:59f86560dcb00747fcb04368daeb8d0318f75ac4928180636db1e37e445362e9`
- Certificate ID: `poi-cert-codeguardian-001`
- Compute run IDs: `zg-hybrid-analysis-001`, `zg-hybrid-critic-001`, `zg-hybrid-analysis-002`, `zg-hybrid-critic-002`, `zg-live-analysis-95bb0f30184d`, `zg-live-critic-a83aa740043a`
- 0G Storage tx sequences: manifest `76442`, intelligence `68661`, memory `76446`, run `76448`, compute bundle `76449`, certificate `76450`

The public intelligence artifact is AES-256-GCM encrypted demo content. It contains only safe fixture plaintext before encryption and commits no real encryption key.

## Autonomous Agent Behavior

CodeGuardian has three sequential certified runs:

1. `codeguardian-run-001`: unsafe JSON parsing.
2. `codeguardian-run-002`: missing authorization guard.
3. `codeguardian-run-003`: unchecked async side effect.

Each run includes an allowlisted fixture, analysis, issue, patch, critic/self-review, memory delta, memory root, trace root, compute records, and certificate reference. The Agent Console shows memory root evolution from v1 to v3.

Dynamic upgrade:

- `critic-loop v0.1.0 -> v0.1.1`
- Reason: after detecting a missing authorization guard, CodeGuardian added an authorization-check heuristic to future critic reviews.
- Hashes are deterministic SHA-256 hashes of files under `examples/codeguardian/skills`.

## 0G Usage

**0G Chain:** live CodeGuardian Agentic ID / ERC-7857-style iNFT mint, root accessors, registry, passport, and certificate records on Galileo testnet.

**0G Storage:** encrypted intelligence, memory, run trace, compute bundle, and certificate artifacts are uploaded through 0G Storage SDK and recorded with root hashes, tx hashes, tx sequences, and byte lengths.

**0G Compute:** analysis and critic records use 0G Compute-compatible run records and adapter paths. Runs 001-002 are deterministic hybrid records; Run 003 includes live 0G Compute analysis and critic records. The compute bundle itself is uploaded as a live 0G Storage proof object.

**0G DA, optional:** AgentProof can export a proof bundle for DA workflows.

**ENS:** not targeted for this submission. Existing ENS fields are mock/compatibility hooks only; no live ENS identity, subname, gating, or discovery flow is claimed.

## AgentProof / Reusable Tooling

AgentProof includes:

- hosted explorer and Agent Console
- dynamic verifier for arbitrary 0G tokens
- SDK verifier, manifest builder, recorder, encryption helper, and proof exporter
- CLI for verify, run, replay, passport draft, proof export, live deploy, and env sync
- registry contracts and ERC-7857-style demo iNFT contract
- public API and badge endpoint
- safe pasted-diff review flow with no arbitrary code execution

FakeAgent is the negative control and remains low-tier because it lacks a valid manifest, encrypted intelligence, memory, compute, trace, and certificate evidence.

## Team / Contact

Provided in the ETHGlobal dashboard; omitted from the public repository.

## ETHGlobal Submission Fields

Project name:
CodeGuardian iNFT

Short description:
CodeGuardian iNFT is an autonomous 0G iNFT code-review agent. Its embedded encrypted intelligence, evolving persistent memory, compute-backed critic loop, replayable behavior traces, dynamic policy upgrade, and Proof-of-Intelligence certificate are verified by AgentProof.

Live demo:
https://proof-of-intelligence-explorer.vercel.app

Judge Mode:
https://proof-of-intelligence-explorer.vercel.app/judge

Public GitHub:
https://github.com/fefe102/CodeGuardian-iNFT

Demo video:
Added in ETHGlobal dashboard.

0G Chain:
0G Galileo, chain ID `16602`

Contract deployment addresses:
- CodeGuardian iNFT contract: `0xa390c79f21a3b4f62f4797308f50f8ff9ea4f4c9`
- Proof registry: `0x90d7f68cbf2a860f7b2c54548095fcb72d61b9af`

Minted iNFT / Agentic ID:
- Contract: `0xa390c79f21a3b4f62f4797308f50f8ff9ea4f4c9`
- Token ID: `1`
- Owner: `0x053B860f329C9e4549D23dc8Aadf1116b99F1233`
- ChainScan: https://chainscan-galileo.0g.ai/address/0xa390c79f21a3b4f62f4797308f50f8ff9ea4f4c9
- Passport: https://proof-of-intelligence-explorer.vercel.app/passport/16602/0xa390c79f21a3b4f62f4797308f50f8ff9ea4f4c9/1
- 0G Chain tx proofs: 15 live Galileo transaction hashes are recorded in `deployments/0g-galileo.json` and exposed on Judge Mode, Agent Console, Passport, and Certificate pages as ChainScan links.

Proof intelligence/memory embedded:
- Manifest root: `sha256:228dab69761d19637632d73801a34d899064ce51f3ffd82d6fc182bb2432aee4`
- Encrypted intelligence root: `sha256:6289903e00f2e42448eb3cad30d322fcd4e1b3e3af54dd37f35a863a864f0bcd`
- Latest memory root: `sha256:a2398bbb0b7b561c7fa891cf7a808f81991996cc1bce29b01dc0d6010ac11c72`
- Latest run root: `sha256:59f86560dcb00747fcb04368daeb8d0318f75ac4928180636db1e37e445362e9`
- Compute run IDs: `zg-hybrid-analysis-001`, `zg-hybrid-critic-001`, `zg-hybrid-analysis-002`, `zg-hybrid-critic-002`, `zg-live-analysis-95bb0f30184d`, `zg-live-critic-a83aa740043a`
- Certificate ID: `poi-cert-codeguardian-001`
- Certificate URL: https://proof-of-intelligence-explorer.vercel.app/certificate/poi-cert-codeguardian-001
- 0G Storage tx sequences: manifest `76442`, intelligence `68661`, memory `76446`, run `76448`, compute bundle `76449`, certificate `76450`

Protocol features used:
- 0G Chain for iNFT / Agentic ID, registry, passport, and certificate roots.
- 0G Storage for encrypted intelligence, memory, traces, compute bundle, and certificate proof objects.
- 0G Compute for CodeGuardian analysis/critic evidence where configured/live; Run 003 has live 0G Compute records and Runs 001-002 remain deterministic hybrid history.
- Optional 0G DA export support.
- ENS is not targeted in this submission; existing hooks are mock/compatibility only.

Team/contact info:
Provided in ETHGlobal dashboard; omitted from public repository.

## Setup

```bash
pnpm install
pnpm dev
pnpm final:check
```

See [README.md](README.md), [DEPLOYMENT.md](DEPLOYMENT.md), [docs/0g-integration.md](docs/0g-integration.md), and [docs/demo-script.md](docs/demo-script.md).
