import logo from '../assets/react.svg';

export const ReactLogo = () => {
  return (
    <img 
      src={ logo } 
      alt="React Logo" 
      className='fixed z-10 bottom-8 right-4 w-[50px]'
    />
  )
}
