import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
 const [workouts, setWorkouts] = useState(null)

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get('/api/workouts')
        //cors error removed using proxy
        setWorkouts(response.data.workout)
       console.log(response.data);
      } 
      catch (error) {
        console.log(error)
      }
    }

    fetchWorkouts()
  });

  


async function handleDelete(id){
     try {
    await axios.delete('/api/workouts/' + id);

    setWorkouts(prev =>
      prev.filter(workout => workout._id !== id)
    );
  
  } catch (error) {
    console.log(error);
  }
}

  

return (
   <div className='home'>
    
  <div className='workouts'>
    {workouts &&
      workouts.map((workout) => (
        <div className='workout-card' key={workout._id}>
          <h3 className='workout-title'>{workout.title}</h3>

          <p className='workout-details'>
            Load: {workout.load}
          </p>

          <p className='workout-details'>
            Reps: {workout.reps}
          </p>
          <button className='delete-button' onClick={()=>handleDelete(workout._id)}>🗑️</button>
        
        </div>
      ))}
  </div>
  <WorkoutForm />
</div>
  )
}

export default Home