import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import topicService from '../../api/topicService';
import learnerTopicService from '../../api/learnerTopicService';
import { FullScreenLoader } from "../../components/FullScreenLoader"
function Topic() {
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const [topics, setTopics] = useState([]);
    const [registerTopics, setRegisterTopics] = useState({}); // Lưu trạng thái đăng ký
    const learnerData = localStorage.getItem("learner");
    const learner = JSON.parse(learnerData);

    const fecthDatas = async (id) => {
        setIsLoading(true)
        try {
            const response = await topicService.findAllByLevelId(id)
            setTopics(response.data)
            // tìm kiếm đăng ký cho từng level 
            const registrationStatus = {};
            for (const item of response.data) {
                try {
                    const result = await learnerTopicService.check(learner.id, item.id);

                    registrationStatus[item.id] = result.data; // Giả sử result.data là boolean
                } catch (error) {
                    alert(error.response.data.error)
                }
            }
            setRegisterTopics(registrationStatus)
        } catch (error) {
            alert(error.response.data.error)
        }
        setIsLoading(false)
    };
    const handlerJoin = async (topicId) => {
        let newData = {
            learnerId: learner.id,
            topicId: topicId
        }
        setIsLoading(true)
        try {
            const res = await learnerTopicService.add(newData);

        } catch (error) {
            alert(error.response.data.error)
        }
        fecthDatas(id)
        setIsLoading(false)
    }
    useEffect(() => {
        fecthDatas(id);
    }, []);
    return (
        <>
            {isLoading ? <FullScreenLoader /> : <article className="bg-white w-screen min-h-screen p-8">
                <h1 className="flex justify-center text-2xl text-pink-700 font-bold">List Topics</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto ">
                    {topics.map(item => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">
                            <h2 className="text-xl font-semibold text-pink-600 mb-2">{item.name}</h2>
                            <p className="text-gray-600">{item.describes}</p>
                            {
                                registerTopics[item.id] ? (
                                    <Link
                                        to={`/level/topic/questions/${item.id}`}
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
            </article>}
        </>
    );
}

export default Topic;