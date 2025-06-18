import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../api/authService";
import learnerService from "../../api/learnerService";
import mailService from "../../api/mailService";

function LoginPage() {
    const [user, setUser] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');

    const navigate = useNavigate();

    const handlerInput = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handlerSubmitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await authService.login(user);
            if (response.code === 200) {
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                localStorage.setItem('accountEmail', response.data.accountEmail);
            }

            const learner = await learnerService.findByIdAccount(response.data.accountId);
            localStorage.setItem("learner", JSON.stringify(learner.data));
            navigate('/');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.';
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleSendForgot = async (e) => {
        e.preventDefault();
        try {
            let mail = {
                email: forgotEmail
            }
            const response = await mailService.forgot(mail);
            console.log("kết quả send mail : ", response);
            if (response.code === 200) {
                alert(response.data)
            }
        } catch (error) {
            alert(error.response.data.error)
        }
        setForgotEmail("");
        setShowForgotModal(false);
    };

    return (
        <div className="w-screen h-screen bg-sky-300 flex flex-row justify-center items-center relative">
            <form onSubmit={handlerSubmitForm} className="w-96 m-auto bg-white py-8 px-6 rounded-2xl shadow-lg">
                <div className="w-full flex flex-row justify-center mb-6">
                    <h3 className="font-bold text-2xl text-gray-800 uppercase">Đăng Nhập</h3>
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handlerInput}
                        type="text"
                        placeholder="Nhập email..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                        disabled={loading}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Mật khẩu
                    </label>
                    <input
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handlerInput}
                        type="password"
                        placeholder="Nhập mật khẩu..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                        disabled={loading}
                    />
                </div>

                <div className="mb-4 text-right">
                    <button
                        type="button"
                        onClick={() => setShowForgotModal(true)}
                        className="text-blue-500 text-sm hover:underline"
                    >
                        Quên mật khẩu?
                    </button>
                </div>

                <div className="w-full flex flex-row justify-center gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`mt-2 w-1/2 rounded-lg font-semibold text-white py-3 px-4 transition-colors ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Đang xử lý...
                            </span>
                        ) : 'Đăng Nhập'}
                    </button>

                    <button
                        type="button"
                        onClick={() => window.location.href = '/register'}
                        className="mt-2 w-1/2 rounded-lg font-semibold text-white py-3 px-4 transition-colors bg-blue-500 hover:bg-blue-600"
                    >
                        Đăng Ký
                    </button>
                </div>
            </form>

            {/* Modal Quên Mật Khẩu */}
            {showForgotModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
                        <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">Quên mật khẩu</h2>
                        <input
                            type="email"
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            placeholder="Nhập email của bạn"
                            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <div className="flex justify-between gap-2">
                            <button
                                onClick={() => setShowForgotModal(false)}
                                className="w-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSendForgot}
                                className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                            >
                                Gửi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LoginPage;
