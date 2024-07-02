import { Carousel } from "flowbite-react";
import Image from "next/image";

const BannerLanding = () => {
  return (
    <div className="px-8 mb-8 pt-24">
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 overflow-hidden rounded-[32px]">
        <Carousel>
          <div className="rounded-[32px] overflow-hidden">
            <Image
              src="/banner-wellcome.svg"
              alt="..."
              layout="responsive"
              width={1700}
              height={100}
              className="rounded-[32px]"
            />
          </div>
          <div className="rounded-[32px] overflow-hidden">
            <Image
              src="/fitur-konsultasi.svg"
              alt="..."
              layout="responsive"
              width={1700}
              height={100}
              className="rounded-[32px]"
            />
          </div>
          <div className="rounded-[32px] overflow-hidden">
            <Image
              src="/fitur-komparasi.svg"
              alt="..."
              layout="responsive"
              width={1700}
              height={100}
              className="rounded-[32px]"
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default BannerLanding;
