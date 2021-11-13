import React from 'react';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';

const tooltipStyles = css`
  border-radius: 3px;
  font-size: 13px;
  padding: 8px 21px;
  position: fixed;
  left: 85px;
  top: 23.5rem;
  background: #be6464;
  pointer-events: none;
  transition: all 0.2s ease-in-out;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  opacity: 0;

  .tooltip-arrow {
    width: 50%;
    height: 50%;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden; /* ← Here is the trick */
  }

  .tooltip-arrow::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background: #be6464;
    transform: translateX(-50%) translateY(-50%) rotate(45deg);
    left: 50%;
    box-shadow: 0 0 16px #0004;
    border: 1px solid #aaa;
  }
`;

interface TooltipProps {
  summName: string;
}

const config = {
  visible: { opacity: 0.9 },
  hidden: { opacity: 0 },
};

const validationRegex = /^[A-Za-z0-9-_]+$/i;

const Tooltip: React.FC<TooltipProps> = ({ summName }) => {
  return (
    <motion.div
      animate={
        summName.length !== 0 && !validationRegex.test(summName)
          ? 'visible'
          : 'hidden'
      }
      variants={config}
      transition={{
        duration: 0.1,
      }}
      css={tooltipStyles}
    >
      <div className="tooltip-arrow" />
      <span>INVALID SUMMONER NAME</span>
    </motion.div>
  );
};

export default Tooltip;
