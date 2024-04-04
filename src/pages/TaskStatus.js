import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

 // Assuming the file path is correct


  // Assuming you have access to the project reference
  

 



  const TaskStatus = () => {
    const {projectRef} = useParams();
    console.log(projectRef)
  const [taskStatus, setTaskStatus] = useState(null);

  useEffect(() => {
    const fetchTaskStatus = async () => {
      try {
        const response = await axios.get(`https://contentcrafter.bulkpe.in/api/listProjectsById?projectRef=${projectRef}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken") }` // Replace 'your_auth_token' with the actual authorization token
          }
        });
        // Assuming the API returns an array of tasks, we take the first task from the response
        if (response.data.result && response.data.result.length > 0) {
          const task = response.data.result[0];
          console.log(task)
          setTaskStatus({
            status: task.status,
            time: task.time
          });
        } else {
          setTaskStatus(null); // Reset task status if no task is found
        }
      } catch (error) {
        console.error('Error fetching task status:', error);
      }
    };

    fetchTaskStatus(); // Fetch task status when component mounts
  }, [projectRef]); // Re-fetch task status when projectRef changes

  return (
    <div>
      {taskStatus ? (
        <div>
          <p>Status: {taskStatus.status}</p>
          <p>Time: {taskStatus.time}%</p>
        </div>
      ) : (
        <p>No task found for project reference: {projectRef}</p>
      )}
    </div>
  );
};

export  default TaskStatus;
