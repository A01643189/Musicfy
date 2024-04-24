import React, { useState } from "react";
import { fetchSpotifyApi} from "../../api/spotifyAPI";
import { useNavigate } from "react-router-dom";

const login = () => {

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const newValues = {
      ...form,
      [e.target.name]: e.target.value,
    };
  
    setForm(newValues);
  };

  const handleRegister = () => {
    navigate('/');
  };

  const handleLogin = async() => {
    const client_id = 'a007140b6e204fa7803d6379c2014224';
    const client_secret = '8cc3f129214a409b9ee66574a7e72e81';
    const url = "https://accounts.spotify.com/api/token";
    const body = 'grant_type=client_credentials';
    const token = 'Basic ' +btoa(client_id + ':' + client_secret);

    const response = await fetchSpotifyApi(url, 'POST', body, 'application/x-www-form-urlencoded', token);
  
    navigate('/dashboard');
    console.log(response);
  };

  return (
    <section className="bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <img className="w-44 h-44" src="./public/logo.png" alt="logo" />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Login to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                <input type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="YourEmail@gmail.com" value={form.username} onChange={handleOnChange} required="" />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " value={form.password} onChange={handleOnChange} required="" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                </div>
              </div>
              <button type="submit" className="w-full text-white bg-[#60AB2E] hover:bg-[#A7E24C] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={handleLogin}>Login</button>
              <p className="text-sm font-light text-gray-500">
                Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline" onClick={handleRegister}>Register</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default login;
