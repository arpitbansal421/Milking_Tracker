const History = ({ history, goBack }) => {
  const getField = (entry, keys, fallback = null) => {
    if (entry == null) return fallback;
    if (typeof entry !== 'object') return fallback;

    for (const key of keys) {
      if (entry[key] !== undefined && entry[key] !== null) {
        return entry[key];
      }
    }

    for (const value of Object.values(entry)) {
      if (value && typeof value === 'object') {
        const nested = getField(value, keys, null);
        if (nested !== null) {
          return nested;
        }
      }
    }

    return fallback;
  };

  const normalizeDateValue = (value) => {
    if (value == null) return null;

    if (typeof value === 'string') {
      const numeric = Number(value);
      if (!Number.isNaN(numeric) && value.trim().length > 0) {
        value = numeric;
      }
    }

    if (typeof value === 'number') {
      // If value looks like seconds, convert to milliseconds.
      if (value > 1e9 && value < 1e12) {
        return value * 1000;
      }
      return value;
    }

    return null;
  };

  const formatDate = (dateValue) => {
    try {
      const normalized = normalizeDateValue(dateValue);
      if (normalized == null) return 'Invalid Date';
      const date = new Date(normalized);
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      return date.toLocaleDateString('en-GB'); // DD/MM/YYYY format
    } catch (err) {
      console.error('Date format error:', err);
      return 'Invalid Date';
    }
  };

  const formatSeconds = (value) => {
    if (value == null) {
      return '--';
    }

    if (typeof value === 'string' && value.trim() !== '') {
      const numeric = Number(value);
      if (!Number.isNaN(numeric)) {
        value = numeric;
      }
    }

    if (typeof value === 'number') {
      if (value > 1e9 && value < 1e12) {
        return Math.floor(value);
      }
      if (value > 1e12) {
        return Math.floor(value / 1000);
      }
      return Math.floor(value);
    }

    return '--';
  };

  const calculateDuration = (startVal, endVal) => {
    try {
      const normalizedStart = normalizeDateValue(startVal);
      const normalizedEnd = normalizeDateValue(endVal);
      if (normalizedStart == null || normalizedEnd == null) return '--';
      const durationMs = normalizedEnd - normalizedStart;
      const durationSec = Math.round(durationMs / 1000);
      return durationSec + 's';
    } catch (err) {
      console.error('Duration calculation error:', err);
      return '--';
    }
  };

  const formatTimeFromStart = (dateValue) => {
    try {
      const normalized = normalizeDateValue(dateValue);
      if (normalized == null) return '--';
      const date = new Date(normalized);
      if (isNaN(date.getTime())) {
        return '--';
      }
      return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    } catch (err) {
      console.error('Time format error:', err);
      return '--';
    }
  };

  return (
    <div className="history">
      <h1>Milking History</h1>

      {history && history.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', color: '#000' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0', borderBottom: '2px solid #333' }}>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', color: '#000' }}>Date</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', color: '#000' }}>Start Time</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', color: '#000' }}>End Time</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', color: '#000' }}>Duration</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', color: '#000' }}>Milk Collected (L)</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, index) => {
              const start = getField(entry, ['startTime', 'start_time', 'date', 'timestamp', 'createdAt', 'created_at', 'start', 'starttime']);
              const end = getField(entry, ['endTime', 'end_time', 'updatedAt', 'updated_at', 'finishedAt', 'end', 'endtime']);
              const quantity = getField(entry, ['quantity', 'volume', 'amount', 'milkCollected', 'milk_collected', 'milk_volume'], 0);

              return (
                <tr key={index} style={{ borderBottom: '1px solid #ddd', backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                  <td style={{ padding: '12px', color: '#000' }}>{formatDate(start)}</td>
                  <td style={{ padding: '12px', color: '#000' }}>{formatTimeFromStart(start)}</td>
                  <td style={{ padding: '12px', color: '#000' }}>{formatTimeFromStart(end)}</td>
                  <td style={{ padding: '12px', color: '#000' }}>{calculateDuration(start, end)}</td>
                  <td style={{ padding: '12px', color: '#000' }}>{formatSeconds(quantity)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No milking history found</p>
      )}

      <button onClick={goBack} style={{ marginTop: '20px', padding: '10px 20px' }}>Back</button>
    </div>
  );
};
export default History;