<template>
  
  <div id="loginitems" v-if="status">
    
     <v-menu offset-y :nudge-width="200">
      <template v-slot:activator="{ on, attrs }">
         
        <v-btn
          :color="onAlarm ? '#ececec' : '#E30B5C'"
          v-bind="attrs"
          v-on="on"
          @click="cl()"
          style="border:1px solid #E30B5C;"
        >  
          <v-icon
          :color="onAlarm ? '#E30B5C' : 'white'"
          >
            
            mdi-bell
          </v-icon>
    <div class="bord_font">
       <span class="font_Bell">{{nnoti}}</span>
    </div>
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
          @click="gotodetail(item.quest_id,item.able,item.message)"
        >
         <!-- {{item}} -->
          <v-list-item-title>{{ item.message}}
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
        noti:[],
        nnoti:'',
      }
    },
    methods:{
        async getnoti(force=false){  
          let a = await notifyService.getnoti(force)
          if(a.nnoti>0){
            this.nnoti = a.nnoti
            this.noti=a.notify
            
          }  
          else{
            this.noti=a.notify
          }          
        },
        loop(){           
            setInterval(function(){
                this.getnoti()
            }.bind(this), 48000)            
        },
        gotodetail(qid,able,msg){
          if((able||msg=="Approve")){
            this.$router.push("/quest/id/"+qid );
          }        
        },
        cl(){
          this.nnoti =''
        }

    },
    created(){
      this.loop()
      this.getnoti(true)  
       
      this.status =this.$store.getters.isLoggedIn 

    },
    updated(){
      this.status =this.$store.getters.isLoggedIn

    },
    computed:{
      isem:function() {
        return this.noti.length ==0
      },
      onAlarm:function(){
       return (this.nnoti == '')  
        
      }
    }
    
}
</script>

<style scoped>

#notilist:hover{
  background-color: rgb(236, 236, 236);
}
.bord_font{
  
 
}
.font_Bell{
  font-size:16px;
}

#loginitems{
  position: absolute;
  right:2%;
}
</style>
