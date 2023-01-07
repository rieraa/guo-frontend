import {Tree} from 'tdesign-react';
import {VmMaintenance} from 'grommet-icons'
import 'tdesign-react/es/style/index.css';
import './index.css'
import {useEffect, useState} from 'react';
import {http} from "../../utils/index.js";
import {useLocation} from "react-router-dom";


const rawDate = [
    {
        "chapterId": "0d7ae599-6712-481f-ae06-2f1e96650b90",
        "chapterName": "6.1 第六章第一小节修改版",
        "preChapterId": "596ce82e-4437-4c56-b9b1-f02fa15ecda9",
        "courseId": "1",
        "rootChapterId": "596ce82e-4437-4c56-b9b1-f02fa15ecda9",
        "isDeleted": 0
    },
    {
        "chapterId": "1",
        "chapterName": "第一章 软件架构设计概述",
        "preChapterId": "0",
        "courseId": "1",
        "rootChapterId": "0",
        "isDeleted": 0
    },
    {
        "chapterId": "10",
        "chapterName": "1.1 软件架构设计概述",
        "preChapterId": "1",
        "courseId": "1",
        "rootChapterId": "1",
        "isDeleted": 0
    },
    {
        "chapterId": "11",
        "chapterName": "第二章 GRASP设计原则",
        "preChapterId": "1",
        "courseId": "1",
        "rootChapterId": "0",
        "isDeleted": 0
    },
    {
        "chapterId": "12",
        "chapterName": "2.1 信息专家原则",
        "preChapterId": "11",
        "courseId": "1",
        "rootChapterId": "11",
        "isDeleted": 0
    },
    {
        "chapterId": "13",
        "chapterName": "2.2 创建者原则",
        "preChapterId": "12",
        "courseId": "1",
        "rootChapterId": "11",
        "isDeleted": 0
    },
    {
        "chapterId": "14",
        "chapterName": "第三章 设计模式",
        "preChapterId": "11",
        "courseId": "1",
        "rootChapterId": "0",
        "isDeleted": 0
    },
    {
        "chapterId": "15",
        "chapterName": "3.1",
        "preChapterId": "14",
        "courseId": "1",
        "rootChapterId": "14",
        "isDeleted": 0
    },
    {
        "chapterId": "2",
        "chapterName": "3.2 工厂模式",
        "preChapterId": "15",
        "courseId": "1",
        "rootChapterId": "14",
        "isDeleted": 0
    },
    {
        "chapterId": "3",
        "chapterName": "3.3 模式",
        "preChapterId": "2",
        "courseId": "1",
        "rootChapterId": "14",
        "isDeleted": 0
    },
    {
        "chapterId": "4",
        "chapterName": "第四章",
        "preChapterId": "14",
        "courseId": "1",
        "rootChapterId": "0",
        "isDeleted": 0
    },
    {
        "chapterId": "5",
        "chapterName": "4.1 第四章的第一小节",
        "preChapterId": "4",
        "courseId": "1",
        "rootChapterId": "4",
        "isDeleted": 0
    },
    {
        "chapterId": "596ce82e-4437-4c56-b9b1-f02fa15ecda9",
        "chapterName": "第六章",
        "preChapterId": "123",
        "courseId": "1",
        "rootChapterId": "0",
        "isDeleted": 0
    },
    {
        "chapterId": "6",
        "chapterName": "4.2 第四章的第二小节",
        "preChapterId": "5",
        "courseId": "1",
        "rootChapterId": "4",
        "isDeleted": 0
    }
];


const video = "https://prod-streaming-video-msn-com.akamaized.net/a8c412fa-f696-4ff2-9c76-e8ed9cdffe0f/604a87fc-e7bc-463e-8d56-cde7e661d690.mp4"


export default function Chapter() {

    const [item, setItem] = useState([])

    //获取到路由中的课程id
    const location = useLocation()
    let msg = new URLSearchParams(location.search)
    const courseId = msg.get('id')


    const rawDateProcess = (rawDate) => {
        let okDate = []
        let childs = []
        let child = []
        let len = rawDate.length
        let i = 0
        let j = 0
        let m = 0




        //所有根节点
        while (i < len) {
            let rootChapterId = rawDate[i].rootChapterId
            let chapterName = rawDate[i].chapterName
            let chapterId = rawDate[i].chapterId
            if (rootChapterId == 0) {
                okDate.push({label: chapterName, children: [], keys: chapterId})
            }
            i = i + 1
        }


        i = 0
        //将子节点插入根节点
        while (i < len) {

            let rootChapterId = rawDate[i].rootChapterId
            let chapterName = rawDate[i].chapterName
            let parent = rawDate[i].preChapterId
            let chapterId = rawDate[i].chapterId
            j = 0
            if (rootChapterId !== "0") {
                while (j < okDate.length) {
                    if (okDate[j].keys == parent) {
                        okDate[j].children.push({label: chapterName, child: false, id: chapterId})
                        console.log("appearance")
                        j = j + 1

                        break
                    }
                    j = j + 1


                }
            }
            i = i + 1
        }

        console.log(okDate)


        i = 0
        //将子节点插入根节点
        while (i < len) {

            let rootChapterId = rawDate[i].rootChapterId
            let chapterName = rawDate[i].chapterName
            let parent = rawDate[i].preChapterId
            let chapterId = rawDate[i].chapterId
            j = 0
            if (rootChapterId !== "0") {
                while (j < okDate.length) {
                    let long = okDate[j].children.length
                    console.log("okDate[" + j + "]=" + okDate[j].children[long - 1].id + "")
                    if (okDate[j].children[long - 1].id === parent) {
                        okDate[j].children.push({label: chapterName, child: false, id: chapterId})
                        j = j + 1
                        break
                    }
                    j = j + 1


                }
            }
            i = i + 1
        }


        setItem(okDate)
        console.log(okDate)


        i = 0

    }

    // 点击不同章节中的小节时进行跳转
    const handleClick = (context) => {
        // console.info('onClick', context);
        console.log(context.node.data.id)

    };

    async function getAllChapter() {
        let res = await http.post('/api/chapter/all', {
            "courseId": courseId
        })
        console.log(res.data.result)
        rawDateProcess(res.data.result)
    }

    useEffect(() => {
        // dom操作
        // 获取路径里的参数章节号
        const res = getAllChapter()


    }, [])


    return (
        <div className='flex justify-center   mx-10 mt-10'>
            <div className=" flex-col items-center justify-center w-7/12    ml-12">

                {/* 头部视频介绍 */}
                <div className="flex justify-center h-80 ">
                    <video controls className=" w-2/3 h-80 object-cover rounded-lg" src={video}></video>
                    `

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
                                <VmMaintenance color='rgb(209 213 219)' size='small'/>
                                <p className="text-xs tracking-wider text-gray-300 font-sans ">视频分类:wall</p>
                            </li>
                        </ul>
                    </div>

                </div>
                {/* 课程章节目录 */}
                <div className=" flex-col justify-start pt-5 items-center my-2">
                    <p className="text-gray-700 text-base font-semibold tracking-wider h-10 flex items-center font-sans">软件设计体系结构</p>
                    <div className="pt-2  ">
                        <Tree
                            class="tree"
                            data={item}
                            activable
                            hover
                            transition
                            expandMutex
                            onClick={handleClick}
                        />
                    </div>


                </div>

            </div>


        </div>
    )

}

