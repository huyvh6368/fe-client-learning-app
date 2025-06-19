import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import levelService from '../../api/levelService';
import learnerLevelService from '../../api/learnerLevelService';
import { FullScreenLoader } from "../../components/FullScreenLoader";

function Level() {
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [joiningLevelId, setJoiningLevelId] = useState(null); // 👈 loading riêng nút
    const [levels, setLevels] = useState([]);
    const [registeredLevels, setRegisteredLevels] = useState({});

    const learner = JSON.parse(localStorage.getItem("learner"));

    useEffect(() => {
        const fetchLevels = async () => {
            try {
                const res = await levelService.findAll();
                setLevels(res.data);

                const checkPromises = res.data.map(async (level) => {
                    try {
                        const result = await learnerLevelService.check(learner.id, level.id);
                        return { levelId: level.id, isRegistered: result.data };
                    } catch {
                        return { levelId: level.id, isRegistered: false };
                    }
                });

                const results = await Promise.all(checkPromises);

                const statusMap = {};
                results.forEach(({ levelId, isRegistered }) => {
                    statusMap[levelId] = isRegistered;
                });

                setRegisteredLevels(statusMap);
            } catch (err) {
                alert("Đã xảy ra lỗi khi tải danh sách level.");
            } finally {
                setIsPageLoading(false); // ✅ Chỉ tắt khi dữ liệu sẵn sàng
            }
        };

        fetchLevels();
    }, [learner.id]);

    const handleJoin = async (levelId) => {
        setJoiningLevelId(levelId);
        const payload = {
            learnerId: learner.id,
            levelId,
            status: 'DA_THAM_GIA',
        };

        try {
            await learnerLevelService.add(payload);
            setRegisteredLevels(prev => ({
                ...prev,
                [levelId]: true
            }));
        } catch (e) {
            alert("Tham gia thất bại!");
        } finally {
            setJoiningLevelId(null);
        }
    };

    if (isPageLoading) return <FullScreenLoader />;

    return (
        <article className="bg-white w-screen min-h-screen p-8">
            <h1 className="flex justify-center text-2xl text-pink-700 font-bold mb-8">List Level</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {levels.map((item) => {
                    const isRegistered = registeredLevels[item.id];
                    const isJoining = joiningLevelId === item.id;
                    return (
                        <div
                            key={item.id}
                            className="bg-white flex flex-col justify-around rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300"
                        >
                            <h2 className="text-xl font-semibold text-pink-600 mb-2">📚 {item.name}</h2>
                            <p className="text-gray-600">{item.describes}</p>

                            {isRegistered ? (
                                <Link
                                    to={`/level/topic/${item.id}`}
                                    className="mt-3 w-32 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow transition duration-200"
                                >
                                    <i className="fa-solid fa-eye"></i>
                                    Xem
                                </Link>
                            ) : (
                                <button
                                    onClick={() => handleJoin(item.id)}
                                    disabled={isJoining}
                                    className={`mt-3 min-w-[128px] flex items-center justify-center gap-2 ${isJoining ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
                                        } text-white font-semibold py-2 px-4 rounded-full shadow transition duration-200`}
                                >
                                    {isJoining ? (
                                        <>
                                            <i className="fa-solid fa-spinner animate-spin text-sm"></i>
                                            <span className="text-sm">Đang tham gia</span>
                                        </>
                                    ) : (
                                        <>
                                            <i className="fa-solid fa-right-to-bracket text-sm"></i>
                                            <span className="text-sm">Tham gia</span>
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </article>
    );
}

export default Level;
