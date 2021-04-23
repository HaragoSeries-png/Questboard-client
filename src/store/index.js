import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Fix
    title: 'Questboard',
    gurl: 'https://questboard-server.herokuapp.com/',

    // Changeable
    userid: localStorage.getItem('uid') || '',
    token: localStorage.getItem('token') || '',
    islog: localStorage.getItem('islogin') || false,
    userfullname: localStorage.getItem('fullname') || '',
    allquest: localStorage.getItem('allquest')|| [],
    // Maybe Unused
    currentUser: '',
    count: 0,
    userinfoma: '',
    notification:localStorage.getItem('notificaton') || []
  },
  getters: {
    getTitle(state) { return state.title },
    isLoggedIn(state) { return state.islog },
    getusername(state) { return state.currentUser },
    getfullname(state) { return state.userfullname },
    getcount(state) { return state.count },
    getinfoma(state) { return state.userinfoma },
    getuserid(state) { return state.userid },
    getnoti(state) { 
      try {
        return JSON.parse(state.notification) 
      } catch (error) {
        return false
      }
        

    },
    getallquest(state) {  return JSON.parse(state.allquest) },
    getAll(state) { return [state.islog, state.currentUser, state.userfullname, state.userinfoma] }
  },
  mutations: {
    logon(state, value) {
      localStorage.setItem('uid', value.id)
      localStorage.setItem('fullname', value.fullname)
      localStorage.setItem('token', value.token);
      localStorage.setItem('islogin', value.suc);
      
      this.commit('update')
      // state.islog = true
      // state.currentUser = value.name
      // state.userfullname = value.fullname
      // state.userinfoma = value.infoma
      // state.userid = value.id
      // if(this.$store.getters.isLoggedIn){
      //   alert(state.currentUser+' has logon')
      // }else{
      //   alert('suck')
      // }  
    },
    logout(state) {
      localStorage.setItem('uid', '')
      localStorage.setItem('fullname', '')
      localStorage.setItem('notificaton', [])
      state.token = '',
      state.islog = false,
      state.userid = '',
      state.noti =  [],
      state.userfullname =  ''
    },
    update(state) {
      state.token = localStorage.getItem('token') || '',
      state.islog = localStorage.getItem('islogin') || false,
      state.userid = localStorage.getItem('uid') || '',
      state.noti = localStorage.getItem('notificaton') || [],
      state.userfullname = localStorage.getItem('fullname') || ''
    },
    senoti(state,value){
      localStorage.setItem('notificaton',JSON.stringify(value));
      state.noti = value
      
      this.commit('update')
    },
    setcount(state, value){ state.count = value},
    setallquest(state,value){
      state.allquest=value
      localStorage.setItem('allquest',value)
    }
  },
  actions: {
    authen(context, value) { context.commit('logon', value) },
    deluser(context) { 
      context.commit('logout') 
      return true
  },
    set(context) {
      context.commit('setcount', this.getters.getcount + 1)
    },
    setnoti(context,value){
      
      context.commit('senoti',value)
    },
    loadquest(context,value){
      context.commit('setallquest',value)
    }
  },
  modules: {
  }
})
