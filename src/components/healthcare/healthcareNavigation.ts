import type { HealthcareNavigationItem } from './types';
import { AppConfig } from '@/utils/AppConfig';
import { getI18nPath } from '@/utils/Helpers';

export function getHealthcareHref(
  item: HealthcareNavigationItem,
  locale: string = AppConfig.i18n.defaultLocale,
) {
  return `${getI18nPath(item.path, locale)}${item.hash ?? ''}`;
}
