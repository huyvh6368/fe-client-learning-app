import { useEffect, useState } from "react";
import rankService from "../../api/rankService";

function RankPage() {
    const [ranks, setRanks] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        fetchRanks(page);
    }, [page]);

    const fetchRanks = async (pageNo) => {
        try {
            const response = await rankService.getAll(pageNo, pageSize);
            setRanks(response.data);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu xếp hạng:", error);
        }
    };

    return (
        <div className="max-w-5xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">🏆 Bảng Xếp Hạng</h1>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm sm:text-base border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-2 sm:px-4 py-2 border">#</th>
                            <th className="px-2 sm:px-4 py-2 border text-left">Tên</th>
                            <th className="px-2 sm:px-4 py-2 border text-right">Điểm</th>
                            <th className="px-2 sm:px-4 py-2 border text-left">Mô tả</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ranks.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center p-4 text-gray-500">
                                    Không có dữ liệu
                                </td>
                            </tr>
                        ) : (
                            ranks.map((rank, index) => (
                                <tr key={rank.id} className="hover:bg-gray-50">
                                    <td className="px-2 sm:px-4 py-2 border text-center">
                                        {page * pageSize + index + 1}
                                    </td>
                                    <td className="px-2 sm:px-4 py-2 border">{rank.name}</td>
                                    <td className="px-2 sm:px-4 py-2 border text-right">{rank.score}</td>
                                    <td className="px-2 sm:px-4 py-2 border">{rank.describes}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-center items-center mt-6 gap-2 sm:gap-4">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    disabled={page === 0}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 transition duration-200"
                >
                    Trang trước
                </button>
                <span className="text-gray-700 text-sm sm:text-base">
                    Trang {page + 1} / {totalPages}
                </span>
                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                    disabled={page + 1 >= totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 transition duration-200"
                >
                    Trang sau
                </button>
            </div>
        </div>
    );
}

export default RankPage;
