import React from 'react';

export default function Loading() {
    return (
        <div className="w-full grid grid-cols-2 gap-x-2 gap-5 justify-items-center align-items-center">
            <div className="animate-pulse w-full overflow-hidden shadow-sm shadow-hint rounded-md">
                <div className="w-full h-56 bg-gray-400 rounded"></div>
                <div className="py-4 mt-2 m-auto bg-gray-400 rounded"></div>
                <div className="flex py-4 px-10 text-sm justify-center flex-col gap-4">
                    <button className="h-10 bg-gray-400 rounded"></button>
                </div>
            </div>
            <div className="animate-pulse w-full overflow-hidden shadow-sm shadow-hint rounded-md">
                <div className="w-full h-56 bg-gray-400 rounded"></div>
                <div className="py-4 mt-2 m-auto bg-gray-400 rounded"></div>
                <div className="flex py-4 px-10 text-sm justify-center flex-col gap-4">
                    <button className="h-10 bg-gray-400 rounded"></button>
                </div>
            </div>
            <div className="animate-pulse w-full overflow-hidden shadow-sm shadow-hint rounded-md">
                <div className="w-full h-56 bg-gray-400 rounded"></div>
                <div className="py-4 mt-2 m-auto bg-gray-400 rounded"></div>
                <div className="flex py-4 px-10 text-sm justify-center flex-col gap-4">
                    <button className="h-10 bg-gray-400 rounded"></button>
                </div>
            </div>
            <div className="animate-pulse w-full overflow-hidden shadow-sm shadow-hint rounded-md">
                <div className="w-full h-56 bg-gray-400 rounded"></div>
                <div className="py-4 mt-2 m-auto bg-gray-400 rounded"></div>
                <div className="flex py-4 px-10 text-sm justify-center flex-col gap-4">
                    <button className="h-10 bg-gray-400 rounded"></button>
                </div>
            </div>
        </div>
    );
}
