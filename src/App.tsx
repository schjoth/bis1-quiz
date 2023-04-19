import { useMemo, useState } from "react";
import "./App.css";
import questions from "./questions";

function App() {
	const [currentQuestion, setCurrentQuestion] = useState(0);

	const question = useMemo(() => {
		return questions[currentQuestion];
	}, [currentQuestion]);

	const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
	const toggleAnswer = (answer: string) => {
		if (selectedAnswers.includes(answer)) {
			setSelectedAnswers(selectedAnswers.filter((a) => a !== answer));
		} else {
			setSelectedAnswers([...selectedAnswers, answer]);
		}
	};

	const [result, setResult] = useState<string>();
	const calculateResult = () => {
		setResult(
			selectedAnswers.length === 0
				? "Incorrect"
				: selectedAnswers.reduce((acc, answer) => {
						return question.correctAnswers.includes(answer)
							? acc
							: "Incorrect";
				  }, "Correct")
		);
	};

	const nextQuestion = () => {
		setSelectedAnswers([]);
		setResult(undefined);
		setCurrentQuestion((state) => state + 1);
	};

	return (
		<div className="App">
			<h3>{question.text}</h3>
			<div
				style={{
					width: "max-content",
					marginInline: "auto",
					marginBottom: "3rem",
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					justifyContent: "flex-start",
					gap: "1rem",
				}}
			>
				{[...question.correctAnswers, ...question.wrongAnswers].map(
					(answer) => (
						<div
							style={{
								display: "flex",
								maxWidth: 600,
								flexDirection: "row",
								gap: "1rem",
							}}
							key={answer}
						>
							<input
								type="checkbox"
								value={answer}
								id={answer}
								onChange={() => toggleAnswer(answer)}
							/>
							<label
								htmlFor={answer}
								style={{ textAlign: "left" }}
							>
								{answer}
							</label>
						</div>
					)
				)}
			</div>
			{result && <div>Result: {result}</div>}
			<button onClick={calculateResult}>Check result</button>
			<br />
			<br />
			<br />
			<button
				disabled={currentQuestion === 0}
				onClick={() =>
					currentQuestion > 0 &&
					setCurrentQuestion(currentQuestion - 1)
				}
			>
				prev question
			</button>
			<button onClick={nextQuestion}>next question</button>
		</div>
	);
}

export default App;
