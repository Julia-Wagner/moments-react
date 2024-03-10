import {createContext, useContext, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { axiosReq, axiosRes } from "../api/axiosDefaults";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [forceUpdate, setForceUpdate] = useState(false);
    const navigate = useNavigate()

    const handleMount = async () => {
        try {
            const { data } = await axiosRes.get("dj-rest-auth/user/");
            setCurrentUser(data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
            setForceUpdate((prev) => !prev);
        }
    };

    useEffect(() => {
        handleMount();
    }, [forceUpdate]);

    useMemo(() => {
        axiosReq.interceptors.request.use(
            async (config) => {
                try {
                    await axios.post("/dj-rest-auth/token/refresh/");
                } catch (err) {
                    setCurrentUser((prevCurrentUser) => {
                        if (prevCurrentUser) {
                            navigate("/signin");
                        }
                        return null;
                    });
                    return config;
                }
                return config;
            },
            (err) => {
                return Promise.reject(err);
            }
        );

        axiosRes.interceptors.response.use(
            (response) => response,
            async (err) => {
                if (err.response?.status === 401) {
                    try {
                        await axios.post("/dj-rest-auth/token/refresh/");
                    } catch (err) {
                        setCurrentUser((prevCurrentUser) => {
                            if (prevCurrentUser) {
                                navigate("/signin");
                            }
                            return null;
                        });
                    }
                    return axios(err.config);
                }
                return Promise.reject(err);
            }
        );
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <SetCurrentUserContext.Provider value={setCurrentUser}>
                {children}
            </SetCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    )
}