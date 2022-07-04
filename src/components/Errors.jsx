import React from "react";

const Errors = ({ errors }) => {
  return (
    <>
        {
            errors.isErrors&& 
            <section >
                <ul>
                    {errors.errors.map((error, index) => (
                    <li className="bg-red-300 text-red-900 border  w-1/4 h-11 mx-16 text-center mt-7 " key={index}>{error}</li>
                    ))}
                </ul>
            </section>
        }
    </>
  );
};

export default Errors;
