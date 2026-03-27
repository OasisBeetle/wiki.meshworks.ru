import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {isActiveSidebarItem} from '@docusaurus/plugin-content-docs/client';
import type {PropSidebarItemLink} from '@docusaurus/plugin-content-docs';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import {getSidebarPresentation, SidebarItemLabel} from '../shared';

import styles from './styles.module.css';

type Props = Omit<React.ComponentProps<typeof Link>, 'to' | 'children'> & {
  item: PropSidebarItemLink;
  onItemClick?: (item: PropSidebarItemLink) => void;
  activePath: string;
  level: number;
  index: number;
};

export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  index: _index,
  ...props
}: Props): ReactNode {
  const {href, label, className, autoAddBaseUrl} = item;
  const {icon, variant} = getSidebarPresentation(item);
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        'menu__list-item',
        className,
      )}
      key={label}>
      <Link
        className={clsx(
          'menu__link',
          !isInternalLink && styles.menuExternalLink,
          {
            'menu__link--active': isActive,
          },
        )}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? 'page' : undefined}
        data-sidebar-variant={variant}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        {...props}>
        <SidebarItemLabel icon={icon} label={label} className={styles.linkLabel} />
        {!isInternalLink && <IconExternalLink />}
      </Link>
    </li>
  );
}
