import { useState } from "react";
import { useAuthContext } from "../context/AuthContext"; 
import useMoviesAdmin from "./useMoviesAdmin";
import useRoomsAdmin from "./useRoomsAdmin";
import useSessionsAdmin from "./useSessionsAdmin";

export const useFormData = (formtype) => {
    const [formData, setFormData] = useState({});
    const { login ,register} = useAuthContext(); 
    const {updateMovie,createMovie} = useMoviesAdmin();
    const {createRoom,updateRoom} = useRoomsAdmin();
    const {updateSession,createSession} = useSessionsAdmin();



    const onChange = (event) => {
        const { name, value, files } = event.target;
        if (files && files.length > 0) {
            setFormData(prevData => ({ ...prevData, [name]: files[0] })); 
        } else {
            setFormData(prevData => ({ ...prevData, [name]: value }));
        }
     
        
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        const data = new FormData();

        for (const key in formData) {

            data.append(key, formData[key]); 
        }
      
        

    switch (formtype){

         case 'login':
            await login(formData); 
         break;
         case 'register' : 
                await register(data); 
         break;

         case  'MovieUpdate':
            await updateMovie(formData,formData.movieId)
        
         break;
         case  'MovieCreate':
            await createMovie(data);
         break;
         case 'RoomCreate':
            
          await createRoom(formData)

         break;
         case 'RoomUpdate':
  
            await updateRoom(formData.roomId,formData);

            break;
         case 'SessionUpdate':
              await updateSession(formData.sessionId,formData)
             
             break;
             case 'SessionCreate':
             await createSession(formData);
             break;
            

    }

       
    };

    return { formData, onChange, handleSubmit,setFormData };
};
