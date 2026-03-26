import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  id,
  className = '',
  fullWidth = true,
  ...props
}, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={`
          block w-full rounded-lg border-gray-300 shadow-sm 
          focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
