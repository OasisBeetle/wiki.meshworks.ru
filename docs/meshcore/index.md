---
title: MeshCore
description: "Раздел по MeshCore: быстрый старт, роли (companion/repeater/room server), принципы маршрутизации, OTA и диагностика."
sidebar_label: MeshCore
sidebar_position: 1
slug: /meshcore
breadcrumbs: ["База знаний MeshWorks", "MeshCore"]
---

MeshCore - экосистема для защищённой текстовой связи на LoRa: прошивки для радиоустройств, клиенты и “серверные” роли вроде `repeater` и `room server`.

Это практическая русскоязычная шпаргалка по MeshCore: что поставить, как запустить сеть, как обслуживать повторители и комнаты, и что делать, если что‑то не работает.

## Быстрые ссылки

- [Новичку](/meshcore/newbie) - чек‑лист перед первым выходом в эфир.
- [Быстрый старт](/meshcore/quick-start) - что нужно и с чего начать.
- [Понятия и логика сети](/meshcore/concepts) - `advert`, `flood`, маршруты, `BW/SF/CR`.
- [Repeater и Room Server](/meshcore/servers) - настройка, пароли, ключи, наблюдатель, `deafness`.
- [Observer и MQTT](/meshcore/observer) - как подключить “наблюдателя” к анализаторам и картам.
- [BRIDGE: мост между сетями](/meshcore/bridge) - экспериментальный `serial-bridge` между частотами и настройками.
- [Обновления и OTA](/meshcore/updates) - `DFU/OTA` для `nRF` и `ESP32`, и как снижать риск “кирпича”.
- [ПО и клиенты](/meshcore/software) - чем управлять нодой: телефон, веб, ПК.
- [FAQ](/meshcore/faq) - ответы на частые вопросы.
- [Безопасность](/meshcore/security) - ключи, пароли, приватность карт и `observer`.
- [Решение проблем](/meshcore/troubleshooting) - Bluetooth, время, очистка `nRF/UF2`, Linux `failed to open`.
- [Экосистема](/meshcore/ecosystem) - клиенты, проекты, сравнения, где искать исходники.
- [Сообщество](/meshcore/community) - где общаться, в том числе городские чаты.

:::tip
MeshCore и Meshtastic - разные системы. Если вы строите сеть на Meshtastic, используйте раздел [/meshtastic](/meshtastic).
:::
