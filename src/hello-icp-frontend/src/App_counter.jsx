import { useState, useEffect } from 'react';
import { counter_backend } from 'declarations/counter-backend';

function App() {
  const [count, setCount] = useState(0);
  const [addAmount, setAddAmount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCount();
  }, []);

  const fetchCount = async () => {
    try {
      const currentCount = await counter_backend.get();
      setCount(Number(currentCount));
    } catch (error) {
      console.error('Error fetching count:', error);
    }
  };

  const handleIncrement = async () => {
    setIsLoading(true);
    try {
      await counter_backend.inc();
      await fetchCount();
    } catch (error) {
      console.error('Error incrementing count:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecrement = async () => {
    setIsLoading(true);
    try {
      await counter_backend.dec();
      await fetchCount();
    } catch (error) {
      console.error('Error decrementing count:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async () => {
    setIsLoading(true);
    try {
      await counter_backend.add(Number(addAmount));
      await fetchCount();
    } catch (error) {
      console.error('Error adding to count:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="counter-app">
      <div className="counter-container">
        <h1>ICP Counter</h1>
        
        <div className="counter-display">
          <span className="count-value">{count}</span>
        </div>

        <div className="button-group">
          <button 
            onClick={handleDecrement}
            disabled={isLoading}
            className="btn btn-dec"
          >
            -1
          </button>
          <button 
            onClick={handleIncrement}
            disabled={isLoading}
            className="btn btn-inc"
          >
            +1
          </button>
        </div>

        <div className="add-amount-section">
          <input
            type="number"
            value={addAmount}
            onChange={(e) => setAddAmount(e.target.value)}
            min="1"
            className="amount-input"
          />
          <button 
            onClick={handleAdd}
            disabled={isLoading}
            className="btn btn-add"
          >
            Add Amount
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;