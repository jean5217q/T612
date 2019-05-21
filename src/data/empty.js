const db = firebase.firestore();
db.collection('nation').add({
  id: 'Palau',
  language: ['WelMelekeoklington','梅萊凱奧克'],
  country: ['Palau','帛琉'],
  currency: ['USD','美元'],
  rate: 'USD',
  currency_icon: '$',
  voltage: '110V'
}).then(doc=>console.log(doc))


db.collection('nation').add({
  id: 'Libya',
  capital: ['Tripoli','的黎波里'],
  language: ['Arabic','阿拉伯語'],
  country: ['Libya','利比亞'],
  currency: ['LYD','利比亞第納爾'],
  rate: 'LYD',
  currency_icon: 'ل.د',
  voltage: '220V / 230V'
}).then(doc=>console.log(doc))

db.collection('nation').add({
  id: 'Western_Sahara',
  capital: ['布拉迪斯拉發','拉巴特'],
  language: ['Arabic','阿拉伯語'],
  country: ['Western Sahara','西撒哈拉'],
  currency: ['MAD','摩洛哥迪拉姆'],
  rate: 'MAD',
  currency_icon: 'د.م.',
  voltage: '220V'
}).then(doc=>console.log(doc))

db.collection('nation').add({
  id: 'Tunisia',
  capital: ['Tunis','突尼斯'],
  language: ['Arabic','阿拉伯語'],
  country: ['Tunisia','突尼西亞'],
  currency: ['TND','突尼西亞第納爾'],
  rate: 'TND',
  currency_icon: 'د.ت',
  voltage: '230V'
}).then(doc=>console.log(doc))

