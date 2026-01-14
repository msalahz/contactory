# Verifiable Credentials Technical Research

**Created**: 2026-01-12
**Status**: Research
**Purpose**: Technical evaluation for implementing W3C Verifiable Credentials in Contactory

## Executive Summary

This document evaluates the technical landscape for implementing Verifiable Credentials (VCs) and Decentralized Identifiers (DIDs) in Contactory. The goal is to select the right libraries, standards, and architecture for a TypeScript/React application deployed on Cloudflare Workers.

**Key Recommendation**: Start with `@veramo/core` for VC operations and `did:key` for user DIDs. This provides the best balance of maturity, TypeScript support, and flexibility.

---

## 1. W3C Verifiable Credentials 2.0 Overview

### What Changed in VC 2.0 (May 2025)

The [W3C VC Data Model 2.0](https://www.w3.org/TR/vc-data-model-2.0/) became a W3C Recommendation in May 2025, bringing significant improvements:

| Feature              | VC 1.1         | VC 2.0                    |
| -------------------- | -------------- | ------------------------- |
| JSON-LD Required     | Yes            | No (plain JSON supported) |
| Proof Formats        | Embedded only  | External proofs supported |
| Securing Mechanism   | LD-Proofs only | JWT, COSE, Data Integrity |
| Developer Experience | Complex        | Much simpler              |

**Key Improvement**: VC 2.0 can be represented as plain JSON with JWT signatures, making it accessible to any web developer without specialized RDF/JSON-LD knowledge.

### VC Data Model Structure

```json
{
  "@context": ["https://www.w3.org/ns/credentials/v2"],
  "type": ["VerifiableCredential", "ContactCredential"],
  "issuer": "did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK",
  "validFrom": "2026-01-12T00:00:00Z",
  "credentialSubject": {
    "id": "did:key:z6MkpTHR8VNsBxYAAWHut2Geadd9jSwuBV8xRoAnwWsdvktH",
    "name": "John Smith",
    "email": "john@example.com",
    "jobTitle": "Software Engineer",
    "organization": "Acme Corp"
  }
}
```

### Securing Mechanisms

VC 2.0 supports multiple securing mechanisms:

1. **VC-JWT (Recommended for Contactory)**
   - Uses standard JWT format
   - Easy to implement with existing JWT libraries
   - Wide support across platforms
   - Best for interoperability

2. **Data Integrity Proofs**
   - Embedded cryptographic proofs
   - More complex to implement
   - Better for advanced use cases (selective disclosure)

3. **COSE (CBOR Object Signing)**
   - Binary format, smaller payloads
   - Used in EU Digital Wallet
   - Required for eIDAS 2.0 compliance

---

## 2. Decentralized Identifiers (DIDs)

### DID Method Comparison

| DID Method | Example                  | Pros                                                  | Cons                          | Use Case            |
| ---------- | ------------------------ | ----------------------------------------------------- | ----------------------------- | ------------------- |
| `did:key`  | `did:key:z6Mk...`        | No network required, instant creation, self-contained | Key rotation difficult        | Individual users    |
| `did:web`  | `did:web:example.com`    | Human-readable, DNS-based trust                       | Requires hosting, centralized | Organizations       |
| `did:ion`  | `did:ion:EiD...`         | Decentralized (Bitcoin), good key rotation            | Slow updates, complex         | Long-term identity  |
| `did:pkh`  | `did:pkh:eip155:1:0x...` | Blockchain-based, crypto wallets                      | Blockchain dependency         | Web3 users          |
| `did:jwk`  | `did:jwk:eyJr...`        | Self-contained JWK, standard                          | No key rotation               | Temporary/ephemeral |

### Recommendation for Contactory

**Phase 1**: `did:key` for individuals

- Zero infrastructure required
- Instant creation in browser
- Perfect for MVP

**Phase 2**: `did:web` for organizations

- `did:web:contactory.com:orgs:acme-corp`
- Verifiable via DNS
- Professional appearance

**Future**: EU Wallet interoperability

- Will need to support `did:ebsi` or equivalent
- eIDAS 2.0 will define requirements

### DID Document Structure

```json
{
  "@context": ["https://www.w3.org/ns/did/v1"],
  "id": "did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK",
  "verificationMethod": [
    {
      "id": "did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK#z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK",
      "type": "Ed25519VerificationKey2020",
      "controller": "did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK",
      "publicKeyMultibase": "z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK"
    }
  ],
  "authentication": [
    "did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK#z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK"
  ]
}
```

---

## 3. JavaScript/TypeScript Libraries

### Library Comparison

| Library               | Maintainer             | Stars | VC 2.0  | TypeScript      | Size   | Cloudflare Compatible |
| --------------------- | ---------------------- | ----- | ------- | --------------- | ------ | --------------------- |
| **@veramo/core**      | Veramo                 | 400+  | Yes     | Native          | Medium | Needs adaptation      |
| **@web5/credentials** | TBD (Block)            | 200+  | Yes     | Native          | Small  | Yes                   |
| **@digitalbazaar/vc** | Digital Bazaar         | 150+  | Yes     | Types available | Small  | Yes                   |
| **did-jwt-vc**        | Decentralized Identity | 100+  | Partial | Native          | Small  | Yes                   |
| **@sphereon/ssi-sdk** | Sphereon               | 50+   | Yes     | Native          | Large  | Needs adaptation      |

### Detailed Library Analysis

#### @veramo/core (Recommended)

**Pros**:

- Most mature and battle-tested
- Excellent TypeScript support
- Plugin architecture (use only what you need)
- Active development and community
- Supports multiple DID methods and VC formats
- Good documentation

**Cons**:

- Some features require Node.js APIs (needs polyfills for Cloudflare)
- Larger bundle if using all features
- Learning curve for plugin system

**Installation**:

```bash
pnpm add @veramo/core @veramo/credential-w3c @veramo/did-manager @veramo/key-manager @veramo/did-resolver
```

**Example Usage**:

```typescript
import { createAgent, ICredentialPlugin, IDIDManager } from '@veramo/core'
import { CredentialPlugin } from '@veramo/credential-w3c'
import { DIDManager } from '@veramo/did-manager'
import { KeyManager } from '@veramo/key-manager'

const agent = createAgent<ICredentialPlugin & IDIDManager>({
  plugins: [
    new CredentialPlugin(),
    new DIDManager({
      /* config */
    }),
    new KeyManager({
      /* config */
    }),
  ],
})

// Create a DID
const did = await agent.didManagerCreate({ provider: 'did:key' })

// Issue a VC
const credential = await agent.createVerifiableCredential({
  credential: {
    issuer: { id: did.did },
    credentialSubject: {
      id: 'did:key:z6Mk...',
      name: 'John Smith',
      email: 'john@example.com',
    },
  },
  proofFormat: 'jwt',
})

// Verify a VC
const result = await agent.verifyCredential({ credential })
```

#### @web5/credentials (Alternative)

**Pros**:

- Lightweight, focused on VCs
- Built for browser-first
- Good Cloudflare Workers compatibility
- TBD/Block backing (well-funded)

**Cons**:

- Newer, less battle-tested
- Smaller community
- Tied to Web5 ecosystem

**Example Usage**:

```typescript
import { VerifiableCredential } from '@web5/credentials'

// Create VC
const vc = await VerifiableCredential.create({
  type: 'ContactCredential',
  issuer: issuerDid.uri,
  subject: holderDid.uri,
  data: {
    name: 'John Smith',
    email: 'john@example.com',
  },
})

// Sign as JWT
const vcJwt = await vc.sign({ did: issuerDid })

// Verify
const verifiedVc = await VerifiableCredential.verify({ vcJwt })
```

#### did-jwt-vc (Lightweight Option)

**Pros**:

- Very lightweight
- Focused on JWT-based VCs
- Easy to understand
- Good for simple use cases

**Cons**:

- Less features than Veramo
- Limited DID method support
- No advanced features (selective disclosure)

---

## 4. Cryptography in the Browser

### Web Crypto API

For Cloudflare Workers and browser compatibility, use the Web Crypto API:

```typescript
// Generate Ed25519 key pair (for DIDs)
const keyPair = await crypto.subtle.generateKey(
  { name: 'Ed25519' },
  true, // extractable
  ['sign', 'verify'],
)

// Export public key
const publicKey = await crypto.subtle.exportKey('spki', keyPair.publicKey)

// Sign data
const signature = await crypto.subtle.sign('Ed25519', keyPair.privateKey, data)

// Verify signature
const isValid = await crypto.subtle.verify('Ed25519', keyPair.publicKey, signature, data)
```

### Key Storage Options

| Storage Method           | Security  | Portability | Recommended For |
| ------------------------ | --------- | ----------- | --------------- |
| IndexedDB (encrypted)    | Medium    | Low         | Web app default |
| localStorage (encrypted) | Low       | Low         | Temporary only  |
| Browser extension wallet | High      | Medium      | Power users     |
| Hardware key (WebAuthn)  | Very High | Medium      | Enterprise      |
| Mobile secure enclave    | Very High | Low         | Mobile apps     |

**Recommendation**: Use IndexedDB with encryption for MVP, add hardware key support later.

```typescript
import { openDB } from 'idb'

const db = await openDB('contactory-keys', 1, {
  upgrade(db) {
    db.createObjectStore('keys', { keyPath: 'id' })
  },
})

// Store encrypted private key
await db.put('keys', {
  id: 'primary',
  did: 'did:key:z6Mk...',
  encryptedPrivateKey: '...', // Encrypted with user password
  publicKey: '...',
})
```

---

## 5. Selective Disclosure

### Approach 1: SD-JWT (Recommended for Phase 2)

SD-JWT (Selective Disclosure JWT) allows holders to reveal only specific claims:

```typescript
import { SDJwtVcInstance } from '@sd-jwt/sd-jwt-vc'

const sdjwt = new SDJwtVcInstance({
  hasher: /* SHA-256 hasher */,
  signer: /* Ed25519 signer */
})

// Create credential with selectively disclosable claims
const credential = await sdjwt.issue({
  iss: issuerDid,
  iat: Date.now() / 1000,
  vct: 'ContactCredential',
  name: 'John Smith',      // Always visible
  _sd: ['email', 'phone']  // Selectively disclosable
}, disclosures)

// Holder creates presentation revealing only email
const presentation = await sdjwt.present(
  credential,
  { email: true, phone: false }
)
```

### Approach 2: BBS+ Signatures (Future - Phase 3)

For zero-knowledge proofs, BBS+ signatures allow proving claims without revealing data:

```typescript
// Prove "I work at a Fortune 500" without revealing company
const proof = await createBBSProof({
  credential,
  revealedAttributes: ['name'],
  predicates: [
    {
      attribute: 'company',
      predicate: 'IN',
      value: FORTUNE_500_COMPANIES,
    },
  ],
})
```

**Note**: BBS+ is more complex and should be Phase 3.

---

## 6. Revocation

### Revocation Methods Comparison

| Method               | Latency   | Privacy | Complexity | Standard |
| -------------------- | --------- | ------- | ---------- | -------- |
| Status List 2021     | Low       | High    | Medium     | W3C      |
| Revocation List 2020 | Low       | Medium  | Low        | W3C      |
| OCSP-style           | Real-time | Low     | High       | -        |
| On-chain registry    | Medium    | Low     | High       | -        |

### Recommended: Status List 2021

```json
{
  "@context": ["https://www.w3.org/ns/credentials/v2"],
  "type": ["VerifiableCredential", "ContactCredential"],
  "credentialStatus": {
    "id": "https://contactory.com/status/1#94567",
    "type": "StatusList2021Entry",
    "statusPurpose": "revocation",
    "statusListIndex": "94567",
    "statusListCredential": "https://contactory.com/status/1"
  }
}
```

**Implementation**:

```typescript
// Check revocation status
async function isRevoked(credential: VerifiableCredential): Promise<boolean> {
  const statusListUrl = credential.credentialStatus.statusListCredential
  const index = parseInt(credential.credentialStatus.statusListIndex)

  const statusList = await fetchStatusList(statusListUrl)
  return statusList.getBit(index) === 1
}
```

---

## 7. Architecture for Contactory

### Client-Side (Browser/Mobile)

```
┌─────────────────────────────────────────────────────┐
│                    React App                         │
├─────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │ DID Manager │  │ VC Manager  │  │ Key Store   │  │
│  │ (did:key)   │  │ (issue/     │  │ (IndexedDB) │  │
│  │             │  │  verify)    │  │             │  │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  │
│         │                │                │          │
│  ┌──────┴────────────────┴────────────────┴──────┐  │
│  │              Veramo Agent                      │  │
│  │  (or @web5/credentials)                        │  │
│  └───────────────────────────────────────────────┘  │
│                         │                            │
│  ┌──────────────────────┴──────────────────────┐    │
│  │           Web Crypto API                     │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

### Server-Side (Cloudflare Workers)

```
┌─────────────────────────────────────────────────────┐
│              Cloudflare Workers                      │
├─────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │ VC Verify   │  │ DID Resolve │  │ Revocation  │  │
│  │ Endpoint    │  │ Service     │  │ Registry    │  │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  │
│         │                │                │          │
│  ┌──────┴────────────────┴────────────────┴──────┐  │
│  │           Lightweight VC Library              │  │
│  │  (did-jwt-vc or custom)                       │  │
│  └───────────────────────────────────────────────┘  │
│                         │                            │
│  ┌──────────────────────┴──────────────────────┐    │
│  │           PostgreSQL (via Drizzle)           │    │
│  │  - Received credentials                      │    │
│  │  - Revocation status                         │    │
│  │  - Cached DID documents                      │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

### Data Flow: Sharing a Contact

```
1. User creates DID (client-side, stored in IndexedDB)
   └─> did:key:z6MkhaXgBZDvotDkL...

2. User selects fields to share
   └─> { name: true, email: true, phone: false }

3. Client creates VC with selective disclosure
   └─> Signed JWT with selected claims

4. VC sent to recipient (via link/QR)
   └─> https://contactory.com/c/abc123

5. Recipient's client verifies VC
   └─> Check signature, check revocation

6. Recipient stores contact (with original VC)
   └─> Can re-verify anytime
```

---

## 8. Implementation Roadmap

### Phase 1: Foundation (4-6 weeks)

**Goals**: Basic DID and VC support

1. **Week 1-2**: Set up Veramo integration
   - Install and configure `@veramo/core`
   - Implement `did:key` creation
   - Key storage in IndexedDB

2. **Week 3-4**: VC issuance
   - Create ContactCredential type
   - Issue VCs as JWT
   - Store issued credentials

3. **Week 5-6**: VC verification
   - Verify credential signatures
   - Basic revocation checking
   - "Verified" badge UI

**Deliverables**:

- Users can create a DID
- Users can share contact as VC
- Recipients can verify credentials

### Phase 2: Selective Disclosure (4 weeks)

**Goals**: Privacy-preserving sharing

1. **Week 1-2**: SD-JWT implementation
   - Integrate SD-JWT library
   - Field-level disclosure selection

2. **Week 3-4**: Sharing UI
   - Disclosure selector component
   - Preview shared data
   - Revocation controls

**Deliverables**:

- Users select which fields to share
- Recipients only see disclosed fields

### Phase 3: Advanced Features (6-8 weeks)

**Goals**: Enterprise and compliance

1. **Organizational DIDs** (`did:web`)
2. **Credential issuance for employees**
3. **Audit log with DID signatures**
4. **EU Wallet interoperability research**
5. **ZKP research (BBS+ evaluation)**

---

## 9. Security Considerations

### Threat Model

| Threat                  | Mitigation                              |
| ----------------------- | --------------------------------------- |
| Private key theft       | Never send to server, encrypt at rest   |
| Credential tampering    | Cryptographic signatures                |
| Replay attacks          | Include issuance date, short validity   |
| Phishing (fake issuers) | DID resolution, issuer reputation       |
| Revocation bypass       | Multiple revocation checks, short cache |

### Security Requirements

1. **Private keys NEVER leave device**
   - All signing happens client-side
   - Server never sees private keys

2. **Encrypt keys at rest**
   - User password or biometric to decrypt
   - Use Web Crypto for encryption

3. **Verify before trust**
   - Always verify signatures
   - Check revocation status
   - Validate issuer DID

4. **Short-lived credentials**
   - Default 1-year expiry for contact VCs
   - Shorter for sensitive data

---

## 10. Testing Strategy

### Unit Tests

```typescript
describe('VC Operations', () => {
  it('should create valid did:key', async () => {
    const did = await didManager.create('did:key')
    expect(did).toMatch(/^did:key:z6Mk/)
  })

  it('should issue valid credential', async () => {
    const vc = await vcManager.issue({
      issuer: testDid,
      subject: { name: 'Test', email: 'test@example.com' },
    })
    expect(vc).toHaveProperty('proof')
  })

  it('should verify valid credential', async () => {
    const result = await vcManager.verify(validCredential)
    expect(result.verified).toBe(true)
  })

  it('should reject tampered credential', async () => {
    const result = await vcManager.verify(tamperedCredential)
    expect(result.verified).toBe(false)
  })
})
```

### Integration Tests

```typescript
describe('Contact Sharing Flow', () => {
  it('should share contact with selective disclosure', async () => {
    // Create issuer DID
    const issuerDid = await createDid()

    // Create VC with selective disclosure
    const vc = await shareContact({
      issuer: issuerDid,
      fields: { name: true, email: true, phone: false },
    })

    // Verify recipient can see only disclosed fields
    const verified = await verifyCredential(vc)
    expect(verified.claims.name).toBeDefined()
    expect(verified.claims.email).toBeDefined()
    expect(verified.claims.phone).toBeUndefined()
  })
})
```

---

## 11. References

### Standards

- [W3C VC Data Model 2.0](https://www.w3.org/TR/vc-data-model-2.0/)
- [W3C DID Core 1.0](https://www.w3.org/TR/did-core/)
- [DIF DID Resolution](https://w3c-ccg.github.io/did-resolution/)
- [SD-JWT Specification](https://datatracker.ietf.org/doc/draft-ietf-oauth-selective-disclosure-jwt/)
- [Status List 2021](https://w3c-ccg.github.io/vc-status-list-2021/)

### Libraries

- [Veramo Documentation](https://veramo.io/docs/basics/introduction)
- [Web5 Credentials](https://developer.tbd.website/docs/web5/build/verifiable-credentials/vc-issuance)
- [did-jwt-vc](https://github.com/decentralized-identity/did-jwt-vc)
- [SD-JWT TypeScript](https://github.com/openwallet-foundation-labs/sd-jwt-js)

### EU Regulations

- [eIDAS 2.0 Architecture Reference](https://digital-strategy.ec.europa.eu/en/library/european-digital-identity-wallet-architecture-and-reference-framework)
- [EUDI Wallet Reference Implementation](https://github.com/eu-digital-identity-wallet)

### Tutorials

- [Veramo Getting Started](https://veramo.io/docs/basics/introduction)
- [Building with Web5 Credentials](https://developer.tbd.website/docs/web5/build/verifiable-credentials/)

---

## 12. Decision Log

| Decision           | Option Chosen          | Rationale                                         | Date       |
| ------------------ | ---------------------- | ------------------------------------------------- | ---------- |
| VC Library         | @veramo/core           | Most mature, best TypeScript, plugin architecture | 2026-01-12 |
| Initial DID Method | did:key                | Zero infrastructure, instant creation             | 2026-01-12 |
| VC Format          | JWT                    | Simple, widely supported, good interop            | 2026-01-12 |
| Key Storage        | IndexedDB + encryption | Browser-native, no external deps                  | 2026-01-12 |
| Revocation         | Status List 2021       | W3C standard, privacy-preserving                  | 2026-01-12 |

---

## Document History

| Date       | Author   | Changes                    |
| ---------- | -------- | -------------------------- |
| 2026-01-12 | Mohammed | Initial technical research |
