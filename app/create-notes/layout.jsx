import React from 'react'
import App from '@/components/noteFunction/noteFunction';

export default function layout({children}) {
  return (
    <div>
      <App/>
      {children}
    </div>
  );
}
