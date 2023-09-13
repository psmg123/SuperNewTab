

const click=()=>{
  if(TaskList[0]!=undefined){
    TaskList[0].abort()
  }
  TaskList.shift();
  TaskList.push(FetchPro("https://fanyi.baidu.com/"));

  TaskList[1].ready
    .then((a) => {
      console.log(a.status);
    })
    .catch(() => {
      console.log("err");
    });
  
}

  for(let i =0 ;i<100;i++){
    click()
  }