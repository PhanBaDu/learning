import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';

export default function Users() {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            const res = await fetch('/api/user/users');
            const data = await res.json();

            if (res.ok) {
                setLoading(false);
                setUsers(data);
            }
        };
        fetchUsers();
    }, []);
    return (
        <div className="w-full bg-slate-200 ">
            <div>
                <div className="w-full rounded-xl gap-5 p-5 bg-white justify-center flex flex-wrap">
                    {loading && <Loading />}
                    <div className="w-full grid grid-cols-2 gap-x-2 gap-2 justify-items-center align-items-center">
                        {users &&
                            users.map((user) => (
                                <div key={user._id} className="w-full overflow-hidden shadow-sm shadow-hint rounded-md">
                                    <img
                                        className="w-full h-56 object-cover object-center"
                                        src={user.profilePicture}
                                        alt={user.username}
                                    />
                                    <div className="flex py-4 px-10 justify-center flex-col gap-4">
                                        <h3 className="text-md text-[#3E50B4]">{user.username}</h3>
                                        <Link
                                            className="text-xs text-center rounded-md hover:scale-105 ease-in duration-200 py-2 bg-[#3E50B4] text-white"
                                            to={`profile/${user._id}`}
                                        >
                                            Xem Thông Tin
                                        </Link>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
