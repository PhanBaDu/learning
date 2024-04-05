import moment from 'moment';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Comments from './Comments';
import { AiOutlineLike } from 'react-icons/ai';
import { LiaCommentSolid } from 'react-icons/lia';
import { PiShareFatLight } from 'react-icons/pi';

export default function Posts({ post }) {
    const [comment, setComment] = useState(false);
    const [idPost, setIdPost] = useState(null);
    const handleModal = () => {
        setComment(!comment);
        setIdPost(post._id);
    };

    return (
        <div className="w-full mt-5 bg-white flex items-center flex-col shadow-2xl rounded-lg overflow-hidden">
            {post.image && <img className="w-full h-96 object-cover object-center" src={post.image} alt="post" />}
            <div className="w-full px-5 pb-2 pt-5 border-b border-r border-l border-[#FF3F80] rounded-b-lg">
                <div>
                    <div className="flex gap-3">
                        <Link to={`/profile/${post.userId}`}>
                            <img
                                className="cursor-pointer w-10 h-10 rounded-full object-cover object-center"
                                src={post.profilePicture}
                                alt="user"
                            />
                        </Link>
                        <div className="flex flex-col justify-between">
                            <Link to={`/profile/${post.userId}`}>
                                <h1 className="hover:underline leading-none text-md text-[#3E50B4]">{post.username}</h1>
                            </Link>
                            <span className="flex items-center gap-2 text-hint text-xs">
                                {`${moment(post.createdAt).fromNow()}`}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="mt-2 mb-3 text-center w-full">
                    <span className="font-normal text-secondary text-sm">{post.content}</span>
                </div>
                {/* <div className="text-sm text-gray-500 flex justify-between gap-3 mb-2">
                    <div>{post.numberOfLikes} like</div>
                    <div>{post.comments.length} bình luận</div>
                </div> */}
                {/* <ul className="text-xl w-full flex justify-between border-t border-[#3E50B4] pt-2">
                    <li className="flex-1 py-1 rounded-md flex justify-center items-center">
                        <AiOutlineLike className="hover:cursor-pointer hover:scale-110 ease-linear duration-200 hover:text-regal-blue" />
                    </li>
                    <li onClick={handleModal} className="flex-1 py-1 rounded-md flex justify-center items-center">
                        <LiaCommentSolid className="hover:cursor-pointer hover:scale-110 ease-linear duration-200 hover:text-regal-blue" />
                    </li>
                    <li className="flex-1 py-1 rounded-md flex justify-center items-center">
                        <PiShareFatLight className="hover:cursor-pointer hover:scale-110 ease-linear duration-200 hover:text-regal-blue" />
                    </li>
                </ul> */}
            </div>
            {/* {comment && <Comments setComment={setComment} postCmt={post} idPost={idPost} />} */}
        </div>
    );
}
