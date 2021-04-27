<template>
  
  <div id="loginitems" v-if="status">
    
     <v-menu offset-y :nudge-width="200"  >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="#FF598F"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>
            mdi-bell
          </v-icon>
        </v-btn>
      </template>
      <v-list>
       <div style="text-align:center;font-weight:bold;font-size:13px;padding-top:2%;">
              Notification
       </div>
       <v-divider></v-divider>
        <v-list-item
          v-for="(item) in noti.slice().reverse()"
          :key="item._id"
          id="notilist"
        >
         
          <v-list-item-title>{{ item.message }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{item.questname}}
            
          </v-list-item-subtitle>  
        </v-list-item>
             
      </v-list>
    </v-menu> 
        </div>
</template>

<script>
import notifyService from '@/service/notifyService'
export default {
    data(){
      return{
        status: this.$store.getters.isLoggedIn,
        notiicon : 'alarm-light-outline',
        noti:[]
      }
    },
    methods:{
        async getnoti(){   
          console.log('getrni'+this.$store.getters.getnoti)  
          if(!this.$store.getters.getnoti){
            console.log('emp')
            let a = await notifyService.getnoti(true)        
            if(a.sucess){ 
              console.log('suc '+a.sucess)
              await this.$store.dispatch("setnoti", a.notify ); 
              this.noti = this.$store.getters.getnoti
              console.log(this.noti)  
              // this.$forceUpdate()    
              this.$router.go()          
            }
          } 
          else{
            this.noti = this.$store.getters.getnoti
            console.log('have')
            let a = await notifyService.getnoti(false)           
            if(a.sucess){ 
              console.log('new')
              await this.$store.dispatch("setnoti", a.notify ); 
              this.noti = a.notify

              this.$forceUpdate()  
              this.$router.go()      
            }
          
          }           
        },
        loop(){           
            setInterval(function(){
                this.getnoti()
            }.bind(this), 50000)            
        }
    },
    created(){
 
        this.getnoti()  
        this.loop()   
        this.status =this.$store.getters.isLoggedIn 

    },
    updated(){
      this.status =this.$store.getters.isLoggedIn

    }
    
}
</script>

<style scoped>

#notilist:hover{
  background-color: rgb(236, 236, 236);

}
</style>