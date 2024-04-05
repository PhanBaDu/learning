
export default function PopularPosts() {
    return (
        <div className="w-full bg-white flex items-center flex-col p-6 shadow-2xl rounded-xl">
            <h1 className="font-semibold text-lg">POPULAR POST</h1>
            <div className="w-full mt-6 flex border-b pb-2 border-[#3E50B4]">
                <img
                    className="w-20 h-20 rounded-md object-cover object-center"
                    src="https://images.hdqwalls.com/wallpapers/bthumb/satoru-gojo-28.jpg"
                    alt="postImg"
                />
                <div className="ml-4 flex flex-col gap-5 justify-between">
                    <div>
                        <h3 className="font-semibold text-md text-[#3E50B4] leading-none">Phan Bá Nhất</h3>
                        <h4 className="text-sm mt-1 text-secondary">Nội dung đăng về 1 điều gì đó oke ?</h4>
                    </div>
                    <div className='text-xs flex text-hint'>
                        <span className="flex items-center gap-2">
                            10 Like
                        </span >
                        <span className="ml-3 flex items-center gap-2">
                            10 Comment
                        </span>
                        <span className="ml-6 flex items-center gap-2">
                            Đã đăng 1 giờ trước
                        </span>
                    </div>
                </div>
            </div>
            <div className="w-full mt-6 flex border-b pb-2 border-[#3E50B4]">
                <img
                    className="w-20 h-20 rounded-md object-cover object-center"
                    src="https://images.hdqwalls.com/wallpapers/bthumb/satoru-gojo-28.jpg"
                    alt="postImg"
                />
                <div className="ml-4 flex flex-col gap-5 justify-between">
                    <div>
                        <h3 className="font-semibold text-md text-[#3E50B4] leading-none">Phan Bá Nhất</h3>
                        <h4 className="text-sm mt-1 text-secondary">Nội dung đăng về 1 điều gì đó oke ?</h4>
                    </div>
                    <div className='text-xs flex text-hint'>
                        <span className="flex items-center gap-2">
                            10 Like
                        </span >
                        <span className="ml-3 flex items-center gap-2">
                            10 Comment
                        </span>
                        <span className="ml-6 flex items-center gap-2">
                            Đã đăng 1 giờ trước
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
