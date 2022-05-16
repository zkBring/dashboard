import React, { FC } from 'react'

import {
  Loader,
  LoaderOverlay
} from './styled-components'

interface Props {
  size?: 'default' | 'large' | 'small',
  className?: string,
  withOverlay?: boolean
}

const LoaderComponent: FC<Props> = ({ size = 'default', className = '', withOverlay }) => {
  const loader = <Loader size={size} className={className} />
  if (withOverlay) {
    return <LoaderOverlay>
      {loader}
    </LoaderOverlay>
  }
  return loader
}

export default LoaderComponent


// .container {
//   border-radius: 50px;
//   line-height: 100px;
//   text-align: center;
//   width: 100px;
//   height: 100px;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   text-transform: uppercase;
//   letter-spacing: 0.05em;
// }


// .withOverlay {
//   position: absolute;
//   z-index: 10;
//   width: 100%;
//   height: 100%;
//   top: 0;
//   left: 0;
//   background: rgba(255, 255, 255, .6)
// }

// .asContainer {
//   position: relative;
//   top: 0;
//   left: 0;
//   transform: translate(0%, 0%);
// }

// .largeSize {
//   width: 140px;
//   height: 140px;
//   border-radius: 140px;
// }

// .largeSize:after,
// .container:before {
//   border-radius: 140px!important;
// }

// .smallSize {
//   width: 60px;
//   height: 60px;
// }

// .container:before,
// .container:after {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: rgba(0, 0, 0, 1);
//     border-radius: 50px;
//     opacity: 0;
//   }
  
// .container:before {
//   transform: scale(1);
//   animation: pulse 2s infinite linear;
// }
  
// .container:after {
//   animation: pulse 2s 1s infinite linear;
// }

// @keyframes pulse {
//   0% {
//     transform: scale(0.6);
//     opacity: 0;
//   }
//   33% {
//     transform: scale(1);
//     opacity: 1;
//   }
//   100% {
//     transform: scale(1.4);
//     opacity: 0;
//   }
// }