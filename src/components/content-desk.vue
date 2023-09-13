<script setup>
import { onMounted, ref, reactive, watch, nextTick } from 'vue';
import Icon from './icon.vue'

import { Sortable } from 'sortablejs'


// let LOAD = false //页面是否加载完成
var isScrolling = false;
var timeout = null;

// 监听鼠标滚轮停止事件
const mouseMiddle = (e) => {
  if (!isScrolling) {
    if (e.deltaY < 0) {
      // console.log("上滑");
      desk.previousPage()
    } else {
      // console.log("下滑");
      desk.nextPage()
    }
  }
  // else{
  //     console.log(2);
  // }
  // 清除之前的延迟检测
  clearTimeout(timeout);
  // 设置延迟检测
  timeout = setTimeout(function () {
    // 鼠标滚轮停顿事件处理逻辑
    // console.log('鼠标滚轮停顿');
    isScrolling = false;
  }, 150); // 设置延迟时间，单位为毫秒

  // 标记鼠标滚轮正在滚动
  isScrolling = true;
}

//图标对象
function IConOne(name, url, icon) {
  this.name = name
  this.url = url
  this.icon = icon

}


//页对象
function DeskOnepage(pageNum, list) {
  //页数
  this.pageNum = pageNum
  //所有图标
  this.allIcon = list
}

const deskref = ref(null)


let Allicon = [
  ['百度', 'https://www.baidu.com/'],
  ['必应', 'https://cn.bing.com/'],
  ['谷歌', 'https://www.google.com/'],
  ['哔哩哔哩', 'https://www.bilibili.com/'],
  ['斗鱼', 'https://www.douyu.com/'],
  ['虎牙', 'https://www.huya.com/'],
  ['YouTube', 'https://www.youtube.com/'],
  ['Netflix', 'https://www.netflix.com/jp-en/'], ['奈飞', 'https://netfly.tv/'], ['美剧窝', 'https://www.imjw.cc/'], ['低端影视', 'https://ddys.pro/'], ['CCTV', 'https://tv.cctv.com/live/index.shtml?spm=C28340.PdNvWY0LYxCP.E3alv6pYzpwM.1'], ['樱花动漫', 'https://www.yhdmp.cc/'], ['91美剧网', 'https://mjw21.com/'], ['豌豆PRO', 'https://www.wandou.pro/'], ['努努影院', 'https://www.nunuyy3.org/#wangzhikucom'], ['大米星球', 'https://www.dmxq.fun/'], ['AcFun', 'https://www.acfun.cn/'], ['低端影视 网址发布页', 'https://ddys.site/'], ['电影狗', 'https://www.dianyinggou.com/so/%E7%81%AB%E5%BD%B1%E5%BF%8D%E8%80%85'], ['稀饭影视', 'https://www.xifanys.com/'], ['饭团影视', 'https://www.fantuanhd.com/'], ['HDmoli', 'https://www.hdmoli.com/'], ['最新电影推荐\n                        - 第1页 - 高清免费在线观看- COKEMV - https://cokemv.me/', 'https://cokemv.me/vodtype/1.html'], ['COKEMV', 'https://cokemv.me/'], ['磁力熊\n                        - 豆瓣高分电影1080P下载在线观看', 'https://www.cilixiong.net/'], ['书栈网', 'https://www.bookstack.cn/'], ['知乎', 'https://www.zhihu.com/'], ['简书', 'https://www.jianshu.com/'], ['wikiHow', 'https://zh.wikihow.com/%E9%A6%96%E9%A1%B5'], ['HelloGitHub', 'https://hellogithub.com/'], ['GitHub', 'https://github.com/'], ['GitHub中文网', 'https://www.githubs.cn/'], ['腾讯云', 'https://cloud.tencent.com/'], ['千亿像素看中国', 'http://bigpixel.cn/'], ['全历史', 'https://www.allhistory.com/'], ['今日热榜官网', 'https://tophub.today/'], ['香蕉空间', 'https://www.bananaspace.org/wiki/%E9%A6%96%E9%A1%B5'], ['游戏/娱乐\n                        - 游戏/娱乐 - 开源软件 - Gitee.com', 'https://gitee.com/explore/game-and-entertainment'], ['代码笔：在线代码编辑器和前端\n                        Web 开发人员社区', 'https://codepen.io/'], ['TIOBE编程语言排行', 'https://www.tiobe.com/tiobe-index/'], ['Java\n                        全栈知识体系', 'https://www.pdai.tech/'], ['Vue.js\n                        - 渐进式 JavaScript 框架 | Vue.js', 'https://cn.vuejs.org/'], ['数据结构和算法动态可视化\n                        (Chinese) - VisuAlgo', 'https://visualgo.net/zh'], ['TheAlgorithms/Python:\n                        All Algorithms implemented in Python', 'https://github.com/TheAlgorithms/Python'], ['算法', 'https://the-algorithms.com/'], ['网易云清灰', 'https://github.com/UnblockNeteaseMusic/server'], ['翻墙', 'https://github.com/Alvin9999/new-pac/wiki'], ['翻墙、免费翻墙、免费科学上网、免费节点、免费梯子、免费ss/ssr/v2ray/trojan节点、蓝灯、谷歌商店、翻墙梯子\n                        、外网游戏、国外游戏、vpn、vpn推荐、每天更新、上外网、外网、V2rayN、Qv2ray、V2rayW、V2RayS、Mellow、V2rayX、V2rayU、ClashX、Kitsunebi、BifrostV、i2Ray\n                        、Quantumult、Surge\n                        4、winXray、Qv2ray、Kitsunebi、Trojan-Qt5、代理服务器、机场、马里奥、魔兽世界、poshMark、亚马逊、虾皮、煤炉、Mercari、外贸', 'https://github.com/githubvpn007/v2rayNvpn'], ['蜘蛛资源网\n                        | 优质软件资源分享网站！', 'https://www.zhizhuzy.com/'], ['职友集：让职场人少走弯路', 'https://www.jobui.com/'], ['MSDN', 'https://msdn.itellyou.cn/'], ['HelloWindows', 'https://hellowindows.cn/'], ['itch.io', 'https://itch.io/'], ['黑马程序员', 'http://www.itheima.com/'], ['夜河资源网', 'http://www.yehes.com/'], ['GBT乐赏游戏空间', 'http://gbtgame.ysepan.com/'], ['科学上网', 'https://www.iyio.net/'], ['海盗湾', 'https://thepiratebay.org/index.html'], ['夜雨vip', 'http://www.yeyuvip.com/'], ['模之屋', 'https://www.aplaybox.com/'], ['PICKFREE免费资源导航|免版权图片|免费商用字体|免费音频', 'http://www.pickfree.cn/'], ['小刀娱乐网', 'https://xd.x6d.com/#52dhw.net'], ['RuTracker.org', 'https://rutracker.org/forum/index.php'], ['Cкачать\n                        игры на ПК [последние версии 2021] через торрент бесплатно', 'https://byrut.org/'], ['独立游戏开发资源站\n                        – 努力做最好的开源资源站', 'https://godotengine.cn/'], ['TexhOcean破解软件', 'https://texhocean.com/'], ['HD-MV.com\n                        原版无水印MV分享站', 'https://www.mehdmv.com/'], ['极简插件', 'https://chrome.zzzmh.cn/index#/index'], ['油猴脚本开发指南教程目录-油猴中文网', 'https://bbs.tampermonkey.net.cn/thread-184-1-1.html'], ['哇哦菌-破解软件下载基地,致力实用软件绿色资源分享', 'https://www.waodown.com/'], ['大神资源网-影视后期特效素材资源网', 'http://www.dashenae.com/'], ['Adobe全家桶\n                        – 极客鸟', 'https://jikebird.com/collection/adobe'], ['Switch520永久防迷路', 'https://sway.office.com/6bbhaAc40C11Q6Gh'], ['前端资源\n                        - 第3页｜那些免费的砖', 'https://www.thosefree.com/web/page/3'], ['Switch520', 'https://xxxxx528.com/'], ['Wallpapers', 'https://wallhaven.cc/'], ['Live\n                        Wallpaper', 'https://livewallp.com/'], ['Live\n                        Wallpaper PC', 'https://www.livewallpaperpc.com/'], ['致美化', 'https://zhutix.com/?s=macos'], ['堆糖', 'https://www.duitang.com/reg/phone/?next=/blog/%3Fid%3D1303370226'], ['必应每日高清壁纸', 'https://bing.ioliu.cn/'], ['超过\n                        70000 张关于“风景”和“自然”的免费图片 - Pixabay', 'https://pixabay.com/zh/images/search/%E9%A3%8E%E6%99%AF/'], ['Wallpaper\n                        Abyss - 高清壁纸, 桌面背景', 'https://wall.alphacoders.com/?lang=Chinese'], ['极简壁纸_海量电脑桌面壁纸美图_4K超高清_最潮壁纸网站', 'https://bz.zzzmh.cn/index'], ['正则表达式', 'https://tool.oschina.net/regex'], ['测速网', 'https://www.speedtest.cn/']]
// for(let a of Allicon){
//     console.log(a);
// }
let AllIConOne = []
for (let i of Allicon) {
  AllIConOne.push(new IConOne(i[0], i[1], ""))
}
// console.log(AllIConOne);

//桌面对象
let desk = {
  deskRef: deskref
  ,
  allPage: reactive([])
  ,
  nowPage: ref(1)
  ,
  left: 0,
  nextPage() {
    if (this.nowPage.value == this.allPage.length) { /* empty */
    } else {
      let width = this.deskRef.value.offsetWidth
      this.left -= width
      this.deskRef.value.style.left = this.left + "px"
      this.nowPage.value += 1
      // console.log(this.left, this.nowPage.value);
    }


  }
  ,


  previousPage() {
    if (this.nowPage.value == 1) {

    } else {
      let width = this.deskRef.value.offsetWidth
      this.left += width
      this.deskRef.value.style.left = this.left + "px"
      this.nowPage.value -= 1
      // console.log(this.left, this.nowPage.value);
    }


  }
  ,
  addPage(iconlist) {
    this.allPage.push(new DeskOnepage(this.allPage.length + 1, iconlist))
  }
  ,
  delPage() {

  }
}

let num = AllIConOne.length / 20 > Math.trunc(AllIConOne.length / 20) ? Math.trunc(AllIConOne.length / 20) + 1 : Math.trunc(AllIConOne.length / 20);
let n = 0
for (let j = 0; j < num; j++) {
  let Page = new DeskOnepage(j, [])
  for (let i in [...Array(20).keys()]) {
    Page.allIcon.push(AllIConOne[n])
    n++
  }
  desk.allPage.push(Page)
}


// let n = 0
// for (let i in desk.allPage/     let nowPage = desk.allPage[for (let j = 0; j < 20; j++) {

//         nowPage.allIcon.push(AllIConOne[n])
//         n++
//     }

// }
// console.log(desk.allPage)/ console.log(AllIConOne);
// console.log(AllIConOne.splice(0,25));
// console.log(AllIConOne.splice(25,25));
function insert(arr, x, y) {//把x下标移动到y处
  if (x != y) {
    let n = arr[x]
    arr.splice(x, 1);
    arr.splice(y, 0, n);
  } else {
    console.log("index相等")
  }

}

let SortableList = []
onMounted(() => {
  //

  for (let i of document.querySelectorAll(".sortableList")) {
    SortableList.push(
      new Sortable(i, {
        group: "group1",
        animation: 200,
        ghostClass: "draghide",
        forceFallback: true,

        fallbackClass: "sortable",
        onStart: function (evt) {
          let NowDragPage=evt.target.getAttribute("value")
          console.log("开始拖拽", NowDragPage);
          setGroupName(parseInt(NowDragPage))
        },

        onEnd: function (evt) {
          let newpage = evt.to.getAttribute("value")
          let oldpage = evt.from.getAttribute("value")
          let newindex = evt.newIndex
          let oldindex = evt.oldIndex

          console.log("新页", newpage);
          console.log("旧页", oldpage);
          console.log("新索引", newindex);
          console.log("旧索引", oldindex);

          if (newpage == oldpage) {

            // console.log("在同一页")


            let a = desk.allPage[newpage].allIcon



            insert(a, oldindex, newindex)
            desk.allPage[newpage].allIcon = []
            nextTick(() => {
              desk.allPage[newpage].allIcon = a
            })
            // console.log(a)




          }
          else {
            // console.log("不在同一页")
            let np = desk.allPage[newpage].allIcon
            let op = desk.allPage[oldpage].allIcon

            // console.log("旧页", op);

            // console.log("新页", np);
            // console.log("拖动的索引为", oldindex);
            // console.log("结束的索引为", newindex);
            let dom1 = desk.allPage[oldpage].allIcon[oldindex]
            // console.log("拖动的元素", dom1);

            op.splice(oldindex, 1)
            np.splice(newindex, 0, dom1)

            desk.allPage[newpage].allIcon = []
            desk.allPage[oldpage].allIcon = []
            nextTick(() => {
              desk.allPage[newpage].allIcon = np
              desk.allPage[oldpage].allIcon = op
              console.log(desk.allPage[oldpage].allIcon)
              console.log(desk.allPage[newpage].allIcon)
            })
            // op.splice(parseInt(oldindex),1)


          }

        }
        ,

      })
    )
  }






  //
})

//更改分组名字
const setGroupName = (nowindex) => {
  for(let x of SortableList){
    x.options.group.name="random"+Math.random()
  }
  let sameName="group1"
  SortableList[nowindex].options.group.name = sameName
  
  for (let n in SortableList) {
    let nowpage = desk.allPage[n].allIcon
    let l = 0
    for (let j of nowpage) {
      if (j != undefined) {
        l++
      }
    }
    if (l < 20) {
      SortableList[n].options.group.name = sameName
    }








  }

  // for(let x of SortableList){
  //   console.log(x.options.group.name);
  // }
}


//存储所有本地数据
const saveAllLocalData=()=>{
  localStorage.setItem("Allicon",JSON.stringify(desk.allPage));
  localStorage.setItem("NowSearchEngine","");
}
const GetAllLocalData=()=>{
  saveAll()
  let cat = localStorage.getItem("Allicon");
  console.log(JSON.parse(cat));
}

</script>


<template>
  <div class="contentheart">
    <div class="base" @wheel="mouseMiddle">
      <div class="base_one" ref="deskref">

        <div v-for="i, j in desk.allPage" class="page sortableList" :key="j" :value="i.pageNum">

          <template v-for="(j, k) in i.allIcon" :key="k">
            <Icon v-if="j != undefined" :name="j.name" :link="j.url" :icon="j.icon">

            </Icon>
          </template>


        </div>


      </div>


    </div>

    <div class="roundDot">
      <ul>
        <li v-for="(i, j) in desk.allPage" :key="i.id">

          <div v-if="desk.nowPage.value - 1 == j"
            style="width: 5px; height: 5px; background-color: rgb(18, 160, 255);border-radius: 99px;"></div>
          <div v-else style="width: 5px; height: 5px; background-color: rgb(206, 206, 206);border-radius: 99px;">
          </div>
        </li>
      </ul>

    </div>
  </div>
</template>


<style scoped>
.contentheart {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  /* backdrop-filter:blur(10px)  contrast(80%); */

}

.roundDot {
  width: 100%;
  height: 10px;
  display: flex;
  justify-content: center;
  margin-top: -10px;
}

.roundDot ul {
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  transform: scale(1);
  transition: transform 0.5s, background-color 0.5s;


}

.roundDot ul:hover {

  transform: scale(2);
  background-color: rgba(153, 153, 153, 0.5);

}

.roundDot li {
  width: 10px;
  height: 10px;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(1);
  transition: transform 0.25s;

}

.roundDot li:hover {
  transform: scale(1.5);
}

.base {
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  /* background-color: brown; */
  /* display: flex; */
  /* justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: center; */
  overflow: hidden;
}

.base_one {
  width: 100%;
  height: 100%;
  /* background-color: rgb(3, 103, 70); */
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  align-items: center;


  position: relative;
  left: 0px;
  transition: left 1s;
}


.page {
  width: 100%;
  height: 100%;
  /* outline: 2px solid rgb(0, 0, 0); */
  display: grid;
  grid-template-columns: repeat(5, 20%);
  grid-template-rows: repeat(4, 25%);
  justify-items: center;
  align-items: center;
}

.draghide {

  opacity: 0;

}

.sortable {
  opacity: 1 !important;
  /*background: black;*/

}
</style>