import axios from 'axios'

axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
const url = '/api/noti'

class notifyService {   
    static async getnoti(force){
        console.log('noti ser')
        console.log('force '+ force)
        let a = await axios.get(url,{params:{force:force}}).then(res=>{return res.data})
        return a
    }
}
export default notifyService