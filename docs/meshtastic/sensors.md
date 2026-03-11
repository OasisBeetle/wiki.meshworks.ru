---
title: Датчики
description: "Как работает Telemetry Module в Meshtastic: что включать, какие датчики поддерживаются и что чаще всего имеет смысл брать."
sidebar_label: Датчики
sidebar_position: 4
slug: /meshtastic/sensors
breadcrumbs: ["База знаний Meshtastic", "Датчики"]
---

## Что это такое

В Meshtastic датчики и сенсоры работают через `Telemetry Module`. Через него нода может отправлять в сеть:

- **Device Metrics** - батарея, напряжение, загрузка канала и airtime;
- **Environment Metrics** - температура, влажность, давление;
- **Air Quality Metrics** - качество воздуха и смежные показатели;
- **Health Metrics** - пульс, `SpO2` и температура тела.

Если коротко: для большинства пользователей эта страница нужна в трёх случаях:

- выбрать простой датчик для погоды и окружения;
- вывести питание и базовую телеметрию;
- понять, что именно Meshtastic поддерживает официально.


## Базовые датчики окружающей среды

Если нужен нормальный старт без долгого выбора, чаще всего смотрят сюда:

- [BMP180](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005009340600707.html?sku_id=12000048806026426) - самый дешёвый старт: давление и температура, около `100 ₽`
- [BME280](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005009595456844.html) - базовый универсальный вариант: температура, давление, влажность, около `300 ₽`
- [BME680](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005010452465354.html?sku_id=12000052471311315) - если нужен ещё и `VOC`: температура, давление, влажность, около `800 ₽`. Что такое `VOC`: [разбор на Habr](https://habr.com/ru/articles/551538/)

## Как это работает

Логика простая:

1. Сенсор подключается к `I2C`.
2. Нода при старте пытается его определить автоматически.
3. Нужный блок `Telemetry Module` должен быть включён.
4. Только после этого показания реально уходят в mesh.

Если модуль не включён, сенсор может определяться, но данные в сеть не отправятся.

## Что именно включать

| Блок | Что даёт | Когда нужен |
|---|---|---|
| `Device Metrics` | Батарея, напряжение, airtime, загрузка канала | Почти всегда |
| `Environment Telemetry` | Температура, влажность, давление | Погода, окружение, стационарная нода |
| `Air Quality` | Газовое сопротивление, частицы, смежные данные | Если реально нужен air quality |
| `Power Metrics` | Ток и напряжение с внешнего сенсора | Мониторинг питания, солнечные сборки |
| `Health Telemetry` | Пульс, `SpO2`, температура тела | Узкие сценарии, не для общей сети “по умолчанию” |

## Основные настройки

| Опция | Что делает | По умолчанию |
|---|---|---|
| `Environment Telemetry Enabled` | Включает environmental telemetry | `false` |
| `Environment Metrics Update Interval` | Интервал отправки environmental telemetry | `1800 c` |
| `Device Metrics Update Interval` | Интервал отправки device metrics в mesh | `1800 c` |
| `Environment Screen Enabled` | Показывает telemetry на экране устройства | `false` |
| `Display Fahrenheit` | Показывает температуру на экране в Fahrenheit | `false` |
| `Air Quality Enabled` | Включает air quality telemetry | `false` |
| `Air Quality Interval` | Интервал отправки air quality telemetry | `1800 c` |
| `Power Metrics Enabled` | Включает power telemetry с внешнего сенсора | `false` |
| `Power Metrics Interval` | Интервал отправки power telemetry | зависит от конфигурации |
| `Health Telemetry Enabled` | Включает health telemetry | `false` |
| `Health Telemetry Interval` | Интервал отправки health telemetry | `1800 c` |

:::note
Напряжение батареи самой ноды не требует включения `Power Metrics Enabled`. Эта опция нужна именно для внешних датчиков тока и напряжения.
:::

Настройки обычно находятся здесь:

```text
Settings > Module Configuration > Telemetry (Sensors)
```

## Официально поддерживаемые сенсоры

Ниже - список сенсоров, которые Meshtastic сейчас поддерживает в рамках `Telemetry Module`.

### Окружение

| Сенсор | I2C | Что измеряет |
|---|---|---|
| `AHT10`, `AHT20` | `0x38` | Температура и влажность |
| `BMP085` | `0x76`, `0x77` | Температура и давление |
| `BMP180` | `0x76`, `0x77` | Температура и давление |
| `BMP280` | `0x76`, `0x77` | Температура и давление |
| `BME280` | `0x76`, `0x77` | Температура, давление, влажность |
| `BMP388` | `0x76`, `0x77` | Давление, температура |
| `BMP390` | `0x76`, `0x77` | Давление, температура |
| `BME68x` | `0x76`, `0x77` | Температура, давление, влажность, газовое сопротивление |
| `DPS310` | `0x76`, `0x77` | Давление, температура |
| `MCP9808` | `0x18` | Температура |
| `LPS22` | `0x5D`, `0x5C` | Давление |
| `SHTC3` | `0x70` | Температура и влажность |
| `SHT31` | `0x44`, `0x45` | Температура и влажность |
| `SHT4X` | `0x44`, `0x45` | Температура и влажность |
| `DFROBOT_LARK` | `0x42` | Температура, давление, влажность, направление и скорость ветра |
| `DFROBOT_RAIN` | `0x1D` | Дождемер |

### Качество воздуха и частицы

| Сенсор | I2C | Что измеряет |
|---|---|---|
| `PMSA003I` | `0x12` | Концентрация и счёт частиц по размерам |
| `RadSens` | `0x66` | Радиодозиметр |

### Свет и УФ

| Сенсор | I2C | Что измеряет |
|---|---|---|
| `OPT3001` | `0x44`, `0x45` | Освещённость |
| `VEML7700` | `0x10` | Освещённость |
| `TSL2591` | `0x29` | Освещённость |
| `LTR390UV` | `0x53` | УФ‑освещённость |

### Питание

| Сенсор | I2C | Что измеряет |
|---|---|---|
| `INA219` | `0x40`, `0x41`, `0x43` | Ток и напряжение |
| `INA226` | `0x40`, `0x41`, `0x43` | Ток и напряжение |
| `INA260` | `0x40`, `0x41`, `0x43` | Ток и напряжение |
| `INA3221` | `0x42` | Трёхканальные ток и напряжение |

### Здоровье

| Сенсор | I2C | Что измеряет |
|---|---|---|
| `MAX30102` | `0x57` | Пульс, `SpO2`, температура тела |
| `MLX90614` | `0x5A` | Температура тела |
| `MLX90632` | `0x3A` | Температура тела |

### Прочее

| Сенсор | I2C | Что измеряет |
|---|---|---|
| `RCWL9620` | `0x57` | Ультразвуковая дистанция |
| `NAU7802` | `0x2A` | 24‑битный ADC для тензомоста |

## Практический список модулей

Этот блок не равен списку “официально поддерживается прошивкой” один к одному. Это просто полезная подборка модулей, которые часто используют на реальных сборках.

### Окружение

- [MCP9808](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005008918025414.html) - температура
- [SHT31](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005008766957816.html?sku_id=12000052567891322) - температура, влажность
- [SHT4X](https://aliexpress.ru/item/1005008430699842.html?sku_id=12000056260904817) - температура, влажность
- [AHT10](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005008699139931.html?sku_id=12000046300583727) - температура, влажность
- [AHT20](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005008699139931.html?sku_id=12000046300583728) - температура, влажность
- [BMP180](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005009340600707.html?sku_id=12000048806026426) - давление, температура
- [BMP280](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/4001256062765.html) - давление, температура
- [BMP388](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005001322673506.html?sku_id=12000015693726118) - давление, температура
- [BMP390](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005009710752424.html?sku_id=12000049921686975) - давление, температура
- [DPS310](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005007905349180.html?sku_id=12000042788572391) - давление, температура
- [BME280](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005009595456844.html) - температура, давление, влажность
- [BME680](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005010452465354.html?sku_id=12000052471311315) - температура, давление, влажность, `VOC`
- [BME688](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005010452465354.html?sku_id=12000052471311311) - температура, давление, влажность, улучшенный `VOC`
- [DFROBOT_RAIN](https://aliexpress.ru/item/1005005624682669.html?sku_id=12000033788499141) - дождемер
- [PMSA003I](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005009801112640.html?sku_id=12000050210290025) - частицы `PM`
- [OPT3001](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005009403769957.html) - освещённость
- [VEML7700](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005008859887704.html?sku_id=12000056145158681) - освещённость
- [TSL2591](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005009261251555.html) - освещённость
- [LTR390UV](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005009261251555.html) - УФ‑освещённость
- [RadSens](https://www.ozon.ru/product/universalnaya-plata-modul-dozimetra-schetchika-geygera-i2c-energoeffektivnaya-radsens-board-1623839352/?at=A6tGOvKE5c8y2ZK5F3ANO3KHL7V1Zzt3yjZjrtMm4BD8) - дозиметр радиации

:::tip
Если нужен `RadSens`, часто удобнее искать готовые комплекты на Авито, особенно варианты уже с трубкой.
:::

### Питание

- [INA219](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/4000399388470.html) - ток, напряжение
- [INA226](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005006043405248.html?sku_id=12000035459002627) - ток, напряжение
- [INA260](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005008593621571.html?sku_id=12000045872494526) - ток, напряжение
- [INA3221](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/4001111713182.html) - трёхканальный ток и напряжение

### Здоровье

- [MAX30102](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005004329937310.html?sku_id=12000028779117748) - пульс, `SpO2`, температура тела
- [MLX90614](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005008466598932.html?sku_id=12000056034112717) - температура тела, ИК

### Прочее

- [RCWL9620](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005003580473740.html) - ультразвуковая дистанция
- [NAU7802](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005005776009064.html?sku_id=12000048599719282) - тензодатчик, весы

### GNSS

`GNSS` не относится к ядру `Telemetry Module`, но такие модули часто ставят рядом с Meshtastic‑нодами:

- [GT-U7](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005009982596097.html) - GPS
- [BZ-181](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005008858821608.html) - GPS
- [Beidou](https://trk.ppdu.ru/click/1n1oBoWn?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005009530083645.html) - GPS

## Короткий пример настройки

Пример для `RAK4631` с `BME680`:

```bash
meshtastic --set telemetry.environment_measurement_enabled true --set telemetry.environment_screen_enabled true --set telemetry.environment_display_fahrenheit true
```

После команды нода перезагрузится. Дальше проверьте:

1. что после старта сенсор определился;
2. что на экране появился блок `Telemetry`, если экран включён;
3. что данные реально начали отправляться.

Если эффекта нет, посмотрите диагностику:

```bash
meshtastic --noproto
```

:::tip
Если меняете несколько параметров, объединяйте их в одну команду. Так будет меньше лишних перезагрузок.
:::

## Что имеет смысл в реальной сети

- `Device Metrics` можно оставлять включёнными.
- `Environment Telemetry` включайте только там, где она реально нужна.
- `Air Quality` и `Health Telemetry` не включайте “на всякий случай”.
- Интервалы держите в минутах или десятках минут, а не в секундах.
- Для стационарных телеметрических нод лучше использовать стабильное питание.

Если сеть общая и публичная, слишком частая телеметрия быстро увеличивает airtime, коллизии и задержки.

## Что дальше

- [Модули Meshtastic](/meshtastic/modules)
- [MQTT](/meshtastic/mqtt)
- [Роли нод](/node-setup/roles)
- [Производительность сети](/troubleshooting/network-performance)
