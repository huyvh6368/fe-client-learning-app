import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../api/authService";

function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phoneNumber: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGenderChange = (e) => {
        setFormData(prev => ({
            ...prev,
            gender: e.target.value === 'true'
        }));
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, name, phoneNumber } = formData;

    // Kiểm tra rỗng
    if (!email || !password || !name || !phoneNumber) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }

    // Kiểm tra email hợp lệ
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Email không hợp lệ");
        return;
    }

    // Kiểm tra số điện thoại (10 chữ số)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
        alert("Số điện thoại phải có 10 chữ số");
        return;
    }

    // Kiểm tra mật khẩu (ít nhất 6 ký tự)
    if (password.length < 6) {
        alert("Mật khẩu phải từ 6 ký tự trở lên");
        return;
    }

    try {
        const response = await authService.register(formData);
        navigate("/login");
    } catch (error) {
        alert(error?.response?.data?.error || "Đăng ký thất bại");
    }
};

    return (
        <div className="w-screen min-h-screen bg-sky-300 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-center mb-6">Đăng Ký Tài Khoản</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    {/* Tên */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Họ và tên</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    {/* Số điện thoại */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                    >
                        Đăng Ký
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;