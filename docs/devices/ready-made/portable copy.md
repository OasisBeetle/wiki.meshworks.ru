---
title: Все ноды
description: "Портативные готовые ноды Meshtastic в формате карточек."
sidebar_label: portable copy
sidebar_position: 3
breadcrumbs: ["База знаний Meshtastic", "Meshtastic устройства", "Готовые ноды", "portable copy"]
---

<style>{`
  .deviceFilterTabsRT {
    position: relative;
    display: flex;
    flex-direction: column;
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
    grid-template-columns: repeat(8, auto);
    align-items: stretch;
    gap: 10px;
    margin: 0 0 16px;
    width: max-content;
    max-width: 100%;
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
  @media (max-width: 860px) {
    .deviceFilterRowRT {
      grid-template-columns: 1fr;
      width: 100%;
    }
    .deviceFilterRowSepRT {
      display: none;
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
  @media (max-width: 1320px) {
    .deviceSideHelpRT {
      display: none;
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
    content: "Выбор сообщества";
    position: absolute;
    top: 14px;
    right: 14px;
    padding: 0;
    border-radius: 0;
    font-size: 11.5px;
    font-weight: 600;
    letter-spacing: .01em;
    line-height: 1;
    color: var(--ifm-font-color-base);
    background: transparent;
    border: 0;
    pointer-events: none;
    z-index: 2;
  }
  [data-theme='dark'] .deviceCardRT.deviceCardPopularRT::after {
    color: var(--ifm-font-color-base);
    background: transparent;
    border: 0;
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
`}</style>

<div className="deviceFilterTabsRT">
  <input className="deviceFilterInputRT" type="checkbox" id="filter-universal" />
  <input className="deviceFilterInputRT" type="checkbox" id="filter-solar" />
  <input className="deviceFilterInputRT" type="checkbox" id="filter-boards" />
  <input className="deviceFilterInputRT" type="checkbox" id="filter-nrf" />
  <input className="deviceFilterInputRT" type="checkbox" id="filter-esp" />
  <div className="deviceFilterRowRT">
    <div className="deviceFilterGroupLabelRT">Тип</div>
    <label className="deviceFilterHintRT deviceFilterHintUniversalRT" htmlFor="filter-universal">
      <div className="deviceFilterHintTitleRT">🧭 Универсальные</div>
      <div className="deviceFilterHintTextRT">Портативные ноды для повседневных сценариев и походов.</div>
    </label>
    <label className="deviceFilterHintRT deviceFilterHintSolarRT" htmlFor="filter-solar">
      <div className="deviceFilterHintTitleRT">☀️ Солнечные</div>
      <div className="deviceFilterHintTextRT">Автономные комплекты для стационарных и удалённых узлов.</div>
    </label>
    <label className="deviceFilterHintRT deviceFilterHintBoardsRT" htmlFor="filter-boards">
      <div className="deviceFilterHintTitleRT">🧩 Платы</div>
      <div className="deviceFilterHintTextRT">DIY-платы и проекты для самостоятельной сборки нод.</div>
    </label>
    <div className="deviceFilterRowSepRT" />
    <div className="deviceFilterGroupLabelRT">Чип</div>
    <label className="deviceFilterHintRT deviceFilterHintNRFRT" htmlFor="filter-nrf">
      <div className="deviceFilterHintTitleRT">🟢 NRF</div>
      <div className="deviceFilterHintTextRT">Меньше мощности, зато дольше работает от батареи.</div>
    </label>
    <label className="deviceFilterHintRT deviceFilterHintESPRT" htmlFor="filter-esp">
      <div className="deviceFilterHintTitleRT">⚡ ESP</div>
      <div className="deviceFilterHintTextRT">Больше производительность и функций, но выше расход энергии.</div>
    </label>
  </div>
  <aside className="deviceSideHelpRT">
    <p className="deviceSideHelpTitleRT">Что означают фильтры</p>
    <ul className="deviceSideHelpListRT">
      <li><strong>🧭 Универсальные</strong> - готовые переносные ноды.</li>
      <li><strong>☀️ Солнечные</strong> - автономные комплекты для стационара.</li>
      <li><strong>🧩 Платы</strong> - DIY-платы для самостоятельной сборки.</li>
    </ul>
    <div className="deviceSideHelpSepRT" />
    <p className="deviceSideHelpSubTitleRT">Чип-платформы</p>
    <ul className="deviceSideHelpListRT">
      <li><strong>🟢 NRF</strong> - ниже мощность, выше автономность, лучше для батарейных узлов.</li>
      <li><strong>⚡ ESP</strong> - выше производительность и функции, но быстрее расходует батарею.</li>
    </ul>
  </aside>
  <div className="devicePanelRT devicePanelUniversalRT">


<div class="deviceCardRT deviceTechNRF">

  <div class="deviceImageRT">
    <img src="/img/wiki/thinknode-m1.png" alt="ThinkNode M1" />
  </div>

  <div class="deviceBodyRT">

    <h3 class="deviceTitleRT">ThinkNode M1</h3>

    <div class="deviceSpecsRT">
      <span class="badgeRT">Bluetooth ✅</span>
      <span class="badgeRT badgeOffRT">Wi-Fi ❌</span>
      <span class="badgeRT">GPS ✅</span>
    </div>

    <p class="deviceDescRT">
      Низкое энергопотребление, дисплей <strong>E-Ink</strong> — хорошо читается на солнце и экономит энергию.
    </p>

    <div class="deviceFooterRT">
      <div class="priceRT">≈ 5 800 ₽</div>
    </div>

  </div>

  <a
    class="ctaRT"
    href="https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&sub1=wki&tl=https://aliexpress.ru/item/1005008707258616.html?sku_id=12000046332206215"
    target="_blank"
    rel="noopener noreferrer"
  >
    ЗАКАЗАТЬ НА ALIEXPRESS
  </a>

</div>


<div class="deviceCardRT deviceTechNRF">

  <div class="deviceImageRT">
    <img src="/img/wiki/sensecap-t1000e.png" alt="SenseCAP T1000-E" />
  </div>

  <div class="deviceBodyRT">

    <h3 class="deviceTitleRT">SenseCAP T1000-E</h3>

    <div class="deviceSpecsRT">
      <span class="badgeRT">Bluetooth ✅</span>
      <span class="badgeRT badgeOffRT">Wi-Fi ❌</span>
      <span class="badgeRT">GPS ✅</span>
    </div>

    <p class="deviceDescRT">
      Компактное устройство на <strong>nRF52840</strong> с интегрированным GPS. Очень высокая автономность и малый вес.
    </p>

    <div class="deviceFooterRT">
      <div class="priceRT">≈ 4 500 ₽</div>
    </div>

  </div>

  <a
    class="ctaRT"
    href="https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&sub1=wki&tl=https://aliexpress.ru/item/1005008285553299.html?sku_id=12000044479856418"
    target="_blank"
    rel="noopener noreferrer"
  >
    ЗАКАЗАТЬ НА ALIEXPRESS
  </a>

</div>


<div class="deviceCardRT deviceTechNRF">

  <div class="deviceImageRT">
    <img src="/img/wiki/heltec-meshpocket.png" alt="Heltec MeshPocket" />
  </div>

  <div class="deviceBodyRT">

    <h3 class="deviceTitleRT">Heltec MeshPocket</h3>

    <div class="deviceSpecsRT">
      <span class="badgeRT">Bluetooth ✅</span>
      <span class="badgeRT badgeOffRT">Wi-Fi ❌</span>
      <span class="badgeRT badgeOffRT">GPS ❌</span>
    </div>

    <p class="deviceDescRT">
      Готовое решение с <strong>E-Ink</strong> дисплеем и встроенным павербанком. Удобно как повседневная портативная нода.
    </p>

    <div class="deviceFooterRT">
      <div class="priceRT">≈ 7 000 ₽</div>
    </div>

  </div>

  <a
    class="ctaRT"
    href="https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&sub1=wki&tl=https://aliexpress.ru/item/1005009843602899.html"
    target="_blank"
    rel="noopener noreferrer"
  >
    ЗАКАЗАТЬ НА ALIEXPRESS
  </a>

</div>


<div class="deviceCardRT deviceTechNRF">

  <div class="deviceImageRT">
    <img src="/img/wiki/lilygo-ttgo-t-echo.png" alt="LILYGO TTGO T-Echo" />
  </div>

  <div class="deviceBodyRT">

    <h3 class="deviceTitleRT">LILYGO TTGO T-Echo</h3>

    <div class="deviceSpecsRT">
      <span class="badgeRT">Bluetooth ✅</span>
      <span class="badgeRT badgeOffRT">Wi-Fi ❌</span>
      <span class="badgeRT">GPS ✅</span>
    </div>

    <p class="deviceDescRT">
      Портативное устройство с <strong>E-Ink</strong> и GPS. Хорошо подходит для походов и длительной автономной работы.
    </p>

    <div class="deviceFooterRT">
      <div class="priceRT">≈ 5 000 ₽</div>
    </div>

  </div>

  <a
    class="ctaRT"
    href="https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&sub1=wki&tl=https://aliexpress.ru/item/1005003026107533.html?sku_id=12000037263598503"
    target="_blank"
    rel="noopener noreferrer"
  >
    ЗАКАЗАТЬ НА ALIEXPRESS
  </a>

</div>


<div class="deviceCardRT deviceTechNRF">

  <div class="deviceImageRT">
    <img src="/img/wiki/wio-tracker-l1-pro.png" alt="Wio Tracker L1 Pro" />
  </div>

  <div class="deviceBodyRT">

    <h3 class="deviceTitleRT">Wio Tracker L1 Pro</h3>

    <div class="deviceSpecsRT">
      <span class="badgeRT">Bluetooth ✅</span>
      <span class="badgeRT badgeOffRT">Wi-Fi ❌</span>
      <span class="badgeRT">GPS ✅</span>
    </div>

    <p class="deviceDescRT">
      Готовая нода с GPS в компактном корпусе. Удобный вариант для мобильных узлов и автономных станций.
    </p>

    <div class="deviceFooterRT">
      <div class="priceRT">≈ 6 000 ₽</div>
    </div>

  </div>

  <a
    class="ctaRT"
    href="https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&sub1=wki&tl=https://aliexpress.ru/item/1005009183237292.html?sku_id=12000052906680614"
    target="_blank"
    rel="noopener noreferrer"
  >
    ЗАКАЗАТЬ НА ALIEXPRESS
  </a>

</div>


<div class="deviceCardRT deviceTechESP">

  <div class="deviceImageRT">
    <img src="/img/wiki/lilygo-t-deck-plus.png" alt="LILYGO T-Deck Plus" />
  </div>

  <div class="deviceBodyRT">

    <h3 class="deviceTitleRT">LILYGO T-Deck Plus</h3>

    <div class="deviceSpecsRT">
      <span class="badgeRT">Bluetooth ✅</span>
      <span class="badgeRT">Wi-Fi ✅</span>
      <span class="badgeRT">GPS ✅</span>
    </div>

    <p class="deviceDescRT">
      Мощное устройство на <strong>ESP32-S3</strong> с экраном и клавиатурой. Функционально, но потребляет больше энергии.
    </p>

    <div class="deviceFooterRT">
      <div class="priceRT">≈ 8 000 ₽</div>
    </div>

  </div>

  <a
    class="ctaRT"
    href="https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&sub1=wki&tl=https://aliexpress.ru/item/1005009074862574.html?sku_id=12000047823707772"
    target="_blank"
    rel="noopener noreferrer"
  >
    ЗАКАЗАТЬ НА ALIEXPRESS
  </a>

</div>


<div class="deviceCardRT deviceTechESP">

  <div class="deviceImageRT">
    <img src="/img/wiki/t-lora-pager.png" alt="T-LoRa Pager" />
  </div>

  <div class="deviceBodyRT">

    <h3 class="deviceTitleRT">T-LoRa Pager</h3>

    <div class="deviceSpecsRT">
      <span class="badgeRT">Bluetooth ✅</span>
      <span class="badgeRT">Wi-Fi ✅</span>
      <span class="badgeRT">GPS ✅</span>
    </div>

    <p class="deviceDescRT">
      Пейджер-формат для сообщений в Meshtastic. Удобен для повседневного ношения и быстрых тестов сети.
    </p>

    <div class="deviceFooterRT">
      <div class="priceRT">≈ 8 000 ₽</div>
    </div>

  </div>

  <a
    class="ctaRT"
    href="https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&sub1=wki&tl=https://aliexpress.ru/item/1005010626680107.html"
    target="_blank"
    rel="noopener noreferrer"
  >
    ЗАКАЗАТЬ НА ALIEXPRESS
  </a>

</div>


<div class="deviceCardRT deviceTechNRF">

  <div class="deviceImageRT">
    <img src="/img/wiki/meshtiny-mini-pocket.png" alt="Meshtiny Meshtastic Mini Pocket" />
  </div>

  <div class="deviceBodyRT">

    <h3 class="deviceTitleRT">Meshtiny Mini Pocket</h3>

    <div class="deviceSpecsRT">
      <span class="badgeRT">Bluetooth ✅</span>
      <span class="badgeRT badgeOffRT">Wi-Fi ❌</span>
      <span class="badgeRT badgeOffRT">GPS ❌</span>
    </div>

    <p class="deviceDescRT">
      Ультракомпактная карманная нода на nRF52 + SX1262. Отличный вариант для повседневного ношения.
    </p>

    <div class="deviceFooterRT">
      <div class="priceRT">≈ 5 500 ₽</div>
    </div>

  </div>

  <a
    class="ctaRT"
    href="https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&sub1=wki&tl=https://aliexpress.ru/item/1005010115422665.html?sku_id=12000051474859170"
    target="_blank"
    rel="noopener noreferrer"
  >
    ЗАКАЗАТЬ НА ALIEXPRESS
  </a>

</div>


<div class="deviceCardRT deviceTechNRF">

  <div class="deviceImageRT">
    <img src="/img/wiki/thinknode-m1.png" alt="ThinkNode M1 (868 MHz)" />
  </div>

  <div class="deviceBodyRT">

    <h3 class="deviceTitleRT">ThinkNode M1 (868 MHz)</h3>

    <div class="deviceSpecsRT">
      <span class="badgeRT">Bluetooth ✅</span>
      <span class="badgeRT badgeOffRT">Wi-Fi ❌</span>
      <span class="badgeRT">GPS ✅</span>
    </div>

    <p class="deviceDescRT">
      Версия под 868 MHz. Для России это основной диапазон Meshtastic.
    </p>

    <div class="deviceFooterRT">
      <div class="priceRT">≈ 5 800 ₽</div>
    </div>

  </div>

  <a
    class="ctaRT"
    href="https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&sub1=wki&tl=https://aliexpress.ru/item/1005008707258616.html?sku_id=12000046332206215"
    target="_blank"
    rel="noopener noreferrer"
  >
    ЗАКАЗАТЬ НА ALIEXPRESS
  </a>

</div>


<div class="deviceCardRT deviceTechNRF">

  <div class="deviceImageRT">
    <img src="/img/wiki/lilygo-ttgo-t-echo.png" alt="LILYGO TTGO T-Echo (лучший походный)" />
  </div>

  <div class="deviceBodyRT">

    <h3 class="deviceTitleRT">TTGO T-Echo (походный вариант)</h3>

    <div class="deviceSpecsRT">
      <span class="badgeRT">Bluetooth ✅</span>
      <span class="badgeRT badgeOffRT">Wi-Fi ❌</span>
      <span class="badgeRT">GPS ✅</span>
    </div>

    <p class="deviceDescRT">
      Хороший походный выбор: E-Ink + GPS, стабильная автономность и удобный форм-фактор.
    </p>

    <div class="deviceFooterRT">
      <div class="priceRT">≈ 5 000 ₽</div>
    </div>

  </div>

  <a
    class="ctaRT"
    href="https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&sub1=wki&tl=https://aliexpress.ru/item/1005003026107533.html?sku_id=12000037263598503"
    target="_blank"
    rel="noopener noreferrer"
  >
    ЗАКАЗАТЬ НА ALIEXPRESS
  </a>

</div>

  </div>
  <div className="devicePanelRT devicePanelSolarRT">


<div class="deviceCardRT deviceTechESP">

  <div class="deviceImageRT">
    <img src="/img/wiki/d5-mini-solar-kit.png" alt="D5 Mini Solar Kit" />
  </div>

  <div class="deviceBodyRT">

    <h3 class="deviceTitleRT">D5 Mini Solar Kit (Heltec V3)</h3>

    <div class="deviceSpecsRT">
      <span class="badgeRT">Bluetooth ✅</span>
      <span class="badgeRT">Wi-Fi ✅</span>
    </div>

    <p class="deviceDescRT">
      Автономный солнечный комплект на базе Heltec V3 для стационарных ретрансляторов и удалённых узлов Meshtastic.
    </p>

    <div class="deviceFooterRT">
      <div class="priceRT">≈ 6 000 ₽</div>
    </div>

  </div>

  <a
    class="ctaRT"
    href="https://trk.ppdu.ru/click/i33IoX8q?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005008487010403.html?sku_id=12000045362595840"
    target="_blank"
    rel="noopener noreferrer"
  >
    ЗАКАЗАТЬ НА ALIEXPRESS
  </a>

</div>


<div class="deviceCardRT deviceTechNRF">

  <div class="deviceImageRT">
    <img src="/img/wiki/sensecap-solar-node.png" alt="SenseCAP Solar Node" />
  </div>

  <div class="deviceBodyRT">

    <h3 class="deviceTitleRT">SenseCAP Solar Node</h3>

    <div class="deviceSpecsRT">
      <span class="badgeRT">Bluetooth ✅</span>
      <span class="badgeRT badgeOffRT">Wi-Fi ❌</span>
      <span class="badgeRT badgeOffRT">GPS ❌</span>
    </div>

    <p class="deviceDescRT">
      Готовая солнечная нода от Seeed Studio для длительной автономной работы в уличных условиях.
    </p>

    <div class="deviceFooterRT">
      <div class="priceRT">≈ 7 000 ₽</div>
    </div>

  </div>

  <a
    class="ctaRT"
    href="https://trk.ppdu.ru/click/i33IoX8q?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005008917538805.html?sku_id=12000051717147886"
    target="_blank"
    rel="noopener noreferrer"
  >
    ЗАКАЗАТЬ НА ALIEXPRESS
  </a>

</div>

  </div>
  <div className="devicePanelRT devicePanelBoardsRT">


<div class="deviceCardRT deviceTechESP deviceCardPopularRT">

  <div class="deviceImageRT">
    <img src="/img/wiki/heltec-wifi-lora32-v3.png" alt="Heltec WiFi LoRa 32 V3" />
  </div>

  <div class="deviceBodyRT">
    <h3 class="deviceTitleRT">Heltec WiFi LoRa 32 (V3)</h3>
    <div class="deviceSpecsRT">
      <span class="badgeRT">Bluetooth ✅</span>
      <span class="badgeRT">Wi-Fi ✅</span>
      <span class="badgeRT badgeOffRT">GPS ❌</span>
    </div>
    <p class="deviceDescRT">Популярная ESP-плата с OLED и SX1262 для сенсорных и экспериментальных нод.</p>
    <div class="deviceFooterRT"><div class="priceRT">≈ 1 500 ₽</div></div>
  </div>

  <a class="ctaRT" href="https://trk.ppdu.ru/click/i33IoX8q?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005007752194012.html" target="_blank" rel="noopener noreferrer">
    ЗАКАЗАТЬ НА ALIEXPRESS
  </a>

</div>


<div class="deviceCardRT deviceTechESP deviceCardPopularRT">

  <div class="deviceImageRT">
    <img src="/img/wiki/heltec-wireless-stick-lite-v4.png" alt="Heltec Wireless Stick Lite V4" />
  </div>

  <div class="deviceBodyRT">
    <h3 class="deviceTitleRT">Heltec V4 / Heltec Wireless Stick Lite V4</h3>
    <div class="deviceSpecsRT">
      <span class="badgeRT">Bluetooth ✅</span>
      <span class="badgeRT">Wi-Fi ✅</span>
      <span class="badgeRT badgeOffRT">GPS ❌</span>
    </div>
    <p class="deviceDescRT">Новое поколение ESP-платы Heltec с SX1262 и улучшенной энергоэффективностью.</p>
    <div class="deviceFooterRT"><div class="priceRT">≈ 2 000 ₽</div></div>
  </div>

  <a class="ctaRT" href="https://trk.ppdu.ru/click/i33IoX8q?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005010134873366.html?sku_id=12000051267466381" target="_blank" rel="noopener noreferrer">
    ЗАКАЗАТЬ НА ALIEXPRESS
  </a>

</div>


<div class="deviceCardRT deviceTechESP">

  <div class="deviceImageRT">
    <img src="/img/wiki/heltec-v4-case.png" alt="Heltec V4 with Case" />
  </div>

  <div class="deviceBodyRT">
    <h3 class="deviceTitleRT">Heltec V4 + Case</h3>
    <div class="deviceSpecsRT">
      <span class="badgeRT">⭐ Популярное</span>
      <span class="badgeRT">Bluetooth ✅</span>
      <span class="badgeRT">Wi-Fi ✅</span>
      <span class="badgeRT badgeOffRT">GPS ❌</span>
    </div>
    <p class="deviceDescRT">Комплект Heltec V4 с корпусом для быстрой сборки компактной ESP-ноды.</p>
    <div class="deviceFooterRT"><div class="priceRT">≈ 3 000 ₽</div></div>
  </div>

  <a class="ctaRT" href="https://trk.ppdu.ru/click/i33IoX8q?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005010017665425.html" target="_blank" rel="noopener noreferrer">
    ЗАКАЗАТЬ НА ALIEXPRESS
  </a>

</div>


<div class="deviceCardRT deviceTechNRF">

  <div class="deviceImageRT">
    <img src="/img/wiki/heltec-t114.png" alt="Heltec T114" />
  </div>

  <div class="deviceBodyRT">
    <h3 class="deviceTitleRT">Heltec T114</h3>
    <div class="deviceSpecsRT">
      <span class="badgeRT">Bluetooth ✅</span>
      <span class="badgeRT badgeOffRT">Wi-Fi ❌</span>
      <span class="badgeRT">GPS ⚠️</span>
    </div>
    <p class="deviceDescRT">nRF-плата с TFT 1.14″ и опциональным GPS для портативных автономных сборок.</p>
    <div class="deviceFooterRT"><div class="priceRT">≈ 3 300 ₽</div></div>
  </div>

  <a class="ctaRT" href="https://trk.ppdu.ru/click/i33IoX8q?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005009187736693.html?sku_id=12000050903276936" target="_blank" rel="noopener noreferrer">
    ЗАКАЗАТЬ НА ALIEXPRESS
  </a>

</div>


<div class="deviceCardRT deviceTechNRF">

  <div class="deviceImageRT">
    <img src="/img/wiki/heltec-t114-naked.png" alt="Heltec T114 Naked" />
  </div>

  <div class="deviceBodyRT">
    <h3 class="deviceTitleRT">Heltec T114 Naked</h3>
    <div class="deviceSpecsRT">
      <span class="badgeRT">Bluetooth ✅</span>
      <span class="badgeRT badgeOffRT">Wi-Fi ❌</span>
      <span class="badgeRT badgeOffRT">GPS ❌</span>
    </div>
    <p class="deviceDescRT">Упрощенная версия T114 без корпуса и GPS, для более бюджетной nRF-сборки.</p>
    <div class="deviceFooterRT"><div class="priceRT">≈ 2 200 ₽</div></div>
  </div>

  <a class="ctaRT" href="https://trk.ppdu.ru/click/i33IoX8q?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005009187736693.html" target="_blank" rel="noopener noreferrer">
    ЗАКАЗАТЬ НА ALIEXPRESS
  </a>

</div>


<div class="deviceCardRT deviceTechNRF">

  <div class="deviceImageRT">
    <img src="/img/wiki/wio-tracker-l1-eink.png" alt="Wio Tracker L1 E-ink" />
  </div>

  <div class="deviceBodyRT">
    <h3 class="deviceTitleRT">Wio Tracker L1 E-ink</h3>
    <div class="deviceSpecsRT">
      <span class="badgeRT">Bluetooth ✅</span>
      <span class="badgeRT badgeOffRT">Wi-Fi ❌</span>
      <span class="badgeRT">GPS ✅</span>
    </div>
    <p class="deviceDescRT">Плата на nRF с E-Ink и GPS для походных и мобильных сценариев с высокой автономностью.</p>
    <div class="deviceFooterRT"><div class="priceRT">≈ 3 900 ₽</div></div>
  </div>

  <a class="ctaRT" href="https://trk.ppdu.ru/click/i33IoX8q?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005009761846970.html" target="_blank" rel="noopener noreferrer">
    ЗАКАЗАТЬ НА ALIEXPRESS
  </a>

</div>


<div class="deviceCardRT deviceTechESP">

  <div class="deviceImageRT">
    <img src="/img/wiki/lilygo-ttgo-t-beam.png" alt="LILYGO TTGO T-Beam" />
  </div>

  <div class="deviceBodyRT">
    <h3 class="deviceTitleRT">LILYGO TTGO T-Beam</h3>
    <div class="deviceSpecsRT">
      <span class="badgeRT">Bluetooth ✅</span>
      <span class="badgeRT">Wi-Fi ✅</span>
      <span class="badgeRT">GPS ✅</span>
    </div>
    <p class="deviceDescRT">Классическая ESP-плата со встроенным GPS и 18650, удобна для автономных полевых узлов.</p>
    <div class="deviceFooterRT"><div class="priceRT">≈ 3 500 ₽</div></div>
  </div>

  <a class="ctaRT" href="https://trk.ppdu.ru/click/i33IoX8q?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005005854982382.html" target="_blank" rel="noopener noreferrer">
    ЗАКАЗАТЬ НА ALIEXPRESS
  </a>

</div>


<div class="deviceCardRT deviceTechESP">

  <div class="deviceImageRT">
    <img src="/img/wiki/heltec-wireless-stick-lite.png" alt="Heltec Wireless Stick Lite" />
  </div>

  <div class="deviceBodyRT">
    <h3 class="deviceTitleRT">Heltec Wireless Stick Lite / Mesh Nod</h3>
    <div class="deviceSpecsRT">
      <span class="badgeRT">Bluetooth ✅</span>
      <span class="badgeRT">Wi-Fi ✅</span>
      <span class="badgeRT badgeOffRT">GPS ❌</span>
    </div>
    <p class="deviceDescRT">Упрощенная ESP-плата без GPS/дисплея для сенсорных станций и ретрансляторов.</p>
    <div class="deviceFooterRT"><div class="priceRT">≈ 1 300 ₽</div></div>
  </div>

  <a class="ctaRT" href="https://trk.ppdu.ru/click/i33IoX8q?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005005443311259.html" target="_blank" rel="noopener noreferrer">
    ЗАКАЗАТЬ НА ALIEXPRESS
  </a>

</div>


<div class="deviceCardRT deviceTechESP">

  <div class="deviceImageRT">
    <img src="/img/wiki/heltec-wireless-paper.png" alt="Heltec LoRa Wireless Paper" />
  </div>

  <div class="deviceBodyRT">
    <h3 class="deviceTitleRT">Heltec LoRa Wireless Paper</h3>
    <div class="deviceSpecsRT">
      <span class="badgeRT">Bluetooth ✅</span>
      <span class="badgeRT">Wi-Fi ✅</span>
      <span class="badgeRT badgeOffRT">GPS ❌</span>
    </div>
    <p class="deviceDescRT">ESP-плата с E-Ink 2.9″ и SX1262 для автономных компактных нод.</p>
    <div class="deviceFooterRT"><div class="priceRT">≈ 1 500 ₽</div></div>
  </div>

  <a class="ctaRT" href="https://trk.ppdu.ru/click/i33IoX8q?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005007747207784.html?sku_id=12000042077885822" target="_blank" rel="noopener noreferrer">
    ЗАКАЗАТЬ НА ALIEXPRESS
  </a>

</div>


<div class="deviceCardRT deviceTechESP">

  <div class="deviceImageRT">
    <img src="/img/wiki/heltec-stick-gps.png" alt="Heltec Stick GPS" />
  </div>

  <div class="deviceBodyRT">
    <h3 class="deviceTitleRT">Heltec Stick /GPS</h3>
    <div class="deviceSpecsRT">
      <span class="badgeRT">Bluetooth ✅</span>
      <span class="badgeRT">Wi-Fi ✅</span>
      <span class="badgeRT">GPS ✅</span>
    </div>
    <p class="deviceDescRT">ESP-версия Heltec Stick со встроенным GPS для мобильных и тестовых сценариев.</p>
    <div class="deviceFooterRT"><div class="priceRT">≈ 1 800 ₽</div></div>
  </div>

  <a class="ctaRT" href="https://trk.ppdu.ru/click/i33IoX8q?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005009295030670.html?sku_id=12000050554954565" target="_blank" rel="noopener noreferrer">
    ЗАКАЗАТЬ НА ALIEXPRESS
  </a>

</div>


<div class="deviceCardRT deviceTechESP">

  <div class="deviceImageRT">
    <img src="/img/wiki/lilygo-lora32-t3.png" alt="LoRa 32 LILYGO T3 S3" />
  </div>

  <div class="deviceBodyRT">
    <h3 class="deviceTitleRT">LoRa 32 LILYGO / LILYGO T3 S3</h3>
    <div class="deviceSpecsRT">
      <span class="badgeRT">Bluetooth ✅</span>
      <span class="badgeRT">Wi-Fi ✅</span>
      <span class="badgeRT badgeOffRT">GPS ❌</span>
    </div>
    <p class="deviceDescRT">Компактная ESP-плата с OLED и LoRa для DIY-проектов и стационарных/переносных узлов.</p>
    <div class="deviceFooterRT"><div class="priceRT">≈ 2 000 ₽</div></div>
  </div>

  <a class="ctaRT" href="https://trk.ppdu.ru/click/i33IoX8q?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005004627139838.html" target="_blank" rel="noopener noreferrer">
    ЗАКАЗАТЬ НА ALIEXPRESS
  </a>

</div>

  </div>
</div>



