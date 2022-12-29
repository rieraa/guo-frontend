
import { Form, Switch, Tree, Space } from 'tdesign-react';
import { VmMaintenance } from 'grommet-icons'
import 'tdesign-react/es/style/index.css';
import './index.css'
import { useState } from 'react';

// 模拟章节数据
const items = [
  {
    label: '第一章软件架构设计概述',
    children: [
      {
        label: '1.1信息专家原则',
      },
      {
        label: '1.2信息专家原则',
      },
    ],
  },
  {
    label: '第二章软件架构设计概述',
    children: [
      {
        label: '2.1信息专家原则',
      },
      {
        label: '2.2信息专家原则',
      },
    ],
  },
];



const rawDate = [
  {
    "chapterName": "1",
    "rootChapterId": "0",
    "isDeleted": "0",
    "preChpterId": "0",
    "chapterId": "0"
  },
  {
    "chapterName": "2",
    "rootChapterId": "0",
    "isDeleted": "0",
    "preChpterId": "6",
    "chapterId": "1"
  },
  {
    "chapterName": "1.1",
    "rootChapterId": "1",
    "isDeleted": "0",
    "preChpterId": "0",
    "chapterId": "6"
  },
  {
    "chapterName": "1.2",
    "rootChapterId": "1",
    "isDeleted": "0",
    "preChpterId": "0",
    "chapterId": "12"
  },
  {
    "chapterName": "1.3",
    "rootChapterId": "1",
    "isDeleted": "0",
    "preChpterId": "0",
    "chapterId": "12"
  },

]




// const video = "https://oooooo.oss-cn-fuzhou.aliyuncs.com/img/unicorn2.mp4"





export default function Chapter () {

  const [item, setItem] = useState([])

  const rawDateProcess = (rawDate) => {
    let okDate = []
    let childs = []
    let child = []
    let len = rawDate.length
    let i = 0
    let j = 0

    //所有根节点
    while (i < len) {
      let rootChapterId = rawDate[i].rootChapterId
      let chapterName = rawDate[i].chapterName
      let chapterId = rawDate[i].chapterId
      if (rootChapterId == 0) {
        okDate.push({ label: chapterName, children: [], id: chapterId })
      }
      i = i + 1
    }

    i = 0
    //将子节点插入根节点
    while (i < len) {
      console.log("i=", i)
      console.log("now:", rawDate[i])
      let rootChapterId = rawDate[i].rootChapterId
      let chapterName = rawDate[i].chapterName
      let parent = rawDate[i].preChpterId
      j = 0
      if (rootChapterId !== "0") {
        while (j < okDate.length) {
          if (okDate[j].id == parent) {
            okDate[j].children.push({ label: chapterName, child:false })
            break
          }
          console.log(chapterName, rawDate[i].chapterId)
          
          j = j + 1
        }
      }
      i = i + 1
    }
    setItem(okDate)

    console.log(okDate)
  }


  return (
    <div className='flex justify-center   mx-10 mt-10'>
      <div className=" flex-col items-center justify-center w-7/12    ml-12">
        <button onClick={() => rawDateProcess(rawDate)}>buttoo</button>
        {/* 头部视频介绍 */}
        <div className="flex justify-center h-80 ">
          {/* <video controls className=" w-2/3 h-80 object-cover rounded-lg" src={video}></video>` */}

          <div className="mx-6">

            <p className="text-gray-700 text-lg font-medium tracking-wider h-10 flex items-center font-sans">课程介绍</p>

            <p className="tracking-wider text-base text-gray-400 h-60 py-2 font-medium font-sans">
              这种事实对本人来说意义重大，相信对这个世界也是有一定意义的。
              我认为， 冯学峰曾经提到过，当一个人用工作去迎接光明，光明很快就会来照耀着他。
              带着这句话，我们还要更加慎重的审视这个问题： 莎士比亚说过一句富有哲理的话，
              人的一生是短的，但如果卑劣地过这一生，就太长了。我希望诸位也能好好地体会这句话。
            </p>
            <ul className="flex h-10 justify-end ">
              <li className="flex text-xl items-center space-x-1">
                <VmMaintenance color='rgb(209 213 219)' size='small' />
                <p className="text-xs tracking-wider text-gray-300 font-sans ">视频分类:wall</p>
              </li>
            </ul>
          </div>

        </div>
        {/* 课程章节目录 */}
        <div className=" flex-col justify-start pt-5 items-center my-2">
          <p className="text-gray-700 text-base font-semibold tracking-wider h-10 flex items-center font-sans">软件设计体系结构</p>
          <div className="pt-2  ">
            <Tree class="tree" data={item} activable hover transition expandMutex />
          </div>


        </div>

      </div>


    </div>
  )

}

