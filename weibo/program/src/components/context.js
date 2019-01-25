import React,{Component} from "react";
import  store from '../store' 
import dispatcher from '../store/dispatcher'
export default class Context extends Component{
    constructor(){
        super();
        this.state=store.getState();
        this.handleAdd = this.handleAdd.bind(this)
        store.on("update",()=>{
            this.setState(store.getState())
        })
    }
    render() {
        let {val} = this.state;
        return(
            <div className="takeComment">
                <textarea name="textarea" value={val} onChange={this.handleChange.bind(this)} className="takeTextField" id="tijiaoText"></textarea>
                <div className="takeSbmComment">
                    <input type="button" className="inputs" value="" onClick={this.handleAdd}/>
                </div>
            </div>
        )
    }
    handleAdd(){
        let action = {
            type:"HANDLE_ADD"
        }
        dispatcher.dispatch(action)
    }
    handleChange(e){
        let val = e.target.value;
        let action = {
            type:"HANDLE_CHANGE",
            payload:val
        }
        dispatcher.dispatch(action)   
    }
}