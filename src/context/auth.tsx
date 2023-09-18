import React from "react";

export interface User {
    email: string;
    token: string
}

export interface AuthContextInterface {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  signUp: (username: string, password: string) => void;
}

export const authContextDefaults: AuthContextInterface = {
    user: null,
    login: () => {},
    logout: () => {},
    signUp: () => {}
};

export const AuthContext =
  React.createContext<AuthContextInterface>(authContextDefaults);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [user, setUser] = React.useState<User | null>(null);

    const apiCall = async (username: string, password: string, url: string) => {
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: username,
                password
            }),
            headers: {
                "content-type": "application/json"
            }
        }).then(response => {
            if (((response.status / 100) >> 0) == 5) { // 5xx status code
                alert("ERR 1: Something went wrong :(") // TODO: Change to modal alert
            }
            else if (((response.status / 100) >> 0) == 4) {
                alert("Email or password is not correct")
            }
            else if (response.ok) {
                return response.json()
            }
        }).then(response => {
            if (!response) {
                alert("ERR 2: Something went wrong :(")
                return;
            }
            console.log(username + " logged in")
            const user = {
                email: username,
                token: response.token
            };
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
        }).catch((e) => {
            console.error(e);
            alert("ERR 3: Something went wrong :(")
        });
    };

    const login = async (username: string, password: string) => {
        await apiCall(username, password, "/api/auth/login");
    }

    const signUp = async (username: string, password: string) => {
        await apiCall(username, password, "/api/auth/signup");
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    }

    const refreshUser = () => {
        const user = localStorage.getItem("user");
        if (user) {
            setUser(JSON.parse(user));
        }
    }

    React.useEffect(refreshUser, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, signUp }}>
            {children}
        </AuthContext.Provider>
    );
};
