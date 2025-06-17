import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import questionService from "../../api/questionService";
import processService from "../../api/processService"
import ViewAnswerQuestion from "../../components/ViewAnswerQuestion";
function Question() {
    const { id } = useParams();
    const [questions, setQuestions] = useState([])
    const [questionStatus, setQuestionStatus] = useState({})
    const [currentQuestion, setCurrentQuestion] = useState({})
    const [showScoreModal, setShowScoreModal] = useState(false);
    const [scoreData, setScoreData] = useState({ questionTitle: "", score: 0 });
    const [showAnswer, setShowAnswer] = useState(false);
    const learnerData = localStorage.getItem("learner");
    const learner = JSON.parse(learnerData);
    const fecthDatas = async (topicId) => {
        try {
            const res = await questionService.getAll(topicId);
            console.log("res : ", res);
            const arrays = res.data;
            const temp = {};
            for (let item of arrays) {
                try {
                    let result = await processService.check(learner.id, item.id);
                    temp[item.id] = result.data;
                } catch (e) {
                    console.log(e);

                }
            }

            setQuestionStatus(temp);
            setQuestions(res.data)
        } catch (error) {
            console.log(error);

        }
    }
    const handlerJoin = (question) => {
        setCurrentQuestion(question)
        setShowAnswer(true)
    }
    const handlerSubmitDone = () => {
        setShowAnswer(false)
        fecthDatas(id);
    }
    const handlerShowScore = async (question) => {
        try {
            console.log("questions : ", question);

            const res = await processService.findScore(learner.id, question.id);
            console.log("res : ", res.data);

            const total = res.data.score;


            const answerName = res.data.answerName;
            setScoreData({
                questionTitle: question.title,
                image: question.imgUrl,
                answer: answerName,
                score: total,
            });
            setShowScoreModal(true); // mở form
        } catch (error) {
            console.log(error);
        }
    };
    console.log("thông tin điểm số : ", scoreData);

    useEffect(() => {
        fecthDatas(id);
    }, [])
    console.log(" questions - status : ", questionStatus);
    return (
        <article className="bg-white w-screen min-h-screen p-8">
            {!showAnswer && <h1 className="flex justify-center text-2xl text-pink-700 font-bold">List Questions</h1>}
            {
                showAnswer ?
                    (
                        <ViewAnswerQuestion question={currentQuestion} handlerSubmitDone={handlerSubmitDone} />
                    )
                    :
                    (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto p-4">
                            {questions.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
                                >
                                    <img
                                        src={item.imgUrl}
                                        alt={item.title}
                                        className="w-full h-40 object-contain"
                                    />
                                    <div className="p-4 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-800 mb-1">{item.title}</h2>
                                            <p className="text-sm text-gray-600 mb-2 italic">Chủ đề: {item.topicName}</p>
                                            <p className="text-gray-700 text-sm">{item.describes}</p>
                                        </div>

                                        <div className="mt-4">
                                            {questionStatus[item.id] ? (
                                                <button
                                                    onClick={() => handlerShowScore(item)}
                                                    className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow transition duration-200"
                                                >
                                                    <i className="fa-solid fa-eye"></i> Xem điểm
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handlerJoin(item)}
                                                    className="w-full inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow transition duration-200"
                                                >
                                                    <i className="fa-solid fa-right-to-bracket"></i> Kiểm tra
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
            }
            {showScoreModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md animate-fadeIn">
                        <h2 className="text-2xl font-bold text-center text-pink-600 mb-4">
                            🎉 Kết quả bài làm
                        </h2>

                        {/* Hình ảnh câu hỏi */}
                        <div className="w-full h-48 mb-4">
                            <img
                                src={scoreData.image}
                                alt="Câu hỏi"
                                className="w-full h-full object-contain rounded-lg border"
                                loading="lazy"
                            />
                        </div>

                        {/* Thông tin chi tiết */}
                        <p className="text-gray-800 mb-2">
                            <span className="font-semibold">Câu hỏi:</span> <span className="text-pink-600">{scoreData.questionTitle}</span>
                        </p>

                        <p className="text-gray-800 mb-2">
                            <span className="font-semibold">Câu trả lời của bạn:</span> <span className="text-sky-500">{scoreData.answer}</span>
                        </p>

                        <p className="text-gray-800 mb-4">
                            <span className="font-semibold">Điểm số:</span>{" "}
                            <span className={`font-bold ${scoreData.score > 0 ? "text-green-600" : "text-red-600"}`}>
                                {scoreData.score}
                            </span>
                        </p>

                        <div className="text-center">
                            <button
                                onClick={() => setShowScoreModal(false)}
                                className="mt-2 px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </article>
    );
}

export default Question;