const URL = 'http://120.76.78.213/tp5/public/index.php/v10/company/';
const URI = 'http://120.76.78.213/tp5/public/index.php/v10/buy/';
const URL_LONIN = 'http://120.76.78.213/tp5/public/index.php/v10/Login/';
export const api = {
    // album user
    albumPic: URL + 'pictureitem',
    pictureSon: URL + 'pictureSon',
    // albumDetail
    albumDetailPic: URL + 'picture',
    // cartList listDetail pay shopcar shopList
    mall: URL + 'mall',
    // concat
    // user
    concatGrade: 'http://120.76.78.213/gaosou/AppPhp/usernameSellerMark.php',
    concatAbility: URL + 'typetwo',
    concatCredit: URL + 'typeone',
    contact: URL + 'contact',
    // total&&good sort||grid
    masterGood: URL + 'mastergood',
    masterTotal: URL + 'mastertotal',
    // userlive
    news: URL + 'news',
    // user -> holdTask
    holdTask: URL + 'taketask',
    // all master list
    master: URL + 'master',
    // shopcart data
    malldetail: URL + 'malldetail',
    mallorder: URL + 'mallorder',
    xiangqing: URL + 'xiangqing',
    // all task list taskOrder
    tasklist: URL + 'tasklist',
    // right menu && left menu mkTask
    screen: 'http://120.76.78.213/gaosou/AppPhp/catetree.php',
    // user index html
    score: URL + 'score',
    skill: URL + 'skill',
    honor: URL + 'honor',
    readAll: URL + 'readAll',
    companyCat: 'http://120.76.78.213/gaosou/AppPhp/companyCat.php',
    // task v10/buy
    // end task
    endTask: URI + 'endTask',
    // remake task desc
    modifyDesc: URI + 'modifyDesc',
    modifyTitle: URI + 'modifyTitle',
    picComment: URL + 'picComment',
    // publish task
    pubtask: URI + 'pubtask',
    // task list item
    tasklistDescManuscript: URL + 'tasklistDescManuscript',
    tasklistDescMoney: URL + 'tasklistDescMoney',
    tasklistState: URL + 'tasklistState',
    tasklistDescTime: URL + 'tasklistDescTime',
    // some picker and select data
    // select place
    place: 'http://120.76.78.213/gaosou/AppPhp/place.php',
    // country picker data
    city: 'http://120.76.78.213/gaosou/AppPhp/city.php',
    // is task deposit ?
    deposit: URI + 'tuoguan',
    // task pay
    taskpay: URI + 'confirmPay',
    // taskConcatModal send email
    sendEmail: URI + 'sendEmail',
    // task detail Manuscript(稿件)
    SubmissionDetail: URI + 'SubmissionDetail',
    // comment list
    HistoryComment: URI + 'HistoryComment',
    // send comment
    SendComment: URI + 'SendComment',
    login: URL_LONIN + 'login',
}
