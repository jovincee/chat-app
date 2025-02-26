import { Link } from "react-router-dom";
const Login = () => {
  return <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
  <div className='w-full p-6 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <h1 className='text-4xl font-semibold text-center text-gray-300'>
          Login
          <span className='text-blue-500'> ChatApp</span>
      </h1>

      <form>
        <div className='pt-8'>
        <label className="input input-bordered flex items-center gap-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" className="w-full h-10" placeholder="Username" />
        </label>
        </div>
        
        <div className='pt-8'>
        <label className="input input-bordered flex items-center gap-2">
            <svg
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 16 16"
                 fill="currentColor"
                 className="h-4 w-4 opacity-70">
                 <path
                   fillRule="evenodd"
                   d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                   clipRule="evenodd" />
            </svg>
            <input type="text" className="w-full h-10" placeholder="Password" />
        </label>
        </div>
        <div className='pt-4'>
        <Link to="/signup" className='link link-hover text-gray-200 hover:underline hover:text-blue-400 mt-2 inline-block'>
          {"Don't"} have an account?
        </Link>
        </div>  
        <div className='pt-4'>
          <button className='btn btn-block btn-sm mt-2'>Login</button>
        </div>

      </form>
  </div>
</div>;

    
};

export default Login;
