import React from 'react';
import Header from '../components/Header';
import User from '../components/User';
import CreatePost from '../components/CreatePost';
import PopularPosts from '../components/PopularPosts';
import Posts from '../components/Posts';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsSuccess } from '../redux/post/postSlice';
import Users from './Users';
import Loading from '../components/Loading';

export default function Home() {
    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.posts);
    const { listPost } = useSelector((state) => state.posts);
    const { comment } = useSelector((state) => state.comment);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/post/see');
                const data = await res.json();
                if (res.ok) {
                    dispatch(getPostsSuccess(data));
                }
            } catch (error) {}
        };
        fetchPosts();
    }, [posts, comment, dispatch]);

    return (
        <div className="w-full h-full dark:bg-slate-950 py-10 bg-slate-200 py-3xl pb-96">
            <div
                className="
                container 
                m-auto 
                xl:max-w-7xl 
                md:max-w-4xl 
                sm:max-w-xl
                max-w-sm
            "
            >
                <Header />
                <div className="flex gap-5 mt-5">
                    <div className="w-7/12">
                        <User />
                        {listPost && listPost?.map((post, index) => <Posts post={post} key={index} />)}
                    </div>
                    <div className="w-5/12 flex flex-col gap-5">
                        <CreatePost />
                        <Users />
                    </div>
                </div>
            </div>
        </div>
    );
}
