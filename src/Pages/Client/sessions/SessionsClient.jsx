import { useEffect } from "react";
import useSessionsClient from "../../../Hooks/useSessionsClient";
import { useNavigate } from "react-router-dom";

export default function SessionsClient() {
  const { sessions, loading, getAllSessions } = useSessionsClient();
  const navigate = useNavigate();

  useEffect(() => {
    getAllSessions();
  }, []);

  const handelSessionClick = (session) => {
    navigate(`/sessions-Client/${session._id}`, { state: { session } });
  };

  if (loading) return <>loading . . .</>;

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-700 min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-12 gap-6 w-[90%] my-10">
        {sessions.map((session, index) => (
          <div
            key={index}
            onClick={() => handelSessionClick(session)}
            className="col-span-12 sm:col-span-6 lg:col-span-3 relative bg-cover bg-center bg-no-repeat transition-transform transform hover:scale-105 shadow-2xl rounded-lg h-[500px] sm:h-[550px] lg:h-[500px] xl:h-[500px]"
            style={{
              backgroundImage: `url('${session.movie.posterImage || '/2405f5d1220d45fef53df0bfe804e104.jpg'}')`,
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-6 rounded-lg opacity-0 transition-opacity duration-300 hover:opacity-100">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white">
                  {session.movie.title || `Movie Title ${index + 1}`}
                </h2>
                <p className="mt-2 text-sm text-gray-300">
                  {session.movie.description || "Short description of the movie goes here."}
                </p>
              </div>

              <div className="text-center">
                <p className="text-gray-300">Showtime:</p>
                <p className="text-white font-bold text-lg">
                  {new Date(session.dateTime).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
