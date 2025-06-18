export default function SoftwareManual() {
    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">
                <i className="fas fa-book mr-2"></i>Hướng Dẫn Sử Dụng Phần Mềm
            </h1>

            <div className="space-y-8 text-gray-800 text-[17px] leading-relaxed">
                <section>
                    <h2 className="text-xl font-semibold mb-2 text-pink-500">
                        <i className="fas fa-layer-group mr-2"></i>1. Level & Chủ đề
                    </h2>
                    <p>
                        Sau khi đăng nhập, bạn có thể nhấn vào mục <strong>Level</strong> để chọn cấp độ học (Beginner, Intermediate...). <br />
                        Mỗi cấp độ bao gồm nhiều <strong>Chủ đề (Topic)</strong> như Từ vựng, Ngữ pháp, Giao tiếp,...
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2 text-pink-500">
                        <i className="fas fa-question-circle mr-2"></i>2. Làm bài và Nhận điểm
                    </h2>
                    <p>
                        Trong mỗi chủ đề, bạn sẽ làm các câu hỏi trắc nghiệm. Trả lời đúng sẽ nhận điểm. <br />
                        Hoàn thành chủ đề giúp bạn tăng <strong>level và danh hiệu</strong>.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2 text-pink-500">
                        <i className="fas fa-trophy mr-2"></i>3. Bảng Xếp Hạng (Ranking)
                    </h2>
                    <p>
                        Mục <strong>Rankings</strong> hiển thị bảng xếp hạng người học. <br />
                        Bạn sẽ thấy điểm, danh hiệu và thứ hạng của bản thân.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2 text-pink-500">
                        <i className="fas fa-crown mr-2"></i>4. Danh hiệu & Cấp bậc
                    </h2>
                    <p>
                        Tùy theo điểm tích lũy, bạn sẽ đạt danh hiệu như <em>Tập sự, Thành thạo, Siêu sao...</em><br />
                        Danh hiệu thể hiện trình độ học của bạn.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2 text-pink-500">
                        <i className="fas fa-user-circle mr-2"></i>5. Trang Cá Nhân (Profile)
                    </h2>
                    <p>
                        Tại <strong>Profile</strong>, bạn có thể sửa thông tin cá nhân như tên, ảnh đại diện... hoặc <strong>đăng xuất</strong>.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2 text-pink-500">
                        <i className="fas fa-history mr-2"></i>6. Lịch sử học tập
                    </h2>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li><strong>Level đã tham gia:</strong> hiển thị các cấp độ bạn đã học.</li>
                        <li><strong>Chủ đề đã tham gia:</strong> cho biết bạn đã học những topic nào.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2 text-pink-500">
                        <i className="fas fa-sign-out-alt mr-2"></i>7. Đăng xuất
                    </h2>
                    <p>
                        Nhấn <strong>Profile &gt; Đăng xuất</strong> để thoát hệ thống. Dữ liệu sẽ được lưu lại.
                    </p>
                </section>
            </div>
        </div>
    );
}
