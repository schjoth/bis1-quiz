import { useMemo, useState } from "react";
import "./App.css";
import questions from "./questions";

function App() {
	const [currentQuestion, setCurrentQuestion] = useState(0);

	const [question, randomizedAnswers] = useMemo((): any => {
		const q = questions[currentQuestion];
		return [
			q,
			[...q.correctAnswers, ...q.wrongAnswers].sort(
				() => Math.random() - 0.5
			),
		];
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
			selectedAnswers.length === 0 ||
				selectedAnswers.length !== question.correctAnswers.length
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
				{randomizedAnswers.map((answer: string) => (
					<div
						style={{
							display: "flex",
							width: 600,
							maxWidth: "95vw",
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
						<label htmlFor={answer} style={{ textAlign: "left" }}>
							{answer}
						</label>
					</div>
				))}
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
			<button
				onClick={nextQuestion}
				disabled={currentQuestion === questions.length - 1}
			>
				next question
			</button>
		</div>
	);
}

export default App;
