
const API_BASE_URL = 'http://app.ycl56.com';

module.exports = {
    getphoneMsg: API_BASE_URL +':8080/emc/user/getphoneMsg',
    loginPhonecode: API_BASE_URL + '/yclmini/miniProgram/loginPhonecode',
    getHomeInfo: API_BASE_URL +'/yclmini/miniProgram/getHomeInfo',
    carTypeVehicleQuery: API_BASE_URL +'/yclmini/miniProgram/carTypeVehicleQuery',
    yclmini: API_BASE_URL +':8080/yclmini/',
    addPiecesAddress: API_BASE_URL +'/yclmini/miniProgram/Add_pieces_Address',
    getPiecesAddress: API_BASE_URL +'/yclmini/miniProgramUsdpieces/getpiecesAddress',
    deleteMemberMarketInfo: API_BASE_URL +'/yclmini/marketingInfo/deleteMemberMarketInfo',
    queryGoodsCompanyInfo: API_BASE_URL +'/yclmini/miniprogram/queryGoodsCompanyInfo',

};