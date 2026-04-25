import { formatTime } from '../utils/formatTime';

const StopPrompt = ({ elapsed, quantity, setQuantity, saveSession }) => {
  return (
    <div className="stopPrompt">
      <h2>Session Ended</h2>
      <p>Duration: {formatTime(elapsed)}</p>

      <input
        type="number"
        value={quantity}
        placeholder="Milk quantity (liters)"
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button onClick={saveSession}>Save</button>
    </div>
  );
};

export default StopPrompt;