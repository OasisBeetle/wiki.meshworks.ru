import React from 'react';

type SidebarCustomProps = {
  icon?: unknown;
  variant?: unknown;
};

type SidebarItemWithCustomProps = {
  customProps?: SidebarCustomProps;
};

type SidebarPresentation = {
  icon?: string;
  variant?: string;
};

export function getSidebarPresentation(item: SidebarItemWithCustomProps): SidebarPresentation {
  const customProps = item.customProps ?? {};

  return {
    icon: typeof customProps.icon === 'string' ? customProps.icon : undefined,
    variant: typeof customProps.variant === 'string' ? customProps.variant : undefined,
  };
}

export function SidebarItemLabel({
  icon,
  label,
  className,
}: {
  icon?: string;
  label: string;
  className: string;
}): React.JSX.Element {
  return (
    <>
      {icon ? (
        <span className="mwSidebarItemIcon" aria-hidden="true" data-sidebar-icon={icon}>
          {icon}
        </span>
      ) : null}
      <span title={label} className={className}>
        {label}
      </span>
    </>
  );
}
