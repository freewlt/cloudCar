
const API_BASE_URL = 'http://app.ycl56.com';

module.exports = {
    getphoneMsg: API_BASE_URL +':8080/emc/user/getphoneMsg',
    loginPhonecode: API_BASE_URL + '/yclmini/miniProgram/loginPhonecode',
    getHomeInfo: API_BASE_URL +'/yclmini/miniProgram/getHomeInfo',
    carTypeVehicleQuery: API_BASE_URL +'/yclmini/miniProgram/carTypeVehicleQuery',
    yclmini: API_BASE_URL +':8080/yclmini/',
    addPiecesAddress: API_BASE_URL +'/yclmini/miniProgram/Add_pieces_Address',
    getPiecesAddress: API_BASE_URL +'/yclmini/miniProgramUsdpieces/getpiecesAddress',
    deleteMemberMarketInfo: API_BASE_URL +'/yclmini/miniProgram/delete_pieces_Address',
    updatePiecesAddress: API_BASE_URL +'/yclmini/miniProgram/update_pieces_Address',
    queryGoodsCompanyInfo: API_BASE_URL +'/yclmini/miniprogram/queryGoodsCompanyInfo',
    UpdateCompanyInfo: API_BASE_URL +'/yclmini/miniprogram/UpdateCompanyInfo',
    MemberQueryEmployee: API_BASE_URL +'/yclmini/miniProgram/MemberQueryEmployee',
    getMemberGoodsOrdersLogs: API_BASE_URL +'/miniprogramGoodsOrder/getMemberGoodsOrdersLogs',
    AddGoodsMenuSendingOrder: API_BASE_URL +'/yclmini/miniprogram/AddGoodsMenuSendingOrder',
    AddMenuGoodsOrder: API_BASE_URL +'/yclmini/MiniProgramGoodsOrder/AddMenuGoodsOrder',
    
    
    
    
};