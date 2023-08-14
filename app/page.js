import React from 'react'
import Link from 'next/link';

// import styles from "./page.module.css"
export default function page() {
  return (
        <div>
            <Link href='./create-notes'>
            <button className='normalButton'>Create note</button>
            </Link>
        </div>
  );
}
