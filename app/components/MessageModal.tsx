"use client";

import Image from "next/image";
import Modal from "./Modal";

interface ImageModalProps {
  src?: string | null;
  isOpen?: boolean;
  onClose: () => void;
}

export default function ImageModal({ src, isOpen, onClose }: ImageModalProps) {
  if (!src) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image fill alt="Image" src={src} className="object-cover" />
      </div>
    </Modal>
  );
}
