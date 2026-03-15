"use client";
import React from 'react';

export default function ChemistryBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-zinc-950">
            {/* Ambient Lab Glows */}
            <div className="absolute top-0 left-1/4 w-[50vw] h-[50vw] bg-emerald-900/10 blur-[120px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-1/4 right-0 w-[40vw] h-[40vw] bg-cyan-900/10 blur-[120px] rounded-full mix-blend-screen" />

            {/* Hexagonal Lattice (Carbon Bonds) */}
            <div className="absolute inset-0 opacity-[0.03]" 
                 style={{
                     backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='103.923' viewBox='0 0 60 103.923' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15zM30 103.923l25.98-15v-30L30 28.923l-25.98 15v30z' fill-rule='evenodd' stroke='%2310b981' stroke-width='2' fill='none'/%3E%3C/svg%3E")`,
                     backgroundSize: '60px 103.92px'
                 }}
            />

            <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>
    );
}