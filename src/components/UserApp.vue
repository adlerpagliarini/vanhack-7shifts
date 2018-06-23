<template>
    <div class="users">
      <h1>{{title}}</h1>
       <form v-on:submit="addUser" class="center-form">
         <div class="row">
            <input type="text" v-model="newUser.name"  class="form-control col-md-12" placeholder="Name" />
            <br />
            <input type="text" v-model="newUser.email" class="form-control col-md-12" placeholder="Email" />
            <br />
            <input type="text" v-model="newUser.photo" class="form-control col-md-12" placeholder="Photo" />
            <div class="clear"></div>
            <button type="submit" value="Submit" class="button btn btn-primary">Add to List</button>
          </div>
       </form>
       <hr/>
       <AlertMsg v-if="alert" v-bind:message="alert" />
       <h1>Computing Users:{{qtdUser}}</h1>
       <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#{{qtdUser}}#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Photo</th>
              <th><button class="btn btn-warning" v-on:click="sendUsersToMongoDb(users)">Send all users to mongoDB</button>
              </th>
            </tr>
          </thead>
          <tbody>          
            <tr v-for="(data, index) in users" :key='index'>
                <th scope="row">{{index+1}}</th>
                <td>{{data.id}} - {{data.firstName}}</td>
                <td>{{data.email}}</td>
                <td><img v-bind:src=data.photo /></td>
                <td><button v-on:click="deleteUser(data)"  class="btn btn-danger">Delete</button></td>
            </tr>
          </tbody>
       </table>{{count}}
       {{calcTimeWorked}}
       {{sortingUsers}}
    </div>
</template>

<script>
import AlertMsg from './Alert';
export default {
  name: 'Userapp',

  data () {
    return {
      title: 'Users',
      newUser:{},
      usersTestParse: [],
      users: [],
      locations: [],
      timePunches: [],
      usersPeriodOfWork: [],
      usersTimeWorked: [],
      alert: '',
      savedUsers: 0,
      count: 0
    }
  },
  components: {
      AlertMsg
  },
  methods: {
    addUser: function(e){
       e.preventDefault();
       this.users.push(
         {
            id: Math.floor((Math.random() * 1000) + 1),
            active: false,
            created: '2017-06-23',
            email: this.newUser.email,
            firstName: this.newUser.name,
            hourlyWage: 0,
            lastName: '',
            locationId: 0,
            modified: '',
            photo: this.newUser.photo,
            userType: 9
         }
       )
       this.alert = 'New user on the list!';
    },
    deleteUser: function(user){
       this.users.splice(this.users.indexOf(user), 1);
       this.alert = `(${user.firstName}) - removed from list.`;
    },
    sendUsersToMongoDb: function(users){
       this.savedUsers = 0;
       users.forEach(addUser => {
              let newUser = {
                id: addUser.id,
                active: addUser.active,
                created: addUser.created,
                email: addUser.email,
                firstName: addUser.firstName,
                hourlyWage: addUser.hourlyWage,
                lastName: addUser.lastName,
                locationId: addUser.locationId,
                modified: addUser.modified,
                photo: addUser.photo,
                userType: addUser.userType,
              };
              //var self = this;
              this.$http.get('http://localhost:3000/api/validade-user/'+newUser.id)
                .then(function(response){
                    console.log(response.data);
                    if(response.data.length == 0){
                      this.$http.post('http://localhost:3000/api/user', newUser)
                          .then(function(response){
                              this.savedUsers++;
                              this.alert = `(${this.savedUsers}) Users were saved on MongoDB`;
                          });
                    } 
                    else 
                    {
                      this.alert = `(${this.savedUsers}) Users were saved on MongoDB`;
                    }
              });
       });
    },
    testForEach: function(obj){
      Object.keys(obj).forEach(function(i){
         console.log(obj[i]);
       });
       obj.forEach(function(o){
         console.log(o);
       });
       this.usersTestParse.forEach(function(o){
         console.log(o);
       });
    }
  },
  computed: {
    qtdUser: function(){      
      return Object.keys(this.users).length;
    },
    calcTimeWorked: function(){
        //console.log(this.users.forEach(u => console.log(JSON.stringify(u))));
        let timeByWeek = [];
        this.users.forEach( user => {
            this.timePunches.filter( time => time.userId == user.id ).map(t => 
            {
              let overtime = false;
              let weekend = false;
              let startDateTime = new Date(t.clockedIn);
              let endDateTime = new Date(t.clockedOut);
              let diffMs = (endDateTime - startDateTime); // milliseconds between now & Christmas
              let diffDays = Math.floor(diffMs / 86400000); // days
              let diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
              let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
              //console.log(startDateTime + ' ' + diffDays + " days, " + diffHrs + " hours, " + diffMins + " minutes");
              
              let dailyTimeWorked = ((diffHrs*60)+diffMins);
              if(startDateTime.getDay() == 6 || endDateTime.getDay() == 0){
                  overtime = true;
                  weekend = true;
              } else{
                if((dailyTimeWorked/60) <= 8){
                  overtime = false;
                }else{
                  overtime = true;
                }
              }
              this.usersPeriodOfWork.push({ 
                      id: t.userId,
                      hoursWorked: diffHrs,
                      minutesWorked: diffMins,
                      totalMinutesWorked: dailyTimeWorked,
                      weekend: weekend,
                      overtime: overtime,
                      startDateTime: startDateTime,
                      endDateTime: endDateTime
              });
            });
        });
        console.log('Hours worked');
        console.log(this.usersPeriodOfWork);
    },
    sortingUsers: function(){
      this.users.sort((c1, c2) => (c1.firstName > c2.firstName) ? 1 : -1);
    }
  },
  created: function(){

      this.$http.get('https://shiftstestapi.firebaseio.com/locations.json')
        .then(function(response){
            var data = response.data;                        
            /*console.log('Loading-Location-data');
            console.log(data);
            console.log('End-Location');*/
            for (var id in data) {  
              //console.log(data[id]);
              this.locations.push(JSON.stringify(data[id]));
            }
      });


      this.$http.get('https://shiftstestapi.firebaseio.com/users.json')
        .then(function(response){
            var data = response.data;                        
            /*console.log('Loading-User-data');
            console.log(data);
            console.log('End-User');*/
            for (var id in data) {  
              //console.log(data[id]);
              for(var subId in data[id]){
                //console.log(data[id][subId]);
                //console.log(JSON.stringify(data[id][subId]));
                this.users.push(data[id][subId]);
              }
            }
        });

        this.$http.get('https://shiftstestapi.firebaseio.com/timePunches.json')
        .then(function(response){
            var data = response.data;                        
            /*console.log('Loading-User-data');
            console.log(data);
            console.log('End-User');*/
            for (var id in data) {  
              //console.log(data[id]);
              //console.log(JSON.stringify(data[id]));
              this.timePunches.push(data[id]);
            }
        });  
  }
}
</script>

<style scoped>
.clear{
  clear: both;
}
.contacted{
  color:red;
}
.users{
  text-align:center;
}
.users input[type='text']{
  border:1px solid green;
  margin:5px auto;
  display:table;
}
.users .button{
  padding: 10px 20px;
  margin:5px 0 0 0;
  float: right;
  display: block;
}
.users .center-form{
  margin: 0 auto;
  display: table;
  float: none;
  width: 50%;
}
.users .table{
  width: 80%;
  margin: 0 auto;
}
</style>