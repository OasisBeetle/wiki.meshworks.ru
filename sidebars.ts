import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

type SidebarIconName = string;
type SidebarVariant = 'catalog-highlight';
type SidebarCustomProps = {
  icon: SidebarIconName;
  variant?: SidebarVariant;
};
type SidebarDocOptions = {
  label?: string;
  className?: string;
  variant?: SidebarVariant;
};
type SidebarCategoryOptions = {
  collapsed?: boolean;
  collapsible?: boolean;
  className?: string;
  key?: string;
  description?: string;
  link?: {type: 'doc'; id: string} | {type: 'generated-index'; slug?: string; description?: string};
  variant?: SidebarVariant;
};

function doc(
  id: string,
  icon: SidebarIconName,
  options: SidebarDocOptions = {},
) {
  const {variant, ...rest} = options;
  const customProps: SidebarCustomProps = {
    icon,
    ...(variant ? {variant} : {}),
  };

  return {
    type: 'doc' as const,
    id,
    ...rest,
    customProps,
  };
}

function category(
  label: string,
  icon: SidebarIconName,
  items: Array<string | object>,
  options: SidebarCategoryOptions = {},
) {
  const {variant, ...rest} = options;
  const customProps: SidebarCustomProps = {
    icon,
    ...(variant ? {variant} : {}),
  };

  return {
    type: 'category' as const,
    label,
    items,
    ...rest,
    customProps,
  };
}

// Верхний уровень вручную (3 продукта), внутри — автогенерация по папкам docs.
const tutorialSidebar = [
    doc('catalog-devices', 'inventory_2', {variant: 'catalog-highlight'}),
    category(
      'Введение',
      'menu_book',
      [
        doc('introduction/network-basics', 'schema'),
        doc('introduction/use-cases', 'explore'),
        doc('introduction/limitations', 'warning_amber'),
      ],
      {
        collapsed: true,
        link: {type: 'doc', id: 'introduction/index'},
      },
    ),
    category(
      'Meshtastic',
      'hub',
      [
        doc('meshtastic/newbie', 'checklist'),
        category(
          'Настройка ноды',
          'tune',
          [
            'node-setup/firmware',
            'node-setup/configuration',
            'node-setup/menu',
            'node-setup/roles',
            'node-setup/testing',
            {
              type: 'category',
              label: 'Драйверы',
              collapsed: true,
              link: {type: 'doc', id: 'node-setup/serial-drivers/index'},
              items: ['node-setup/serial-drivers/esp32', 'node-setup/serial-drivers/nrf52', 'node-setup/serial-drivers/test'],
            },
          ],
          {
            collapsed: true,
            key: 'meshtastic_setup',
            link: {
              type: 'generated-index',
              slug: '/node-setup',
              description:
                'Прошивка, конфигурация, роли, тестирование и драйверы: всё, что нужно для нормального запуска ноды Meshtastic.',
            },
          },
        ),
        category(
          'ПО и клиенты',
          'apps',
          [
            'meshtastic/software/android',
            'meshtastic/software/apple',
            'meshtastic/software/web-cli',
            'meshtastic/software/integrations',
          ],
          {
            collapsed: true,
            link: {type: 'doc', id: 'meshtastic/software/index'},
          },
        ),
        doc('meshtastic/faq', 'quiz'),
        doc('meshtastic/modules', 'extension'),
        doc('meshtastic/mqtt', 'folder'),
        doc('meshtastic/sensors', 'folder'),
        doc('meshtastic/security', 'security'),
        category(
          'Решение проблем',
          'build',
          [
            'troubleshooting/not-visible',
            'troubleshooting/radio',
            'troubleshooting/channels',
            'troubleshooting/bluetooth',
            'troubleshooting/flashing',
            'troubleshooting/power',
            'troubleshooting/hardware',
            'troubleshooting/antennas-swr',
            'troubleshooting/network-performance',
          ],
          {
            collapsed: true,
            link: {type: 'doc', id: 'troubleshooting/index'},
          },
        ),
        doc('community', 'forum'),
      ],
      {
        collapsed: true,
        link: {type: 'doc', id: 'meshtastic/index'},
      },
    ),
    category(
      'MeshCore',
      'grid_3x3',
      [
        doc('meshcore/newbie', 'checklist'),
        category(
          'Настройка ноды',
          'tune',
          [
            'meshcore/quick-start',
            'meshcore/concepts',
            'meshcore/servers',
            'meshcore/observer',
            'meshcore/bridge',
            'meshcore/updates',
          ],
          {
            collapsed: true,
            key: 'meshcore_setup',
            link: {
              type: 'generated-index',
              slug: '/meshcore/setup',
              description:
                'Прошивка, роли, инфраструктура и эксплуатация: от первого запуска до обновлений.',
            },
          },
        ),
        category(
          'ПО и клиенты',
          'apps',
          ['meshcore/software/android', 'meshcore/software/apple', 'meshcore/software/web'],
          {
            collapsed: true,
            key: 'meshcore_software',
            link: {type: 'doc', id: 'meshcore/software/index'},
          },
        ),
        doc('meshcore/faq', 'quiz'),
        doc('meshcore/security', 'security'),
        doc('meshcore/troubleshooting', 'bug_report'),
        doc('meshcore/ecosystem', 'account_tree'),
        doc('meshcore/community', 'groups'),
      ],
      {
        collapsed: true,
        link: {type: 'doc', id: 'meshcore/index'},
      },
    ),
    category('Reticulum', 'route', [], {
      collapsed: true,
      link: {type: 'doc', id: 'reticulum/index'},
    }),
    category(
      'Устройства',
      'devices',
      [
        category('DIY', 'devices', ['devices/diy/boards'], {
          collapsed: true,
          link: {type: 'doc', id: 'devices/diy/index'},
        }),
      ],
      {
        collapsed: true,
        link: {type: 'doc', id: 'devices/index'},
      },
    ),
    category(
      'Антенны',
      'settings_input_antenna',
      [
        doc('antennas/types', 'settings_input_antenna'),
        doc('antennas/ready-made', 'settings_input_antenna'),
        doc('antennas/connectors', 'settings_input_antenna'),
        doc('antennas/diy', 'settings_input_antenna'),
        doc('antennas/check', 'settings_input_antenna'),
        doc('antennas/nanovna', 'settings_input_antenna'),
        doc('antennas/spectrum', 'settings_input_antenna'),
        doc('antennas/mistakes', 'settings_input_antenna'),
      ],
      {
        collapsed: true,
        link: {type: 'doc', id: 'antennas/index'},
      },
    ),
    doc('glossary', 'auto_stories'),
    doc('regulations', 'gavel'),
  ] as unknown as SidebarsConfig[string];

const sidebars: SidebarsConfig = {
  tutorialSidebar,
};

export default sidebars;
