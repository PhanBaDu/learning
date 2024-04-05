import { useState, useRef, useEffect } from 'react';
import { CiImageOn } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdClose } from 'react-icons/io';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { postsStart, postsSuccess, postsFailure } from '../redux/post/postSlice';

export default function CreatePost() {
    const dispatch = useDispatch();
    const filePickerRef = useRef();
    const { currentUser } = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [formData, setFormData] = useState({});
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };

    const handleCloseModal = () => {
        setOpen(!open);
        setImageFileUrl(null);
        setImageFileUploadError(null);
        setUpdateUserError(null);
    };

    const uploadImage = async () => {
        setUpdateUserError(null);
        setUpdateUserSuccess(null);
        setImageFileUploading(true);
        setImageFileUploadError(null);

        setUpdateUserError('Vui lòng đợi tải ảnh => ');
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                setImageFileUploadProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError('Could not upload image (File must be less than 2MB)');
                setImageFileUploadProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
                setImageFileUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setFormData({ ...formData, image: downloadURL });
                    setImageFileUploading(false);
                    setUpdateUserSuccess('Tải ảnh thành công!');
                    setUpdateUserError(null);
                });
            },
        );
    };
    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
        // eslint-disable-next-line
    }, [imageFile]);

    const handleChange = async (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (imageFileUploading) {
            setUpdateUserError('Vui lòng đợi giây lát để upload ảnh!');
            return;
        }
        try {
            dispatch(postsStart());
            const res = await fetch('/api/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (!res.ok) {
                dispatch(postsFailure(data.message));
                setUpdateUserError(data.message);
            } else {
                dispatch(postsSuccess(data));
                setUpdateUserSuccess("User's profile updated successfully");
                handleCloseModal();
            }
        } catch (error) {
            dispatch(postsFailure(error.message));
        }
    };

    return (
        <>
            <div
                onClick={() => setOpen(!open)}
                className="w-full bg-white flex items-center px-6 py-6 flex-col shadow-2xl rounded-xl"
            >
                <div className="cursor-pointer w-full flex items-center justify-evenly">
                    <span className="text-[#FF3F80]">Ấn vào để đăng một bài viết...</span>
                    <CiImageOn className="font-semibold text-2xl mb-1 text-[#FF3F80]" />
                </div>
            </div>
            {open && (
                <div
                    onClick={handleCloseModal}
                    className="
                        fixed 
                        top-0 
                        bottom-0 
                        left-0 
                        right-0 
                        bg-hint 
                        flex
                        justify-center
                        items-center
                        z-10
                    "
                >
                    <form
                        onSubmit={handleSubmit}
                        onClick={(e) => e.stopPropagation()}
                        className="w-4/12 bg-white p-5 rounded-md"
                    >
                        <div className="flex relative gap-3">
                            <img
                                className="w-10 h-10 rounded-full object-cover object-center"
                                src={currentUser.profilePicture}
                                alt={currentUser.username}
                            />
                            <div className="text-[#3E50B4]">{currentUser.username}</div>
                            <IoMdClose
                                onClick={handleCloseModal}
                                className="cursor-pointer absolute right-0 top-0 text-2xl"
                            />
                        </div>
                        <textarea
                            id="content"
                            onChange={handleChange}
                            className="w-full mt-3 outline-none rounded-md border p-2 placeholder-hint"
                            rows="5"
                            placeholder="Nhập nội dung của bạn vào đây..."
                        ></textarea>
                        {updateUserError && !imageFileUploadError && (
                            <h1 className="w-full text-center text-red-500 top-1/2 left-1/2">
                                {updateUserError} {imageFileUploadProgress} %
                            </h1>
                        )}

                        {imageFileUploadError && (
                            <h1 className="w-full text-center text-red-500 top-1/2 left-1/2">{imageFileUploadError}</h1>
                        )}

                        {imageFileUrl && updateUserSuccess && (
                            <img
                                className="mt-3 h-96 w-full h-3/512 object-cover object-center rounded-md"
                                src={imageFileUrl}
                                alt={imageFile.name}
                            />
                        )}
                        {!imageFileUrl && (
                            <label htmlFor="image">
                                <CiImageOn
                                    onClick={() => filePickerRef.current}
                                    className="cursor-pointer w-full mt-3 text-center text-4xl text-green-500"
                                />
                            </label>
                        )}

                        <input ref={filePickerRef} onChange={handleImageChange} id="image" type="file" hidden />
                        <button
                            type="submit"
                            className="w-full hover:bg-[#FF3F80] ease-in duration-300 active:scale-110 mt-3 text-center bg-[#3E50B4] py-2 rounded-md text-white"
                        >
                            Đăng
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
