import { useState } from "react";
import { useNavigate } from "react-router-dom";
import learnerService from "../api/learnerService";
import { uploadFile } from "../api/uploadFile";
import { FullScreenLoader } from "./FullScreenLoader"
import authService from "../api/authService"
function MyProfile() {
    const learnerData = localStorage.getItem("learner");
    const learner = JSON.parse(learnerData);
    const [showModal, setShowModal] = useState(false);
    const [imagePreview, setImagePreview] = useState(learner.urlImage);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [modalPassword, setModalPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');


    const [form, setForm] = useState({
        name: "",
    });
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login')
    };

    const handleEdit = () => {
        setForm({ ...learner });
        setShowModal(true);
    };

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            let urlUpload = "";
            if (form.urlImage instanceof File) {
                const result = await uploadFile(form.urlImage);
                urlUpload = result.url;
            }
            const updateLeaner = {
                name: form.name,
                urlImage: urlUpload
            }
            const res = await learnerService.update(learner.id, updateLeaner);
            localStorage.setItem("learner", JSON.stringify(res.data));
            setShowModal(false);
        } catch (error) {
            alert(error.response.data.error)
        } finally {
            setIsLoading(false); // Tắt hiệu ứng loading
        }
    };
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            let file = e.target.files[0];
            const url = URL.createObjectURL(e.target.files[0]);
            setForm({ ...form, urlImage: file })
            setImagePreview(url);
            return () => URL.revokeObjectURL(url);
        }
    };


    const handleChangePassword = async (e) => {
        e.preventDefault();
        let data = {
            id: learner.accountId,
            passWord: newPassword
        }
        setIsLoading(true)
        try {
            const res = await authService.change(data);
            if (res.code === 200) {
                alert(res.message)
            }
        } catch (error) {
            alert(error.response.data.error)
        }
        setIsLoading(false)
        setModalPassword(false);
        setNewPassword('');
    };

    return (
        <>
            {
                isLoading
                    ? (
                        <FullScreenLoader />
                    ) : <div className="w-full max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center gap-8">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                            <img
                                src={learner.urlImage || "https://via.placeholder.com/120"}
                                alt={learner.name}
                                className="w-28 h-28 rounded-full object-cover ring-4 ring-pink-500"
                            />
                        </div>

                        {/* Info */}
                        <div className="flex-1 w-full">
                            <h2 className="text-3xl font-bold text-gray-800 mb-3">{learner.name}</h2>
                            <div className="text-gray-700 text-base space-y-1">
                                <p><span className="font-semibold">Email:</span> {learner.accountEmail}</p>
                                <p><span className="font-semibold">Danh Hiệu:</span> {learner.rankName}</p>
                                <p><span className="font-semibold">Tổng Điểm:</span> {learner.totalScore}</p>
                            </div>

                            {/* Buttons */}
                            <div className="mt-4 flex gap-4">
                                <button
                                    onClick={handleEdit}
                                    className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg"
                                >
                                    ✏️ Sửa
                                </button>
                                <button
                                    onClick={() => setModalPassword(true)}
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg"
                                >
                                    Đổi mật khẩu
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
                                >
                                    🔓 Đăng xuất
                                </button>
                            </div>
                        </div>

                        {showModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                                <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
                                    <h3 className="text-xl font-bold mb-4 text-center text-pink-600">
                                        Cập nhật thông tin
                                    </h3>

                                    {/* Preview ảnh */}
                                    <div className="flex flex-col items-center mb-4">
                                        <img
                                            src={
                                                imagePreview ||
                                                form.urlImage ||
                                                "https://via.placeholder.com/100"
                                            }
                                            alt="Avatar"
                                            className="w-28 h-28 rounded-full object-cover border-4 border-pink-400 shadow-md"
                                        />
                                        <label className="mt-2 text-sm text-gray-600 font-medium">
                                            Cập nhật ảnh:
                                            <input
                                                type="file"
                                                accept="image/*"
                                                name="urlImage"
                                                onChange={handleImageChange}
                                                className="block mt-1 text-sm text-gray-600 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-100 file:text-pink-700 hover:file:bg-pink-200"
                                            />
                                        </label>
                                    </div>

                                    {/* Form inputs */}
                                    <div className="space-y-3">
                                        <label htmlFor="">Tên của bạn</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Tên"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-pink-500"
                                        />
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex justify-end gap-3 mt-5">
                                        <button
                                            onClick={() => setShowModal(false)}
                                            className="px-4 py-2 border rounded hover:bg-gray-100"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
                                        >
                                            Lưu
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {modalPassword && (
                            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                                <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
                                    <h3 className="text-xl font-bold mb-4 text-center text-pink-600">
                                        Đổi mật khẩu
                                    </h3>

                                    <div className="space-y-3">
                                        <label htmlFor="newPassword" className="block font-medium">Mật khẩu mới</label>
                                        <input
                                            type="text"
                                            id="newPassword"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Nhập mật khẩu mới"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-pink-500"
                                        />
                                    </div>

                                    <div className="flex justify-end gap-3 mt-5">
                                        <button
                                            onClick={() => setModalPassword(false)}
                                            className="px-4 py-2 border rounded hover:bg-gray-100"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            onClick={handleChangePassword}
                                            className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
                                        >
                                            Lưu
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>}
        </>
    );
}

export default MyProfile;