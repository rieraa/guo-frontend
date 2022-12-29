import ava from '../../assets/ava.jpg';
import { http } from '../../utils/http';
import {
  ChatBubbleBottomCenterIcon,
  ArrowUpOnSquareIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store';
const LearnVideo = () => {
  const { CommentStore } = useStore();
  const getReName = (rootId, preId) => {
    const res = CommentStore.findReplyItemById(rootId, preId);
    return res.username;
  };
  useEffect(() => {
    const getInfo = async () => {
      await CommentStore.getAllCom('1', '1');
    };
    getInfo();
  }, []);

  return (
    <div className='xl:px-56 sm:px-12 bg-slate-100 '>
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
            <div className='flex justify-center mb-4'>
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

              <div className='flex items-center justify-center text-white bg-sky-300 shadow-sm hover:bg-sky-400  transition-colors'>
                <button className=' w-16 h-12 '>发布</button>
              </div>
            </div>
            {/* publish */}
            {/* list */}
            {CommentStore.commentList.map((item) => {
              return (
                <div key={item.commentId}>
                  <div className='flex justify-center items-center '>
                    {/* 头像 */}
                    <div className=' h-12 w-12 rounded-full text-center'>
                      <img
                        className='rounded-full w-full h-full'
                        src={ava}
                        alt=''
                      />
                      <span className=' text-slate-700'>{item.username}</span>
                    </div>
                    {/* 头像 */}
                    {/* 评论内容 */}
                    <div className=' py-4' style={{ width: '700px' }}>
                      <p className=' px-4 mt-6 text-slate-700'>
                        {item.commentContent}
                      </p>
                      <div className='flex justify-between px-4 items-center'>
                        <p className=' text-slate-400 text-xs'>
                          {item.commentTime}
                        </p>
                        <button
                          onClick={async () => {
                            let node = document.getElementById(item.commentId);
                            let svg = document.getElementById(item.commentTime);
                            if (node.className === 'hidden') {
                              node.className = 'mx-auto flex';
                              svg.className =
                                'w-6 h-6 transition-colors text-sky-300';
                            } else {
                              node.className = 'hidden';
                              svg.className =
                                'w-6 h-6 transition-colors hover:text-sky-300 text-slate-400';
                            }

                            if (
                              CommentStore.findReplyById(item.commentId) ===
                              undefined
                            ) {
                              await CommentStore.getReById(item.commentId);
                              console.log(
                                CommentStore.findReplyById(item.commentId)
                              );
                            }
                          }}>
                          <div
                            id={item.commentTime}
                            className='w-6 h-6 transition-colors hover:text-sky-300 text-slate-400'>
                            <ChatBubbleBottomCenterIcon />
                          </div>
                        </button>
                      </div>
                    </div>
                    {/* 评论内容 */}
                  </div>
                  {/* 回复列表 */}
                  <div id={item.commentId} className='hidden'>
                    <div style={{ width: '700px' }} className='mx-auto'>
                      <textarea
                        type='text'
                        className='h-20 bg-slate-100 rounded-md font-sans text-slate-800 py-3 px-3
                      focus:outline-none text-sm placeholder:text-slate-400 appearance-none w-full'
                        placeholder='请输入回复的内容~'
                        // value={''}
                        // onInput={() => {}}
                      />
                      <div className='flex justify-between text-slate-400 mb-5'>
                        <p>
                          {CommentStore.findReplyById(item.commentId) !==
                          undefined
                            ? CommentStore.findReplyById(item.commentId).length
                            : 0}
                          条评论
                        </p>
                        <button className='hover:text-sky-300 hover:shadow-sm  transition-colors'>
                          发布评论
                        </button>
                      </div>
                      {/* 列表 */}
                      {CommentStore.findReplyById(item.commentId) !==
                        undefined &&
                        CommentStore.findReplyById(item.commentId).map(
                          (item) => {
                            return (
                              <div key={item.commentTime} className=' mb-6'>
                                <div className=' flex items-center justify-between'>
                                  <div className='flex'>
                                    <div className=' h-8 w-8 rounded-full'>
                                      <img
                                        className='rounded-full w-full h-full'
                                        src={ava}
                                        alt=''
                                      />
                                    </div>
                                    <p className=' text-slate-700 ml-1 leading-8 text-sm font-medium'>
                                      {item.username}
                                    </p>
                                  </div>
                                  <p className=' text-slate-400 text-xs'>
                                    {item.commentTime}
                                  </p>
                                </div>

                                {item.rootId === item.preId && (
                                  <p className=' text-slate-700 text-sm py-4'>
                                    {item.commentContent}
                                  </p>
                                )}

                                {item.rootId !== item.preId && (
                                  <>
                                    <p className=' text-slate-400 text-sm pt-4'>
                                      回复
                                      {getReName(item.rootId, item.preId) +
                                        ' “'}
                                      {CommentStore.findReplyItemById(
                                        item.rootId,
                                        item.preId
                                      ).commentContent + '” ：'}
                                    </p>
                                    <p className=' text-slate-700 text-sm pb-4'>
                                      {item.commentContent}
                                    </p>
                                  </>
                                )}
                                <button className='flex'>
                                  <ArrowUpOnSquareIcon className='w-4 h-4 text-indigo-300'></ArrowUpOnSquareIcon>
                                  <p className=' text-indigo-300 text-sm ml-1'>
                                    回复
                                  </p>
                                </button>
                              </div>
                            );
                          }
                        )}

                      {/* 列表 */}
                    </div>
                  </div>
                  {/* 回复列表 */}
                </div>
              );
            })}

            {/* list */}
          </div>
          {/* comment end */}
        </div>
        {/* content */}
      </div>
    </div>
  );
};

export default observer(LearnVideo);
