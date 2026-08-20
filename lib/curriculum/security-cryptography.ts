import type { CurriculumNode } from "@/lib/curriculum/types";

function branch(id: string, label: string, href: string, description: string): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "formal",
    status: "placeholder",
    pageKind: "unit",
  };
}

export const SECURITY_CRYPTOGRAPHY_CURRICULUM: CurriculumNode = {
  id: "formal.computer-science.security",
  label: "Security & Cryptography",
  href: "/formal-science/computer-science/security-cryptography",
  description:
    "Threat models, security goals, cryptographic primitives, authentication, protocols, access control, implementation risk, and the adversarial analysis of computer systems.",
  domainId: "formal",
  status: "active",
  pageKind: "hub",
  children: [
    branch(
      "formal.computer-science.security.threat-models",
      "Threat Models & Security Goals",
      "/formal-science/computer-science/security-cryptography/threat-models",
      "Assets, adversaries, capabilities, trust boundaries, attack surfaces, confidentiality, integrity, availability, authenticity, and explicit security assumptions.",
    ),
    branch(
      "formal.computer-science.security.symmetric",
      "Symmetric Cryptography",
      "/formal-science/computer-science/security-cryptography/symmetric",
      "Shared-secret encryption, block and stream cipher constructions, modes of operation, authenticated encryption, nonces, and key handling.",
    ),
    branch(
      "formal.computer-science.security.public-key",
      "Public-Key Cryptography",
      "/formal-science/computer-science/security-cryptography/public-key",
      "Asymmetric encryption, digital signatures, key exchange, certificates, and the computational assumptions that support public-key systems.",
    ),
    branch(
      "formal.computer-science.security.integrity-authentication",
      "Integrity & Authentication",
      "/formal-science/computer-science/security-cryptography/integrity-authentication",
      "Cryptographic hashes, message authentication codes, digital signatures, password storage, identity, and methods for detecting unauthorized change or impersonation.",
    ),
    branch(
      "formal.computer-science.security.protocols",
      "Security Protocols & Systems",
      "/formal-science/computer-science/security-cryptography/protocols",
      "How cryptographic primitives, identities, keys, permissions, networks, software, and human procedures combine into secure or insecure systems.",
    ),
  ],
};
