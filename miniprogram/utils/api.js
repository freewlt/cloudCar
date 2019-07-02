
const API_BASE_URL = 'http://app.ycl56.com';

module.exports = {
    getphoneMsg: API_BASE_URL +':8080/emc/user/getphoneMsg',
    loginPhonecode: API_BASE_URL + '/yclmini/miniProgram/loginPhonecode',
    getHomeInfo: API_BASE_URL +'/miniProgram/getHomeInfo',
    yclmini: API_BASE_URL +':8080/yclmini/',
    addPiecesAddress: API_BASE_URL +'/yclmini/ /miniProgram/Add_pieces_Address',
    getPiecesAddress: API_BASE_URL +'/yclmini / /miniProgram/get_pieces_Address',
    deleteMemberMarketInfo: API_BASE_URL +'/yclmini /marketingInfo/deleteMemberMarketInfo',
    updatePiecesAddress: API_BASE_URL +'/yclmini /miniProgram/update_pieces_Address',

};