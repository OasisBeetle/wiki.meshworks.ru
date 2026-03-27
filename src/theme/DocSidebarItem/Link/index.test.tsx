import React from 'react';
import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import DocSidebarItemLink from './index';

describe('theme/DocSidebarItem/Link', () => {
  it('renders icon markup when sidebar metadata provides an icon', () => {
    render(
      <ul>
        <DocSidebarItemLink
          item={{
            type: 'link',
            href: '/devices',
            label: 'Устройства',
            customProps: {icon: 'devices'},
          }}
          activePath="/introduction"
          level={1}
          index={0}
        />
      </ul>,
    );

    expect(screen.getByRole('link', {name: 'Устройства'})).toHaveAttribute('href', '/devices');
    expect(document.querySelector('[data-sidebar-icon="devices"]')).toBeInTheDocument();
  });

  it('omits icon markup when sidebar metadata is absent', () => {
    render(
      <ul>
        <DocSidebarItemLink
          item={{
            type: 'link',
            href: '/plain',
            label: 'Без иконки',
          }}
          activePath="/introduction"
          level={1}
          index={0}
        />
      </ul>,
    );

    expect(screen.getByRole('link', {name: 'Без иконки'})).not.toHaveAttribute('data-sidebar-variant');
    expect(document.querySelector('[data-sidebar-icon]')).not.toBeInTheDocument();
  });

  it('exposes the catalog highlight variant on the rendered link', () => {
    render(
      <ul>
        <DocSidebarItemLink
          item={{
            type: 'link',
            href: '/catalog-devices',
            label: 'Каталог устройств',
            customProps: {icon: 'inventory_2', variant: 'catalog-highlight'},
          }}
          activePath="/introduction"
          level={1}
          index={0}
        />
      </ul>,
    );

    expect(screen.getByRole('link', {name: 'Каталог устройств'})).toHaveAttribute(
      'data-sidebar-variant',
      'catalog-highlight',
    );
    expect(document.querySelector('[data-sidebar-icon="inventory_2"]')).toBeInTheDocument();
  });
});
