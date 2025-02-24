import GenderCheckBox from "./GenderCheckbox";

const SignUp = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
    <div className='w-full p-6 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <h1 className='text-4xl font-semibold text-center text-gray-300'>
        Sign Up <span className='text-blue-500'> ChatApp</span>
      </h1>

      <form>
        {/*Fullname, username, enter password and confirm password */}
        <div>
          <label className='label p-2'>
            <span className='text-base text-gray-200 label-text'>Full Name</span>
          </label>
          <input type='text' placeholder='John Doe' className='w-full input input-bordered h-10' />
        </div>

        <div>
          <label className='label p-2'>
            <span className='text-base text-gray-200 label-text'>Username</span>
          </label>
          <input type='text' placeholder='johndoe' className='w-full input input-bordered h-10' />
        </div>

        <div>
          <label className='label p-2'>
            <span className='text-base text-gray-200 label-text'>Password</span>
          </label>
          <input type='text' placeholder='Enter Password' className='w-full input input-bordered h-10' />
        </div>

        <div>
          <label className='label p-2'>
            <span className='text-base text-gray-200 label-text'>Confirm Password</span>
          </label>
          <input type='text' placeholder='Confirm Password' className='w-full input input-bordered h-10' />
        </div>

      {/*Gender Checkbox */}
      <GenderCheckBox />

      <a className='text-sm text-gray-400
       hover:underline hover:text-blue-400 mt-2 inline block' href='#'>
        Already have an account?
      </a>
      <div className='pt-4'>
          <button className='btn btn-block btn-sm mt-2'>Sign Up</button>
        </div>
      </form>

    </div>

  </div>
  );
};
export default SignUp;
