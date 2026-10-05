import * as React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
}: ButtonProps) {
  return (
    <button type="button" data-variant={variant} data-size={size}>
      {children}
    </button>
  );
}
