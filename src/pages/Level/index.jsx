import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import levelService from '../../api/levelService';
import learnerLevelService from '../../api/learnerLevelService';
import { FullScreenLoader } from "../../components/FullScreenLoader"
function Level() {
    const [isLoading, setIsLoading] = useState(false);
    const [levels, setLevels] = useState([]);
    const [registeredLevels, setRegisteredLevels] = useState({}); // Lưu trạng thái đăng ký
    const learnerData = localStorage.getItem("learner");
    const learner = JSON.parse(learnerData);
    const [data, setData] = useState({
        learnerId: learner.id,
        status: 'DA_THAM_GIA',
    });

    const fetchLevels = async () => {
        try {
            setIsLoading(true)
            const res = await levelService.findAll();
            setLevels(res.data);
            // Kiểm tra đăng ký cho từng level
            const registrationStatus = {};
            for (const level of res.data) {
                try {
                    const result = await learnerLevelService.check(learner.id, level.id);
                    registrationStatus[level.id] = result.data; // Giả sử result.data là boolean
                } catch (error) {
                    alert("lỗi")
                    registrationStatus[level.id] = false;
                }
            }
            setRegisteredLevels(registrationStatus);
        } catch (error) {
            alert("lỗi")
        } finally {
            setIsLoading(false)
        }

    }

    useEffect(() => {
        fetchLevels();
    }, []);
    const handlerJoin = async (id) => {
        let newData = data
        newData.levelId = id;
        setIsLoading(true)
        try {
            const res = await learnerLevelService.add(newData);
            fetchLevels();
        } catch (e) {
            alert("lỗi find all")
        }
        setIsLoading(false)
    }

    return (
        <>
            {isLoading ? <FullScreenLoader />
                : <article className="bg-white w-screen min-h-screen p-8">
                    <h1 className="flex justify-center text-2xl text-pink-700 font-bold">List Level</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto ">
                        {levels.map(item => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">
                                <h2 className="text-xl font-semibold text-pink-600 mb-2">📚 {item.name}</h2>
                                <p className="text-gray-600">{item.describes}</p>
                                {
                                    registeredLevels[item.id] ? (
                                        <Link
                                            to={`/level/topic/${item.id}`}
                                            className="mt-3 w-32 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow transition duration-200"
                                        >
                                            <i className="fa-solid fa-eye"></i>
                                            Xem
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() => handlerJoin(item.id)}
                                            className="mt-3 w-32 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow transition duration-200"
                                        >
                                            <i className="fa-solid fa-right-to-bracket"></i>
                                            Tham gia
                                        </button>
                                    )
                                }
                            </div>
                        ))}
                    </div>
                </article>
            }
        </>
    );
}

export default Level;