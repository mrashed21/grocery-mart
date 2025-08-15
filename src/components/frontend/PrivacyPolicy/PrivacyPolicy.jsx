"use client";
import Contain from "@/components/common/Contain";
import useGetSettingData from "@/lib/getSettingData";

const PrivacyPolicy = () => {
  const { data: settingsData, isLoading: settingDataLoading } =
    useGetSettingData();
  const settingData = settingsData?.data?.[0];
  return (
    <Contain>
      <section className="mt-10">
        <div
          dangerouslySetInnerHTML={{ __html: settingData?.privacy_policy }}
        />
      </section>
    </Contain>
  );
};

export default PrivacyPolicy;
