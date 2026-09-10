'use client';

import { useSyncExternalStore } from 'react';

export type HealthcareViewportRange
  = | 'compactMobile'
    | 'desktop'
    | 'largeMobile'
    | 'mobile'
    | 'tablet';

const LARGE_MOBILE_WIDTH = 640;
const MOBILE_WIDTH = 360;
const TABLET_WIDTH = 768;
const DESKTOP_WIDTH = 1024;
const SERVER_VIEWPORT_WIDTH = DESKTOP_WIDTH;

type HealthcareViewportSnapshot = {
  range: HealthcareViewportRange;
  width: number;
};

export function getHealthcareViewportRange(width: number): HealthcareViewportRange {
  if (width >= DESKTOP_WIDTH) {
    return 'desktop';
  }

  if (width >= TABLET_WIDTH) {
    return 'tablet';
  }

  if (width >= LARGE_MOBILE_WIDTH) {
    return 'largeMobile';
  }

  if (width >= MOBILE_WIDTH) {
    return 'mobile';
  }

  return 'compactMobile';
}

function getViewportSnapshot(): HealthcareViewportSnapshot {
  const width = window.innerWidth;

  return {
    range: getHealthcareViewportRange(width),
    width,
  };
}

function getServerSnapshot(): HealthcareViewportSnapshot {
  return {
    range: getHealthcareViewportRange(SERVER_VIEWPORT_WIDTH),
    width: SERVER_VIEWPORT_WIDTH,
  };
}

function subscribeToViewportChange(onStoreChange: () => void) {
  window.addEventListener('resize', onStoreChange);
  window.addEventListener('orientationchange', onStoreChange);

  return () => {
    window.removeEventListener('resize', onStoreChange);
    window.removeEventListener('orientationchange', onStoreChange);
  };
}

export function useHealthcareViewport(): HealthcareViewportSnapshot {
  return useSyncExternalStore(
    subscribeToViewportChange,
    getViewportSnapshot,
    getServerSnapshot,
  );
}
