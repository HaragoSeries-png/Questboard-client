import axios from 'axios'

axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
const url = '/api/noti'
// const url = 'http://localhost:5000/api/noti'

class notifyService {   
    static async getnoti(force){
        console.log('noti ser')
        console.log('force '+ force)
        let a = await axios.get(url,{params:{force:force}}).then(res=>{return res.data})
        console.log('notify '+a.notify)
        return a
    }
}
export default notifyService