import React, { useState } from 'react';
import axios from 'axios';


const WorkoutForm = () => {
  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = {
      title,
      reps,
      load
    };

    console.log(workout);

    await axios.post('/api/workouts', workout);
   
    setTitle('');
    setReps('');
    setLoad('');
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Reps:</label>
      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />

      <label>Load (kg):</label>
      <input
        type="number"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
      />

      <button>Add Workout</button>
    </form>
  );
};

export default WorkoutForm;