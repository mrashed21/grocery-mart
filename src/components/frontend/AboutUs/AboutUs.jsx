"use client";

import Contain from "@/components/common/Contain";
import useGetSettingData from "@/lib/getSettingData";

const AboutUs = () => {
  const { data: settingsData, isLoading: settingDataLoading } =
    useGetSettingData();
  const settingData = settingsData?.data?.[0];
  return (
    <Contain>
      <main className="mt-10">
        <div dangerouslySetInnerHTML={{ __html: settingData?.about_us }} />
      </main>
    </Contain>
  );
};

export default AboutUs;
