"use client";
import { useState, useEffect } from "react";

export type MemexItem = {
  id: string;
  type: "term" | "axiom" | "asset" | "image";
  title: string;
  content?: string; // For definitions or image URLs
  timestamp: number;
};

export function useMemex() {
  const [items, setItems] = useState<MemexItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load from storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("nexus-memex");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  // Save to storage on change
  useEffect(() => {
    localStorage.setItem("nexus-memex", JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<MemexItem, "timestamp">) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev; // No duplicates
      return [{ ...item, timestamp: Date.now() }, ...prev];
    });
    setIsOpen(true); // Auto-open to show feedback
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearMemex = () => setItems([]);

  return { items, addItem, removeItem, clearMemex, isOpen, setIsOpen };
}