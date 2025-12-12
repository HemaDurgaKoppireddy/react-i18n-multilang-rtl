// src/context/ProductContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ProductContext = createContext();

// ---------- DEFAULT PRODUCTS (multilingual: names, category, description) ----------
const DEFAULT_PRODUCTS = [
  {
    id: "p1",
    names: { en: "Apple iPhone 15", es: "Apple iPhone 15", ar: "آيفون 15 من أبل", ja: "Apple iPhone 15" },
    category: { en: "Mobile Phones", es: "Teléfonos móviles", ar: "الهواتف المحمولة", ja: "スマートフォン" },
    price: 999,
    image: "https://m.media-amazon.com/images/I/71d7rfSl0wL._AC_UF350,350_QL50_.jpg",
    description: {
      en: "Latest Apple iPhone 15 with A17 chip and upgraded camera.",
      es: "El último Apple iPhone 15 con chip A17 y cámara mejorada.",
      ar: "أحدث آيفون 15 من أبل مع معالج A17 وكاميرا محسّنة.",
      ja: "最新のA17チップと改良されたカメラを備えたApple iPhone 15。"
    }
  },
  {
    id: "p2",
    names: { en: "Samsung Galaxy S23 Ultra", es: "Samsung Galaxy S23 Ultra", ar: "سامسونج جالاكسي S23 ألترا", ja: "Samsung Galaxy S23 Ultra" },
    category: { en: "Mobile Phones", es: "Teléfonos móviles", ar: "الهواتف المحمولة", ja: "スマートフォン" },
    price: 1199,
    image: "https://in.static.webuy.com/product_images/Phones/Phones%20Android/SSAMS918BD256GLUNLC_l.jpg",
    description: {
      en: "Flagship Samsung with high-end camera and S-Pen support.",
      es: "El buque insignia de Samsung con cámara de alta gama y soporte S-Pen.",
      ar: "هاتف رائد من سامسونج بكاميرا عالية ودعم S-Pen.",
      ja: "高性能カメラとSペン対応のサムスンのフラッグシップモデル。"
    }
  },
  {
    id: "p3",
    names: { en: "Sony WH-1000XM5", es: "Sony WH-1000XM5", ar: "سوني WH-1000XM5", ja: "ソニー WH-1000XM5" },
    category: { en: "Headphones", es: "Auriculares", ar: "سماعات", ja: "ヘッドホン" },
    price: 349,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
    description: {
      en: "Premium noise cancelling headphones with long battery life.",
      es: "Auriculares premium con cancelación de ruido y gran autonomía.",
      ar: "سماعات متميزة مع إلغاء الضوضاء وعمر بطارية طويل.",
      ja: "長時間再生可能な高級ノイズキャンセリングヘッドホン。"
    }
  },
  {
    id: "p4",
    names: { en: "HP Pavilion Gaming Laptop", es: "HP Pavilion Gaming", ar: "كمبيوتر HP Pavilion للألعاب", ja: "HP Pavilion ゲーミング" },
    category: { en: "Laptops", es: "Portátiles", ar: "أجهزة لابتوب", ja: "ノートパソコン" },
    price: 899,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    description: {
      en: "Gaming laptop with Ryzen/Intel options and discrete GPU.",
      es: "Portátil gaming con opciones Ryzen/Intel y GPU dedicada.",
      ar: "حاسوب محمول للألعاب مع معالجات Ryzen/Intel وبطاقة رسومات منفصلة.",
      ja: "Ryzen/Intel搭載、専用GPUを備えたゲーミングノート。"
    }
  },
  {
    id: "p5",
    names: { en: "Nike Air Zoom Pegasus", es: "Nike Air Zoom Pegasus", ar: "حذاء نايكي بيغاسوس", ja: "ナイキ エアズーム ペガサス" },
    category: { en: "Fashion", es: "Moda", ar: "أزياء", ja: "ファッション" },
    price: 129,
    image: "https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto/d15d9326-cb42-430d-9abb-58a923e80205/AIR+ZOOM+PEGASUS+41+WIDE.png",
    description: {
      en: "Comfortable and responsive running shoes.",
      es: "Zapatillas cómodas y reactivas para correr.",
      ar: "أحذية جري مريحة واستجابية.",
      ja: "快適で反発力のあるランニングシューズ。"
    }
  },

  {
    id: "p6",
    names: { en: "Kindle Paperwhite", es: "Kindle Paperwhite", ar: "كيندل بيبروايت", ja: "Kindle Paperwhite" },
    category: { en: "Books & Media", es: "Libros y multimedia", ar: "الكتب والوسائط", ja: "書籍・メディア" },
    price: 129,
    image: "https://m.media-amazon.com/images/I/516ioi1kzGL._AC_UF894,1000_QL80_.jpg",
    description: {
      en: "Waterproof e-reader with high-contrast display.",
      es: "Lector electrónico resistente al agua con pantalla de alto contraste.",
      ar: "قارئ إلكتروني مقاوم للماء بشاشة عالية التباين.",
      ja: "防水仕様の高コントラスト電子書籍リーダー。"
    }
  },

  {
    id: "p7",
    names: { en: "Dyson V11 Vacuum Cleaner", es: "Dyson V11 Aspiradora", ar: "مكنسة دايسون V11", ja: "Dyson V11 掃除機" },
    category: { en: "Home Appliances", es: "Electrodomésticos", ar: "أجهزة منزلية", ja: "家電" },
    price: 599,
    image: "https://m.media-amazon.com/images/I/41UlCeExUHL._AC_UF894,1000_QL80_.jpg",
    description: {
      en: "Powerful cordless vacuum cleaner.",
      es: "Aspiradora inalámbrica potente.",
      ar: "مكنسة كهربائية لاسلكية قوية.",
      ja: "強力なコードレス掃除機。"
    }
  },

  {
    id: "p8",
    names: { en: 'Samsung 55" QLED TV', es: 'Samsung QLED 55"', ar: 'تلفزيون سامسونج QLED 55"', ja: "Samsung QLED 55インチ" },
    category: { en: "Television", es: "Televisión", ar: "التلفاز", ja: "テレビ" },
    price: 799,
    image: "https://m.media-amazon.com/images/I/81tU8cXmOoL.jpg",
    description: {
      en: "4K QLED smart TV with HDR.",
      es: "Smart TV QLED 4K con HDR.",
      ar: "تلفزيون ذكي QLED 4K مع HDR.",
      ja: "HDR対応の4K QLEDスマートTV。"
    }
  },

  {
    id: "p9",
    names: { en: "Adidas Training Tee", es: "Camiseta Adidas Training", ar: "قميص أديداس الرياضي", ja: "アディダス トレーニングTシャツ" },
    category: { en: "Fashion", es: "Moda", ar: "أزياء", ja: "ファッション" },
    price: 29,
    image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/167604be333141469238d2b4401053bd_9366/Gym_Training_Long_Sleeve_Tee_Black_IP4468_01_laydown.jpg",
    description: {
      en: "Lightweight training tee for workouts.",
      es: "Camiseta ligera para entrenamientos.",
      ar: "قميص رياضي خفيف للتمارين.",
      ja: "トレーニング向けの軽量Tシャツ。"
    }
  },

  {
    id: "p10",
    names: { en: "Fujifilm X-T4 Camera", es: "Cámara Fujifilm X-T4", ar: "كاميرا فوجي فيلم X-T4", ja: "富士フイルム X-T4 カメラ" },
    category: { en: "Cameras", es: "Cámaras", ar: "كاميرات", ja: "カメラ" },
    price: 1699,
    image: "https://m.media-amazon.com/images/I/817x1S6coyL.jpg",
    description: {
      en: "Mirrorless camera with great color science.",
      es: "Cámara mirrorless con excelente color.",
      ar: "كاميرا بدون مرآة بألوان رائعة.",
      ja: "高い色再現性のミラーレスカメラ。"
    }
  },

  {
    id: "p11",
    names: { en: "Bose SoundLink Mini", es: "Bose SoundLink Mini", ar: "بوز ساوند لينك ميني", ja: "Bose SoundLink Mini" },
    category: { en: "Speakers", es: "Altavoces", ar: "مكبرات صوت", ja: "スピーカー" },
    price: 199,
    image: "https://www.gaincity.com/media/catalog/product/cache/6c6c50d4c233a553cee4f0d7353c6a74/0/1/01.tb0000869-_sandstone.png",
    description: {
      en: "Compact Bluetooth speaker with big sound.",
      es: "Altavoz compacto con gran sonido.",
      ar: "مكبر صوت صغير بصوت قوي.",
      ja: "コンパクトでも大音量のBluetoothスピーカー。"
    }
  },

  {
    id: "p12",
    names: { en: "Logitech MX Master 3", es: "Logitech MX Master 3", ar: "ماوس لوجيتك MX Master 3", ja: "ロジクール MX Master 3" },
    category: { en: "Accessories", es: "Accesorios", ar: "إكسسوارات", ja: "アクセサリー" },
    price: 99,
    image: "https://s13emagst.akamaized.net/products/25279/25278417/images/res_55eb80559ce891cb6644cc94aad3e9d4.jpg",
    description: {
      en: "Advanced wireless mouse for productivity.",
      es: "Ratón inalámbrico avanzado para productividad.",
      ar: "ماوس لاسلكي متقدم للإنتاجية.",
      ja: "高機能ワイヤレスマウス。"
    }
  },

  {
    id: "p13",
    names: { en: "Instant Pot Duo", es: "Instant Pot Duo", ar: "إنستانت بوت ديو", ja: "インスタントポット Duo" },
    category: { en: "Home Appliances", es: "Electrodomésticos", ar: "أجهزة منزلية", ja: "家電" },
    price: 89,
    image: "https://m.media-amazon.com/images/I/71ioBwmgwhL.AC_UF350,350_QL80.jpg",
    description: {
      en: "7-in-1 programmable pressure cooker.",
      es: "Olla a presión programable 7 en 1.",
      ar: "قدر ضغط قابل للبرمجة 7 في 1.",
      ja: "7-in-1多機能電気圧力鍋。"
    }
  },

  {
    id: "p14",
    names: { en: "The Alchemist (Book)", es: "El Alquimista (Libro)", ar: "كتاب الخيميائي", ja: "アルケミスト（書籍）" },
    category: { en: "Books & Media", es: "Libros y multimedia", ar: "الكتب والوسائط", ja: "書籍・メディア" },
    price: 12,
    image: "https://static.wixstatic.com/media/8cc233_da3154cf2cdd4e979a841903fb3cf770~mv2.jpg/v1/fill/w_1585,h_2400,al_c,q_90/The%20Alchemist%20cover.jpg",
    description: {
      en: "Paulo Coelho's international bestseller.",
      es: "El bestseller internacional de Paulo Coelho.",
      ar: "الرواية العالمية الشهيرة لباولو كويلو.",
      ja: "パウロ・コエーリョの世界的ベストセラー。"
    }
  },

  {
    id: "p15",
    names: { en: "Garmin Forerunner 245", es: "Garmin Forerunner 245", ar: "جارمين فوررنر 245", ja: "Garmin Forerunner 245" },
    category: { en: "Watches", es: "Relojes", ar: "ساعات", ja: "腕時計" },
    price: 249,
    image: "https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/10542038/2019/9/24/d3605187-2873-49da-b396-33dab3aaccae1569314000625-Garmin-Unisex-Smart-Watches-741569313999643-2.jpg",
    description: {
      en: "GPS running watch with advanced metrics.",
      es: "Reloj de running con métricas avanzadas.",
      ar: "ساعة رياضية بنظام GPS وقياسات متقدمة.",
      ja: "高度なランニング指標を備えたGPSウォッチ。"
    }
  },

  {
    id: "p16",
    names: { en: "Apple Watch Series 9", es: "Apple Watch Serie 9", ar: "ساعة أبل سيريس 9", ja: "Apple Watch Series 9" },
    category: { en: "Watches", es: "Relojes", ar: "ساعات", ja: "腕時計" },
    price: 399,
    image: "https://sell.gameloot.in/wp-content/uploads/sites/4/2023/11/Apple-Watch-Series-9-45mm-Stainless-Steel-GPS-Cellular.jpg",
    description: {
      en: "Latest Apple Watch with health tracking.",
      es: "El último Apple Watch con seguimiento de salud.",
      ar: "أحدث ساعة أبل مع تتبع الصحة.",
      ja: "最新のヘルストラッキング機能を搭載したApple Watch。"
    }
  },

  {
    id: "p17",
    names: { en: "Canon EOS R6", es: "Canon EOS R6", ar: "كانون EOS R6", ja: "キヤノン EOS R6" },
    category: { en: "Cameras", es: "Cámaras", ar: "كاميرات", ja: "カメラ" },
    price: 2499,
    image: "https://www.justcanon.in/cdn/shop/products/Artboard2copy_ce1ca0c9-3789-4685-8ff9-59c979f8141e.png?v=1722063896",
    description: {
      en: "Full-frame mirrorless camera for professionals.",
      es: "Cámara mirrorless full-frame para profesionales.",
      ar: "كاميرا بدون مرآة كاملة الإطار للمحترفين.",
      ja: "プロ向けのフルサイズミラーレスカメラ。"
    }
  },

  {
    id: "p18",
    names: { en: "Sony A7 III", es: "Sony A7 III", ar: "سوني A7 III", ja: "ソニー A7 III" },
    category: { en: "Cameras", es: "Cámaras", ar: "كاميرات", ja: "カメラ" },
    price: 1999,
    image: "https://cdn.mos.cms.futurecdn.net/v2/t:0,l:420,cw:1082,ch:1082,q:80,w:1082/qxjJwosgxxgJ2gJiGTHibW.jpg",
    description: {
      en: "Versatile full-frame mirrorless camera.",
      es: "Cámara mirrorless full-frame versátil.",
      ar: "كاميرا مرنة كاملة الإطار بدون مرآة.",
      ja: "汎用性の高いフルサイズミラーレスカメラ。"
    }
  },

  {
    id: "p19",
    names: { en: "Xiaomi Mi Band 7", es: "Xiaomi Mi Band 7", ar: "شاومي مي باند 7", ja: "Xiaomi Mi Band 7" },
    category: { en: "Wearables", es: "Wearables", ar: "الأجهزة القابلة للارتداء", ja: "ウェアラブル" },
    price: 49,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGsaSYT65pNbgzd24ZDSo1hAJGiERjqhD4bA&s",
    description: {
      en: "Affordable fitness tracker with long battery.",
      es: "Pulsera de actividad asequible con larga duración.",
      ar: "متعقب لياقة اقتصادي ببطارية طويلة.",
      ja: "バッテリー持ちの良い手頃なフィットネストラッカー。"
    }
  },

  {
    id: "p20",
    names: { en: "KitchenAid Stand Mixer", es: "Batidora KitchenAid", ar: "خلاط KitchenAid", ja: "キッチンエイド スタンドミキサー" },
    category: { en: "Home & Kitchen", es: "Hogar y cocina", ar: "المنزل والمطبخ", ja: "ホーム＆キッチン" },
    price: 429,
    image: "https://hips.hearstapps.com/hmg-prod/images/kitchenaid-artisan-design-series-evergreen-tilt-head-stand-1-xl-66e4927770e13.jpg?crop=1xw:1xh;center,top&resize=640:*",
    description: {
      en: "Durable stand mixer for all baking needs.",
      es: "Batidora duradera para todas tus recetas.",
      ar: "خلاط متين لجميع احتياجات الخبز.",
      ja: "あらゆるベーキングに対応する耐久性のあるミキサー。"
    }
  },

  {
    id: "p21",
    names: { en: "GoPro Hero 11", es: "GoPro Hero 11", ar: "جو برو هيرو 11", ja: "GoPro Hero 11" },
    category: { en: "Cameras", es: "Cámaras", ar: "كاميرات", ja: "カメラ" },
    price: 399,
    image: "https://m.media-amazon.com/images/I/61U13uXMCrL.AC_UF350,350_QL80.jpg",
    description: {
      en: "Action camera for adventure sports.",
      es: "Cámara de acción para deportes extremos.",
      ar: "كاميرا أكشن للرياضات والمغامرات.",
      ja: "アクションスポーツ向けのアクションカメラ。"
    }
  },

  {
    id: "p22",
    names: { en: "ASUS ROG Strix 3080", es: "ASUS ROG Strix 3080", ar: "أسوس ROG ستريكس 3080", ja: "ASUS ROG Strix 3080" },
    category: { en: "Laptops", es: "Portátiles", ar: "أجهزة لابتوب", ja: "ノートパソコン" },
    price: 2199,
    image: "https://m.media-amazon.com/images/I/71QJiSlsiXL.jpg",
    description: {
      en: "High-end gaming laptop with RTX GPU.",
      es: "Portátil gaming con GPU RTX.",
      ar: "حاسوب محمول قوي للألعاب مع RTX.",
      ja: "RTX GPUを搭載したハイエンドゲーミングノート。"
    }
  },

  {
    id: "p23",
    names: { en: "Levi's 501 Jeans", es: "Jeans Levi's 501", ar: "جينز ليفايس 501", ja: "リーバイス 501 ジーンズ" },
    category: { en: "Fashion", es: "Moda", ar: "أزياء", ja: "ファッション" },
    price: 79,
    image: "https://rukminim2.flixcart.com/image/480/580/xif0q/jean/p/g/k/-original-imagz854ykktaehg.jpeg?q=90",
    description: {
      en: "Classic straight-fit denim jeans.",
      es: "Vaqueros clásicos de corte recto.",
      ar: "جينز كلاسيكي بقصة مستقيمة.",
      ja: "クラシックなストレートフィットデニム。"
    }
  },
  {
    id: "p24",
    names: { en: "Philips Air Fryer", es: "Freidora de Aire Philips", ar: "قلاية فيليبس الهوائية", ja: "フィリップス エアフライヤー" },
    category: { en: "Home Appliances", es: "Electrodomésticos", ar: "أجهزة منزلية", ja: "家電" },
    price: 149,
    image: "https://images.immediate.co.uk/production/volatile/sites/30/2023/05/Philips-HD9280-91-Connected-XL-air-fryer-39a12b0.jpg",
    description: {
      en: "Healthier frying with less oil.",
      es: "Cocina saludable con menos aceite.",
      ar: "قلي صحي باستخدام كمية أقل من الزيت.",
      ja: "少ない油でヘルシーに調理できます。"
    }
  },

  {
    id: "p25",
    names: { en: "Amazon Echo Dot", es: "Amazon Echo Dot", ar: "أمازون إيكو دوت", ja: "Amazon Echo Dot" },
    category: { en: "Speakers", es: "Altavoces", ar: "مكبرات صوت", ja: "スピーカー" },
    price: 49,
    image: "https://ircofmaine.org/wp-content/uploads/2017/06/61ikAJnULvL._SL1000_.jpg",
    description: {
      en: "Smart speaker with Alexa.",
      es: "Altavoz inteligente con Alexa.",
      ar: "مكبر صوت ذكي مزود بأليكسا.",
      ja: "Alexa対応のスマートスピーカー。"
    }
  }
];


// ---------- localStorage keys ----------
const LS_USER = "app_user_products_v1";
const LS_PRODUCTS = "app_products_all_v1";
const LS_CART = "app_cart_v1";

// Helper: if user supplies single-string fields, normalize to multilingual object
function normalizeTranslations(field) {
  // if already object with 'en' consider it's multilingual
  if (!field) return { en: "", es: "", ar: "", ja: "" };
  if (typeof field === "string") {
    return { en: field, es: field, ar: field, ja: field };
  }
  if (typeof field === "object") {
    // ensure all languages present; fallback to en or empty
    return {
      en: field.en || field.en === "" ? field.en : (field[Object.keys(field)[0]] || ""),
      es: field.es || field.es === "" ? field.es : field.en || field[Object.keys(field)[0]] || "",
      ar: field.ar || field.ar === "" ? field.ar : field.en || field[Object.keys(field)[0]] || "",
      ja: field.ja || field.ja === "" ? field.ja : field.en || field[Object.keys(field)[0]] || ""
    };
  }
  return { en: "", es: "", ar: "", ja: "" };
}

export function ProductProvider({ children }) {
  // user-added products stored as multilingual objects too
  const [userProducts, setUserProducts] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_USER);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  // products = combined default + user products
  const [products, setProducts] = useState(() => {
    try {
      // Ensure userProducts normalized if stored in older format
      const normalizedUser = (userProducts || []).map((p) => {
        return {
          ...p,
          names: normalizeTranslations(p.names),
          category: normalizeTranslations(p.category),
          description: normalizeTranslations(p.description)
        };
      });
      return [...DEFAULT_PRODUCTS, ...normalizedUser];
    } catch (e) {
      return [...DEFAULT_PRODUCTS];
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_CART);
      return raw ? JSON.parse(raw) : {}; // { productId: qty }
    } catch (e) {
      return {};
    }
  });

  // persist products when userProducts changes
  useEffect(() => {
    const normalizedUser = (userProducts || []).map((p) => ({
      ...p,
      names: normalizeTranslations(p.names),
      category: normalizeTranslations(p.category),
      description: normalizeTranslations(p.description)
    }));

    const combined = [...DEFAULT_PRODUCTS, ...normalizedUser];
    setProducts(combined);
    try {
      localStorage.setItem(LS_USER, JSON.stringify(normalizedUser));
    } catch (e) {}
    try {
      localStorage.setItem(LS_PRODUCTS, JSON.stringify(combined));
    } catch (e) {}
  }, [userProducts]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_CART, JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  // ---------- Price / Currency formatter ----------
  // map language -> currency & locale
  const currencyMap = {
    en: { locale: "en-US", currency: "USD" },
    es: { locale: "es-ES", currency: "EUR" },
    ar: { locale: "ar-SA", currency: "SAR" },
    ja: { locale: "ja-JP", currency: "JPY" }
  };

  function formatPrice(amount = 0, lang = "en") {
    const cfg = currencyMap[lang] || currencyMap.en;
    try {
      return new Intl.NumberFormat(cfg.locale, {
        style: "currency",
        currency: cfg.currency,
        maximumFractionDigits: cfg.currency === "JPY" ? 0 : 2
      }).format(amount);
    } catch (e) {
      // fallback simple formatting
      return `${cfg.currency} ${amount}`;
    }
  }

  // ---------- CRUD for user products ----------
  function addProduct({ price, category, names, image, description }) {
    const id = uuidv4();
    const p = {
      id,
      price: Number(price),
      category: normalizeTranslations(category),
      names: normalizeTranslations(names),
      description: normalizeTranslations(description),
      image: image || "/products/placeholder.png"
    };
    setUserProducts((prev) => [p, ...prev]);
    return p;
  }

  function editProduct(id, update) {
    setUserProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              ...update,
              names: update.names ? normalizeTranslations(update.names) : p.names,
              category: update.category ? normalizeTranslations(update.category) : p.category,
              description: update.description
                ? normalizeTranslations(update.description)
                : p.description
            }
          : p
      )
    );
  }

  function deleteProduct(id) {
    setUserProducts((prev) => prev.filter((p) => p.id !== id));
  }

  // ---------- cart operations ----------
  function addToCart(productId, qty = 1) {
    setCart((prev) => {
      const next = { ...prev, [productId]: (prev[productId] || 0) + Number(qty) };
      return next;
    });
  }

  function updateCart(productId, qty) {
    setCart((prev) => {
      const copy = { ...prev };
      if (qty <= 0) delete copy[productId];
      else copy[productId] = Number(qty);
      return copy;
    });
  }

  function removeFromCart(productId) {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
  }

  function clearCart() {
    setCart({});
  }

  // ---------- search across multilingual names, descriptions and categories ----------
  function searchProducts(query) {
    if (!query) return products;
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      // join all multilingual fields to search in any language
      const nameValues = Object.values(p.names || {}).join(" ");
      const descValues = Object.values(p.description || {}).join(" ");
      const catValues = Object.values(p.category || {}).join(" ");
      return (
        nameValues.toLowerCase().includes(q) ||
        descValues.toLowerCase().includes(q) ||
        catValues.toLowerCase().includes(q)
      );
    });
  }

  // get products by category slug or translated category match
  function getByCategory(cat) {
    if (!cat) return products;
    const q = cat.toLowerCase();
    return products.filter((p) => {
      // match either english key or any translation
      const catValues = Object.values(p.category || {}).map((s) => (s || "").toLowerCase());
      return catValues.includes(q);
    });
  }

  function addNewProduct(p) {
    const newProduct = {
      id: "p" + (products.length + 1),
      ...p,
    };

    setProducts((prev) => [...prev, newProduct]);
  }


  const value = {
    products,
    addProduct,
    editProduct,
    deleteProduct,
    userProducts,
    cart,
    addToCart,
    updateCart,
    removeFromCart,
    clearCart,
    searchProducts,
    getByCategory,
    formatPrice,
    addNewProduct
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProducts() {
  return useContext(ProductContext);
}
