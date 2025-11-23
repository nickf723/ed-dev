"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import CipherBackground from "@/components/CipherBackground";
import EnigmaWidget from "@/components/EnigmaWidget";
import { motion } from "framer-motion";
import {
  Lock, Key, Shield, FileKey, Hash, Fingerprint, Globe, Server, ScanFace
} from "lucide-react";

// --- DATA ---
const sectors = [
  {
    name: "Classical Cryptography",
    desc: "The history of hiding messages before computers.",
    color: "text-emerald-400",
    icon: Scroll, // Need import
    items: [
      { 
        title: "Substitution Ciphers", 
        desc: "Replacing letters with other letters (Caesar, Vigenère). Broken by frequency analysis.", 
        href: "/formal-science/computer-science/security-cryptography/classical", 
        Icon: FileKey, 
        className: "theme-cryptography",
        subtitle: "The Ancients" 
      },
      { 
        title: "The Enigma", 
        desc: "The electromechanical rotor machine used by Nazi Germany. Broken by Alan Turing.", 
        href: "/formal-science/computer-science/security-cryptography/enigma", 
        Icon: Lock, 
        className: "theme-cryptography",
        subtitle: "Mechanized" 
      }
    ]
  },
  {
    name: "Modern Encryption",
    desc: "The math that secures the internet (HTTPS, Banking).",
    color: "text-cyan-400",
    icon: Globe,
    items: [
      { 
        title: "Symmetric Key (AES)", 
        desc: "Using the same key to lock and unlock. Fast, but requires safe key exchange.", 
        href: "/formal-science/computer-science/security-cryptography/symmetric", 
        Icon: Key, 
        className: "theme-cryptography",
        subtitle: "Shared Secret" 
      },
      { 
        title: "Public Key (RSA/ECC)", 
        desc: "Asymmetric encryption. A public key locks it, only a private key can open it.", 
        href: "/formal-science/computer-science/security-cryptography/public-key", 
        Icon: Shield, 
        className: "theme-cryptography",
        subtitle: "Alice & Bob" 
      }
    ]
  },
  {
    name: "Hash & Authentication",
    desc: "Verifying identity and integrity.",
    color: "text-blue-400",
    icon: Fingerprint,
    items: [
      { 
        title: "Hashing Functions", 
        desc: "One-way mathematical transformations (SHA-256). Used for passwords and blockchain.", 
        href: "/formal-science/computer-science/security-cryptography/hashing", 
        Icon: Hash, 
        className: "theme-cryptography",
        subtitle: "Digital Fingerprint" 
      },
      { 
        title: "Zero Knowledge Proofs", 
        desc: "Proving you know a secret without revealing the secret itself.", 
        href: "/formal-science/computer-science/security-cryptography/zero-knowledge", 
        Icon: ScanFace, 
        className: "theme-cryptography",
        subtitle: "Privacy" 
      }
    ]
  }
];

// Helper imports
import { Scroll } from "lucide-react";

export default function CryptographyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Cipher Background */}
      <CipherBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Computer Science"
          title="Cryptography & Security"
          subtitle="The art of writing hidden messages. From the scytales of Sparta to the quantum-resistant lattices of the future, cryptography is the mathematical armor that protects information."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* MAIN CONTENT (9 cols) */}
          <div className="lg:col-span-9 space-y-10">
             {sectors.map((sector, idx) => (
              <section key={sector.name}>
                 <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="mb-4 flex items-center gap-3"
                 >
                    <sector.icon className={sector.color} size={20} />
                    <h2 className="text-lg font-bold text-white tracking-wide">{sector.name}</h2>
                    <div className="h-[1px] flex-1 bg-white/10"></div>
                 </motion.div>

                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
                    {sector.items.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.1 + (i * 0.05) }}
                        >
                            <TopicCard {...item} />
                        </motion.div>
                    ))}
                 </div>
              </section>
            ))}
          </div>

          {/* SIDEBAR (3 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-3 lg:sticky lg:top-6 h-fit pt-2">
            
            {/* Enigma Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <EnigmaWidget />
            </motion.div>

            {/* Kerckhoffs's Principle */}
            <div className="p-5 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/40">
                <h4 className="text-xs font-bold uppercase text-emerald-400 mb-2 flex items-center gap-2">
                    <Shield size={14} /> Kerckhoffs's Principle
                </h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                    "A cryptosystem should be secure even if everything about the system, except the key, is public knowledge." Security through obscurity is not security.
                </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}