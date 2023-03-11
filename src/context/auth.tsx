import React from "react";

export interface User {
    uid: string;
    email: string;
    accessToken: string | null;
    refreshToken: string | null;
}

export interface AuthContextInterface {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export const authContextDefaults: AuthContextInterface = {
    user: null,
    login: () => {},
    logout: () => {},
};

export const AuthContext =
  React.createContext<AuthContextInterface>(authContextDefaults);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [user, setUser] = React.useState<User | null>(null);

    const login = (username: string, password: string) => {
        const user = {
          uid: "123",
          email: "s",
          accessToken: "s",
          refreshToken: "s",
      }
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    }

    React.useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
