import { useState, useEffect } from "react";
import learnerService from "../../api/learnerService";

function Rankings() {
    const [learners, setLearners] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 6;
    const learnerData = localStorage.getItem("learner");
    const learner = JSON.parse(learnerData);

    const fecthDatas = async (pageNumber = 0) => {
        try {
            const response = await learnerService.getAll(pageNumber, pageSize)
            if (response.code === 200) {
                setLearners(response.data);
                setPage(response.currentPage);
                setTotalPages(response.totalPages);
            }
        } catch (error) {
            alert(error.response.data.error)
        }
    };

    useEffect(() => {
        fecthDatas(page);
    }, [page]);

    return (
        <div className="w-full min-h-screen bg-white mx-auto rounded-xl shadow-xl p-6">
            <h1 className="text-xl md:text-3xl font-bold text-center text-pink-700 mb-6">
                🎖️ Bảng Xếp Hạng Người Dùng
            </h1>
            <div className="overflow-x-auto rounded-md shadow">
                <table className="min-w-full table-auto divide-y divide-gray-200">
                    <thead className="bg-black">
                        <tr>
                            <th className="px-6 py-3 text-sm md:text-sm font-semibold text-left text-white uppercase">STT</th>
                            <th className="px-6 py-3 text-sm md:text-sm font-semibold text-left text-white uppercase">Image</th>
                            <th className="px-6 py-3 text-sm md:text-sm font-semibold text-left text-white uppercase">Người dùng</th>
                            <th className="px-6 py-3 text-sm md:text-sm font-semibold text-left text-white uppercase">Điểm</th>
                            <th className="px-6 py-3 text-sm md:text-sm font-semibold text-left text-white uppercase">Danh hiệu</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {learners.map((item, index) => {
                            const rank = page * pageSize + index + 1;

                            // Style riêng cho TOP 1–3
                            const isTop1 = rank === 1;
                            const isTop2 = rank === 2;
                            const isTop3 = rank === 3;

                            const baseStyle = "transition hover:scale-[1.01] duration-100";
                            const userRowStyle =
                                item.id === learner.id ? "bg-pink-300 hover:bg-yellow-300" : "hover:bg-yellow-300";
                            let borderStyle = "";
                            let medal = "";

                            if (isTop1) {
                                borderStyle = "border-4 border-yellow-400 bg-yellow-200 shadow-xl animate-pulse";
                                medal = "👑";
                            } else if (isTop2) {
                                borderStyle = "border-4 border-purple-300 bg-purple-500 shadow-xl ";
                                medal = "🥈";
                            } else if (isTop3) {
                                borderStyle = "border-4 border-sky-300 bg-sky-500 shadow-xl ";
                                medal = "🥉";
                            }

                            return (
                                <tr
                                    key={index}
                                    className={`${baseStyle} ${userRowStyle} ${borderStyle} rounded-xl`}
                                >
                                    <td className="px-6 py-4 text-center text-sm font-bold text-gray-800 align-middle">
                                        <span className="text-lg">{medal}</span> {rank}
                                    </td>

                                    <td className="px-6 py-2 text-sm text-center align-middle">
                                        {item.urlImage ? (
                                            <div className="flex justify-center">
                                                <img
                                                    src={item.urlImage}
                                                    alt="Ảnh người dùng"
                                                    className={`w-14 h-14 object-cover rounded-full border-2 ${isTop1
                                                        ? "border-yellow-500"
                                                        : isTop2
                                                            ? "border-purple-500"
                                                            : isTop3
                                                                ? "border-sky-500"
                                                                : "border-gray-300"
                                                        } shadow-md`}
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-gray-200 border shadow flex items-center justify-center text-gray-400 text-xs mx-auto">
                                                No Image
                                            </div>
                                        )}
                                    </td>

                                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 align-middle ">
                                        {item.name}
                                    </td>

                                    <td className="px-6 py-4 text-sm font-bold text-blue-600 align-middle">
                                        {item.totalScore}
                                    </td>

                                    <td className="px-6 py-4 text-sm italic text-green-600 align-middle">
                                        {item.rankName || "Chưa tham gia"}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {/* PHÂN TRANG */}
            <div className="flex justify-center mt-6">
                <nav className="inline-flex items-center space-x-1 bg-white rounded-lg shadow p-2">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                        disabled={page === 0}
                        className={`px-3 py-2 rounded-lg text-sm transition ${page === 0
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-600 hover:bg-blue-500 hover:text-white"
                            }`}
                    >
                        «
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setPage(index)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${page === index
                                ? "bg-blue-500 text-white shadow"
                                : "text-gray-600 hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                        disabled={page === totalPages - 1}
                        className={`px-3 py-2 rounded-lg text-sm transition ${page === totalPages - 1
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-600 hover:bg-blue-500 hover:text-white"
                            }`}
                    >
                        »
                    </button>
                </nav>
            </div>
        </div>
    );
}

export default Rankings;
