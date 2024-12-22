import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {MessageSquare} from "lucide-react"

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email:"",
    password:"",
  })
  
  const {signup, isSigningUp} = useAuthStore();
const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);

  }



  return (
    <div className="min-h-screen grid lg:grid-cols-2 ">
      

      {/* Login Form Section */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
<div className="text-center mb-8">
  <div className="flex flex-col items-center gap-2 group">
    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
<MessageSquare className="size-6 text-primary"/>
    </div>

<h1>Create Account</h1>
<p> Get Started with your free Account</p>
  </div>
</div>

<form className="space-y6" onSubmit={handleSubmit}>
      <div>
        1:56:00
      </div>
        </form>
        </div>
      </div>

      {/* Skeleton Blocks Section */}
      
    </div>
  );
};

export default SignupPage