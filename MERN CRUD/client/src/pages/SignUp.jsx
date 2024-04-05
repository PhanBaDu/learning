import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password) {
            return setErrorMessage('Vui lòng nhập đầy đủ thông tin!');
        }
        try {
            setLoading(true);
            setErrorMessage(null);
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success === false) {
                setLoading(false);
                return setErrorMessage(data.message);
            }
            setLoading(false);
            if (res.ok) {
                navigate('/sign-in');
            }
        } catch (error) {
            setErrorMessage(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex items-center justify-center h-dvh bg-gradient-to-r from-blue to-rose p-5">
            <form
                onSubmit={handleSubmit}
                className="w-96 bg-white flex items-center justify-center flex-col gap-5 p-12 shadow-2xl rounded-xl"
            >
                <h1 className="text-xl mb-5 text-green-700 border-b-2 border-green-700">ĐĂNG KÝ</h1>
                <input
                    onChange={handleChange}
                    className="focus:border-teal-300 ease-out duration-500 w-full px-4 py-2 text-md outline-none rounded-md border-solid border"
                    placeholder="Nhập username"
                    type="text"
                    id="username"
                />
                <input
                    onChange={handleChange}
                    className="focus:border-teal-300 ease-out duration-500 w-full px-4 py-2 text-md outline-none rounded-md border"
                    placeholder="Nhập email"
                    type="email"
                    id="email"
                />
                <input
                    onChange={handleChange}
                    className="focus:border-teal-300 ease-out duration-500 w-full px-4 py-2 text-md outline-none rounded-md border"
                    placeholder="Nhập password"
                    type="password"
                    id="password"
                />
                <button
                    type="submit"
                    className="w-full hover:bg-[#3E50B4] ease-out duration-200 hover:text-white text-center px-4 py-2 font-semibold text-md rounded-md border"
                >
                    {loading ? 'Loading...' : 'Đăng ký'}
                </button>
                <div className="mt-3 text-sm">
                    <span>Bạn đã có tài khoản ?</span>
                    <Link to="/sign-in" className="hover:underline text-sky-400 ml-2">
                        Đăng nhập
                    </Link>
                </div>
                {errorMessage && <h1 className="text-md text-red-700">{errorMessage}</h1>}
            </form>
        </div>
    );
}
