const db = firebase.firestore();


db.collection('nation').add({
  id: 'Iceland',
  capital: ['Reykjavík','雷克亞維克'],
  language: ['Icelandic','冰島語'],
  country: ['Iceland','冰島'],
  currency: ['ISK','	冰島克朗'],
  rate: 'ISK',
  currency_icon: 'kr',
  voltage: '220V'
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

