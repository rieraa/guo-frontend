import { useEffect, useState } from 'react';
import cover from '../../assets/coverIMG.jpg';
import Pagination_Ti from '../../components/Pagination';
import { http } from '../../utils/http';
const StudyHome = () => {
  const [courese, setCourse] = useState([]);
  useEffect(() => {
    const getList = async () => {
      const res = await http.post(
        'http://127.0.0.1:4523/m1/2033778-0-default/api/student/courseInfo/search',
        {}
      );
      const { results } = res.data;
      setCourse(results);
    };
    getList();
  }, []);

  return (
    <div className=' mx-auto px-12 bg-slate-100 '>
      {/* list start*/}
      <div className=' flex flex-wrap pt-6 justify-start '>
        {/* card start*/}
        {courese.map((item) => {
          return (
            <div
              className=' mx-3 mb-6 h-64 w-64 overflow-hidden bg-white hover:shadow-lg hover:cursor-pointer rounded-lg'
              key={item.courseId}>
              <div className=' w-full h-44'>
                <img className='w-full h-full' src={cover} alt='' />
              </div>
              <div className='p-3 space-y-2'>
                <div className='font-bold text-xl text-slate-600'>
                  {item.courseName}
                </div>
                <p className='font-light text-slate-500'>
                  章节数  {item.chapterQuantity}
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
