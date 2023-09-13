<script setup>
import { reactive, ref, onMounted } from "vue";
import { ifMouse } from '../../public/js/tool'

//搜索对象
function SearchEngine(name, link, icon) {
  this.name = name;
  this.link = link;
  this.icon = icon;
  this.startSearch = (text) => {
    window.open(this.link + text);
  };
}

//定义三个初始搜索引擎
let bing = new SearchEngine(
  "bing",
  "https://cn.bing.com/search?q=",
  "/public/img/Bing.svg"
);
let google = new SearchEngine(
  "google",
  "https://www.google.com/search?q=",
  "/public/img/google.svg"
);
let baidu = new SearchEngine(
  "baidu",
  "https://www.baidu.com/s?wd=",
  "/public/img/baidu.svg"
);
//

let AllSearchEngine = [baidu, bing, google];

let NowSearchEngine = reactive(AllSearchEngine[1]);

const NowSearchIconPath = ref(NowSearchEngine.icon);


//更换搜索引擎和图标
const SetSearchIconPath = () => {

  for (let i in AllSearchEngine) {
    if (
      JSON.stringify(AllSearchEngine[i]) === JSON.stringify(NowSearchEngine)
    ) {
      //   console.log("相等");
      if (Number(i) >= AllSearchEngine.length - 1) {
        NowSearchEngine = AllSearchEngine[0];

        break;
      } else {
        NowSearchEngine = AllSearchEngine[Number(i) + 1];

        break;
      }
    }
  }
  NowSearchIconPath.value = NowSearchEngine.icon;
  //   console.log(NowSearchEngine.name);
};
const userInputText = ref(""); //用户输入的内容

const StartSearch = () => {
  //开始搜索
  NowSearchEngine.startSearch(userInputText.value);
};





//-----------------搜索提示框-----------------

//搜索提示框文本
const SearchTipText = ref([

]);
// SearchTipText.value = []
// console.log(SearchTipText.value);


function FetchPro(request, opts) {
  const controller = new AbortController();
  const signal = controller.signal;

  return {
    abort: () => controller.abort(),
    ready: fetch(request, { ...opts, signal }),
  };
}
//fetch队列
let TaskList = [undefined, undefined]; 

const updateTip = (str) => {
  if(TaskList[0]!=undefined){
    TaskList[0].abort()
  }
  TaskList.shift();
  TaskList.push(FetchPro(`http://127.0.0.1:8000/gettip/?name=${str}`));

  //更新提示
  TaskList[1].ready
    .then((response) => response.text())
    .then((res) => {
      let t = []
      res
        .replace("[", "")
        .replace("]", "")
        .split(",")
        .forEach((a) => {
          t.push(a.replace(`"`, "").replace(`"`, ""));
        });


      if (t.toString() == [""].toString()) {
        console.error("数据返回为空");
      } else {
        SearchTipText.value = t
      }


      // console.log("t:");
      // console.log(t);
      // console.log();
      // console.log("SearchTipText.value:");

      // console.log(SearchTipText.value);
    }).catch(() => {
      console.log("err");
    });;

};
//搜索提示框显示
let SearchTipShow = ref(false);

//现在选中的link
let NowTipLink = ref(-1)

//清除选中的link
const ClearNowTipLink = () => {
  NowTipLink.value = -1
}
//api


//修改当前提示链接并且更新搜索框文本
let SetNowTipLink = (a) => {
  NowTipLink.value = a
  userInputText.value = SearchTipText.value[NowTipLink.value]
  // console.log(NowTipLink.value,SearchTipText.value.length-1);

}

const TipUp = () => {
  if (NowTipLink.value == -1) {
    SetNowTipLink(SearchTipText.value.length - 1)
  }
  else if (NowTipLink.value <= 0) {
    SetNowTipLink(SearchTipText.value.length - 1)
  } else {
    SetNowTipLink(--NowTipLink.value)
  }

}
const TipDown = () => {
  if (NowTipLink.value == -1) {
    SetNowTipLink(0)
  }
  else if (NowTipLink.value >= SearchTipText.value.length - 1) {
    SetNowTipLink(0)
  } else {
    SetNowTipLink(++NowTipLink.value)
  }

}


const input = ref(undefined)

onMounted(() => {
  //input获得焦点
  input.value.onfocus = () => {
    if (!(input.value.value == undefined || input.value.value == "")) {
      SearchTipShow.value = true
    }
  }
  //用户输入时
  input.value.oninput = () => {


    updateTip(userInputText.value);
    ClearNowTipLink()

    if (!(input.value.value == undefined || input.value.value == "")) {
      SearchTipShow.value = true
    } else {
      SearchTipShow.value = false
      ClearNowTipLink()
      SearchTipText.value = []
    }
  }


  //检测鼠标点击显示搜索提示框
  document.body.onclick = (e) => {
    if (!ifMouse(e, document.getElementById("search-base"))) {
      SearchTipShow.value = false
      ClearNowTipLink()

    }


  }

})





</script>

<template>
  <div id="search-base">


    <div class="base">
      <div class="div1">
        <div @click="SetSearchIconPath" :style="{ 'background-image': `url(${NowSearchIconPath})` }"></div>
      </div>
      <div class="div2">
        <input v-model="userInputText" @keyup.enter="StartSearch" @keydown.up.prevent="TipUp" @keydown.down="TipDown"
          ref="input" />
      </div>
      <div class="div3">
        <div @click="StartSearch"></div>
      </div>
    </div>




    <div id="base-tip" v-show="SearchTipShow">

      <template v-for="(i, j) in SearchTipText">
        <a v-if="j == NowTipLink" style="background-color: rgb(255, 150, 150);" :href="NowSearchEngine.link + i"
          @mouseenter="SetNowTipLink(j)">
          {{ i }}</a>
        <a v-else :href="NowSearchEngine.link + i" @mousemove="SetNowTipLink(j)">
          {{ i }}</a>
      </template>


    </div>





  </div>
</template>

<style scoped>
#search-base {
  width: inherit;
}

.base {
  width: inherit;
  height: 50px;
  /* backdrop-filter: blur(10px) contrast(80%); */
  background: rgba(255, 255, 255, 0.3);

  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 2px solid black; */
}

.base .div1,
.div2,
.div3 {
  height: inherit;
  /* border: 1px solid black; */
}

.div1 {
  width: 50px;
  border-radius: 999px 0 0 999px;
}

.div2 {
  width: calc(100% - 100px);
}

.div2 input {
  width: 100%;
  height: 100%;
  border: none;
  font-size: 22px;
  text-align: center;
  outline: none;
  background-color: transparent;
}

.div3 {
  width: 50px;
  border-radius: 0 999px 999px 0;
}

.div3 div,
.div1 div {
  width: 100%;
  height: 100%;
  display: flex;

  border-radius: 999px;
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
  transition: background-color 0.5s;
  /* transform: scale(1,1); */
}

.div3 div:hover,
.div1 div:hover {
  /* transform: scale(0.9,0.9); */
  

  background-color: rgb(232, 232, 232);
}

.div3 div {
  background-image: url("/public/img/search.svg");
}

#base-tip {
  width: inherit;
  background-color: rgb(245, 245, 245);
  border-radius: 20px;
  position:absolute;
}

#base-tip a {
  border-radius: 20px;
  display: block;
  text-decoration: none;
  color: black;
  text-align: center;
  padding: 10px;
}

/* #base-tip a:hover {

  background-color: rgb(43, 186, 226);
} */
</style>
