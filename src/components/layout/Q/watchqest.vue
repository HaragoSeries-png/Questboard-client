<template>
  <div id="questInfo" style="margin:20px;">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <div class="section1">
            <center>
              <div class="pic">
                <v-img height="400" width="370" 
                :src="questPic"
                >
                </v-img>
              </div>
            </center>
            <v-card-actions class="Rate">
              <div class="statusQuest">
                <div id="showWaiting" v-if="quest.status == 'pending'">
                  <span style="background-color:#f57c00;" class="statusBox">{{
                    quest.status}}</span>
                     <div class="detailInprogress">Helper is starting quest and contributor can start working.</div>
                </div>

                <div id="showWaiting"  v-else-if="quest.status == 'inprogress'">
                  <span style="background-color:#1e88e5;" class="statusBox">
                    {{ quest.status }}</span
                  >
                    <div class="detailPending">Waiting for admin to approve</div>
                </div>


                <div id="showWaiting"   v-else-if="quest.status == 'complete'">
                  <span style="background-color:#689f38;" class="statusBox">
                    {{ quest.status }}</span
                  >
                   <div class="detailWaiting">This quest is completed</div>
                </div>

                <div  id="showWaiting"   v-else-if="quest.status == 'waiting'">
                  <span style="background-color:#689f38;" class="statusBox">
                    {{ quest.status }}</span
                  >
                  <div class="detailWaiting">Waiting for contributor and confirm help.</div>
                </div>
              
              </div>


              <v-spacer></v-spacer>
              <span style="color:black;font-size:24px;padding-right:2%;">Difficult : </span>
              <span :style="{ color: ratea.Color }" class="rateLabel">
                 {{ ratea.Label }}
              </span>
           
            </v-card-actions>
              <center>
  
            
               
             

            <div style="margin-top:2%;font-size:20px;display:inline;text-align:center;text-transform:uppercase;"      v-if="aldy "  >

                   You already applied this quest.

            </div>



           

              <div style="margin-top:2%;font-size:20px;display:inline;text-align:center;text-tranform:uppercase;" v-if="isContri" >
                        You are selected as contributor.
              </div>

</center>

            
          </div>
        </v-col>

        <v-dialog v-model="dialog3" width="500px" height="300px" overlay>
          <v-card style="background-color:#ececec">
            <div id="helperBox">
              <h3 style="text-align:center;margin-bottom:5%;">
                Evaluate your helper
              </h3>
              <v-divider></v-divider>
              <v-row style="margin-left:0.5%;">
                <v-col cols="8" md="8">
                  <p>
                    Name
                  </p>
                </v-col>

                <v-col cols="4" md="4">
                  Rate
                </v-col>
              </v-row>
              <template v-for="item in conInfor">
                
                <v-list-item :key="item.index">
                  <v-row style="border-top:1px solid gray">
                    <v-col cols="8" md="8">
                      {{ item.conName }}
                    </v-col>
                    <v-col cols="4" md="4">
                      <v-rating
                        v-model="item.conRate"
                        background-color="green lighten-3"
                        color="green"
                        small
                      ></v-rating>
                    </v-col>
                  </v-row>
                </v-list-item>
              </template>
              <center>
                <v-btn
                  v-if="isowner"
                  color="white"
                  text
                  style="font-size: 13px; background-color:green;text-align:center;"
                  @click="ratecon()"
                >
                  Complete
                </v-btn>
              </center>
            </div>
          </v-card>
        </v-dialog>

        <v-col cols="12" md="6">
          <div class="section2">
            <h2 style="text-align:center;">
              {{ quest.questname }}
            </h2>


            <v-divider></v-divider>
            <v-card-actions class="pa-4">
              Contributor
              <v-spacer></v-spacer>
              <router-link :to="'/profile/id/' + ownerID" target="_blank">
                <span style="text-align:center;"> {{ ownername }}</span>
              </router-link>
            </v-card-actions>

            <v-card-actions class="pa-4">
              Quest Category
              <v-spacer></v-spacer>
              <span style="text-align:center;"> {{ quest.category }}</span>
            </v-card-actions>

            <v-card-actions class="pa-4">
              Reward
              <v-spacer></v-spacer>
              <span style="text-align:center;"> {{ quest.reward }}</span>
            </v-card-actions>

            <v-card-actions class="pa-4">
              Number of Accepted Contributor
              <!-- ( {{quest.contributor.length}} / {{ quest.numberofcon }} ) -->
            
              <v-spacer></v-spacer>
              <span style="text-align:center;">( {{quest.contributor.length}} / {{ quest.numberofcon }} ) <a @click="contributorListDialog = (quest.contributor.length > 0) ? true : false">
                <span v-if="isowner" style="text-align:center;">View</span>
              </a></span>
              
              
            </v-card-actions>
            <v-card-actions class="pa-4">
              Deadline
            
              <v-spacer></v-spacer>
              <span style="text-align:center;"> {{dateDisplay}} <span style="text-align:center; color: red;"> {{(deadlineDisplay && quest.status != 'complete') ? '(' + deadlineDisplay + ')': ''}}</span></span>
              
            </v-card-actions>

            <div class="pa-4" style="margin-top:-1%;">
              <div>
                Detail
              </div>

              <v-card
                width="650"
                height="150"
                style="margin-top:5%;overflow-x:auto;padding:16px;"
              >
               

                <p style="font-size:14px;text-indent:20px;" v-if="quest.questdetail == 'undefined'">

                  - No Data -
                </p>
                <p v-else>
                    {{ quest.questdetail }}
                </p>
              </v-card>
            </div>

            <div>
              <v-btn
                color="black"
                text
                style="float:left;margin-top:2%;font-size:15px;margin-left:3.5%;" 
                class="button_black" 
                @click="$router.back()"
              >
                Back
              </v-btn>



            <v-btn
                v-if="(quest.status == 'inprogress')&&isowner"
                color="white"
                text
                class="completeBox"
               @click="dialog3 = true"

              >
                  Complete your Quest
              </v-btn>


              <div v-if="quest.status != 'complete' && quest.status!='pending'">
                <v-btn
                  v-if="isowner && !isstart  && (quest.wait.length == 0)"
                  color="#ff6e40"
                  text
                  style="float: right; margin-top: 2%; font-size: 15px; background-color:white; margin-left: 3.5%; border: 1px solid #ff6e40"
                  
                >
                  Contributor ({{ quest.wait.length }})
                </v-btn>
                
                <v-btn
                  v-if="isowner && !isstart && (quest.wait.length > 0)"
                  color="white"
                  text
                  style="float: right; margin-top: 2%; font-size: 15px; background-color:#ff6e40; margin-left: 3.5%;"
                  @click="dialog2 = true"
                >
                  Contributor ({{ quest.wait.length }})
                </v-btn>

                <v-btn
                  v-if="isowner && !isstart && (quest.contributor.length >= 1)"
                  color="white"
                  text
                  style="float: right; margin-top: 2%; font-size: 15px; background-color:#10ae10; margin-left: 3.5%;"
                  @click="dialog4 = true"

                >
                  Start your quest
                </v-btn>
              </div>



              

              <v-dialog
                v-model="dialog4"
                max-width="450"
                style="text-align:center;"
              >
                <v-card style="height:min-content;">
                  <v-card-title>
                    <span
                      style="text-align:center;font-weight:bold;margin-left:auto;margin-right:auto;font-size:18px;margin-top:2%;"
                      >Are you sure you want to start this quest</span
                    >
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <span style="color:red;font-weight:bold;font-size:15px;">
                      *Please reminded
                    </span>
                    <br />
                    <br />
                    <span style="font-size:13px;color:black;">
                      After your confirm. You will contact with you contributor by yourself.
                      And you have to complete this quest in later.
                    </span>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn class="button_black" color="black;" text @click="dialog4 = false">
                      Back
                    </v-btn>

                    <v-btn color="green darken-1" text @click="startquest()">
                      Confirm
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-spacer></v-spacer>
              <v-dialog
                v-model="dialog"
                max-width="450"
                style="text-align:center;"
              >
                <v-card style="height:min-content;">
                  <v-card-title>
                    <span
                      style="text-align:center;font-weight:bold;margin-left:auto;margin-right:auto;font-size:18px;margin-top:2%;"
                      >Are you sure you want to apply this quest</span
                    >
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <span style="color:red;font-weight:bold;font-size:15px;">
                      *Please reminded
                    </span>
                    <br />
                    <br />
                    <span style="font-size:13px;color:black;">
                      After your confirm you can't reject this quest except
                      helper don't choose you.
                    </span>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn class="button_black" color="black;" text @click="dialog = false">
                      Back
                    </v-btn>

                    <v-btn color="green darken-1" text @click="completed()">
                      Confirm
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

             
              <v-btn
                color="white "
                text
                style="margin-top:2%;font-size:20px; background-color:#388e3c;float:right"
                @click.stop="checklog"
                v-if="!condi"
              >
                Apply
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
  
      <v-dialog v-model="dialog2" width="500px" height="300px" overlay>
        <v-card style="background-color:#ececec">
          <div id="helperBox" v-if="isowner">
            <h3 style="text-align:center;margin-bottom:5%;">
              Select your contributor
            </h3>
            <v-row style="margin-left:0.5%;">
              <v-col cols="10" md="9">
                <p>
                  Name
                </p>
              </v-col>

              <v-col cols="2" md="3">
                <p>
                  Status
                </p>
              </v-col>
            </v-row>
            <template v-for="(item, index) in quest.wait">
              <v-list-item :key="item.index">
                <v-row style="border-top:1px solid gray;" >
                  <v-col cols="10" md="10"  >
                  <router-link :to="'/profile/id/' + item._id" target="_blank">
                    {{ item.infoma.firstname }}
                  </router-link>
                    
                  </v-col>
                  <v-col cols="2" md="2">
                    <v-checkbox
                      v-model="selectHelperStatus[index]"
                      style="display:inline;"
                    ></v-checkbox>
                    <!-- <v-divider v-if="index != quest.wait.length - 1"></v-divider> -->
                  </v-col>
                </v-row>
              </v-list-item>
            </template>
            <center>
              <v-btn
                v-if="isowner || quest.status!='pending'"
                color="white"
                text
                style="font-size: 13px; background-color:green;text-align:center;"
                @click="sendHelperSelected()"
              >
                Select Helper
              </v-btn>
            </center>
            
          </div>
        </v-card>
      </v-dialog>

      <!-- Contributor List -->
      <v-dialog v-model="contributorListDialog" width="500px" height="300px" overlay>
        <v-card style="background-color:#ececec">
          <div id="helperBox" v-if="isowner">
            <h3 style="text-align:center;margin-bottom:5%;">
              Accepted contributor
            </h3>
            <v-row style="margin-left:0.5%;">
              <v-col cols="10" md="9">
                <p>
                  Name
                </p>
              </v-col>

              <v-col cols="2" md="3">
                <p>
                   
                </p>
              </v-col>
            </v-row>
            <template v-for="(item) in quest.contributor">
              <v-list-item :key="item.index">
                <v-row style="border-top:1px solid gray;" >
                  <v-col cols="10" md="10"  >
                  <router-link :to="'/profile/id/' + item._id" target="_blank">
                    {{ item.infoma.firstname }}
                  </router-link>
                    
                  </v-col>
                  <v-col cols="2" md="2">
                    
                  </v-col>
                </v-row>
              </v-list-item>
            </template>
          </div>
        </v-card>
      </v-dialog>

    </v-container>
  </div>
</template>

<script>
import questService from "@/service/questService";
import Swal from "sweetalert2";


export default {
  name: "questInfo",
  methods: {
    async completed() {
      
      let suc = await questService.acceptquest(this.quest._id).then((res) => {
        return res;
      });
      if (suc) {
        alert('hello1');
        Swal.fire(
          "<alert-title>You request is complete!</alert-title>",
          "<alert-subtitle>Please wait untill helper accepted</alert-subtitle>",
          "success"
        );
        this.dialog = false;
        this.$router.go();
      } else {
        alert('hello2');
        Swal.fire(
          "<alert-title>Something wrong</alert-title>",
          "<alert-subtitle></alert-subtitle>",
          "fail"
        );
        this.dialog = false;
      }
    },

    async completeQuest() {
      let suc = await questService.comquest(this.quest._id).then((res) => {
        return res;
      });
      if (suc) {
        console.log("success");
      }
    },
    async sendHelperSelected() {
      if(this.cremain>this.quest.numberofcon){
        return Swal.fire(
          "<alert-title>Something wrong</alert-title>",
          "<alert-subtitle></alert-subtitle>",
          "fail"
        );
      }
      let suc = await questService
        .waitselect(this.quest.wait, this.quest._id, this.selectHelperStatus)
        .then((res) => {
          return res;
        });
      if (suc) {
        Swal.fire(
          "<alert-title>You accept Helper!</alert-title>",
          "<alert-subtitle>Please wait untill helper accepted</alert-subtitle>",
          "success"
        );
      } else {
        Swal.fire(
          "<alert-title>Something wrong</alert-title>",
          "<alert-subtitle></alert-subtitle>",
          "fail"
        );
      }
    },
    async ratecon(){
      let re = await questService.ratingcon(this.conInfor).then((res) => {
        return res;
      });
      await questService.comquest(this.quest._id)
      if (re.suc) {
        Swal.fire(
          "<alert-title>You quest complete!</alert-title>",
          "<alert-subtitle>Congrat! Your quest cleared.</alert-subtitle>",
          "success"
        );
      } else {
        Swal.fire(
          "<alert-title>Something wrong</alert-title>",
          "<alert-subtitle></alert-subtitle>",
          "fail"
        );
      }
      this.$router.go();
    },
    getinfoma: async function() {
      
      let questid = this.$route.params.id;

      let re = await questService.getquestinfo(questid).then((res) => {
        return res;
      });

      this.quest = re.quest;
      this.remain = re.owner.remain
      this.ownerID = re.owner.ID;
      this.ownername = re.owner.name;
      this.conenfor =re.coninfor
      this.rating = this.quest.rate;
      this.isLoading = false
      console.log("complete");
      console.log(this.quest);
    },
    toFeed() {
      this.$router.push("/feed");
    },
    selectedHelperTotal() {
      return this.selectHelperStatus.filter(Boolean).length;
    },
    async startquest(){
      let re = await questService.startquest(this.quest._id)
      if(re){
        this.dialog4 = false
        this.$router.go()
      }
    },
    checklog(){
      if(!this.$store.getters.isLoggedIn){
        return this.$router.push('/login')
      }
      this.dialog =true
    }
  },
  created: async function() {
    await this.getinfoma();
    if(this.quest.image=='default.png'){
      this.questPic = this.$store.state.gurl + this.quest.image;
    }
    else{
      this.questPic = this.quest.image
    }

    this.conInfor = this.quest.contributor.map((con) => {
      let de = { conName: con.infoma.firstname,conID:con._id, conRate: 0 };
      return de;
    });

    for (var i = 1; i <= this.quest.wait.length; i++) {
      this.selectHelperStatus.push(1 == 0);
    }
    this.$emit("setTitle",this.quest.questname);
  },
  data() {
    return {
      isLoading:"",
      quest: "",
      questPic: "",
      questRate: 3,
      time: 2,
      ownername: "",
      ownerID: "",
      dialog: false,
      dialog1: false,
      uid: this.$store.getters.getuserid,
      conInfor: [],
      dialog2: false,
      dialog3: false,
      dialog4: false,
      contributorListDialog: false,
      selectHelperStatus: [],
      rating:0,
      remain:0,
    };
  },
  computed: {
    isowner: function() {
      return this.uid == this.ownerID;
    },
    aldy: function() {
      let n = this.quest.wait.some(w=> w._id==this.uid);
      return n;
    },
    isContri:function () {
      return this.quest.contributor.some(c=> c._id==this.uid)
    },
    condi: function() {
      return this.aldy || this.isowner||this.isContri;
    },
    ratea: function() {
      let r =  Math.max(this.rating * 2 - 1,0);    
      let Lrat = ["D", "D+", "C", "C+", "B", "B+", "A", "A+", "S", "SS"];
      let Crat = [
        "#584b4b",
        "#584b4b",
        "#69d923",
        "#69d923",
        "#FFCC00",
        "#FFCC00",
        "#33CCFF",
        "#33CCFF",
        "#fd7e14",
        "#FF3366",
      ]; //color
      return  { Label: Lrat[r], Color: Crat[r] };
    },
    isstart:function(){
      let qstatus = this.quest.status
      return qstatus == 'inprogress'
    },
    cremain:function() {   
      // let c =0
      // this.selectHelperStatus.forEach(s=>{
      //   if(s){
      //     c++
      //   }
      // })
      // return c
      return this.selectHelperStatus.filter(Boolean).length+this.quest.contributor.length;
    },
    dateDisplay(){
         let d = new Date(this.quest.duedate)
         let months = [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'
]
         return  d.getDate() + "  " + months[d.getMonth()] + "  " + d.getFullYear()
    },
    deadlineDisplay() {
      let dateNow = new Date()
      let dateDeadline = new Date(this.quest.duedate)
      let deadline = new Date(dateDeadline.getTime() - dateNow.getTime())

      if (deadline < 0) return 'Expired'
      else if (deadline.getUTCFullYear() - 1970 > 0) return false
      else if (deadline.getUTCMonth() > 0) return false
      else if (deadline.getUTCDate() - 1 > 0) return deadline.getUTCDate() - 1 + " Days left."
      else if (deadline.getUTCDate() - 1 == 0) return "Expired this day."
      else return 'Expired'
    }
  },
};
</script>

<style scope>
.pic {
  display: flex;
  padding: 20px;
}
.button_black{
 

  border:1px solid black;
}
.section2 {
  margin-top: -10%;
}
#helperBox {
  padding: 15px 30px 30px 30px;
}
.expire {
  margin-left: 15%;
  font-size: 13px;
  color: red;
  cursor: pointer;
}
.expire:hover {
  text-decoration: underline;
}
.v-container {
  padding: 0;
  margin: 0;
}
.ratio {
  margin-top: 2%;
  font-size: 20px;
  font-family: "Inconsolata", monospace;
  display: inline-block;
  line-height: 0.85;
}
tbody tr td {
  border: none;
}
#status {
  position: relative;
  margin: 100 auto;
  z-index: 5;
  margin-bottom: 5%;
}
#status:before {
  content: "";
  display: block;
  width: 150px;
  height: 2px;
  background: #000;
  position: absolute;
  left: 0;
  top: 50%;
  z-index: -2;
}
#status:after {
  content: "";
  display: block;
  width: 150px;
  height: 2px;
  background: #000;
  position: absolute;
  right: 0;
  top: 50%;
  z-index: -2;
}
table {
  width: 50%;
}
.statusQuest {
  font-size: 1.5rem;
  margin-left: 2%;
}
.statusQuest div {
  text-transform: uppercase;
}
#text_fill {
  margin-top: 5%;
  text-align: left;
}
.Rate2 {
  display: none;
}
.rateLabel {
  font-size: 50px;
}
.statusBox {
  font-weight: 800;
  border-radius: 12px;
  color: white;
  padding: 13px;
}
.completeBox {
 float: right;
 margin-top: 2%; 
 background-color:green; 
 margin-left: 10%;
 font-size: 20px;
}
#showWaiting:hover {
  position:relative;
}
#showWaiting:hover + .detailWaiting {
  animation: animate__fadeIn;
  animation-duration:2s;
  display: block;
  
}
.detailWaiting{
  position: absolute;
  width: 300px;
  top:200%;
  color: #689f38;
  animation: text 3s 1;
  transition: 2s;
}
.detailInprogress{
  position: absolute;
  width: 300px;
  top:200%;
  color: #1e88e5;
  animation: text 3s 1;
  transition: 2s;
}
.detailPending{
  position: absolute;
  width: 300px;
  top:200%;
  color: #f57c00;
  animation: text 3s 1;
  transition: 2s;
}




@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Hammersmith+One&family=Lexend+Mega&display=swap");
@media screen and (max-width: 956px) {
  .Rate {
    display: none;
  }
  .Rate2 {
    display: inline;
  }
}
</style>
