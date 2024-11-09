
import "./ErrorComponent.css";

export function Error () {
  console.log('There is a problem...')
  const errormessage =`Oops! Something went wrong. Let's try that again.`
  return (
    <div className="error">
      <p>
    {errormessage}
    </p>
    </div>
  );
};

