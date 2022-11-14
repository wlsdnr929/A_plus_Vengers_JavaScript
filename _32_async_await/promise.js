'use strict'

// async : syntatic sugar for promise (문법적 설탕)
//         --> promise가 그냥 쓰기에는 좀 어려워서
//             조금 더 쉽게 사용할 수 있게 해줌

function fetchUser(){
    return new Promise((resolve,reject)=>{
        console.log(`Promise 실행`)
        resolve('실행 끝')
    })
}


function B(){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log(`B가 실행됨`)
            resolve(45)
        }, 3000);
    })
}


// const a = fetchUser()  // a는 Promise

// a
// .then((v)=>{
//     console.log(`fetchUser result: ${v}`)
// })




// 위의 것을 더 쉽게 사용해보면
async function async_fetchUser(a){   // async 붙으면 반환값은 무조건 "Promise"라고 생각해도 됨
    console.log(`Promise 실행`)

    // await : 함수 B를 보면 3초후에 실행되는 데, 
    //         이것이 끝날 때까지 기다려줌
    // --> await는 async 함수 내에서만, 다른 promise의 종료를 기다릴 때 사용 가능
    const k = await B()   
    console.log('k is '+k);
    if(k >= 0){
        return '실행 끝'  // resolve에 해당하는 부분
    }
    else{
        throw new Error('음수')  // reject에  해당하는 부분
    }
}


const a1 = async_fetchUser(-10)  // a1은 Promise
console.log('a1 : '+a1)
a1
.then((v)=>{
    console.log(`fetchUser result: ${v}`)
})
.catch((error)=>{
    console.log(`에러발생: ${error}`)
})
.finally(()=>{                             // finally : resolve나 reject에 상관없이
    console.log(`Promise 끝 from finally`) //           promise가 종료되면서 공통적으로 
                                           //           실행되어야 하는 부분

})


