import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import topicService from '../../api/topicService';
import learnerTopicService from '../../api/learnerTopicService';
import { FullScreenLoader } from "../../components/FullScreenLoader";

function Topic() {
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [joiningTopicId, setJoiningTopicId] = useState(null);
    const { id } = useParams();
    const [topics, setTopics] = useState([]);
    const [registerTopics, setRegisterTopics] = useState({});
    const learner = JSON.parse(localStorage.getItem("learner"));

    const fetchData = async (levelId) => {
        try {
            setIsPageLoading(true);
            const response = await topicService.findAllByLevelId(levelId);
            setTopics(response.data);

            const checkPromises = response.data.map(async (topic) => {
                try {
                    const res = await learnerTopicService.check(learner.id, topic.id);
                    return { topicId: topic.id, isRegistered: res.data };
                } catch {
                    return { topicId: topic.id, isRegistered: false };
                }
            });

            const results = await Promise.all(checkPromises);
            const statusMap = {};
            results.forEach(({ topicId, isRegistered }) => {
                statusMap[topicId] = isRegistered;
            });
            setRegisterTopics(statusMap);
        } catch (error) {
            alert(error.response?.data?.error || "Lỗi tải topic");
        } finally {
            setIsPageLoading(false);
        }
    };

    const handlerJoin = async (topicId) => {
        setJoiningTopicId(topicId);
        const payload = {
            learnerId: learner.id,
            topicId
        };
        try {
            await learnerTopicService.add(payload);
            setRegisterTopics((prev) => ({
                ...prev,
                [topicId]: true
            }));
        } catch (error) {
            alert(error.response?.data?.error || "Lỗi khi tham gia topic");
        } finally {
            setJoiningTopicId(null);
        }
    };

    useEffect(() => {
        fetchData(id);
    }, [id]);

    if (isPageLoading) return <FullScreenLoader />;

    return (
        <article className="bg-white w-screen min-h-screen p-8">
            <h1 className="flex justify-center text-2xl text-pink-700 font-bold mb-8">List Topics</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {topics.map((item) => {
                    const isRegistered = registerTopics[item.id];
                    const isJoining = joiningTopicId === item.id;

                    return (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300"
                        >
                            <h2 className="text-xl font-semibold text-pink-600 mb-2">{item.name}</h2>
                            <p className="text-gray-600">{item.describes}</p>

                            {isRegistered ? (
                                <Link
                                    to={`/level/topic/questions/${item.id}`}
                                    className="mt-3 min-w-[128px] flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow transition duration-200"
                                >
                                    <i className="fa-solid fa-eye text-sm"></i>
                                    <span className="text-sm">Xem</span>
                                </Link>
                            ) : (
                                <button
                                    onClick={() => handlerJoin(item.id)}
                                    disabled={isJoining}
                                    className={`mt-3 min-w-[128px] flex items-center justify-center gap-2 ${
                                        isJoining ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
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

export default Topic;
