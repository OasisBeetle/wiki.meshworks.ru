---
title: Каталог устройств
description: "Портативные готовые ноды Meshtastic в формате карточек."
slug: /catalog-devices
sidebar_label: Каталог устройств
sidebar_position: 1.5
breadcrumbs: ["База знаний Meshtastic", "Каталог устройств"]
---

import PortableCopyCatalog from '@site/src/components/PortableCopyCatalog';

<style>{`
  .deviceFilterTabsRT {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .deviceHeroIntroRT {
    margin: 0 0 12px;
    max-width: 760px;
    font-size: 14px;
    line-height: 1.2;
    color: var(--ifm-color-emphasis-700);
  }
  .deviceHeroLineRT {
    display: block;
    margin-top: 4px;
  }
  .deviceHeroMetaRT {
    margin-top: 10px;
    font-size: 13px;
  }
  .deviceHeroLineRT:first-child {
    margin-top: 0;
  }
  [data-theme='light'] .deviceHeroIntroRT {
    color: rgba(17, 24, 39, .74);
  }
  .deviceHeroDividerRT {
    width: 100%;
    height: 1px;
    margin: 6px 0 10px;
    border-radius: 0;
    background: rgba(255, 255, 255, .08);
  }
  [data-theme='light'] .deviceHeroDividerRT {
    background: rgba(17, 24, 39, .12);
  }
  [data-theme='dark'] .deviceHeroDividerRT {
    background: rgba(255, 255, 255, .08);
  }
  .deviceFilterInputRT {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
  .deviceFiltersRT {
    display: flex;
    gap: 10px;
    margin: 0 0 16px;
    flex-wrap: wrap;
  }
  .deviceFilterRT {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, .10);
    background: rgba(255, 255, 255, .04);
    color: inherit;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    line-height: 1;
    cursor: pointer;
    transition: background-color .12s ease, border-color .12s ease, color .12s ease;
  }
  .deviceFilterRT:hover {
    text-decoration: none;
    border-color: rgba(126, 184, 27, .55);
    color: var(--ifm-color-primary-light);
  }
  #filter-universal:checked ~ .deviceFiltersRT label[for="filter-universal"],
  #filter-solar:checked ~ .deviceFiltersRT label[for="filter-solar"],
  #filter-nrf:checked ~ .deviceFiltersRT label[for="filter-nrf"],
  #filter-esp:checked ~ .deviceFiltersRT label[for="filter-esp"] {
    background: rgba(126, 184, 27, .18);
    border-color: rgba(126, 184, 27, .55);
    color: var(--ifm-color-primary-light);
  }
  .deviceFilterSepRT {
    display: inline-flex;
    align-items: center;
    color: rgba(255,255,255,.45);
    font-weight: 600;
    user-select: none;
    margin: 0 2px;
  }
  [data-theme='light'] .deviceFilterRT {
    border-color: rgba(17, 24, 39, .12);
    background: #f8fafc;
    color: #1f2937;
  }
  [data-theme='light'] .deviceFilterRT:hover {
    border-color: rgba(126, 184, 27, .55);
    color: #3a550b;
    background: #f1f7e7;
  }
  [data-theme='light'] #filter-universal:checked ~ .deviceFiltersRT label[for="filter-universal"],
  [data-theme='light'] #filter-solar:checked ~ .deviceFiltersRT label[for="filter-solar"],
  [data-theme='light'] #filter-nrf:checked ~ .deviceFiltersRT label[for="filter-nrf"],
  [data-theme='light'] #filter-esp:checked ~ .deviceFiltersRT label[for="filter-esp"] {
    background: #eaf5d8;
    border-color: rgba(126, 184, 27, .55);
    color: #2f4b09;
  }
  [data-theme='light'] .deviceFilterSepRT {
    color: rgba(17,24,39,.38);
  }
  .deviceFilterRowRT {
    display: grid;
    grid-template-columns: auto repeat(3, minmax(150px, 1fr)) 1px auto repeat(2, minmax(140px, 1fr));
    align-items: stretch;
    gap: 10px;
    margin: 0 0 16px;
    width: 100%;
  }
  .deviceFilterGroupLabelRT {
    display: inline-flex;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
    color: var(--ifm-color-emphasis-700);
    padding: 0 2px;
    white-space: nowrap;
  }
  [data-theme='light'] .deviceFilterGroupLabelRT {
    color: rgba(17, 24, 39, .62);
  }
  .deviceFilterHintRT {
    border: 1px solid rgba(255, 255, 255, .10);
    border-radius: 12px;
    background: rgba(255, 255, 255, .03);
    padding: 10px 12px;
    line-height: 1.35;
    cursor: pointer;
    transition: background-color .12s ease, border-color .12s ease;
  }
  .deviceFilterHintTitleRT {
    font-size: 13px;
    font-weight: var(--ifm-font-weight-normal);
    margin-bottom: 0;
  }
  .deviceFilterHintTextRT {
    display: none;
  }
  .deviceFilterRowSepRT {
    align-self: stretch;
    width: 1px;
    background: rgba(255, 255, 255, .10);
    border-radius: 999px;
    margin: 2px 2px;
  }
  #filter-nrf:checked ~ .deviceFilterRowRT .deviceFilterHintNRFRT,
  #filter-esp:checked ~ .deviceFilterRowRT .deviceFilterHintESPRT {
    border-color: rgba(126, 184, 27, .55);
    background: rgba(126, 184, 27, .15);
  }
  #filter-universal:checked ~ .deviceFilterRowRT .deviceFilterHintUniversalRT,
  #filter-solar:checked ~ .deviceFilterRowRT .deviceFilterHintSolarRT,
  #filter-boards:checked ~ .deviceFilterRowRT .deviceFilterHintBoardsRT {
    border-color: rgba(126, 184, 27, .55);
    background: rgba(126, 184, 27, .15);
  }
  [data-theme='light'] .deviceFilterHintRT {
    border-color: rgba(17, 24, 39, .10);
    background: #f8fafc;
  }
  [data-theme='light'] .deviceFilterRowSepRT {
    background: rgba(17, 24, 39, .12);
  }
  [data-theme='light'] #filter-nrf:checked ~ .deviceFilterRowRT .deviceFilterHintNRFRT,
  [data-theme='light'] #filter-esp:checked ~ .deviceFilterRowRT .deviceFilterHintESPRT {
    border-color: rgba(126, 184, 27, .55);
    background: #eef7de;
  }
  [data-theme='light'] #filter-universal:checked ~ .deviceFilterRowRT .deviceFilterHintUniversalRT,
  [data-theme='light'] #filter-solar:checked ~ .deviceFilterRowRT .deviceFilterHintSolarRT,
  [data-theme='light'] #filter-boards:checked ~ .deviceFilterRowRT .deviceFilterHintBoardsRT {
    border-color: rgba(126, 184, 27, .55);
    background: #eef7de;
  }
  @media (max-width: 996px) {
    .deviceHeroIntroRT {
      max-width: 100%;
    }
    .deviceFilterRowRT {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      gap: 8px;
    }
    .deviceFilterGroupLabelRT {
      width: 100%;
      padding: 2px 0;
      margin-top: 2px;
    }
    .deviceFilterHintRT {
      flex: 1 1 220px;
      min-width: 0;
    }
    .deviceFilterRowSepRT {
      display: none;
    }
  }
  @media (max-width: 768px) {
    .deviceFilterHintRT {
      flex: 1 1 calc(50% - 8px);
      padding: 9px 10px;
    }
    .deviceFilterHintTitleRT {
      font-size: 12px;
    }
  }
  @media (max-width: 480px) {
    .deviceFilterHintRT {
      flex: 1 1 100%;
    }
  }
  #filter-universal:checked ~ .devicePanelRT,
  #filter-solar:checked ~ .devicePanelRT,
  #filter-boards:checked ~ .devicePanelRT {
    display: none;
  }
  #filter-universal:checked ~ .devicePanelUniversalRT,
  #filter-solar:checked ~ .devicePanelSolarRT,
  #filter-boards:checked ~ .devicePanelBoardsRT {
    display: block;
  }
  #filter-nrf:checked ~ .devicePanelRT .deviceCardRT:not(.deviceTechNRF) {
    display: none;
  }
  #filter-esp:checked ~ .devicePanelRT .deviceCardRT:not(.deviceTechESP) {
    display: none;
  }
  #filter-nrf:checked ~ #filter-esp:checked ~ .devicePanelRT .deviceCardRT.deviceTechNRF,
  #filter-nrf:checked ~ #filter-esp:checked ~ .devicePanelRT .deviceCardRT.deviceTechESP {
    display: grid;
  }
  .deviceBodyRT .deviceSpecsRT {
    margin-top: 20px !important;
  }
  .devicePanelBoardsRT {
    order: 1;
  }
  .devicePanelUniversalRT {
    order: 2;
  }
  .devicePanelSolarRT {
    order: 3;
  }
  .deviceSideHelpRT {
    position: absolute;
    top: 76px;
    right: -260px;
    width: 240px;
    padding: 12px 14px;
    border: 1px solid rgba(255,255,255,.10);
    border-radius: 12px;
    background: rgba(255,255,255,.02);
    z-index: 30;
  }
  .deviceSideHelpTitleRT {
    margin: 0 0 8px;
    font-size: 13px;
    font-weight: 600;
  }
  .deviceSideHelpListRT {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 6px;
    font-size: 12px;
    line-height: 1.35;
    color: var(--ifm-color-emphasis-700);
  }
  .deviceSideHelpListRT strong {
    color: var(--ifm-font-color-base);
    font-weight: 600;
  }
  .deviceSideHelpSepRT {
    height: 1px;
    margin: 8px 0;
    background: rgba(255,255,255,.10);
  }
  .deviceSideHelpSubTitleRT {
    margin: 0 0 6px;
    font-size: 12px;
    font-weight: 600;
    color: var(--ifm-color-emphasis-800);
  }
  [data-theme='light'] .deviceSideHelpRT {
    border-color: rgba(17, 24, 39, .10);
    background: #ffffff;
  }
  [data-theme='light'] .deviceSideHelpSepRT {
    background: rgba(17, 24, 39, .10);
  }
  @media (max-width: 1200px) {
    .deviceSideHelpRT {
      position: static;
      top: auto;
      right: auto;
      width: 100%;
      margin: 4px 0 14px;
    }
  }
  .deviceCardRT.deviceCardPopularRT {
    border: 1px solid rgba(255,255,255,.10) !important;
    background:
      radial-gradient(150% 130% at 100% 0%, rgba(126, 184, 27, .36) 0%, rgba(126, 184, 27, .22) 20%, rgba(126, 184, 27, .08) 34%, rgba(126, 184, 27, 0) 58%),
      rgba(255,255,255,.02) !important;
  }
  .deviceCardRT.deviceCardPopularRT::before {
    content: none;
  }
  .deviceCardRT.deviceCardPopularRT::after {
    content: none;
  }
  .deviceCardRT.deviceCardPopularRT .deviceBodyRT {
    position: relative;
  }
  .deviceCardRT.deviceCardPopularRT .deviceBodyRT::before {
    content: "Выбор сообщества";
    display: inline-block;
    margin: 0 0 8px;
    font-size: 11.5px;
    font-weight: 600;
    letter-spacing: .01em;
    line-height: 1;
    color: var(--ifm-font-color-base);
  }
  [data-theme='dark'] .deviceCardRT.deviceCardPopularRT .deviceBodyRT::before {
    color: var(--ifm-font-color-base);
  }
  [data-theme='light'] .deviceCardRT.deviceCardPopularRT {
    border-color: rgba(17, 24, 39, .10) !important;
    background:
      radial-gradient(150% 130% at 100% 0%, rgba(126, 184, 27, .32) 0%, rgba(126, 184, 27, .20) 20%, rgba(126, 184, 27, .07) 34%, rgba(126, 184, 27, 0) 58%),
      #ffffff !important;
  }
  [data-theme='dark'] .deviceCardRT.deviceCardPopularRT {
    border-color: rgba(255,255,255,.10) !important;
    background:
      radial-gradient(150% 130% at 100% 0%, rgba(126, 184, 27, .30) 0%, rgba(126, 184, 27, .16) 20%, rgba(126, 184, 27, .07) 34%, rgba(126, 184, 27, 0) 58%),
      rgba(255,255,255,.02) !important;
  }
  .deviceActionsRT {
    position: static;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin-top: 14px;
  }
  .deviceActionsRT .ctaRT {
    position: static;
    right: auto;
    bottom: auto;
  }
  .ctaVideoRT {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 14px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, .12);
    font-size: 12px;
    font-weight: 600;
    line-height: 1;
    text-decoration: none;
    white-space: nowrap;
    color: var(--ifm-font-color-base);
    background: rgba(255, 255, 255, .04);
    transition: background-color .12s ease, border-color .12s ease, transform .12s ease;
  }
  .ctaVideoRT:hover {
    border-color: rgba(126, 184, 27, .45);
    background: rgba(126, 184, 27, .12);
    transform: translateY(-1px);
    text-decoration: none;
  }
  [data-theme='light'] .ctaVideoRT {
    border-color: rgba(17, 24, 39, .12);
    background: #f8fafc;
    color: #1f2937;
  }
  [data-theme='light'] .ctaVideoRT:hover {
    border-color: rgba(126, 184, 27, .55);
    background: #eef7de;
    color: #2f4b09;
  }
  @media (max-width: 768px) {
    .deviceActionsRT {
      justify-content: stretch;
      flex-direction: column;
      gap: 6px;
    }
    .deviceActionsRT .ctaRT,
    .ctaVideoRT {
      width: 100%;
      padding: 0 10px;
      justify-content: center;
    }
  }
`}</style>

<PortableCopyCatalog />



