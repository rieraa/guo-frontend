import ava from '../../assets/defaultAva.jpg';
import {
  ChatBubbleBottomCenterIcon,
  ArrowUpOnSquareIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store';
const LearnVideo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { CommentStore, UserStore } = useStore();
  const [replyText, setReplyText] = useState('');
  const [replyItemText, setReplyItemText] = useState('');

  const msg = new URLSearchParams(location.search);
  const chapterId = msg.get('chId');
  const courseId = msg.get('coId');
  // 获取回复评论人的姓名，用于评论列表
  const getReName = (rootId, preId) => {
    const res = CommentStore.findReplyItemById(rootId, preId);
    return res.username;
  };
  // 当点击不同人的回复按钮时，对应回复的提示也会改变
  const getPlaceHolder = (item) => {
    const name =
      CommentStore.getCurrentReply(item.commentId) === item.commentId
        ? item.username
        : CommentStore.findItemById(
            item.commentId,
            CommentStore.getCurrentReply(item.commentId)
          ).commentContent;
    // 通过此方法获取到当前的评论对象
    if (CommentStore.getCurrentReply(item.commentId) !== item.commentId) {
      console.log(
        CommentStore.findItemById(
          item.commentId,
          CommentStore.getCurrentReply(item.commentId)
        )
      );
    }
    return '回复' + name + ':';
  };
  // 发布评论
  const replyMain = async () => {
    const res = await CommentStore.publishCom(
      chapterId,
      UserStore.userinfo.userId,
      replyText,
      UserStore.userinfo.username
    );
  };

  useEffect(() => {
    const getInfo = async () => {
      // 验证是否登录
      const res = await UserStore.getUserinfo();
      if (res.code === 0) {
        // 获取评论和视频资源
        await CommentStore.getAllCom(chapterId, UserStore.userinfo.userId);
        await CommentStore.getResource(courseId, chapterId);
        console.log(location.state.chapterName);
      } else {
        navigate('/login');
      }
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
            <div className='flex justify-between' style={{ width: 800 }}>
              <span>{location.state.chapterName}</span>
              <a
                className=' text-sky-600 '
                href={CommentStore.resource.pdf}
                download={CommentStore.resource.pdf}>
                下载课程PDF资源
              </a>
            </div>
          </div>
          {/* title end*/}

          {/* video start */}
          <div className=' flex justify-center'>
            <video
              controls
              width='800'
              src={CommentStore.resource.video}></video>
          </div>
          {/* video end */}

          {/* comment start */}
          <div className=' pt-6'>
            {/* publish */}
            <div className='flex justify-center mb-4'>
              <div className=' h-12 w-12 rounded-full'>
                <img
                  className='rounded-full'
                  src={UserStore.userinfo.avatar || ava}
                  alt=''
                />
              </div>
              <div style={{ width: '650px' }} className='mx-4'>
                <textarea
                  type='text'
                  className='h-12 bg-slate-100 rounded-md font-sans text-slate-800 py-3 px-3
                    focus:outline-none text-sm placeholder:text-slate-400 appearance-none w-full'
                  placeholder='发一条友善的评论~'
                  value={replyText}
                  onInput={(e) => {
                    setReplyText(e.target.value);
                  }}
                />
              </div>

              <div className='flex items-center justify-center text-white bg-sky-300 shadow-sm hover:bg-sky-400  transition-colors'>
                <button className=' w-16 h-12 ' onClick={replyMain}>
                  发布
                </button>
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
                        className='rounded-full w-full'
                        src={item.avatar || ava}
                        alt=''
                      />
                      <span className=' text-xs lg:text-base text-slate-700'>
                        {item.username}
                      </span>
                    </div>
                    {/* 头像 */}
                    {/* 评论内容 */}
                    <div className=' py-4' style={{ width: '650px' }}>
                      <p className=' px-2  lg:px-4 mt-6 text-slate-700'>
                        {item.commentContent}
                      </p>
                      <div className='flex justify-between px-2 lg:px-4 items-center'>
                        <p className=' text-slate-400 text-xs'>
                          {item.commentTime}
                        </p>
                        <button
                          onClick={async () => {
                            let node = document.getElementById(item.commentId);
                            let svg = document.getElementById(item.commentTime);
                            // 首先是回复列表状态的切换
                            if (node.className === 'hidden') {
                              node.className = 'mx-auto flex';
                              svg.className =
                                'w-6 h-6 transition-colors text-sky-300';
                              // 再点评论时使得回复对象重置为根评论
                              if (
                                CommentStore.findReplyById(item.commentId) !==
                                undefined
                              ) {
                                CommentStore.setCommentReplyId(
                                  item.commentId,
                                  item.commentId
                                );
                              }
                            } else {
                              node.className = 'hidden';
                              svg.className =
                                'w-6 h-6 transition-colors hover:text-sky-300 text-slate-400';
                            }

                            // 首次点击评论进行获取
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
                        placeholder={getPlaceHolder(item)}
                        value={replyItemText}
                        onInput={(e) => {
                          setReplyItemText(e.target.value);
                        }}
                      />
                      <div className='flex justify-between text-slate-400 mb-5'>
                        <p>
                          {CommentStore.findReplyById(item.commentId) !==
                          undefined
                            ? CommentStore.findReplyById(item.commentId).length
                            : 0}
                          条评论
                        </p>
                        <button
                          className='hover:text-sky-300 hover:shadow-sm  transition-colors'
                          onClick={async () => {
                            const res = await CommentStore.replyComment(
                              replyItemText,
                              UserStore.userinfo.userId,
                              UserStore.userinfo.username,
                              chapterId,
                              item.commentId
                            );
                          }}>
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
                                        src={item.avatar || ava}
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
                                <button
                                  className='flex'
                                  onClick={() => {
                                    CommentStore.setCommentReplyId(
                                      item.rootId,
                                      item.commentId
                                    );
                                  }}>
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
