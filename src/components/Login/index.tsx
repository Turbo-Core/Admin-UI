import React from 'react'

export default function Login({ login }: { login: (username: string, password: string) => void }) {
  return (
    <button onClick={() => login("username", "password")}
    >Login</button>
  )
}
