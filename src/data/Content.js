const space = '\u00A0'

export const homepage = {
  main_title: ['Trip Plan Making', '制定專屬的旅行計畫'],
  sub_title: ['easy to create, easy to view', 'easy to create, easy to view']
}

export const nav = {
  account: ['Account', '用戶設定'],
  project: ['Project', '行程總覽'],
  ongoing: ['Ongoing', '進行中'],
  coming: ['Coming', '即將出發'],
  completed: ['Completed', '已完成'],
  //list
  basic: ['Basic Info', '基本資訊'],
  plan: ['Plan', '行程計畫'],
  budget: ['Budget', '預算表'],
  analysis: ['Analysis', '花費分析'],
  b_overview: ['OverView', '預算總覽'],
  p_overView: ['OverView', '行程總覽'],
  profile: ['Profile', '會員資訊'],
  logout: ['Log Out', `登${space}${space}出`],
  menu: ['Menu', '選單']
}

export const topBar = {
  account_set: ['Account Setting', '用戶設定'],
  ongoing: ['Project Ongoing', '進行中的計畫'],
  coming: ['Project Coming', '即將出發的計畫'],
  completed: ['Project Completed', '已完成的計畫'],
  //list
  basic: ['Basic Info', '基本資訊'],
  analysis: ['Budget Analysis', '花費分析'],
  b_overview: ['Budget OverView', '預算總覽'],
  p_overView: ['Plan OverView', '行程總覽'],
  pre_trip: ['Domestic Expenses', '國內支出']

}


export const account_text = {
  logout: ['logout', '登出'],
  name: ['Name', '姓名'],
  currency: ['Currency', '貨幣單位'],
  background: ['Background', '背景主題'],
  submit: ['Submit', '提交'],
  updating: ['Updating', '上傳中'],
  update: ['Update', '上傳檔案'],
  modify: ['Successfully modified', '修改成功'],
  currency_item:
  {
    TWD: ['TWD', '新台幣'],
    USD: ['USD', '美金'],
    CNY: ['CNY', '人民幣']
  }
}

export const basic_text = {
  capital: ['Capital', `首${space}都`],
  voltage: ['Voltage', `電${space}壓`],
  language: ['Language', `語${space}言`],
  rate: ['Exchange Rate', `匯${space}率`],
  //
  country: [['T', 'ravel', 'C', 'ountry'], '旅行國家'],
  period: [['T', 'ravel', 'P', 'eriod'], '旅行期間']
}

export const budget_text = {
  total: ['Total', '總計'],
  item: ['ITEM', '花費項目'],
  spend: ['COST', '花費金額'],
  type: {
    transportation: ['Transportation', '交通'],
    shopping: ['Shopping', '購物'],
    entertainment: ['Entertainment', '娛樂'],
    food: ['Food', '飲食'],
    hotel: ['Hotel', '住宿'],
    others: ['Others', '其他']
  },
  submit: ['SUBMIT', `送${space}出`],
  amount: ['Amount', '金額'],
  from: ['From', '輸入'],
  to: ['To', '輸出'],
  exchange: ['EXCHANGE', '轉換匯率'],
  search_again: ['SEARCH AGAIN', '轉換其他幣別'],
  pre_trip: ['Domestic', '國內支出'],
  cost: ['Expenses', null],
  analysis: {
    type: ['TYPE', '類型'],
    pct: ['PCT', '百分比'],
    sum: ['SUM', '合計'],
    total: ['Total', '總計']
  }
}

export const plan = {
  change_l: ['Change Lication', '修改旅行地'],
  change_d: ['Change Date', '修改旅行日'],
  location: ['Location', '旅行地'],
  place_hold: ['Enter Location', '請輸入旅行地'],
  submit: ['SUBMIT', '送出'],
  date: ['Date', '日期']
}

export const plan_form = {
  title: {
    main_title: ['Choose Categorary', '請選擇類別'],
    sub_title: ['Choose Type', '請選擇項目'],
    add: ['Add', '添加'],
    info: ['Info', '資訊']
  },
  type: {
    trans: ['Transportation', '交通'],
    activity: ['activity', '活動'],
    food: ['food', '飲食'],
    hotel: ['hotel', '住宿']
  },
  content: {
    type: ['Type', '類型'],
    //
    hotel: ['hotel', '住宿'],
    cruise: ['Cruise', '郵輪'],
    flight: ['Flight', '飛機'],
    road_trip: ['Road-Trip', '自訂'],
    taxi: ['Taxi', '計程車'],
    train: ['Train', '火車'],
    bus: ['Bus', '客運巴士'],
    restaurant: ['Restaurant', '餐廳'],
    cafe: ['Cafe', '咖啡聽'],
    bar: ['Bar', '酒吧'],
    food_others: ['Others', '其他'],
    //
    attraction: ['Attraction', '景點'],
    shopping: ['Shopping', '購物'],
    events: ['Events', '活動慶典'],
    activity_others: ['Others', '其他'],
    //
    check_in: ['Check-In', 'Check-In'],
    location: ['Location', '地點'],
    time: ['Time', '時間'],
    info: ['Info', '其他資訊'],
    address: ['Address', '地址'],
    business_hours: ['Business Hours', '營業時間'],
    note: ['Note', '備註'],
    name: ['Name', '住宿名稱'],
    phone: ['Phone', '電話'],
    email: ['Email', 'Email'],
    airline: ['Airline', '航空公司'],
    depart: ['Depart', '出發'],
    arrive: ['Arrive', '抵達'],
    a_number: ['Number', '航班號'],
    t_number: ['Number', '班號'],
    date: ['Date', '日期'],
    carrier: ['Carrier', '營運商'],
    seat: ['Seat', '座位'],
    way: ['Way', '方式'],
    cancel: ['Cancel', '取消'],
    optional: ['Optional', '選填']


  },
  button: {
    submit: ['SUBMIT', '確認送出'],
    or: ['or', '或'],
    map: ['ADD MAP TAG', '添加地標'],
    serach_site: ['Search Position', '搜尋景點'],
    tag_list: ['Tag List', '地標清單'],
    position: ['Position', '位置'],
    add: ['ADD', `添${space}加`],
    info: ['INFO', '資訊'],
    date: ['Date', '日期']
  }
}

export const week = {
  SUN: ['SUN', '星期日'],
  MON: ['MON', '星期一'],
  TUE: ['TUE', '星期二'],
  WED: ['WED', '星期三'],
  THU: ['THU', '星期四'],
  FRI: ['FRI', '星期五'],
  SAT: ['SAT', '星期六'],
}

export const empty = {
  plan_empty: ['No Plan Yet', '尚未添加旅遊行程'],
  project_empty: ['No Project Yet', '尚未建立專案'],
  budget_empty: ['No Budget Yet', '尚未添加花費項目'],
  p_day_empty: ['No Date Yet', '尚未添加旅行日期'],
  b_day_empty: ['No Date Yet', '尚未添加日期']
}

export const btn = {
  add: [
    'ADD',
    `新${space}${space}${space}增`],
  add2: ['Add', `新${space}增`],
  cancel: ['Cancel', `取${space}消`],
  next: ['NEXT', '下一步'],
  create: [
    'CREATE',
    `建立旅行計劃`],
  confirm: ['Confirm', `確${space}認`],
  delete: ['Delete', '刪除'],
  date: ['Date', '日期'],
  submit: ['SUBMIT', `提${space}交`]
}


export const country_text = {
  state: ['State', `洲${space}別`],
  area: ['Area', `區${space}域`],
  country: ['Country', `國${space}家`],
  select_title: [['SELECT', 'COUNTRY'], '選擇旅行地'],
  fill_basic_title: [['FILL', 'BASIC'], '基本資訊'],
  selected_country: ['Selected Country', '已選擇的旅行地'],
  project: ['Project Name', '計畫名稱'],
  from: ['From', '出發時間'],
  to: ['to', '回程時間'],
}

export const select_text = {
  plan_sm: ['MAKE', ''],
  plan_lg: ['NEW PLAN', '制定計劃'],
  member_sm: ['CHECK', ''],
  member_lg: ['PROFILE', '會員頁面'],

}


export const sign_text = {
  signIn: ['Sign In', '登入'],
  signUp: ['Sign Up', '註冊'],
  password: ['Password', '密碼'],
  test: ['You can use email above to try this app','您可以使用測試帳號使用此應用程式'],
  or: ['or', '或'],
  signIn_google: ['Sign In with Google', '透過Google登入'],
  signUp_google: ['Sign Up with Google', '透過Google註冊'],
}