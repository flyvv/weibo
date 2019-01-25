import { Dispatcher } from 'flux';
import store from "./index"
const dispatcher = new Dispatcher();

dispatcher.register((action)=>{
    switch(action.type){
        case "HANDLE_CHANGE":
            store.handlechange(action.payload)
            break;
            case "HANDLE_ADD":
            store.addWeibo()
            break;
            case "GET_WEIBO":
            store.getWeibo(action.payload)
            break;
            case "FENYE":
            store.fenye(action.payload)
            break;
            case "TOP_DOWN":
            store.topDown(action.payload)
            break;
            case "DELETE":
            store.delete(action.payload)
            break;
    }
})

export default dispatcher;

