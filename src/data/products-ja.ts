import type { Product, ProductDataService } from './types';

// Import collection item 01 images
import cl__item01_01 from '@/assets/images/cl__item01-01.jpg';
import cl__item01_02 from '@/assets/images/cl__item01-02.jpg';
import cl__item01_03 from '@/assets/images/cl__item01-03.jpg';
import cl__item01_04 from '@/assets/images/cl__item01-04.jpg';
import cl__item01_05 from '@/assets/images/cl__item01-05.jpg';
import cl__item01_06 from '@/assets/images/cl__item01-06.jpg';

// Import collection item 02 images
import cl__item02_01 from '@/assets/images/cl__item02-01.jpg';
import cl__item02_02 from '@/assets/images/cl__item02-02.jpg';
import cl__item02_03 from '@/assets/images/cl__item02-03.jpg';
import cl__item02_04 from '@/assets/images/cl__item02-04.jpg';
import cl__item02_05 from '@/assets/images/cl__item02-05.jpg';
import cl__item02_06 from '@/assets/images/cl__item02-06.jpg';

// Import collection item 03 images
import cl__item03_01 from '@/assets/images/cl__item03-01.jpg';
import cl__item03_02 from '@/assets/images/cl__item03-02.jpg';
import cl__item03_03 from '@/assets/images/cl__item03-03.jpg';
import cl__item03_04 from '@/assets/images/cl__item03-04.jpg';
import cl__item03_05 from '@/assets/images/cl__item03-05.jpg';
import cl__item03_06 from '@/assets/images/cl__item03-06.jpg';

// Import collection item 04 images
import cl__item04_01 from '@/assets/images/cl__item04-01.jpg';
import cl__item04_02 from '@/assets/images/cl__item04-02.jpg';
import cl__item04_03 from '@/assets/images/cl__item04-03.jpg';
import cl__item04_04 from '@/assets/images/cl__item04-04.jpg';
import cl__item04_05 from '@/assets/images/cl__item04-05.jpg';
import cl__item04_06 from '@/assets/images/cl__item04-06.jpg';

// Import collection item 05 images
import cl__item05_01 from '@/assets/images/cl__item05-01.jpg';
import cl__item05_02 from '@/assets/images/cl__item05-02.jpg';
import cl__item05_03 from '@/assets/images/cl__item05-03.jpg';
import cl__item05_04 from '@/assets/images/cl__item05-04.jpg';
import cl__item05_05 from '@/assets/images/cl__item05-05.jpg';
import cl__item05_06 from '@/assets/images/cl__item05-06.jpg';

// Import collection item 06 images
import cl__item06_01 from '@/assets/images/cl__item06-01.jpg';
import cl__item06_02 from '@/assets/images/cl__item06-02.jpg';
import cl__item06_03 from '@/assets/images/cl__item06-03.jpg';
import cl__item06_04 from '@/assets/images/cl__item06-04.jpg';

// Import collection item 07 images
import cl__item07_01 from '@/assets/images/cl__item07-01.jpg';
import cl__item07_02 from '@/assets/images/cl__item07-02.jpg';
import cl__item07_03 from '@/assets/images/cl__item07-03.jpg';
import cl__item07_04 from '@/assets/images/cl__item07-04.jpg';

// Import blanket images
import blanket01 from '@/assets/images/img-blanket-1.jpg';
import blanket02 from '@/assets/images/img-blanket-2.jpg';
import blanket03 from '@/assets/images/img-blanket-3.jpg';

const mainProducts: Product[] = [
  {
    headline: 'UNISEX',
    modelNumber: 'NYM82510',
    title: 'CR Move Insulation Jacket',
    copy: '抱っこ対応のユニセックスモデルの中わたジャケット',
    description:
      'ベビーカバー（ダッカー）をフロントに装着することで、子どもを抱いた上から着用することができるジャケット。ベビーカバーは単体でも使用でき、内側は子どもの肌に心地よいフリース素材仕様。子どもの成長後はダッカーを外して単体でのジャケット着用が可能。3色展開。',
    price: '¥44,000 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NYM82510',
    images: [
      { src: cl__item01_01, alt: 'THE NORTH FACE MATERNITY+ Collection 1 Image 1' },
      { src: cl__item01_02, alt: 'THE NORTH FACE MATERNITY+ Collection 1 Image 2' },
      { src: cl__item01_03, alt: 'THE NORTH FACE MATERNITY+ Collection 1 Image 3' },
      { src: cl__item01_04, alt: 'THE NORTH FACE MATERNITY+ Collection 1 Image 4' },
      { src: cl__item01_05, alt: 'THE NORTH FACE MATERNITY+ Collection 1 Image 5' },
      { src: cl__item01_06, alt: 'THE NORTH FACE MATERNITY+ Collection 1 Image 6' },
    ],
  },
  {
    headline: 'WOMENS',
    modelNumber: 'NYM82501',
    title: 'Maternity Insulation Coat',
    copy: '身幅の調整が可能な、保温性を備えた中綿ロングコート',
    description:
      'ゆとりのあるシルエットとドットボタンでの調整で、お腹の大きくなる妊娠中から、子どもの成長後まで長期間の着用が可能。産後は小さな子供を抱っこした際に上から着用でき、子供の顔を出すことを想定して、襟元はVネックにも変化可能な2WAY仕様。2色展開。',
    price: '¥41,800 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NYM82501',
    images: [
      { src: cl__item02_01, alt: 'THE NORTH FACE MATERNITY+ Collection 2 Image 1' },
      { src: cl__item02_02, alt: 'THE NORTH FACE MATERNITY+ Collection 2 Image 2' },
      { src: cl__item02_03, alt: 'THE NORTH FACE MATERNITY+ Collection 2 Image 3' },
      { src: cl__item02_04, alt: 'THE NORTH FACE MATERNITY+ Collection 2 Image 4' },
      { src: cl__item02_05, alt: 'THE NORTH FACE MATERNITY+ Collection 2 Image 5' },
      { src: cl__item02_06, alt: 'THE NORTH FACE MATERNITY+ Collection 2 Image 6' },
    ],
  },
  {
    headline: 'UNISEX',
    modelNumber: 'NPM62510',
    title: 'CR Storage Jacket',
    copy: '手ぶらでのお出かけを叶える、抱っこ対応・収納力に優れるジャケット',
    description:
      '「極力バッグは持ちたくない」というパパの実際の声から生まれた、10個のポケットを備えるジャケット。ベビーカバー（ダッカー）をフロントに装着することで抱っこに対応。カバーを外せば収納力のある防水ジャケットとして単体で着用ができる。表地にはGORE-TEXを使用。2色展開。',
    price: '¥66,000 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NPM62510',
    images: [
      { src: cl__item03_01, alt: 'THE NORTH FACE MATERNITY+ Collection 3 Image 1' },
      { src: cl__item03_02, alt: 'THE NORTH FACE MATERNITY+ Collection 3 Image 2' },
      { src: cl__item03_03, alt: 'THE NORTH FACE MATERNITY+ Collection 3 Image 3' },
      { src: cl__item03_04, alt: 'THE NORTH FACE MATERNITY+ Collection 3 Image 4' },
      { src: cl__item03_05, alt: 'THE NORTH FACE MATERNITY+ Collection 3 Image 5' },
      { src: cl__item03_06, alt: 'THE NORTH FACE MATERNITY+ Collection 3 Image 6' },
    ],
  },
  {
    headline: 'WOMENS',
    modelNumber: 'NDM92501',
    title: 'Maternity Down Coat',
    copy: '妊娠中も産後もベビーと一緒に着用できるダウンコート',
    description:
      '防風性・はっ水性に優れた柔らかな手触りのGORE-TEX WINDSTOPPER®️の内側に、光電子®️ダウンをたっぷり封入した保温性に優れたダウンジャケット。お腹の大きくなる妊娠中から、子どもの成長後まで長期間の着用が可能。ベビーキャリアカバーを連結すれば子どもを抱っこしたまま着用でき、単体でもベビーカーや抱っこひもに装着できる。2色展開。',
    price: '¥93,500 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NDM92501',
    images: [
      { src: cl__item04_01, alt: 'THE NORTH FACE MATERNITY+ Collection 4 Image 1' },
      { src: cl__item04_02, alt: 'THE NORTH FACE MATERNITY+ Collection 4 Image 2' },
      { src: cl__item04_03, alt: 'THE NORTH FACE MATERNITY+ Collection 4 Image 3' },
      { src: cl__item04_04, alt: 'THE NORTH FACE MATERNITY+ Collection 4 Image 4' },
      { src: cl__item04_05, alt: 'THE NORTH FACE MATERNITY+ Collection 4 Image 5' },
      { src: cl__item04_06, alt: 'THE NORTH FACE MATERNITY+ Collection 4 Image 6' },
    ],
  },
  {
    headline: 'UNISEX',
    modelNumber: 'NTM62510',
    title: 'CR Sweat Crew',
    copy: '抱っこひも使用時にも着用しやすい、食品防汚に対応したスウェット',
    description:
      '袖と背面に配したポケットは抱っこひも使用時にも使いやすい配置。背面ポケットには左右どちらからでもアプローチでき、両脇ファスナーを開くことにより、抱っこひものヒップベルトの干渉が少なく使用できる。3色展開。',
    price: '¥17,600 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NTM62510',
    images: [
      { src: cl__item05_01, alt: 'THE NORTH FACE MATERNITY+ Collection 5 Image 1' },
      { src: cl__item05_02, alt: 'THE NORTH FACE MATERNITY+ Collection 5 Image 2' },
      { src: cl__item05_03, alt: 'THE NORTH FACE MATERNITY+ Collection 5 Image 3' },
      { src: cl__item05_04, alt: 'THE NORTH FACE MATERNITY+ Collection 5 Image 4' },
      { src: cl__item05_05, alt: 'THE NORTH FACE MATERNITY+ Collection 5 Image 5' },
      { src: cl__item05_06, alt: 'THE NORTH FACE MATERNITY+ Collection 5 Image 6' },
    ],
  },
];

const additionalProducts: Product[] = [
  {
    headline: 'UNISEX',
    modelNumber: 'NTM82511',
    title: 'CR L/S Message Tee',
    copy: 'SRHR認知向上の思いを込めた長袖グラフィックTシャツ',
    description: 'SRHR認知向上の思いを込めた長袖グラフィックTシャツ',
    price: '¥7,700 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NTM82511',
    images: [
      { src: cl__item06_01, alt: 'CR L/S Message Tee Image 1' },
      { src: cl__item06_02, alt: 'CR L/S Message Tee Image 2' },
      { src: cl__item06_03, alt: 'CR L/S Message Tee Image 3' },
      { src: cl__item06_04, alt: 'CR L/S Message Tee Image 4' },
    ],
  },
  {
    headline: 'WOMENS',
    modelNumber: 'NLM72501',
    title: 'Maternity Micro Fleece One Piece',
    copy: '軽くて暖かい、お手入れ簡単な授乳対応フリースワンピース',
    description: '軽くて暖かい、お手入れ簡単な授乳対応フリースワンピース',
    price: '¥17,600 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NLM72501',
    images: [
      { src: cl__item07_01, alt: 'Maternity Micro Fleece One Piece Image 1' },
      { src: cl__item07_02, alt: 'Maternity Micro Fleece One Piece Image 2' },
      { src: cl__item07_03, alt: 'Maternity Micro Fleece One Piece Image 3' },
      { src: cl__item07_04, alt: 'Maternity Micro Fleece One Piece Image 4' },
    ],
  },
];

const babyBlankets: Product[] = [
  {
    headline: 'BABY',
    modelNumber: 'NNB72501',
    title: 'Baby Shell Blanket',
    copy: '抱っこひもやベビーカバーに装着可能。携帯にも便利な中わた入りの保温カバー',
    description: '抱っこひもやベビーカバーに装着可能。携帯にも便利な中わた入りの保温カバー',
    price: '¥14,300 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NNB72501',
    images: [
      { src: blanket01, alt: 'Baby Shell Blanket' },
    ],
  },
  {
    headline: 'BABY',
    modelNumber: 'NNB72502',
    title: 'Baby Fleece Lining Blanket',
    copy: 'フリース素材の保温カバー。単体での使用に加え、Baby Shell Blanket（NNB72501 / NNB72510）との連結も可能。レイヤリングで保温性を高められます。',
    description: 'フリース素材の保温カバー。単体での使用に加え、Baby Shell Blanket（NNB72501 / NNB72510）との連結も可能。レイヤリングで保温性を高められます。',
    price: '¥9,900 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NNB72502',
    images: [
      { src: blanket02, alt: 'Baby Fleece Lining Blanket' },
    ],
  },
  {
    headline: 'BABY',
    modelNumber: 'NNB72510',
    title: 'Baby Fleece Lining Blanket',
    copy: '抱っこひもやベビーカバーに装着可能。携帯にも便利な中わた入りの保温カバーの総柄モデル',
    description: '抱っこひもやベビーカバーに装着可能。携帯にも便利な中わた入りの保温カバーの総柄モデル',
    price: '¥17,600 (Tax incl.)',
    link: 'https://www.goldwin.co.jp/ap/item/i/m/NNB72510',
    images: [
      { src: blanket03, alt: 'Baby Fleece Lining Blanket' },
    ],
  },
];

export const productDataJa: ProductDataService = {
  getMainProducts: () => mainProducts,
  getAdditionalProducts: () => additionalProducts,
  getBabyBlankets: () => babyBlankets,
};