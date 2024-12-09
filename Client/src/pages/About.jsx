import React from "react";
import Title from "../components/Title";
import { Assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetter";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={Assets.about_img}
          alt="about_img"
          className="w-full md:max-w-[450px]"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo
            quidem dicta voluptatibus exercitationem nisi, ut sapiente saepe
            natus, delectus eius, dolore velit nobis sint?
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo
            quidem dicta voluptatibus exercitationem nisi, ut sapiente saepe
            natus, delectus eius, dolore velit nobis sint?
          </p>
          <b>Our Mission</b>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo
            quidem dicta voluptatibus exercitationem nisi, ut sapiente saepe
            natus, delectus eius, dolore velit nobis sint?
          </p>
        </div>
      </div>
      <div className="text-xl my-2">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row mt-10 text-sm">
        <div className="border  px-10  py-5  sm:py-20 flex flex-col gap-5 ">
          <b>Quality Assurance :</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo
            obcaecati eveni
          </p>
        </div>
        <div className="border px-10  py-5 sm:py-20 flex flex-col gap-5 ">
          <b>Convenience :</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo
            obcaecati eveni
          </p>
        </div>
        <div className="border  px-10  py-5  sm:py-20 flex flex-col gap-5 ">
          <b>Exceptional Customer Service :</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo
            obcaecati eveni
          </p>
        </div>
      </div>
      <div className="mt-20">
        <NewsLetterBox />
      </div>
    </div>
  );
};

export default About;
