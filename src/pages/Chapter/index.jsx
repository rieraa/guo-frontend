import {Tree} from 'tdesign-react';
import {VmMaintenance} from 'grommet-icons'
import 'tdesign-react/es/style/index.css';
import './index.css'
import {useEffect, useState} from 'react';
import {http} from "../../utils/index.js";
import {useLocation, useNavigate} from "react-router-dom";


export default function Chapter() {

    // 通过动态路由设置参数
    const navigate = useNavigate();

    // 存储章节数据
    const [item, setItem] = useState([])
    // 存储视频资源url
    const [videoUrl, setVideoUrl] = useState("https://prod-streaming-video-msn-com.akamaized.net/a8c412fa-f696-4ff2-9c76-e8ed9cdffe0f/604a87fc-e7bc-463e-8d56-cde7e661d690.mp4")
    //储存课程信息
    const [courseIntroduction,setcourseIntroduction] = useState()
    const [courseType,setCourseType] = useState()

    //获取到路由中的课程id
    const location = useLocation()
    let msg = new URLSearchParams(location.search)
    const courseId = msg.get('id')


    //对原始章节数据进行处理
    const rawDateProcess = (rawDate) => {
        let okDate = []
        let len = rawDate.length
        let i = 0
        let j = 0


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
                        j = j + 1

                        break
                    }
                    j = j + 1


                }
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
                    let long = okDate[j].children.length
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
        i = 0

    }

    // 点击不同章节中的小节时进行跳转
    const handleClickChapter = (context) => {
        // console.info('onClick', context);
        console.log(context.node.data.id)
        navigate(`/video?chId=${context.node.data.id}&coId=${courseId}`, {
            state: {
                chapterName: context.node.data.label
            }
        });

    };

    // 获取到所有的章节资源
    async function getAllChapter() {
        let res = await http.post('/api/chapter/all', {
            "courseId": courseId
        })
        // console.log(res.data.result)
        rawDateProcess(res.data.result)


    }

    // 获取视频链接资源
    async function getVideoInfo() {
        let res = await http.get('/api/cr/covervideo', {
            "courseId": courseId
        })
        setVideoUrl(res.data.video)

    }

    //获取课程介绍
    async function getCourseIntroduction() {
        let res = await http.get('/api/course/getinfo', {
            "courseId": courseId
        })
        console.log(res.data.courseType)
        setcourseIntroduction(res.data.logContent)
    }

   



    useEffect(() => {
        // dom操作
        // 获取路径里的参数章节号
        getAllChapter().then(r => console.log("获取目录成功"))
        getVideoInfo().then(r => console.log("获取视频URL成功"))
        getCourseIntroduction().then(r => console.log("获取课程信息成功"))

    }, [])


    return (
        <div className='flex justify-center   mx-10 mt-10'>
            <div className=" flex-col items-center justify-center w-7/12    ml-12">

                {/* 头部视频介绍 */}
                <div className="flex justify-center h-80 ">
                    <video controls className=" w-2/3 h-80 object-cover rounded-lg" src={videoUrl}></video>


                    <div className="mx-6">

                        <p className="text-gray-700 text-lg font-medium tracking-wider h-10 flex items-center font-sans">课程介绍</p>

                        <p className="tracking-wider text-base text-gray-400 h-60 py-2 font-medium font-sans">
                            {courseIntroduction}
                        </p>
                        <ul className="flex h-10 justify-end ">
                            <li className="flex text-xl items-center space-x-1">
                                <VmMaintenance color='rgb(209 213 219)' size='small'/>
                                <p className="text-xs tracking-wider text-gray-300 font-sans pt-5 ">视频分类:教育</p>
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
                            onClick={handleClickChapter}
                        />
                    </div>


                </div>

            </div>


        </div>
    )

}

