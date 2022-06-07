import "./quiz.css";
const Question = ({ question, options, onClick }) => {
  return (
    <div>
      <div className="q">
        <p>{question}</p>
      </div>
      {options.map((el, key) => {
        return (
          <button onClick={onClick} className="click" key={key}>
            {el}
          </button>
        );
      })}
    </div>
  );
};

export default Question;
