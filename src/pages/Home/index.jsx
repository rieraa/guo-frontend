import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, Button, Pagination, Select } from 'tdesign-react';
import cover from '../../assets/coverIMG.jpg';
import s1 from '../../assets/s1.jpg';
import s2 from '../../assets/s2.jpg';
import s3 from '../../assets/s3.jpg';
import { http } from '../../utils/http';
import './index.scss';
const { SwiperItem } = Swiper;
const StudyHome = () => {
  const navigate = useNavigate();
  // 课程列表
  const [courese, setCourse] = useState([]);
  // search关键字
  const [value, onChange] = useState('');
  //
  const [pagination, setPagination] = useState({
    total: 0,
    current: 1,
  });
  const [type, setType] = useState('0');
  const [types, setTypes] = useState([]);
  useEffect(() => {
    const getList = async () => {
      const res = await http.post('/api/courseinfo/search', {
        search: value,
        typeId: type,
        currentPage: pagination.current,
      });
      const selRes = await http.get('/api/student/courseType/all');
      const { records } = res.data.results;
      let list = selRes.data;
      list.push({ typeId: '0', typeName: '查找全部' });
      setPagination({ ...pagination, total: res.data.results.total });
      setTypes(selRes.data);
      setCourse(records);
    };
    getList();
  }, [value, pagination.current, type]);

  // 切换页数时
  const onCurrentChange = async (current) => {
    const res = await http.post('/api/courseinfo/search', {
      currentPage: current,
      search: value,
      typeId: type,
    });
    setPagination(...pagination, current);
    setCourse(res.data.results);
  };

  return (
    <div className=' mx-auto px-14 bg-slate-100'>
      <div className='block xl:flex xl:p-4'>
        <div
          style={{ width: '600px', height: '300px' }}
          className=' mx-auto mb-4'>
          <Swiper duration={300} interval={2000} autoplay trigger='hover'>
            <SwiperItem>
              <div className='myswiper h-72'>
                <img className='h-full w-full' src={s1} alt='' />
              </div>
            </SwiperItem>
            <SwiperItem>
              <div className='myswiper h-72'>
                <img className='h-full w-full' src={s2} alt='' />
              </div>
            </SwiperItem>
            <SwiperItem>
              <div className='myswiper h-72'>
                <img className='h-full w-full' src={s3} alt='' />
              </div>
            </SwiperItem>
          </Swiper>
        </div>
        <div className=' sm:text-xs text-sm text-slate-700 xl:pl-7 xl:text-slate-700'>
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
      <div className='flex items-center ml-3 mt-6 border-b-2 pb-6'>
        <input
          className='h-12 bg-slate-200 rounded-md font-sans text-slate-800 py-3 px-3
          focus:outline-none text-sm placeholder:text-slate-400 appearance-none w-2/5'
          placeholder='请输入内容'
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
        <Button className='h-12'>搜索</Button>
        <div className='flex items-center ml-16 w-full'>
          <p>课程类别：</p>
          <Select
            value={type}
            onChange={(value) => {
              setType(value);
            }}
            filterable={true}
            clearable
            style={{ width: '30%' }}
            keys={{
              label: 'typeName',
              value: 'typeId',
            }}
            options={types}></Select>
        </div>
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
                <img
                  className='w-full h-full'
                  src={item.coverImg || cover}
                  alt=''
                />
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
      <div className=' pb-4'>
        <Pagination
          defaultCurrent={pagination.current}
          defaultPageSize={30}
          foldedMaxPageBtn={5}
          maxPageBtn={10}
          pageEllipsisMode='mid'
          pageSizeOptions={[5, 10, 20, 50]}
          showFirstAndLastPageBtn={false}
          showJumper={false}
          showPageNumber
          showPageSize={false}
          showPreviousAndNextBtn
          size='medium'
          theme='default'
          total={pagination.total}
          totalContent
          onCurrentChange={onCurrentChange}
        />
      </div>
    </div>
  );
};

export default StudyHome;
