'use strict'

// javascript ----> typescript (더 엄격)


// 동기식(synchronous)  
// request: 객체
// web browser에서 다른 web server들로 request를 보냄
let request = new XMLHttpRequest() 
// GET : web browser가 web server로 http 프로토콜로 요청할 때
//       해당하는 것을 달라고 하는 것
request.open('GET','http://127.0.0.1:5500/_1_console/main.html',false)
// 보내기
request.send(null)

if(request.status === 200){
    // server가 보낸것을 제대로 받음
    // responseText : 요청 후 받아온 내용을 문자열로 보여줌
    console.log(request.responseText)
}


/*
    아래에 있는 반복문은 위의 것이 끝나야만 실행
    그런데 만약 위의 것이 오래걸린다면 
    아래에 있는 반복문은 기다릴 수 밖에 없음 --> 동기(Synchronous) 
    -> 따라서 위의 것과 별개로 따로 실행 
    ---> 비동기(Asynchronous)
    ---> javascript 에서는 비동기를 지원하는 데, 바로 " Promise "
*/

for(let i=0;i<10;i++){
    console.log(i);
}



// Promise

const a = new Promise((resolve,reject)=>{
    // ----- 해야할 일 지정
    console.log('hello')
    setTimeout(()=>{
        resolve('ended')  // 해야할 일 ('hello' 출력) 끝났으면 실행한다고 약속
    },3000)               // 3초후에 resolve 함수 수행
})

// resolve가 잘 실행됐으면(잘 끝났으면)
a
.then((v)=>{
    console.log(`then received: ${v}`) // 'ended' 출력
})

for(let i=0;i<10;i++){
    console.log(i);
}

/*
    비동기이므로, 동기처럼 'hello'가 출력되고 3초후에 'ended'가 찍히고
    반복문이 실행되는 것이 아닌
    'hello'가 출력되고 반복문은 따로 실행이 되고
    또 따로 3초후에 'ended'가 찍힘
*/






// 맨 위에 있는 request --> 동기식(코드가 위에서 아래로, 순서대로)
// 이것을 비동기식으로 바꾸면
// ---> 서버로 부터 _1_console/main.html을 받아오는데, 이것이 많이 걸리면
//      아래에 있는 반복문은 이것을 기다리지 않고 따로 실행

// 비동기식 (코드가 쓰여진 순서와는 상관없이 진행)

// 먼저 Promise 없이
let request2 = new XMLHttpRequest() 
// 서버로부터 응답이 왔을 때 실행될 코드를 지정 (비동기식이므로 언제올지 모름) --> 이벤트 핸들러 이용해서
// --> 동기식일 경우에는 순서대로 진행되므로 예상 가능

// request.onload : 요청에 대한 응답이 로딩될 때 (이벤트 핸들러)
request2.onload = ()=>{
    if(request2.status === 200){
        console.log('응답이 제대로 왔음')
        console.log(request2.responseText)
    }    
    else{
        console.log('응답이 제대로 오지 않았음')
    }
}

request2.open('GET','http://127.0.0.1:5500/_1_console/main.html',true) // true ==> request가 비동기식 진행
request2.send(null)

for(let i=0;i<11;i++){
    console.log(i);
}



// Promise를 이용한 비동기
// --> fetch 를 이용 (요즘 많이 쓰는 것)

// fetch: 가져오다 --> 서버로부터 web page를 가져오다
// --> 반환값 : promise (서버로부터 답장받으면 알려줌)
// a2는 promise
fetch('http://127.0.0.1:5500/_1_console/main.html')
.then((response)=>{
    // fetch가 성공하여 서버로부터 응답이 제대로 왔을 때 실행
    console.log(`서버응답 도착`)
    return response.text()  // --> promise (문자열 아님)
})
.then((data)=>{
    // response(promise) 잘 받으면
    // data -> 문자열
    console.log(`문자열로 바꾼 응답: ${data}`)
})
.catch((error)=>{
    // fetch가 실패했을 때
    console.log(`서버응답 에러: ${error}`)
})

for(let i=0;i<10;i++){
    console.log(i);
}