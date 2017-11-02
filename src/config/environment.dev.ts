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
  auth0Mgmt:{
  	grant_type: 'client_credentials',
    client_id: 'iFF5t1pmHIXS9vsOV14KGt5V4XfEh37n',
    client_secret: '4gAx_w6YVA-uC1CtOGEvwCqyKoxRgKqyvf39i2axHVmOuZLr0U2fRCghMholpQqy',
    audience: 'https://demo-evt.eu.auth0.com/api/v2/' 
  }
};
