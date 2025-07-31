import {MotiView} from 'moti';


 export const Pulse = ({className}: {className: string}) => (
  <MotiView
    from={{opacity: 0.3}}
    animate={{opacity: 1}}
    transition={{
      loop: true,
      type: 'timing',
      duration: 700,
    }}
    className={`bg-gray-300 rounded-md ${className}`}
  />
);
