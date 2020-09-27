import Mock from 'mockjs'
import data from './data.json'
// Mock.mock('http://121.41.229.155/host/goods', { code: 0, data: data.goods })
// Mock.mock('http://121.41.229.155/host/info', { code: 0, data: data.info }) // 线上
// Mock.mock('http://121.41.229.155/host/rating', { code: 0, data: data.ratings })

Mock.mock('/api/goods', { code: 0, data: data.goods })
Mock.mock('/api/info', { code: 0, data: data.info }) // 本地
Mock.mock('/api/rating', { code: 0, data: data.ratings })
