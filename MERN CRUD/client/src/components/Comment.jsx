import React, { useEffect, useState } from 'react';

export default function Comment({ comment }) {
    const [users, setUsers] = useState([]);
    console.log(comment.userId);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                if (res.ok) {
                    setUsers(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchPosts();
    }, [id]);
    return (
        <div className="p-3 flex gap-2">
            <img
                className="w-12 h-12 rounded-full"
                src="https://firebasestorage.googleapis.com/v0/b/meta-99997.appspot.com/o/17112487070570106_hinh-nen-4k-may-tinh32.jpg?alt=media&token=48409e32-f6a1-4d33-b161-27e1acaa933c"
                alt=""
            />
            <div className="w-full rounded-lg p-2 bg-gray-200">
                <h1>Phan Ba Nhat</h1>
                <span className="text-hint text-sm">{comment.content}</span>
            </div>
        </div>
    );
}
