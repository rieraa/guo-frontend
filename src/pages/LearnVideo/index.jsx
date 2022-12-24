import ava from '../../assets/ava.jpg';

const LearnVideo = () => {
  return (
    <div className=' px-12 bg-slate-100'>
      <div className=' px-4 py-6'>
        {/* content */}
        <div className=' px-10 py-6 bg-white shadow-lg rounded-md mx-auto'>
          {/* title start*/}
          <div className='pb-2 flex justify-center'>
            <div style={{ width: 800 }}>
              <span>名字</span>
            </div>
          </div>
          {/* title end*/}

          {/* video start */}
          <div className=' flex justify-center'>
            <video controls width='800'>
              <source src='/media/cc0-videos/flower.mp4' type='video/mp4' />
            </video>
          </div>
          {/* video end */}

          {/* comment start */}
          <div className=' pt-6'>
            {/* publish */}
            <div className='flex justify-center mb-8'>
              <div className=' h-12 w-12 rounded-full'>
                <img className='rounded-full' src={ava} alt='' />
              </div>
              <div style={{ width: '650px' }} className='mx-4'>
                <textarea
                  type='text'
                  className='h-12 bg-slate-100 rounded-md font-sans text-slate-800 py-3 px-3
                    focus:outline-none text-sm placeholder:text-slate-400 appearance-none w-full'
                  placeholder='发一条友善的评论~'
                  // value={''}
                  // onInput={() => {}}
                />
              </div>

              <div className='flex items-center justify-center bg-sky-300 shadow-sm'>
                <button className=' w-16 h-12 text-white'>发布</button>
              </div>
            </div>
            {/* publish */}
            {/* list */}
            <div className='flex justify-center items-center px-1 py-4'>
              <div className=' h-12 w-12 rounded-full text-center'>
                <img className='rounded-full w-full h-full' src={ava} alt='' />
                <span className=' text-slate-700'>hcx</span>
              </div>
              <div className=' py-10 border-y-2' style={{ width: '650px' }}>
                <p className=' px-4 text-slate-500'>asfasfliygmfv</p>
              </div>
            </div>
            {/* list */}
          </div>
          {/* comment end */}
        </div>
        {/* content */}
      </div>
    </div>
  );
};

export default LearnVideo;
