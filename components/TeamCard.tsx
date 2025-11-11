"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

export type TeamMember = {
  name: string;
  role: string;
  photo: string;
  bio: string;
};

export default function TeamCard({ name, role, photo, bio }: TeamMember) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10">
      <Image src={photo} alt={name} width={400} height={500} className="object-cover w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-base opacity-80"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h4 className="font-heading text-lg text-neon">{name}</h4>
        <p className="text-sm text-gray-300 mb-2">{role}</p>
      </div>
      {/* Hover reveal */}
      <motion.div
        initial={{ opacity: 0, y: '100%' }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-base/90 backdrop-blur-sm p-4 flex flex-col justify-center"
      >
        <h4 className="font-heading text-lg text-neon mb-2">{name}</h4>
        <p className="text-sm text-gray-300 mb-4">{role}</p>
        <p className="text-sm text-gray-400">{bio}</p>
      </motion.div>
    </div>
  );
}