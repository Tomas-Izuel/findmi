'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Loader2, X } from 'lucide-react';
import { Button } from './button';


interface PromiseButtonProps {
  onClickPromise: () => Promise<void>;
  label: string | JSX.Element;
  confirm?: boolean;
}

export default function PromiseButton({ onClickPromise, label = 'Enviar', confirm = false }: PromiseButtonProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'confirming'>('idle');

  const handleClick = async () => {
    setStatus('loading');
    try {
      if (status !== 'loading') {
        await onClickPromise();
      }
      setStatus('success');
      setTimeout(() => setStatus('idle'), 4000);
      return;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const handleConfirm = () => {
    if (confirm && status === 'idle') {
      setStatus('confirming');
      return;
    }
  };

  const handleCancel = () => {
    setStatus('idle');
  };

  const getBackgroundColor = () => {
    switch (status) {
      case 'loading':
        return 'bg-transparent';
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'confirming':
        return 'bg-transparent';
      default:
        return 'bg-primary';
    }
  };

  return (
    <motion.button
      onClick={!confirm ? handleClick : handleConfirm}
      disabled={status === 'loading'}
      className={`
        relative overflow-hidden
        p-2
        rounded-md
        font-medium text-white
        ${getBackgroundColor()}
        transition-colors duration-300 ease-in-out
      `}
      initial={false}
      animate={{ scale: status === 'loading' ? 0.95 : 1 }}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      >
        <div className={`w-full h-full ${getBackgroundColor()} absolute inset-0`} />
      </motion.div>

      <div className="relative z-10 min-w-[2rem] h-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.span
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="transition-opacity duration-200"
            >
              {label}
            </motion.span>
          )}
          {status === 'confirming' && (
            <motion.div
              key="confirming"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex space-x-2"
            >
              <Button
                onClick={handleClick}
                className="p-2 bg-green-600 rounded-md"
              >
                <Check size={16} />
              </Button>
              <Button
                onClick={handleCancel}
                className="p-2 bg-red-600 rounded-md"
              >
                <X size={16} />
              </Button>
            </motion.div>
          )}
          {status !== 'idle' && status !== 'confirming' && (
            <motion.div
              key={status}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 150, damping: 10 }}
              className="absolute w-24 h-full flex items-center justify-center"
            >
              {status === 'loading' && (
                <Loader2
                  className="animate-spin w-6 h-6 text-klari-text-primary"
                  size={24}
                />
              )}
              {status === 'success' && <Check size={24} />}
              {status === 'error' && <X size={24} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}
