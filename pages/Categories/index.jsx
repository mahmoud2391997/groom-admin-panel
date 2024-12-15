import React from "react";

function Categories() {
  return (
    <div className="mt-20" style={{ width: "calc(100% - 256px)" }}>
      <section className="w-5/6 m-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  grid mt-20">
        {[
          {
            name: "Haircuts",
            image:
              "https://img.pikbest.com/photo/20241212/barber-making-hairstyle_11243110.jpg!f305cw", // Haircut service
          },
          {
            name: "Beard Trims",
            image:
              "https://thebeardclub.com/cdn/shop/articles/Trim_Your_Beard_2_3202ea96-9f43-43af-bc17-81955f6ddabc.jpg?v=1651237993&width=1920", // Beard trimming
          },
          {
            name: "Shaves",
            image:
              "https://media.istockphoto.com/id/640276472/photo/skillful-hairdresser-using-blade-for-shaving-beard.jpg?s=612x612&w=0&k=20&c=ZvU0dU02444qcrErRk-noiD1XaUph2GoUinDK2NUGRY=", // Shaving
          },
          {
            name: "Hair Coloring",
            image:
              "https://www.shutterstock.com/image-photo/professional-hairdresser-dying-hair-beauty-260nw-1946344090.jpg", // Hair coloring service
          },
          {
            name: "Facial Treatments",
            image:
              "https://images.unsplash.com/photo-1583225148383-d3d230b06a20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // Facials
          },
          {
            name: "Scalp Treatments",
            image:
              "https://images.unsplash.com/photo-1555529771-3df469f1f023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // Scalp treatment
          },
          {
            name: "Kids Haircuts",
            image:
              "https://images.unsplash.com/photo-1598823713511-c1f2a2d2568c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // Kids haircut
          },
          {
            name: "Wedding Grooming",
            image:
              "https://images.unsplash.com/photo-1580113516145-e6f40cf50372?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // Groom wedding preparation
          },
        ]
          .slice(0, 4)
          .map((category) => {
            return (
              <div className="lg:h-[430px] m-auto w-[90%]   flex flex-col  items-center ">
                <img
                  src={category.image}
                  className="md:w-full w-full h-[350px]"
                />
                <div className="xl:w-[236px] w-48 h-20  flex flex-col items-center justify-around">
                  <h5 className="text-2xl leading-5 tracking-[0.16em]">
                    {category.name}
                  </h5>

                  {/* <div className="w-full tracking-[0.16em] leading-5 text-lg text-center">
            <span className="">Lorem</span>
          </div> */}
                </div>
              </div>
            );
          })}
      </section>
      <div className="m-auto w-40 mt-5">
        <button className=" border-2 border-purple-500 w-full">
          Add Categories
        </button>
      </div>
    </div>
  );
}

export default Categories;
