import Vue from 'vue'
import Vuex from 'vuex'
import setData from '@/service/setdata.js'
import getData from '@/service/getdata.js'

Vue.use(Vuex);


var state = {
    ids: '',
    userId: '',
    token: 0,
    shopCart: [],
    totalPrice: '',
    order: '',
    searchVal: '',
    lists: '',
    getData,//获取数据库数据
    setData,//修改数据库数据
    buyNowId:"",//立即购买商品id
	buyNowNum:"",//立即购买商品数量
    addressIdNowDt: "",//当前选取的地址id
    addressNowFlag: false,
    orderNowId: "",//当前选中的订单号
    orderGoodsStatus:[],
    nickName: "",
    orderBack:false,//订单列表返回状态码
    commentGoods:""
};


const mutations = {
    loginUserId(state, data) { //处理状态(数据)变化
        state.userId = data.userId;
    },
    loginIds(state, data) {
        state.ids = data.ids;
    },
    changeLogin(state, data) {
        state.token = data.token;
    },
    goSearch(state, data) {
        state.searchVal = data.searchVal;
    }
};


const actions = {
    loginUserId: ({ //处理你要干什么，异步请求，判断，流程控制
        commit
    }, data) => {
        commit('loginUserId', {
            userId: data
        })
    },
    loginIds: ({
        commit
    }, data) => {
        commit('loginIds', {
            ids: data
        });
    },
    changeLogin: ({
        commit
    }, data) => {
        commit('changeLogin', {
            token: data
        })

    },
    goSearch: ({
        commit
    }, data) => {
        commit('goSearch', { searchVal: data })
    }
};

const getters = {
    userId(state) {
        return state.userId;
    },
    ids(state) {
        return state.ids;
    },
    token(state) {
        return state.token;
    }
};

//需要导出Store对象
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});