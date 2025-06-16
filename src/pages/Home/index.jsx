import { Link } from 'react-router-dom'

function Home() {
    return (
        <section className="bg-white w-screen min-h-screen p-8">
            <h1 className="text-2xl font-bold text-center text-pink-700 mb-8">Trang chủ</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {/* Card: Level */}
                <Link
                    to='/level'
                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">
                    <h2 className="text-xl font-semibold text-pink-600 mb-2">📚 Level</h2>
                    <p className="text-gray-600">Xem danh sách các cấp độ bạn đang học và đã hoàn thành.</p>
                </Link>

                {/* Card: Rankings */}
                <Link
                    to='/rank'
                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">
                    <h2 className="text-xl font-semibold text-pink-600 mb-2">🏆 Rankings</h2>
                    <p className="text-gray-600">Xem thứ hạng của bạn và cạnh tranh với người học khác.</p>
                </Link>

                {/* Card: Software User Manual */}
                <Link
                    to='huong-dan'
                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">
                    <h2 className="text-xl font-semibold text-pink-600 mb-2">📝 Software User Manual</h2>
                    <p className="text-gray-600">Hướng dẫn sử dụng phần mềm chi tiết dành cho người mới bắt đầu.</p>
                </Link>
            </div>
        </section>
    );
}

export default Home;
