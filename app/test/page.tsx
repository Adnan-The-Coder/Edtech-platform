import SignIn from '@/components/auth/Sign-in'
import React from 'react'

function Page() {
  return (
    <div>
      <SignIn isOpen={true} onClose={()=>{alert("Something!")}} />
    </div>
  )
}

export default Page
