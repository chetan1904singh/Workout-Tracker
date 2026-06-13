import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import WorkoutForm from '../components/WorkoutForm';
import {Navigate} from 'react-router-dom';

const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    const fetchWorkouts = async () => {
      try {
        const response = await axios.get("/api/workouts", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
       console.log("Fetching workouts...");
        setWorkouts(response.data.workout);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWorkouts();
  }, [user]);
 
  
  //if not logged in(no token in local st.) redirect to /login
  if (!user) {
    console.log("No token or logged in")
    
    return <Navigate to="/login" />;
  }
  


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