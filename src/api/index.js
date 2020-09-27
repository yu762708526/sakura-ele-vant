import ajax from './ajax'
// 根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`/position/${geohash}`, {}, 'get')
// 获取食品分类列表
export const reqFoodsType = () => ajax('/index_category', {}, 'get')
// 根据经纬度获取商铺列表
export const reqShopsList = ({ latitude, longitude }) => ajax('/shops', { latitude, longitude }, 'get')
// 根据经纬度和关键字搜索商铺列表
export const reqSearch = ({ geohash, keyword }) => ajax('/search_shops', { geohash, keyword }, 'get')
// 获取一次性验证码
export const reqCode = () => ajax('/captcha', {}, 'get')
// 用户名密码登陆
export const reqLoginPwd = ({ name, pwd, captcha }) => ajax('/login_pwd', { name, pwd, captcha }, 'post')
// 发送短信验证码
export const reqSendcode = (phone) => ajax('/sendcode', { phone }, 'get')
// 手机号验证码登陆
export const reqLoginSms = (phone, code) => ajax('/login_sms', { phone, code }, 'post')
// 根据会话获取用户信息
export const reqUserinfo = () => ajax('/userinfo', {}, 'get')
// 用户登出
export const reqLogout = () => ajax('/logout', {}, 'get')
// // 商品信息
// export const reqShopGoods = () => ajax('http://121.41.229.155:4000/goods', {}, 'get')
// // 商家信息
// export const reqShopInfo = () => ajax('http://121.41.229.155:4000/info', {}, 'get') // 本地
// // 商家评价
// export const reqShopRating = () => ajax('http://121.41.229.155:4000/rating', {}, 'get')
// 商品信息
export const reqShopGoods = () => ajax('/goods', {}, 'get')
// 商家信息
export const reqShopInfo = () => ajax('/info', {}, 'get') // 线上
// 商家评价
export const reqShopRating = () => ajax('/rating', {}, 'get')
