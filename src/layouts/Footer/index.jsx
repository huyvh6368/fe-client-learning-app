function Footer() {
    return (
        <footer className="bg-gray-300 w-full py-6 mt-5 fixed bottom-0">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-800 text-sm font-medium">
                <section>
                    <h3 className="font-semibold mb-2">Thông tin</h3>
                    <ul className="space-y-1">
                        <li>Liên hệ</li>
                        <li>Địa chỉ</li>
                        <li>Điều khoản</li>
                    </ul>
                </section>
                <section>
                    <h3 className="font-semibold mb-2">Giới thiệu</h3>
                    <ul className="space-y-1">
                        <li>Về chúng tôi</li>
                        <li>Sứ mệnh</li>
                        <li>Tuyển dụng</li>
                    </ul>
                </section>
                <section>
                    <h3 className="font-semibold mb-2">Hỗ trợ</h3>
                    <ul className="space-y-1">
                        <li>Trung tâm trợ giúp</li>
                        <li>Hướng dẫn</li>
                        <li>Phản hồi</li>
                    </ul>
                </section>
                <section>
                    <h3 className="font-semibold mb-2">Kết nối</h3>
                    <ul className="space-y-1">
                        <li>Facebook</li>
                        <li>Zalo</li>
                        <li>Email</li>
                    </ul>
                </section>
            </div>
        </footer>
    );
}

export default Footer;
