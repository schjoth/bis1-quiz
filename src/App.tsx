import { useCallback, useMemo, useState } from "react";
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

	const toggleAnswer = useCallback((answer: string) => {
		setSelectedAnswers((state) =>
			state.includes(answer)
				? state.filter((a) => a !== answer)
				: [...state, answer]
		);
	}, []);

	const [result, setResult] = useState<string>();

	const calculateResult = () => {
		setResult(
			selectedAnswers.length !== question.correctAnswers.length
				? "Incorrect"
				: selectedAnswers.reduce(
						(acc, answer) =>
							question.correctAnswers.includes(answer)
								? acc
								: "Incorrect",
						"Correct"
				  )
		);
	};

	const nextQuestion = useCallback((distance: number) => {
		setSelectedAnswers([]);
		setResult(undefined);
		setCurrentQuestion((state) => state + distance);
	}, []);

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
				onClick={() => currentQuestion > 0 && nextQuestion(-1)}
			>
				prev question
			</button>
			<button
				onClick={() => nextQuestion(1)}
				disabled={currentQuestion === questions.length - 1}
			>
				next question
			</button>
		</div>
	);
}

export default App;
