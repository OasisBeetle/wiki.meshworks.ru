import type { AntennaCategory, AntennaItem } from './types';

export const ANTENNA_CATEGORY_LABELS: Record<AntennaCategory, string> = {
  portable: 'Портативные',
  stationary: 'Стационарные',
  directional: 'Направленные',
};

export const ANTENNA_DATA: Record<AntennaCategory, AntennaItem[]> = {
  portable: [
    {
      title: 'Магнитная TX868-XPL',
      image: '/img/wiki/antenna-monopole.png',
      alt: 'Магнитная антенна TX868-XPL',
      category: 'portable',
      badges: ['868 МГц', 'Магнитная', 'Авто / выезд'],
      descriptionLines: [
        'Базовый магнитный вариант для автомобиля, подоконника или временной стационарной точки.',
        'Обязательно ставить на металлическую поверхность: крыша автомобиля, отлив, корпус кондиционера или другой противовес.',
      ],
      price: '≈ 300 ₽',
      href: 'https://ali.click/n1r631v?erid=2SDnjeZz99K',
      hrefLabel: 'AliExpress',
    },
    {
      title: 'Портативная 21 см',
      image: '/img/wiki/antenna-monopole.png',
      alt: 'Портативная антенна 21 см',
      category: 'portable',
      badges: ['868 МГц', 'Штырь', 'Портатив'],
      descriptionLines: [
        'Компактная штыревая антенна для повседневных портативных нод и быстрых полевых выходов.',
        'Частота у продавцов бывает плавающей, а для лучшего результата часто нужна простая доработка верхней трубки.',
      ],
      price: '≈ 200 ₽',
      href: 'https://trk.ppdu.ru/click/i33IoX8q?erid=2SDnjcM2X3K&tl=https://aliexpress.ru/item/1005007580150965.html?sku_id=12000041377829285',
      hrefLabel: 'AliExpress',
    },
    {
      title: 'Gizont 20-40 см',
      image: '/img/wiki/antenna-monopole.png',
      alt: 'Портативная антенна Gizont 20-40 см',
      category: 'portable',
      badges: ['868 МГц', 'Штырь', 'Портатив'],
      descriptionLines: [
        'Проверенная портативная антенна, которую часто рекомендуют в англоязычном и русскоязычном сообществе Meshtastic.',
        'Хорошо работает в 868 МГц, но сейчас для РФ часто требует обходных вариантов доставки или покупки на вторичке.',
      ],
      price: '≈ 800 ₽',
      href: 'https://alli.pub/7bux6q',
      hrefLabel: 'AliExpress',
    },
    {
      title: 'Компактная стеклопластиковая',
      image: '/img/wiki/antenna-collinear.png',
      alt: 'Компактная стеклопластиковая антенна',
      category: 'portable',
      badges: ['868 МГц', 'Fiberglass', 'Портатив / база'],
      descriptionLines: [
        'Небольшая стеклопластиковая антенна, которую можно использовать как переносной апгрейд или на лёгкой стационарной точке.',
        'Для большинства нод потребуется подходящий адаптер или переходник по типу разъёма.',
      ],
      price: '≈ 700 ₽',
      href: 'https://ali.click/pcr631m?erid=2SDnjdEuTTF',
      hrefLabel: 'AliExpress',
    },
  ],
  stationary: [
    {
      title: 'Rodaxo 60 см',
      image: '/img/wiki/antenna-collinear.png',
      alt: 'Стеклопластиковая антенна Rodaxo 60 см',
      category: 'stationary',
      badges: ['868 МГц', 'Fiberglass', 'Мачта / крыша'],
      descriptionLines: [
        'Большая всенаправленная антенна для постоянной установки на мачте, фасаде или вынесенной крыше.',
        'Лучше работает при коротком коаксиальном кабеле и максимальном выносе от стены, парапета и металлоконструкций.',
      ],
      price: '≈ 3 000 ₽',
      href: 'https://shp.pub/7bkni6?erid=2SDnjdWwZ8t',
      hrefLabel: 'Магазин',
    },
    {
      title: 'Триада магнитная',
      image: '/img/wiki/antenna-dipole.png',
      alt: 'Магнитная антенна Триада',
      category: 'stationary',
      badges: ['868 МГц', 'Магнитная', 'Дом / авто'],
      descriptionLines: [
        'Более серьёзный и давно проверенный вариант для автомобиля, окна или домашней точки на металлическом основании.',
        'Как и у других магнитных антенн, нормальный результат достигается только с хорошим противовесом.',
      ],
      price: '≈ 3 800 ₽',
      href: 'https://shp.pub/7bknid?erid=2SDnjdshP5i',
      hrefLabel: 'Яндекс Маркет',
    },
    {
      title: 'ABME Fiberglass 35 см',
      image: '/img/wiki/antenna-collinear.png',
      alt: 'ABME Fiberglass 35 см',
      category: 'stationary',
      badges: ['868 МГц', 'Fiberglass', 'База'],
      descriptionLines: [
        'Компактная базовая антенна для стационарной ноды, когда нужен понятный всенаправленный вариант без самодельщины.',
        'Требует аккуратного монтажа, подходящего разъёма и по возможности короткого кабеля до ноды.',
      ],
      price: '≈ 2 000 ₽',
      href: 'https://ali.click/kdr6310?erid=2SDnjdYhJqP',
      hrefLabel: 'AliExpress',
    },
  ],
  directional: [
    {
      title: 'Яги 868',
      image: '/img/wiki/antenna-yagi.png',
      alt: 'Направленная антенна Яги 868 МГц',
      category: 'directional',
      badges: ['868 МГц', 'Направленная', 'Point-to-point'],
      descriptionLines: [
        'Направленная антенна для дальних линков и проброса до удалённой точки, где всенаправленный вариант уже не справляется.',
        'Для городской меш-сети обычно избыточна, а лучший результат даёт при точной ориентации и понятном сценарии линка.',
      ],
      price: '≈ 2 500 ₽',
      href: 'https://shp.pub/7bknhs?erid=2SDnjcRC624',
      hrefLabel: 'Яндекс Маркет',
    },
  ],
};
