const db = firebase.firestore();
db.collection('nation').add({
  id: 'Germany',
  capital: ['Berlin','柏林'],
  language: ['French','德語'],
  country: ['Germany','德國'],
  currency: ['EUR','歐元'],
  rate: 'EUR',
  currency_icon: '€',
  voltage: '230V'
}).then(doc=>console.log(doc))


db.collection('nation').add({
  id: 'Slovak',
  capital: ['布拉迪斯拉發','布拉迪斯拉發'],
  language: ['Polish','斯洛伐克語'],
  country: ['Slovak','斯洛伐克'],
  currency: ['CZK','斯洛伐克克朗'],
  rate: 'SKK',
  currency_icon: 'SKK',
  voltage: '230V'
}).then(doc=>console.log(doc))

