import type { ReactNode } from 'react';
import { cn } from '@/utils/Helpers';

type AmanahScriptTextMask = 'line' | 'text';
type AmanahScriptTextElement = 'p' | 'span';
type AmanahScriptTextSize = 'accent' | 'hero' | 'inherit';

type AmanahScriptTextProps = {
  as?: AmanahScriptTextElement;
  children: ReactNode;
  className?: string;
  mask?: AmanahScriptTextMask;
  size?: AmanahScriptTextSize;
};

const scriptSizeClassNames = {
  accent: 'amanah-type-script-accent',
  hero: 'amanah-type-script-hero',
  inherit: '',
} satisfies Record<AmanahScriptTextSize, string>;

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
  size = 'accent',
}: AmanahScriptTextProps) {
  const scriptClassName = cn(
    'font-amanah-script',
    scriptSizeClassNames[size],
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
