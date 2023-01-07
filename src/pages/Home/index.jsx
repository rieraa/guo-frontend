import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, Input } from 'tdesign-react';
import cover from '../../assets/coverIMG.jpg';
import Pagination_Ti from '../../components/Pagination';
import { http } from '../../utils/http';
const { SwiperItem } = Swiper;
const StudyHome = () => {
  const navigate = useNavigate();
  const [courese, setCourse] = useState([]);
  const [value, onChange] = useState('Hello TDesign');
  useEffect(() => {
    const getList = async () => {
      const res = await http.post('/api/courseinfo/search', {});
      const { records } = res.data.results;
      setCourse(records);
    };
    getList();
  }, []);

  return (
    <div className=' mx-auto px-14 bg-slate-100'>
      <div className='flex p-4'>
        <div style={{ width: '600px', height: '300px' }}>
          <Swiper duration={300} interval={2000} autoplay trigger='hover'>
            <SwiperItem>
              <div
                style={{ width: '600px', height: '300px' }}
                className='demo-item'>
                <img className='h-full w-full' src={cover} alt='' />
              </div>
            </SwiperItem>
            <SwiperItem>
              <div
                style={{ width: '600px', height: '300px' }}
                className='demo-item'>
                <img className='h-full w-full' src={cover} alt='' />
              </div>
            </SwiperItem>
            <SwiperItem>
              <div
                style={{ width: '600px', height: '300px' }}
                className='demo-item'>
                <img className='h-full w-full' src={cover} alt='' />
              </div>
            </SwiperItem>
          </Swiper>
        </div>
        <div className=' pl-7 text-slate-700'>
          <h1 className=' text-2xl text-center font-semibold pb-4'>
            慕课学习网站
          </h1>
          <p className='text-lg'>
            我们的慕课学习网站是一个专门提供在线教育课程的网站。我们拥有大量优质的课程，包括计算机科学、人工智能、数据科学、编程、设计等领域的课程。我们的课程由经验丰富的讲师授课，并配有丰富的视频讲解和练习题，方便学习。
            我们的课程都是由经验丰富的讲师讲授，并配有丰富的视频讲解和练习题。
            课程内容系统全面，能够帮助学生从零基础入门，也能够帮助有经验的学习者提升技能。我们的课程具有较高的实用价值，旨在帮助学生掌握实用技能，为他们的职业生涯做好准备。
            我们希望能够为您的学习提供帮助，让您在我们的慕课学习网站上有收获、有成就感。
          </p>
        </div>
      </div>
      <div>
        <Input
          placeholder='请输入内容'
          value={value}
          clearable
          onChange={(value) => {
            onChange(value);
          }}
          onClear={() => {
            console.log('onClear');
          }}
        />
      </div>

      {/* list start*/}
      <div className=' flex flex-wrap pt-12 justify-start '>
        {/* card start*/}
        {courese.map((item) => {
          return (
            <div
              className=' mx-3 mb-6 h-64 w-64 overflow-hidden bg-white hover:shadow-lg hover:cursor-pointer rounded-lg'
              key={item.courseId}
              onClick={() => {
                navigate(`chapter?id=${item.courseId}`);
              }}>
              <div className=' w-full h-44'>
                <img className='w-full h-full' src={cover} alt='' />
              </div>
              <div className='p-3 space-y-2'>
                <div className='font-bold text-xl text-slate-600'>
                  {item.courseName}
                </div>
                <p className='font-light text-slate-500'>
                  章节数 {item.chapterQuantity}
                </p>
              </div>
            </div>
          );
        })}
        {/* card end*/}
      </div>
      {/* list end */}
      <Pagination_Ti></Pagination_Ti>
    </div>
  );
};

export default StudyHome;
