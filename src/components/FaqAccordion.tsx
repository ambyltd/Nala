'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  defaultOpen?: number;
}

export default function FaqAccordion({ items, defaultOpen = -1 }: FaqAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number>(defaultOpen);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div 
          key={index} 
          className="border border-gray-200 rounded-lg overflow-hidden"
        >
          <button
            className={`w-full text-left p-4 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-primary/30 ${
              activeIndex === index ? 'bg-primary/5' : 'bg-white'
            }`}
            onClick={() => toggleItem(index)}
            aria-expanded={activeIndex === index}
            aria-controls={`faq-content-${index}`}
          >
            <span className="font-medium text-lg">{item.question}</span>
            <motion.div
              animate={{ rotate: activeIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaChevronDown className={activeIndex === index ? "text-primary" : "text-gray-400"} />
            </motion.div>
          </button>
          
          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                id={`faq-content-${index}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4 pt-0 border-t border-gray-100">
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
