import { useEffect, useState } from "react";
import answerService from "../api/answerService";
import processService from "../api/processService"
function ViewAnswerQuestion({ question, handlerSubmitDone }) {
    const [answers, setAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const learnerData = localStorage.getItem("learner");
    const learner = JSON.parse(learnerData);
    const fetchAnswers = async (id) => {
        try {
            const res = await answerService.getAll(id);
            setAnswers(res.data);
        } catch (error) {
            alert(error.response.data.error)
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            learnerId: learner.id,
            questionId: question.id,
            answerId: selectedAnswer
        }
        try {
            const res = await processService.add(data);
        } catch (error) {
            alert(error.response.data.error)
        }
        if (handlerSubmitDone) {
            handlerSubmitDone();
        }
    }
    useEffect(() => {
        if (question?.id) {
            fetchAnswers(question.id);
        }
    }, [question]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
            {/* Thông tin câu hỏi */}
            <h1 className="text-2xl font-bold text-pink-600 mb-2">{question.title}</h1>
            <img
                src={question.imgUrl}
                alt={question.title}
                className="w-full h-64 object-contain rounded-lg mb-4 bg-gray-50"
            />
            <p className="text-sm text-gray-500 italic mb-1">Chủ đề: {question.topicName}</p>
            <p className="text-gray-700 mb-6">{question.describes}</p>

            {/* Danh sách câu trả lời */}
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Bạn hãy chọn câu trả lời</h2>
                <div className="space-y-3">
                    {answers.map(item => (
                        <div
                            onClick={() => setSelectedAnswer(item.id)}
                            key={item.id}
                            className={selectedAnswer === item.id ?
                                "p-3 border bg-orange-500 border-gray-300 rounded-lg " :
                                "p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"}
                        >
                            {item.name}
                        </div>
                    ))}
                    {/* Nút Submit */}
                    {selectedAnswer && <div className="mt-6 flex justify-center">
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg shadow"
                        >
                            Nộp bài
                        </button>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default ViewAnswerQuestion;
