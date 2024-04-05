import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';

export default function Header() {
    const location = useLocation();
    const [tab, setTab] = useState('');

    useEffect(() => {
        setTab(location.pathname);
    }, [location.pathname]);

    return (
        <div className="flex justify-between items-center bg-white py-5 px-5 rounded-xl">
            <ul className="flex gap-14 flex-auto gap-90 text-lg font-semibold">
                <Link
                    to="/"
                    className={`${
                        tab === '/' && 'border-b-2 text-[#FF3F80] ease-linear  border-[#FF3F80] text-primary'
                    } flex items-center px-4 h-10`}
                >
                    <li>Trang Chủ</li>
                </Link>
            </ul>
            <div className="text-xl flex">
                <div className="flex-1 flex rounded-lg overflow-hidden border border-[#FF3F80]">
                    <input
                        className="bg-white outline-none w-64 text-sm rounded-bl-lg h-full px-2 py-3"
                        type="text"
                        placeholder="Tìm bạn bè ?"
                    />
                    <button className="hover:bg-gray-100 bg-white rounded-tr-lg rounded-br-lg px-4">
                        <CiSearch className="font-semibold  text-[#FF3F80]" />
                    </button>
                </div>
            </div>
        </div>
    );
}
