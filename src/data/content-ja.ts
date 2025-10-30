import type { ContentData, ContentDataService } from './types';

const contentJa: ContentData = {
  meta: {
    title: 'THE NORTH FACE Maternity+ 2025FW',
    description: 'THE NORTH FACE Maternity+ 2025 Fall/Winter Collection',
    lang: 'ja',
  },
  hero: {
    imageAlt: 'THE NORTH FACE Maternity+ 2025FW - 家族の温かい時間',
  },
  intro: {
    sealImageSrc: '/images/img-seal-01.png',
    sealImageAlt: 'きみがいるから、行き先がふえていく',
  },
  gallery: {
    description: [
      'THE NORTH FACEのMATERNITY+は、挑戦や変化に立ち向かうことを楽しむためのアイテムラインです。',
      '性別を問わず育児をする人の負担を軽減し、子どもの成長とともに変化を楽しみ、',
      '長く愛着を持つことができるウエアを取り揃えています。',
      'MATERNITY+は、「妊娠・出産や子育てを経験する家族」のEXPLORATIONを叶えるカテゴリーとして、',
      '育児をするひとを性別を問わずサポートします。',
    ],
    imageAlts: [
      'THE NORTH FACE MATERNITY+ Style 1',
      'THE NORTH FACE MATERNITY+ Style 2',
      'THE NORTH FACE MATERNITY+ Style 3',
      'THE NORTH FACE MATERNITY+ Style 4',
      'THE NORTH FACE MATERNITY+ Style 5',
      'THE NORTH FACE MATERNITY+ Style 6',
    ],
  },
  productLines: {
    imageSrc: {
      pc: '/images/img-product-pc.svg',
      sp: '/images/img-product-sp.svg',
    },
    description: '心身ともに変化の大きな妊娠期。妊娠中も、産後の子どもとのお出かけも、自分ひとりで使う時も。さまざまなシーンに対応する、高い拡張性を備えるアイテムがMATERNITY+には揃っています。',
  },
  collection: {
    label: 'MATERNITY+',
  },
  footer: {
    disclaimer: '※内容および詳細・商品価格は、予告なく変更されることもありますので予めご了承ください。',
    ariaLabel: 'サイトフッター',
  },
};

export const contentDataJa: ContentDataService = {
  getContent: () => contentJa,
};