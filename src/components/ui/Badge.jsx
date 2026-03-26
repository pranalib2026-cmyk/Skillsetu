import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-primary',
    success: 'bg-green-100 text-success',
    warning: 'bg-orange-100 text-accent',
    danger: 'bg-red-100 text-red-800',
    skill: 'bg-green-50 text-secondary border border-green-200', // rural green text
  };

  const classes = `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`;

  return (
    <span className={classes}>
      {children}
    </span>
  );
};

export default Badge;
