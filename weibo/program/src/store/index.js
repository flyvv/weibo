const EventEmiter = require("events");

const  axios =require("axios") ;
const store = Object.assign(EventEmiter.prototype,{
    state:{
            val:'' ,
            contextList:[],
            pageArr:[],
            pageIndex:1   
    },
    getState(){
        return this.state;
    },
    handlechange(val){
        this.state.val=val;
        this.emit("update");
        
    },
    addWeibo(){
        axios.post("/addWeibo",{context:this.state.val}).then((data)=>{
                this.getWeibo(this.state.pageIndex)
             })
    },
    getWeibo(pageIndex){
          axios.get("/getweibo",{params:{pageIndex}}).then(({data})=>{
            var arr = [];
            for(var i = 1 ;i <= data.pageSum; i++){
                arr.push(i);
            }
            this.state.contextList = data.contextList
            this.state.pageArr = arr
            this.emit("update");
        })
    },
    fenye(v){
        this.getWeibo(v)
    },
    topDown(params){
        axios.get("/topweibo",{params:{id:params.id,type:params.type}}).then((data)=>{
            this.getWeibo(this.state.pageIndex)
        })
    },
    delete(id){
        axios.get("/deleteweibo",{params:{id}}).then((data)=>{
            this.getWeibo(this.state.pageIndex)
        })
    }
})
export default store;