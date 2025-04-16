'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-indigo-900 text-white p-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Animated Robot Head */}
        <motion.div 
          className="relative w-40 h-40 mx-auto mb-6"
          initial={{ y: 0 }}
          animate={{ y: [0, -15, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut" 
          }}
        >
          {/* Robot Head */}
          <div className="absolute w-40 h-32 bg-gray-300 rounded-2xl border-4 border-gray-700 overflow-hidden">
            {/* Eyes */}
            <motion.div 
              className="flex justify-center mt-8 space-x-10"
              animate={{ 
                scaleY: [1, 0.1, 1],
              }}
              transition={{ 
                repeat: Infinity, 
                repeatDelay: 3,
                duration: 0.2
              }}
            >
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-black"></div>
              </div>
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-black"></div>
              </div>
            </motion.div>
            
            {/* Mouth */}
            <motion.div 
              className="w-16 h-4 bg-black rounded-lg mx-auto mt-6"
              animate={{ 
                width: [64, 30, 64],
                height: [16, 8, 16]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                delay: 1,
                ease: "easeInOut"
              }}
            ></motion.div>
            
            {/* Antenna */}
            <motion.div 
              className="absolute top-[-20px] left-[72px] w-4 h-12 bg-gray-600 rounded-full"
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut" 
              }}
            >
              <div className="w-6 h-6 rounded-full bg-red-500 absolute -top-3 -left-1"></div>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          404
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-semibold mb-8">Oops! My AI circuits are confused</h2>
          
          <div className="bg-black/30 p-6 rounded-xl mb-8 max-w-xl mx-auto backdrop-blur-sm border border-white/10">
            <div className="flex gap-3 mb-3">
              <div className="bg-red-500 rounded-full w-3 h-3"></div>
              <div className="bg-yellow-500 rounded-full w-3 h-3"></div>
              <div className="bg-green-500 rounded-full w-3 h-3"></div>
            </div>
            <div className="font-mono text-left">
              <p className="text-green-400">{">"} ERROR_DETECTED</p>
              <p className="text-gray-400 mb-2">{">"} RUNNING_DIAGNOSTICS...</p>
              <p className="text-white mb-1">{">"} PAGE_NOT_FOUND.exe</p>
              <p className="text-yellow-400 mb-3">{">"} The page you&apos;re looking for has been deleted, relocated, or never existed in my database.</p>
              <motion.p 
                className="text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                {">"} <span className="text-blue-400">SUGGESTION:</span> Return to home page and try again.
              </motion.p>
            </div>
          </div>
          
          <Link href="/">
            <motion.button
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors text-white shadow-lg shadow-indigo-600/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Return to Mission Control
            </motion.button>
          </Link>
        </motion.div>
        
        {/* Random floating elements for a tech feel */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-30"
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%", 
                opacity: Math.random() * 0.5 + 0.3 
              }}
              animate={{ 
                y: [null, Math.random() * 100 + "%"],
                opacity: [null, Math.random() > 0.5 ? 0.1 : 0.5]
              }}
              transition={{ 
                duration: Math.random() * 8 + 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 