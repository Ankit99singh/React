// libraries
const redux=require('redux')
const reduxLogger=require('redux-logger')

// functions from libraries
const createStore=redux.createStore
const combineReducers=redux.combineReducers
const applyMiddleware=redux.applyMiddleware
const logger=reduxLogger.createLogger()

const BUY_CAKE='BUY_CAKE'
const BUY_ICECREAM="BUY_ICECREAM"

function buyCake(){
    return {
        type:BUY_CAKE,
        info:'first redux action'
    }
}

function buyIcecream(){
    return {
        type:BUY_ICECREAM
    }
}

//combined state
// const initialState={
//     numOfCakes:10,
//     numOfIcecream:20
// }

//seprate state
const initialCakeState={
    numOfCakes:10
}

const initialIceCreamState={
    numOfIcecream:20
}


//combine reducer with multiple actions
// const reducer=(state=initialState,action)=>{
//     switch(action.type){
//         case BUY_CAKE:return{
//             // a state may have more than one properties/attributes
//             ...state,  // to copy props of state and manipulate only one i.e. no-of-cakes( required one) 
//             // as the reducer will return a new state after manipulation 
//             numOfCakes:state.numOfCakes-1
//         }
//         case BUY_ICECREAM:return{
//             ...state,
//             numOfIcecream:state.numOfIcecream-1
//         }
//         default:return state
//     }
// }

//seprate reducer/ multiple reducer

const CakeReducer=(state=initialCakeState,action)=>{
    switch(action.type){
        case BUY_CAKE:return{
            ...state,  
            numOfCakes:state.numOfCakes-1
        }
        default:return state
    }
}

const IceCreamReducer=(state=initialIceCreamState,action)=>{
    switch(action.type){
        case BUY_ICECREAM:return{
            ...state,
            numOfIcecream:state.numOfIcecream-1
        }
        default:return state
    }
}



const rootReducer=combineReducers({
    cake:CakeReducer,
    icecream:IceCreamReducer
})

//store with single reducer
//const store=createStore(reducer)

//store with multiple reducer combined
// const store=createStore(rootReducer)

// store with middleware->logger
const store=createStore(rootReducer,applyMiddleware(logger))
console.log('Initial State',store.getState())
const unsubscribe=store.subscribe(()=>console.log('Updated State',store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
unsubscribe()
