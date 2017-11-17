export const Config = {
  production: false,
  evt_app: "UNFlt65VdIwXzmNbndPc7LBKTPoQ68ROhq0nTdvXieu66esipebEBNXdL3NpcsMfbon8xOfhppVS60IN",
  evt_base_url: "https://api-eu.evrythng.com",
  //evt_operator: "87NneGCimPPb5eZTr6nKPudKMhKzkGiqf8mvCF2N1hY2R3nOQA3sijF8KOkiZCdV9KTUpeZ3PkGacWQG",
  //evt_operator_apikey: "hohzaKH7VbVp659Pnr5m3xg2DpKBivg9rFh6PttT5AnBtEn3s17B8OPAOpBjNTWdoRlosLTxJmUrpjTi",
  projectId: "U3NNqQhUe6s7QraRakG4fpNc",
  appId: "UG7N6Q2yVMsrtNRaak34fprg",
  auth0:{
    clientID: 'w9VzQPQgiQaldMl3MaGkfEph63N6VJhi',
    domain: 'demo-evt.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://demo-evt.eu.auth0.com/userinfo',
    redirectUri: window.location.origin,//'http://localhost:8100',
    scope: 'openid'
  },
  ext_links:{
    privacyPolicy:"//www.neutrogena.co.uk/privacypolicy",
    cookiePolicy: "//www.neutrogena.co.uk/cookie-policy",
    legalNotice:"//www.neutrogena.co.uk/legal-statement",
    slaveryAct:"//www.neutrogena.co.uk/sites/neutrogena.co.uk/files/modern_slavery_act_statement.pdf",
    reorder: "//www.neutrogena.co.uk/product/visibly-clear-light-therapy-acne-mask-activator"
  },
  reorder_links: [
    {
      link: "https://www.amazon.co.uk/Neutrogena-Visibly-Clear-Therapy-Activator/dp/B01MU9ML3G/ref=sr_1_2_s_it?s=beauty&ie=UTF8&qid=1509712796&sr=1-2&keywords=neutrogena+light+therapy+acne+mask",
      name: "Amazon",
      target: "_blank"
    },{
      link: "http://www.boots.com/neutrogena-light-acne-therapy-mask-applicator-10229139",
      name: "Boots",
      target: "_blank"
    },{
      link: "https://www.superdrug.com/Skin/Face/Face-Masks/Neutrogena-Visibly-Clear-Acne-Mask-Activator/p/737374",
      name: "Superdrug",
      target: "_blank"
    },{
      link: "https://www.lookfantastic.com/neutrogena-visibly-clear-light-therapy-mask-activator/11433855.html",
      name: "Lookfantastic",
      target: "_blank"
    },{
      link: "https://www.ocado.com/webshop/product/Neutrogena-Light-Therapy-Acne-Mask-Activator/357890011?from=search&tags=%7C20000&param=neutrogena+activator&parentContainer=SEARCHneutrogena+acti",
      name: "Ocado",
      target: "_blank"
    },
  ],
  aura_url: {
    link: "https://www.aurahealth.io/",
    name: "AURA health",
    target: "_blank"
  },
  desktop_scan_url: {
    link: "scan.neutrogena.co.uk",
    name: "scan.neutrogena.co.uk",
    target: "_blank"
  },
  neutrogena_url: {
    link: "www.neutrogena.co.uk",
    name: "www.neutrogena.co.uk",
    target: "_blank"
  },
  neutrogena_reorder_url: {
    link: "http://www.neutrogena.co.uk/product/visibly-clear-light-therapy-acne-mask-activator",
    name: "VISIBLY CLEAR® Light Therapy Acne Mask Activator",
    target: "_blank"
  },
  lessonCompletionTimeLimit: 2, //seconds till content consumption completion event is triggered
  totalDailyLessonLimit: 30, //lesson completion count
  courseDailyLessonLimit: 10, //lesson completion count
  anonUserLessonLimit: 1, //lesson count allowed for anonymous user
  anonUserDaysToSignInNotice: 0, //days until an anon user will see a pop-up to sign-in / sign-up
  thngDaysLifeSpan: 30, //the number of days that the activator is meant for. expires cookie and a new one is set
  dayToReorderNotice: 1 //day N of 30 (THNG life span) days before a logged-in user will see a pop-up since sign-up
};
