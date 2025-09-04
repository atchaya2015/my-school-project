"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { CheckCircle } from "lucide-react"; // icon for green tick

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [success, setSuccess] = useState("");

 
  const emailValue = watch("email_id", "");

  const isValidEmail = /^\S+@\S+\.\S+$/.test(emailValue);

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
        if (key === "image") {
        formData.append("image", data.image[0]); 
      } else {
      formData.append(key, data[key]);
      }
    });

    try {
      const res = await fetch("/api/schools/add", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSuccess("✅ School added successfully!");
        reset();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setSuccess("❌ Failed to add school.");
      }
    } catch (err) {
      setSuccess("❌ Error while adding school.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 md:p-10">
        
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
         Add School Information Here
        </h1>

       
        {success && (
          <div
            className={`mb-6 p-3 text-center rounded-lg font-medium ${
              success.includes("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {success}
          </div>
        )}

        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                School Name
              </label>
              <input
                type="text"
                {...register("name", { required: "School Name is required" })}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

          
            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Contact
              </label>
              <input
                type="number"
                {...register("contact", { required: "Contact is required" })}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {errors.contact && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contact.message}
                </p>
              )}
            </div>

           
            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                School Address
              </label>
              <input
                type="text"
                {...register("address", { required: "Address is required" })}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            
            <div>
              <label className="block mb-2 text-gray-700 font-medium">City</label>
              <input
                type="text"
                {...register("city", { required: "City is required" })}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
              )}
            </div>

            
            <div>
              <label className="block mb-2 text-gray-700 font-medium">State</label>
              <input
                type="text"
                {...register("state", { required: "State is required" })}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.state.message}
                </p>
              )}
            </div>

            
            <div>
              <label className="block mb-2 text-gray-700 font-medium">Email</label>
              <input
                type="email"
                {...register("email_id", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email format",
                  },
                })}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {errors.email_id && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email_id.message}
                </p>
              )}

              
              {emailValue && isValidEmail && (
                <p className="flex items-center gap-1 text-green-600 text-sm mt-2">
                  <CheckCircle size={16} />
                  Email validated
                </p>
              )}
            </div>
          </div>

         
<div>
  <label className="block mb-2 text-gray-700 font-medium">
    Upload School Image
  </label>

  <div className="relative w-full">
   
    <input
      type="file"
      id="image"
      {...register("image", { required: "School image is required" })}
      className="hidden"
    />
    
    <label
      htmlFor="image"
      className="block w-full border rounded-lg px-3 py-2 text-gray-600 cursor-pointer bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 text-center"
    >
      Choose File
    </label>
  </div>

 
  {watch("image") && watch("image")[0] && (
    <p className="text-sm text-gray-600 mt-2">
      📂 {watch("image")[0].name}
    </p>
  )}

  {errors.image && (
    <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
  )}
</div>


         
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all shadow-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
