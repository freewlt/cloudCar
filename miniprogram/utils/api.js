
const API_BASE_URL = 'https://app.ycl56.com';

module.exports = {
  getphoneMsg: API_BASE_URL +'/emc/user/getphoneMsg',//手机号
    loginPhonecode: API_BASE_URL + '/yclmini/miniProgram/loginPhonecode',//登录
    getHomeInfo: API_BASE_URL +'/yclmini/miniProgram/getHomeInfo',//首页
    carTypeVehicleQuery: API_BASE_URL +'/yclmini/miniProgram/carTypeVehicleQuery',//同城整车
    yclmini: API_BASE_URL +':8080/yclmini/',
    addPiecesAddress: API_BASE_URL +'/yclmini/miniProgram/Add_pieces_Address',//增加地址
    getPiecesAddress: API_BASE_URL +'/yclmini/miniProgramUsdpieces/getpiecesAddress',//地址列表
    deleteMemberMarketInfo: API_BASE_URL +'/yclmini/miniProgram/delete_pieces_Address',//删除地址
    updatePiecesAddress: API_BASE_URL +'/yclmini/miniProgram/update_pieces_Address',//修改地址
    queryGoodsCompanyInfo: API_BASE_URL +'/yclmini/miniprogram/queryGoodsCompanyInfo',//
    UpdateCompanyInfo: API_BASE_URL +'/yclmini/miniprogram/UpdateCompanyInfo',
    MemberQueryEmployee: API_BASE_URL +'/yclmini/miniProgram/MemberQueryEmployee',
    getMemberGoodsOrdersLogs: API_BASE_URL +'/yclmini/miniprogramGoodsOrder/getMemberGoodsOrdersLogs',//订单记录
    AddGoodsMenuSendingOrder: API_BASE_URL +'/yclmini/miniprogram/AddGoodsMenuSendingOrder',
    AddMenuGoodsOrder: API_BASE_URL +'/yclmini/MiniProgramGoodsOrder/AddMenuGoodsOrder',
    getInfoByCarid: API_BASE_URL +'/yclmini/MiniProgramPosition/getInfoByCarid',//车辆实时位置接口
  getCarTypeById: API_BASE_URL + '/yclmini/miniProgram/getcarTypeVehicleById',//车辆实时位置接口
};