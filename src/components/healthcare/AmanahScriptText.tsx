import type { ReactNode } from 'react';
import { cn } from '@/utils/Helpers';

type AmanahScriptTextMask = 'line' | 'text';
type AmanahScriptTextElement = 'p' | 'span';

type AmanahScriptTextProps = {
  as?: AmanahScriptTextElement;
  children: ReactNode;
  className?: string;
  mask?: AmanahScriptTextMask;
};

function getMaskAttributes(mask: AmanahScriptTextMask | undefined) {
  if (mask === 'line') {
    return { 'data-mask-line': true };
  }

  if (mask === 'text') {
    return { 'data-mask-text': true };
  }

  return {};
}

export function AmanahScriptText({
  as = 'p',
  children,
  className,
  mask,
}: AmanahScriptTextProps) {
  const scriptClassName = cn(
    'font-amanah-script',
    mask !== undefined && 'will-change-transform',
    className,
  );
  const maskAttributes = getMaskAttributes(mask);

  if (as === 'span') {
    return (
      <span
        {...maskAttributes}
        className={scriptClassName}
      >
        {children}
      </span>
    );
  }

  return (
    <p
      {...maskAttributes}
      className={scriptClassName}
    >
      {children}
    </p>
  );
}
