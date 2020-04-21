import actionTypes from '../actions/actionTypes'



const initState={
    isLoading: false,
    list:[{
        id:1,
        title: 'Pariatur laborum enim dolore ',
        desc:'Ea irure proident duis minim voluptate proident anim laborum eu mollit.',
        hasRead:false,
        isLoading:false
    },{
        id:2,
        title: 'Tempor culpa cupidatat',
        desc:'Cillum eu dolor reprehenderit non.',
        hasRead:false,
        isLoading:false
    }]
}

export default (state=initState, action)=>{
    console.log(action.type)
    switch(action.type)
    {
        case actionTypes.RECEIVED_NOTIFICATIONS:
            return{
                ...state,
                list:action.payload.list
            }
        case actionTypes.START_NOTIFICATION_POST:
            return{
                ...state,
                isLoading: true
            }
        case actionTypes.FINISH_NOTIFICATION_POST:
            return{
                ...state,
                isLoading: false
            }
        case actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID:{
            const newList = state.list.map(item=>{
                if (item.id===action.payload.id){
                    item.hasRead = true
                }
                return item
            })

            return{
                ...state,
                list:newList
            }
        }
        case actionTypes.MARK_ALL_NOTIFICATION_AS_READ:{
            const newList = state.list.map(
                item=>{
                    item.hasRead = true
                     return item
                    })

            return{
                ...state,
                list:newList
            }
        }
        default:
            return state
    }
}